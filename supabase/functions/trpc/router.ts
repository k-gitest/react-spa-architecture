import { initTRPC, TRPCError } from '@trpc/server';
import { Context } from './context.ts';
import { z, ZodError } from 'zod';

const t = initTRPC.context<Context>().create({
  // エラーフォーマットの作成
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        code: mapPostgrestErrorCodeToTRPCErrorCode(error.code),
        cause: error,
        message: error.message,
        name: error.name,
        zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

const mapPostgrestErrorCodeToTRPCErrorCode = (code: string) => {
  switch (code) {
    case 'invalid_request':
      return 'BAD_REQUEST';
    case 'unauthorized':
      return 'UNAUTHORIZED';
    case 'forbidden':
      return 'FORBIDDEN';
    case 'not_found':
      return 'NOT_FOUND';
    case 'conflict':
      return 'BAD_REQUEST';
    case 'internal_server_error':
      return 'INTERNAL_SERVER_ERROR';
    case 'bad_gateway':
      return 'BAD_GATEWAY';
    case 'service_unavailable':
      return 'SERVICE_UNAVAILABLE';
    case 'gateway_timeout':
      return 'GATEWAY_TIMEOUT';
    default:
      return 'INTERNAL_SERVER_ERROR';
  }
};

const memoFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  importance: z.string().refine((value) => ['high', 'medium', 'low'].includes(value)),
  category: z.string().refine((value) => ['memo', 'task', 'diary'].includes(value)),
  tag: z.array(z.string()).min(1),
});

export const appRouter = t.router({
  hello: t.procedure.query(() => {
    return { message: 'Hello from tRPC in Supabase Edge Function!' };
  }),
  greet: t.procedure.input(z.string({ message: '文字列を入力して下さい' })).query((opts) => {
    return { greeting: `Hello, ${opts.input}!` };
  }),

  getMemos: t.procedure.query(async ({ ctx }) => {
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
  getMemo: t.procedure
    .input(z.string()) // メモIDの入力
    .query(async ({ ctx, input: id }) => {
      const { data, error } = await ctx.supabase.from('memos').select('*').eq('id', id).single();

      if (error) throw error;
      return data;
    }),

  // メモの追加
  addMemo: t.procedure
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
  updateMemo: t.procedure
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
  deleteMemo: t.procedure
    .input(z.string()) // メモIDの入力
    .mutation(async ({ ctx, input: id }) => {
      const { error } = await ctx.supabase.from('memos').delete().eq('id', id);

      if (error) throw error;
      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
