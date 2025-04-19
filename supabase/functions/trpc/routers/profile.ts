import { z } from 'zod';
import { router, procedure } from '../trpc.ts';
import { profileFormSchema, uploadAvatarInput } from '../schema/profile.ts';

export const profileRouter = router({
  getProfile: procedure.input(z.string()).query(async ({ ctx, input: id }) => {
    const { data, error } = await ctx.supabase.from('profiles').select('*').eq('user_id', id).single();
    if (error) throw error;
    return data;
  }),
  updateProfile: procedure.input(profileFormSchema.extend({ id: z.string() })).mutation(async ({ ctx, input }) => {
    const { error } = await ctx.supabase.from('profiles').update(input).eq('user_id', input.id);
    if (error) throw error;
    return { success: true };
  }),
  uploadAvatar: procedure.input(uploadAvatarInput).mutation(async ({ ctx, input }) => {
    const newUrl = `${input.folderName}/avatar.${input.extention}?v=${Date.now()}`;
    const bucket = Deno.env.get('BUCKET_PROFILE') || 'avatars';
    // Base64文字列をデコードしてバイナリデータに変換
    const binaryData = Uint8Array.from(atob(input.file), (c) => c.charCodeAt(0));
    const { data, error } = await ctx.supabase.storage.from(bucket).upload(newUrl, binaryData, {
      upsert: true,
      cacheControl: '3600',
      contentType: `image/${input.extention}`,
    });
    if (error) throw error;
    return data;
  }),
  deleteAvatar: procedure.input(z.string()).mutation(async ({ ctx, input }) => {
    const bucket = Deno.env.get('BUCKET_PROFILE') || 'avatars';
    const { data, error } = await ctx.supabase.storage.from(bucket).remove([input]);
    if (error) throw error;
    return data;
  }),
});
