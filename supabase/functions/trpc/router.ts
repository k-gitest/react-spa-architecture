import { initTRPC } from '@trpc/server';
import { Context } from './context.ts';
import { z } from 'zod';

const t = initTRPC.context<Context>().create();

const memoFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  importance: z.string().refine(
    (value) => ['high', 'medium', 'low'].includes(value)
  ),
  category: z.string().refine(
    (value) => ['memo', 'task', 'diary'].includes(value)
  ),
  tag: z.array(z.string()).min(1)
});

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return { message: 'Hello from tRPC in Supabase Edge Function!' };
  }),
  greet: t.procedure
    .input(z.string())
    .query((opts) => {
      return { greeting: `Hello, ${opts.input}!` };
    }),

  getMemos: t.procedure
    .query(async ({ ctx }) => {
      const { data, error } = await ctx.supabase
        .from('memos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    }),

  // 単一メモの取得
  getMemo: t.procedure
    .input(z.string()) // メモIDの入力
    .query(async ({ ctx, input: id }) => {
      const { data, error } = await ctx.supabase
        .from('memos')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    }),

  // メモの追加
  addMemo: t.procedure
    .input(memoFormSchema.extend({
      user_id: z.string()
    }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('memos')
        .insert(input);

      if (error) throw error;
      return { success: true };
    }),

  // メモの更新
  updateMemo: t.procedure
    .input(z.object({
      id: z.string(),
      data: memoFormSchema
    }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase
        .from('memos')
        .update(input.data)
        .eq('id', input.id);

      if (error) throw error;
      return { success: true };
    }),

  // メモの削除
  deleteMemo: t.procedure
    .input(z.string()) // メモIDの入力
    .mutation(async ({ ctx, input: id }) => {
      const { error } = await ctx.supabase
        .from('memos')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return { success: true };
    })
});

export type AppRouter = typeof appRouter;