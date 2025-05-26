import { supabase } from '@/lib/supabase';
import { PostgrestError } from '@supabase/supabase-js';
import { BUCKET_IMAGES } from '@/lib/constants';
import { nanoid } from 'nanoid';

export const fetchImagesService = async (user_id: string) => {
  const { data, error } = await supabase
    .from('images')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

// ストレージに画像アップロード後に、imagesテーブルにレコードを追加するサービス
export const uploadImageStorageService = async (
  file: File,
  file_size: number,
  mime_type: string,
  user_id: string,
  folderName: string,
  extention: string,
) => {
  const uniqueId = nanoid(12);
  const timestamp = Date.now();
  // folderNameはuser_idでポリシーを作成している user_idがないとエラーになる
  const newUrl = `${folderName}/${timestamp}_${uniqueId}.${extention}`;
  const { data, error } = await supabase.storage.from(BUCKET_IMAGES).upload(newUrl, file, {
    cacheControl: '3600',
    upsert: false,
  });
  if (error) throw error;
  console.log('Image uploaded to storage:', data);

  try {
    const imageData = await addImageService(user_id, data.path, file.name, file_size, mime_type, data.id);
    console.log('Image metadata added to images table:', imageData);
    return imageData.id;
  } catch (error) {
    const errorMessage =
      error instanceof PostgrestError || error instanceof Error
        ? error.message
        : 'Unknown error occurred while adding image metadata';
    await deleteImageStorageService(user_id, file.name, data.path, errorMessage);
    throw error;
  }
};

// 画像メタデータimagesテーブルへの追加サービス
export const addImageService = async (
  user_id: string,
  file_path: string,
  file_name: string,
  file_size: number,
  mime_type: string,
  id: string,
) => {
  const { data, error } = await supabase
    .from('images')
    .insert({
      user_id: user_id,
      storage_object_id: id,
      file_name: file_name,
      file_path: file_path,
      file_size: file_size,
      mime_type: mime_type,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

// 画像メタデータimagesテーブルからレコードを削除するサービス
export const deleteImageService = async (id: string, user_id: string, file_path: string, file_name: string) => {
  const { error } = await supabase.from('images').delete().eq('id', id).single();
  if (error) throw error;
  await deleteImageStorageService(user_id, file_name, file_path, 'Image deleted from images table');
};

// ストレージから画像を削除するテーブルcleanup_delete_imagesへ追加するサービス
export const deleteImageStorageService = async (user_id: string, name: string, path: string, error_message: string) => {
  const { error } = await supabase
    .from('cleanup_delete_images')
    .insert({
      user_id: user_id,
      error_message: error_message,
      file_name: name,
      file_path: path,
      resolved: false,
    })
    .single();
  if (error) throw error;
};
