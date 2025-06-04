import { router, procedure } from '../trpc.ts';
import { z } from 'zod';
import { nanoid } from 'https://deno.land/x/nanoid/mod.ts';

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

  // ストレージに画像アップロード後に、imagesテーブルにレコードを追加、エラー時にcleanup_delete_imagesテーブルへ追加
  uploadImage: procedure
    .input(
      z.object({
        file: z.string(),
        file_name: z.string(),
        file_size: z.number(),
        mime_type: z.string(),
        user_id: z.string(),
        folderName: z.string(),
        extention: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const uniqueId = nanoid(12);
      const timestamp = Date.now();
      const newUrl = `${input.folderName}/${timestamp}_${uniqueId}.${input.extention}`;
      const bucket = Deno.env.get('BUCKET_IMAGES') || 'images';
      //atob() でBase64文字列をデコードしてバイナリ文字列に変換
      //c => c.charCodeAt(0) で、バイナリ文字列の各文字を文字コード（0〜255）に変換
      const binary = Uint8Array.from(atob(input.file), c => c.charCodeAt(0));
      const { data, error } = await ctx.supabase.storage.from(bucket).upload(newUrl, binary, {
        cacheControl: '3600',
        upsert: false,
      });
      if (error) throw error;

      const { data: imageData, error: imageError } = await ctx.supabase
        .from('images')
        .insert({
          user_id: input.user_id,
          storage_object_id: data.id,
          file_name: input.file_name,
          file_path: data.path,
          file_size: input.file_size,
          mime_type: input.mime_type,
        })
        .select()
        .single();

      if (imageError) {
        await ctx.supabase.from('cleanup_delete_images').insert({
          user_id: input.user_id,
          error_message: imageError.message,
          file_name: input.file_name,
          file_path: data.path,
          resolved: false,
        });
        throw imageError;
      }
      return imageData?.id;
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
