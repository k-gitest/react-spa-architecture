import { z } from 'zod';
import { router, procedure } from '../trpc.ts';
import { accountSchema, accountUpdateSchema, EMAIL_OTP_TYPES, signInOAuthSchema } from '../schema/auth.ts';

export const authRouter = router({
  // ユーザー登録
  signInWithPassword: procedure.input(accountSchema).mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });
    if (error) throw error;
    return data;
  }),

  // ログイン
  signUp: procedure.input(accountSchema).mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.signUp({
      email: input.email,
      password: input.password,
    });
    if (error) throw error;
    return data;
  }),

  // OAuth
  signInWithOAuth: procedure.input(signInOAuthSchema).mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.signInWithOAuth({
      provider: input.provider,
      options: {
        redirectTo: input.redirectTo || `${Deno.env.get('DOMAIN_URL')!}`,
      },
    });
    if (error) throw error;
    return data;
  }),

  // ログアウト
  signOut: procedure.mutation(async ({ ctx }) => {
    const { error } = await ctx.supabase.auth.signOut();
    if (error) throw error;
    return;
  }),

  // ユーザー情報更新
  updateUser: procedure.input(accountUpdateSchema).mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.updateUser(input);
    if (error) throw error;
    return data;
  }),

  // リセットパスワードメール認証
  resetPasswordForEmail: procedure
    .input(z.string().email({ message: '有効なメールアドレスを入力してください' }))
    .mutation(async ({ ctx, input: email }) => {
      const { data, error } = await ctx.supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${Deno.env.get('DOMAIN_URL')!}/pass`,
      });
      if (error) throw error;
      return data;
    }),

  // OTP(ワンタイムパスワード)検証
  emailVerifyOpt: procedure
    .input(z.object({ token_hash: z.string(), type: z.enum(EMAIL_OTP_TYPES) }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase.auth.verifyOtp({
        token_hash: input.token_hash,
        type: input.type,
      });
      if (error) throw error;
      return data;
    }),

  // ユーザーアカウント削除
  deleteUserAccont: procedure.input(z.string()).mutation(async ({ ctx, input: userId }) => {
    const { data, error } = await ctx.supabase.functions.invoke('delete-user-accont', {
      body: { user_id: userId },
    });
    if (error) throw error;
    return data;
  }),
});
