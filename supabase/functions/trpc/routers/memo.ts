import { z } from 'zod';
import { router, procedure } from '../trpc.ts';
import { memoFormSchema } from '../schema/memo.ts';
//import { TRPCError } from '@trpc/server';

export const memoRouter = router({
  // 全メモの取得
  getMemos: procedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabase.from('memos').select('*').order('created_at', { ascending: false });
    if (error) {
      // PostgrestErrorをTRPCErrorとしてラップしてスロー
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
    return data;
  }),

  // 単一メモの取得
  getMemo: procedure.input(z.string()).query(async ({ ctx, input: id }) => {
    const { data, error } = await ctx.supabase.from('memos').select('*').eq('id', id).single();

    if (error) throw error;
    return data;
  }),

  // メモの追加
  addMemo: procedure
    .input(
      memoFormSchema.extend({
        user_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase.from('memos').insert(input);

      if (error) throw error;
      return { success: true };
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
