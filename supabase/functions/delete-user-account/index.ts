import { Hono, Context } from 'hono';
import { createClient } from 'jsr:@supabase/supabase-js@2';
import { corsMiddleware } from '../_shared/cors.ts';

const app = new Hono();

app.use('*', corsMiddleware);

app.post('/delete-user-account', async (c: Context) => {
  try {
    const { user_id } = await c.req.json();

    const supabase = createClient(Deno.env.get('SERVICE_URL')!, Deno.env.get('SERVICE_ROLE_KEY')!);

    const { error } = await supabase.auth.admin.deleteUser(user_id);

    if (error) {
      return c.json(
        {
          // errorオブジェクトはJSON.stringifyでAuthError型情報が失われるので再構築したAuthError型で返す
          error: {
            name: error.name,
            message: error.message,
            status: error.status,
            code: error.code,
          },
        }
      );
    }

    return c.json({ message: 'ユーザーアカウントの削除が成功しました' }, 200);
  } catch (error) {
    return c.json({ error: `${error}` }, 400);
  }
});

Deno.serve(app.fetch);
