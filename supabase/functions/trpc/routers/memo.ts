import { z } from 'zod';
import { router, procedure } from '../trpc.ts';
import { memoFormSchema } from '../schema/memo.ts';
//import { TRPCError } from '@trpc/server';

export const memoRouter = router({
  // 全メモの取得
  getMemos: procedure.query(async ({ ctx }) => {
    //const { data, error } = await ctx.supabase.from('memos').select('*').order('created_at', { ascending: false });
    const { data, error } = await ctx.supabase.from('memos').select(`
      id,
      title,
      content,
      importance,
      user_id,
      created_at,
      updated_at,
      category:memo_categories (
        category:categories (
          id,
          name
        )
      ),
      tags:memo_tags (
        tag:tags (
          id,
          name
        )
      )
    `);
    if (error) {
      // PostgrestErrorをTRPCErrorとしてラップしてスローする場合
      /* TRPCErrorの型
         code: TRPC_ERROR_CODE_KEY,
         message?: string,
         cause?: unknown,

      throw new TRPCError({
        code: mapPostgrestErrorCodeToTRPCErrorCode(error.code),
        message: error.message || 'An error occurred while fetching memos',
        cause: error,
      });
      */
      throw new Error('An error occurred while fetching memos');
    }

    const formatted = data.map((memo) => ({
      id: memo.id,
      title: memo.title,
      content: memo.content,
      importance: memo.importance,
      created_at: memo.created_at,
      updated_at: memo.updated_at,
      user_id: memo.user_id,
      category: memo.category?.[0]?.category?.name ?? '',
      tags: memo.tags?.map((t) => t.tag?.name ?? '') ?? [],
    }));

    return formatted;
  }),

  // 単一メモの取得
  getMemo: procedure.input(z.string()).query(async ({ ctx, input: id }) => {
    //const { data, error } = await ctx.supabase.from('memos').select('*').eq('id', id).single();

    const { data, error } = await ctx.supabase
      .from('memos')
      .select(
        `
    id,
    title,
    content,
    importance,
    user_id,
    created_at,
    updated_at,
    category:memo_categories (
      category:categories (
        id,
        name
      )
    ),
    tags:memo_tags (
      tag:tags (
        id,
        name
      )
    )
  `,
      )
      .eq('id', id)
      .single();

    if (error) throw error;

    const formatted = {
      id: data.id,
      title: data.title,
      content: data.content,
      importance: data.importance,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user_id: data.user_id,
      category: String(data.category?.[0]?.category?.id) ?? '',
      tags: data.tags?.map((t) => String(t.tag?.id)) ?? [],
    };
    return formatted;
  }),

  // メモの追加
  addMemo: procedure
    .input(
      memoFormSchema.extend({
        user_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //const { error } = await ctx.supabase.from('memos').insert(input);
      //if(error) throw error;

      try{
        const result = await ctx.prisma.$transaction(async (tx) => {
          const newMemo = await tx.memo.create({
            data: {
              user_id: input.user_id,
              title: input.title,
              content: input.content,
              importance: input.importance,
              category: {
                create: { category_id: Number(input.category) },
              },
              tags: {
                create: input.tags.map((tagId) => ({
                  tag_id: Number(tagId),
                })),
              },
            },
          });
  
          return newMemo;
        });
        return { success: true };
      }
      catch(error){
        throw error;
      }
      
    }),

  // メモの更新
  updateMemo: procedure
    .input(
      z.object({
        id: z.string(),
        data: memoFormSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase.from('memos').update(input.data).eq('id', input.id);

      if (error) throw error;
      return { success: true };
    }),

  // メモの削除
  deleteMemo: procedure.input(z.string()).mutation(async ({ ctx, input: id }) => {
    const { error } = await ctx.supabase.from('memos').delete().eq('id', id);

    if (error) throw error;
    return { success: true };
  }),
});
