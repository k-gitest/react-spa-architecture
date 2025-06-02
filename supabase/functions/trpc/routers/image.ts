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

  // imagesテーブルへ画像メタデータ登録、失敗時に画像削除キューをcleanup_delete_imagesテーブルへ追加
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
      if (error) {
        await ctx.supabase.from('cleanup_delete_images').insert({
          user_id: input.user_id,
          error_message: error.message,
          file_name: input.file_name,
          file_path: input.file_path,
          resolved: false,
        });
        throw error;
      }
      return data;
    }),

  // imagesテーブルから削除とcleanup_delete_imagesテーブルへの追加
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
      try {
        await ctx.prisma.$transaction(async (tx) => {
          await tx.image.delete({ where: { id: input.id } });

          await tx.cleanupDeleteImage.create({
            data: {
              userId: input.user_id,
              errorMessage: 'Image deleted from images table',
              filePath: input.file_path,
              fileName: input.file_name,
              resolved: false,
            },
          });
        });
      } catch (error) {
        throw error;
      }

      return { success: true };
    }),
});
