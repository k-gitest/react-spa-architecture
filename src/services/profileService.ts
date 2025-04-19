import { supabase } from '@/lib/supabase';
import { Profile } from '@/types/profile-types';

export const getProfileService = async (id: string) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('user_id', id).single();
  if (error) throw error;
  return data;
};

export const updateProfileService = async (id: string, update: Profile) => {
  const { error } = await supabase.from('profiles').update(update).eq('user_id', id);
  if (error) throw error;
  return;
};

export const upLoadAvatarService = async (file: File, folderName: string, extention: string) => {
  const newUrl = `${folderName}/avatar.${extention}?v=${Date.now()}`;
  const bucket = import.meta.env.VITE_BUCKET_PROFILE || 'avatars';
  const { data, error } = await supabase.storage.from(bucket).upload(newUrl, file, {
    upsert: true,
    cacheControl: '3600',
  });
  if (error) throw error;
  return data;
};

export const deleteAvatarService = async (path: string) => {
  const bucket = import.meta.env.VITE_BUCKET_PROFILE || 'avatars';
  const { data, error } = await supabase.storage.from(bucket).remove([path]);
  if (error) throw error;
  return data;
};
