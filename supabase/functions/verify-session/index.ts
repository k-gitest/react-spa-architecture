import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import { Redis } from 'https://esm.sh/@upstash/redis@1.34.3';
import { Ratelimit } from 'https://esm.sh/@upstash/ratelimit@2.0.3';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const cacheTTL = parseInt(Deno.env.get('SESSION_CACHE_TTL') || '3600', 10);

const errorResponse = (message: string, status: number = 400) => {
  return new Response(
    JSON.stringify({ error: message, session: null }),
    { status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
  );
};

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

    // Rate Limit（オプション）
    const ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
    });

    const ip = req.headers.get('CF-Connecting-IP') || 
               req.headers.get('X-Forwarded-For') || 
               'unknown';

    const { success } = await ratelimit.limit(ip);

    if (!success) {
      return errorResponse('Rate limit exceeded', 429);
    }

    // 認証チェック
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return errorResponse('Authorization header required', 401);
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return errorResponse('Token not found', 401);
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey, {
      global: {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    });

    const { data, error } = await supabase.auth.getUser(token);
    if (error || !data.user) {
      console.log(`未認証ユーザー: ${error}`);
      return errorResponse('Unauthorized', 401);
    }

    console.log(`認証ユーザー: ${data.user.id}`);

    // キャッシュチェック
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
        return errorResponse('Session expired', 401);
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
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // セッション取得
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return errorResponse('Session not found', 401);
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
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Session error:', error);
    return errorResponse(
      error instanceof Error ? error.message : 'An unknown error occurred',
      500
    );
  }
});