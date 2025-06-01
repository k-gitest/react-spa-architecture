import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient, AuthError } from 'jsr:@supabase/supabase-js@2';
import { Prisma, PrismaClient } from '../../../generated/client/deno/edge.ts';
import { routeDrizzle } from './drizzle.ts';
import { corsHeaders } from '../_shared/cors.ts';
import { PrismaError, prismaErrorHandler } from '../_shared/prisma-error.ts';

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
      throw error;
    }

    const url = new URL(req.url);

    if (req.method === 'POST' || req.method === 'PUT' && url.pathname.endsWith('/drizzle')) {
      return routeDrizzle(saveData, data.user.id, req.method);
    }

    const prisma = new PrismaClient({
      datasourceUrl: Deno.env.get('DATABASE_URL'),
    });

    try {
      let result;
      if (req.method === 'POST') {
        result = await prisma.$transaction(async (tx) => {
          const newMemo = await tx.memo.create({
            data: {
              user_id: data.user.id,
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
      } else if (req.method === 'PUT') {
        // メモの所有者確認
        const existingMemo = await prisma.memo.findUnique({
          where: { id: saveData.id },
          select: { user_id: true }
        });

        // メモが存在しない場合
        if (!existingMemo) {
          return new Response(
            JSON.stringify({ error: 'メモが見つかりません', ok: false }),
            { headers: corsHeaders, status: 404 }
          );
        }

        // 所有者チェック
        if (existingMemo.user_id !== data.user.id) {
          return new Response(
            JSON.stringify({ error: '権限がありません', ok: false }),
            { headers: corsHeaders, status: 403 }
          );
        }

        result = await prisma.$transaction(async (tx) => {
          const updateData = await tx.memo.update({
            where: {
              id: saveData.id,
            },
            data: {
              title: saveData.title,
              content: saveData.content,
              importance: saveData.importance,
              category: {
                deleteMany: {},
                create: saveData.category ? { category_id: Number(saveData.category) } : undefined,
              },
              tags: {
                deleteMany: {},
                create: saveData.tags.map((tagId: number) => ({ tag_id: Number(tagId) })),
              },
            },
          });
          return updateData;
        });
      }

      return new Response(JSON.stringify({ result, ok: true }), {
        headers: corsHeaders,
        status: 200,
      });
    } catch (error) {
      throw new PrismaError(error);
    } finally {
      await prisma.$disconnect();
    }
  } catch (error) {
    let resultError = null;
    let status = 400;

    if (error instanceof PrismaError && error.name === 'PrismaError') {
      resultError = prismaErrorHandler(error);

      if (error.cause instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.cause.code === 'P2002') {
          status = 409;
        }
      } else if (
        error.cause instanceof Prisma.PrismaClientInitializationError ||
        error.cause instanceof Prisma.PrismaClientRustPanicError ||
        error.cause instanceof Prisma.PrismaClientUnknownRequestError
      ) {
        status = 500;
      }
    } else if (error instanceof AuthError) {
      // AuthError型で返す
      resultError = {
        name: error.name,
        message: error.message,
        status: error.status,
        code: error.code,
      };
    } else {
      resultError = { message: '予期せぬエラーが発生しました。', name: 'UnknownError' };
    }

    return new Response(
      JSON.stringify({
        error: resultError,
        ok: false,
      }),
      {
        headers: corsHeaders,
        status: status,
      },
    );
  }
});
