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

export const upLoadAvatarService = async (file: File, folderName: string, extention: string, currentUrl: string | null) => {
  const newUrl = `avatars/${folderName}/avatar.${extention}?v=${Date.now()}`;
  if (currentUrl) {
    deleteAvatarService(currentUrl);
  }
  const { data, error } = await supabase.storage.from('images').upload(newUrl, file, {
    upsert: true,
    cacheControl: '3600',
  });
  if (error) throw error;
  return data;
};

export const deleteAvatarService = async (path: string) => {
  const { data, error } = await supabase.storage.from('images').remove([path]);
  if (error) throw error;
  return data;
};
