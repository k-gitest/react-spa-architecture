import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { user_id } = await req.json();

    const supabaseClient = createClient(Deno.env.get('SERVICE_URL')!, Deno.env.get('SERVICE_ROLE_KEY')!);

    const { error } = await supabaseClient.auth.admin.deleteUser(user_id);

    if (error) {
      return new Response(
        JSON.stringify({
          // errorオブジェクトはJSON.stringifyでAuthError型情報が失われるので再構築したAuthError型で返す
          error: {
            name: error.name,
            message: error.message,
            status: error.status,
            code: error.code
          },
        }),
        {
          headers: {
            ...corsHeaders,
            'Content-Type': 'application/json',
          },
          status: error.status || 400,
        },
      );
    }

    return new Response(JSON.stringify({ message: 'ユーザーアカウントの削除が成功しました' }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    // AuthError型以外のエラーを返す
    return new Response(JSON.stringify({ error: error }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 400,
    });
  }
});
