import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.4';
import { Redis } from 'https://esm.sh/@upstash/redis@1.34.3';
import { Ratelimit } from 'https://esm.sh/@upstash/ratelimit@2.0.3';
import { corsHeaders } from '../_shared/cors.ts';

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { status: 200, headers: corsHeaders });
  }

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
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 認証チェック
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: 'Authorization header required' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    if (!token) {
      return new Response(
        JSON.stringify({ error: 'Token not found' }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
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
      return new Response(
        JSON.stringify({ error: 'Unauthorized', session: null }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log(`認証ユーザー: ${data.user.id}`);

    // キャッシュチェック
    const cacheKey = `session:${data.user.id}`;
    const cachedSession = await redis.get(cacheKey);

    if (cachedSession) {
      return new Response(
        JSON.stringify({ session: cachedSession, cached: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // セッション取得
    const { data: sessionData, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !sessionData.session) {
      return new Response(
        JSON.stringify({ error: 'Session not found', session: null }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Redisにキャッシュ（TTL: 1時間）
    await redis.setex(cacheKey, 3600, JSON.stringify(sessionData.session));

    return new Response(
      JSON.stringify({ session: sessionData.session, cached: false }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Session error:', error);
    const errorMessage = error instanceof Error 
                         ? error.message 
                         : 'An unknown error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});