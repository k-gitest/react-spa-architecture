import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import { Redis } from 'https://esm.sh/@upstash/redis@1.34.3';
import { Ratelimit } from 'https://esm.sh/@upstash/ratelimit@2.0.3';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const cacheTTL = parseInt(Deno.env.get('SESSION_CACHE_TTL') || '3600', 10);

const errorResponse = (
  message: string, 
  status: number = 400,
  additionalHeaders?: Record<string, string>
) => {
  return new Response(
    JSON.stringify({ error: message, session: null }),
    { 
      status, 
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        ...additionalHeaders
      } 
    }
  );
};

// トークンハッシュ化ヘルパー
async function hashToken(token: string): Promise<string> {
  const tokenHashBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(token)
  );
  return Array.from(new Uint8Array(tokenHashBuffer))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('')
    .slice(0, 16); // 最初の16文字で十分（64bitのエントロピー）
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // Redis初期化
    const redis = new Redis({
      url: Deno.env.get('UPSTASH_REDIS_REST_URL')!,
      token: Deno.env.get('UPSTASH_REDIS_REST_TOKEN')!,
    });

    // IP取得
    const ip = req.headers.get('CF-Connecting-IP') || 
               req.headers.get('X-Forwarded-For')?.split(',')[0].trim() || 
               'unknown';

    // Rate Limiter Key決定
    const authHeader = req.headers.get('Authorization');
    let limiterKey: string;
    let isAuthenticated = false;

    if (authHeader) {
      const token = authHeader.replace('Bearer ', '').trim();
      
      // JWT形式の簡易検証（3つの部分がドットで区切られている）
      const jwtParts = token.split('.');
      if (jwtParts.length === 3 && token.length >= 20) {
        const tokenHash = await hashToken(token);
        limiterKey = `auth:${ip}:${tokenHash}`;
        isAuthenticated = true;
      } else {
        // 不正形式のトークン → IPベース制限（より厳しく）
        limiterKey = `ip:${ip}`;
      }
    } else {
      // 未認証 → IPベース制限
      limiterKey = `ip:${ip}`;
    }

    // Rate Limit（認証済みと未認証で異なる制限）
    const ratelimit = new Ratelimit({
      redis,
      limiter: isAuthenticated 
        ? Ratelimit.slidingWindow(20, '10 s')  // 認証済み: 20req/10s
        : Ratelimit.slidingWindow(10, '10 s'), // 未認証: 10req/10s
      analytics: true,
      prefix: 'session_ratelimit',
    });

    const { success, limit, remaining, reset } = await ratelimit.limit(limiterKey);

    const ratelimitHeaders = {
      'X-RateLimit-Limit': limit.toString(),
      'X-RateLimit-Remaining': remaining.toString(),
      'X-RateLimit-Reset': reset.toString(),
    };

    if (!success) {
      console.log(JSON.stringify({
        type: 'rate_limit_exceeded',
        limiterKey: limiterKey.replace(/:[a-f0-9]{16}$/, ':***'), // ハッシュ部分をマスク
        ip,
        isAuthenticated,
        timestamp: new Date().toISOString(),
      }));

      return new Response(
        JSON.stringify({ 
          error: 'Rate limit exceeded',
          retry_after: reset,
        }),
        { 
          status: 429, 
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            ...ratelimitHeaders,
          } 
        }
      );
    }

    // 認証チェック
    if (!authHeader) {
      return errorResponse('Authorization header required', 401, ratelimitHeaders);
    }

    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      return errorResponse('Token not found', 401, ratelimitHeaders);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: `Bearer ${token}` } },
    });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      console.log(`未認証ユーザー: ${error}`);
      return errorResponse('Unauthorized', 401, ratelimitHeaders);
    }

    console.log(`認証ユーザー: ${data.user.id}`);

    const cacheKey = `session:${data.user.id}`;
    const cachedSession = await redis.get(cacheKey);

    if (cachedSession) {
      const session = typeof cachedSession === 'string' 
        ? JSON.parse(cachedSession) 
        : cachedSession;
      
      // 有効期限チェック
      const expiresAt = new Date(session.expires_at).getTime();
      if (expiresAt < Date.now()) {
        await redis.del(cacheKey);
        return errorResponse('Session expired', 401, ratelimitHeaders);
      }

      const duration = Date.now() - startTime;
      console.log(JSON.stringify({
        type: 'session_fetch',
        userId: data.user.id,
        cached: true,
        duration,
        timestamp: new Date().toISOString(),
      }));

      return new Response(
        JSON.stringify({ session, cached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json', ...ratelimitHeaders, } }
      );
    }

    // セッション取得
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
    if (sessionError || !sessionData.session) {
      return errorResponse('Session not found', 401, ratelimitHeaders);
    }

    // Redisにキャッシュ（TTL: 1時間）
    await redis.setex(cacheKey, cacheTTL, JSON.stringify(sessionData.session));

    const duration = Date.now() - startTime;
    console.log(JSON.stringify({
      type: 'session_fetch',
      userId: data.user.id,
      cached: false,
      duration,
      timestamp: new Date().toISOString(),
    }));

    return new Response(
      JSON.stringify({ session: sessionData.session, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json', ...ratelimitHeaders, } }
    );
  } catch (error) {
    console.error('Session error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'An unknown error occurred',
      500
    );
  }
});