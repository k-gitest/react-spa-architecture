import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient, AuthError } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type"
}

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { 
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { user_id } = await req.json();

    const supabaseClient = createClient(
      Deno.env.get('SERVICE_URL')!,
      Deno.env.get('SERVICE_ROLE_KEY')!
    );

    const { error: deleteUserError } = await supabaseClient.auth.admin.deleteUser(user_id);
    if (deleteUserError) throw deleteUserError;

    return new Response(JSON.stringify({ message: 'ユーザーアカウントの削除が成功しました' }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 200,
    });
  } catch (error) {
    let errorMessage = '予期しないエラーが発生しました';
    
    if (error instanceof AuthError) {
      errorMessage = error.message;
    } else if (error instanceof Error) {
      errorMessage = error.message;
    } else if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    }

    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
      },
      status: 400,
    });
  }
});