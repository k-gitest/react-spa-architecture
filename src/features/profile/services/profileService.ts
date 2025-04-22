import { supabase } from '@/lib/supabase';
import { Profile } from '@/features/profile/types/profile-types';
import { BUCKET_PROFILE } from '@/lib/constants';

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

  const { data, error } = await supabase.storage.from(BUCKET_PROFILE).upload(newUrl, file, {
    upsert: true,
    cacheControl: '3600',
  });
  if (error) throw error;
  return data;
};

export const deleteAvatarService = async (path: string) => {
  const { data, error } = await supabase.storage.from(BUCKET_PROFILE).remove([path]);
  if (error) throw error;
  return data;
};
