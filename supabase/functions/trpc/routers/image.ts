import { router, procedure } from '../trpc.ts';
import { z } from 'zod';

export const imageRouter = router({
  // 画像一覧取得
  fetchImage: procedure.input(z.string()).query(async ({ ctx, input }) => {
    const { data, error } = await ctx.supabase
      .from('images')
      .select('*')
      .eq('user_id', input)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }),

  // 画像メタデータ登録
  addImage: procedure
    .input(
      z.object({
        user_id: z.string(),
        file_path: z.string(),
        file_name: z.string(),
        file_size: z.number(),
        mime_type: z.string(),
        storage_object_id: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabase.from('images').insert(input).select().single();
      if (error) throw error;
      return data;
    }),

  // 画像削除
  deleteImage: procedure
    .input(
      z.object({
        id: z.string(),
        user_id: z.string(),
        file_path: z.string(),
        file_name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabase.from('images').delete().eq('id', input.id).single();
      if (error) throw error;
      return { success: true };
    }),
});
