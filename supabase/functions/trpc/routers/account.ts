import { z } from 'zod';
import { router, procedure } from '../trpc.ts';
import { accountUpdateFormSchema } from '../schema/account.ts';

export const accontRouter = router({
  updateAccount: procedure.input(accountUpdateFormSchema).mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.auth.updateUser(input, {
      emailRedirectTo: `${Deno.env.get('SUPABASE_URL')}/pass`,
    });
    if (error) throw error;
    return data;
  }),
  resetPasswordForEmailAccount: procedure.input(accountUpdateFormSchema).mutation(async ({ ctx, input }) => {
    if (!input.email) throw new Error('emailが入力されていません');
    const { data, error } = await ctx.supabase.auth.resetPasswordForEmail(input.email, {
      redirectTo: `${Deno.env.get('SUPABASE_URL')}/pass`,
    });
    if (error) throw error;
    return data;
  }),
  deleteAccount: procedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase.functions.invoke('delete-user-account', {
      body: { user_id: input },
    });
    if (error) throw error;
    return data as { message: string };
  }),
});
