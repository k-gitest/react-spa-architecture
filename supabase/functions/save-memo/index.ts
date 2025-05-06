import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient, AuthError } from 'jsr:@supabase/supabase-js@2';
import { Prisma, PrismaClient } from '../../../generated/client/deno/edge.ts';
import { routeDrizzle } from './drizzle.ts';
import { corsHeaders } from '../_shared/cors.ts';

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      status: 200,
      headers: corsHeaders,
    });
  }

  // Authorizationヘッダーからトークンを取得
  const authHeader = req.headers.get('Authorization');
  const token = authHeader ? authHeader.replace('Bearer ', '') : null;
  if (!token) throw new Error('トークンがありません');

  try {
    const saveData = await req.json();
    const supabase = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_ANON_KEY')!);

    const { data, error } = await supabase.auth.getUser(token);
    if (error) {
      console.error(error);
      throw error;
    }

    const url = new URL(req.url);
    if (req.method === 'POST' && url.pathname.endsWith('/drizzle')) {
      return routeDrizzle(saveData, data.user.id);
    } else {
      const prisma = new PrismaClient({
        datasourceUrl: Deno.env.get('DATABASE_URL'),
      });

      console.log(saveData);
      try {
        const result = await prisma.$transaction(async (tx) => {
          const newMemo = await tx.memo.create({
            data: {
              user_id: saveData.user_id,
              title: saveData.title,
              content: saveData.content,
              importance: saveData.importance,
              category: {
                create: { category_id: saveData.category },
              },
              tags: {
                create: saveData.tags.map((tagId: number) => ({
                  tag_id: tagId,
                })),
              },
            },
          });

          return newMemo;
        });

        return new Response(JSON.stringify({ result, ok: 'true' }), {
          headers: corsHeaders,
          status: 200,
        });
      } catch (error) {
        console.error('メモとタグの保存に失敗しました:', error);
        throw error;
      } finally {
        await prisma.$disconnect();
      }
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === 'P2002') {
        return new Response(
          JSON.stringify({
            message: 'このメールアドレスは既に使われています',
            ok: false,
          }),
          {
            headers: corsHeaders,
            status: 400,
          },
        );
      } else {
        console.error(error);
        return new Response(
          JSON.stringify({
            message: error,
            ok: false,
          }),
          {
            headers: corsHeaders,
            status: 400,
          },
        );
      }
    }
    if (error instanceof AuthError) {
      return new Response(
        JSON.stringify({
          // AuthError型で返す
          error: {
            name: error.name,
            message: error.message,
            status: error.status,
            code: error.code,
          },
        }),
        {
          headers: corsHeaders,
          status: error.status || 400,
        },
      );
    } else {
      console.error(error);
      return new Response(JSON.stringify({ error: error }), {
        headers: corsHeaders,
        status: 400,
      });
    }
  }
});
