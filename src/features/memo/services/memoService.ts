import { supabase } from '@/lib/supabase';
import { MemoFormData, Category, Tag } from '@/features/memo/types/memo-form-data';

export const fetchMemosService = async () => {
  const { data, error } = await supabase
    .from('memos')
    .select(
      `
    *,
    category:memo_categories (
      category:categories (
        id,
        name
      )
    ),
    tags:memo_tags (
      tag:tags (
        id,
        name
      )
    ),
    images:memo_images (
      image_id,
      order,
      alt_text,
      description,
      image:images (
        id,
        file_name,
        file_path,
        mime_type,
        file_size
      )
    )
  `,
    )
    .order('updated_at', { ascending: false });
  if (error) throw error;

  const formatted = data.map((memo) => ({
    ...memo,
    category: memo.category?.[0]?.category?.name ?? '',
    tags: memo.tags?.map((t) => t.tag.name) ?? [],
    images: memo.images.map((img) => ({
      file_path: img.image.file_path,
      file_name: img.image.file_name,
      image_id: img.image_id,
      order: img.order,
      alt_text: img.alt_text ?? undefined,
      description: img.description ?? undefined,
    })),
  }));
  return formatted;
};

export const addMemoService = async (props: MemoFormData & { user_id: string }) => {
  const formatted = {
    ...props,
    category: Number(props.category),
    tags: props.tags.map((t) => Number(t)),
  };
  const { error } = await supabase.functions.invoke('save-memo', { body: formatted, method: 'POST' });
  if (error) throw error;
};

export const addMemoRPC = async (props: MemoFormData & { user_id: string; image_ids?: string[] }) => {
  const formatted = {
    p_title: props.title,
    p_content: props.content,
    p_importance: props.importance,
    p_category_id: Number(props.category),
    p_tag_ids: props.tags.map((t) => Number(t)),
    p_image_ids: props.image_ids,
  };
  const { error } = await supabase.rpc('save_memo_rpc', formatted);
  if (error) throw error;
};

export const getMemoService = async (id: string) => {
  const { data, error } = await supabase
    .from('memos')
    .select(
      `    
    *,
    category:memo_categories (
      category:categories (
        id,
        name
      )
    ),
    tags:memo_tags (
      tag:tags (
        id,
        name
      )
    ),
    images:memo_images (
      image_id,
      order,
      alt_text,
      description,
      image:images (
        id,
        file_name,
        file_path,
        mime_type,
        file_size
      )
    )
  `,
    )
    .eq('id', id)
    .single();

  if (error) throw error;

  const formatted = {
    ...data,
    category: String(data.category?.[0]?.category?.id),
    tags: data.tags?.map((t) => String(t.tag.id)) ?? [],
    images: data.images.map((img) => ({
      file_path: img.image.file_path,
      file_name: img.image.file_name,
      image_id: img.image_id,
      order: img.order,
      alt_text: img.alt_text ?? "",
      description: img.description ?? "",
    })),
  };
  return formatted;
};

export const updateMemoService = async (id: string, updates: MemoFormData) => {
  const formatted = {
    id: id,
    ...updates,
    category: Number(updates.category),
    tags: updates.tags.map((t) => Number(t)),
  };
  const { error } = await supabase.functions.invoke('save-memo/drizzle', { body: formatted, method: 'PUT' });
  if (error) throw error;
};

export const updateMemoRPC = async (id: string, updates: MemoFormData & { image_ids: string[] }) => {
  console.log('updateMemoRPC', id, updates);
  const formatted = {
    p_id: id,
    p_title: updates.title,
    p_content: updates.content,
    p_importance: updates.importance,
    p_category_id: Number(updates.category),
    p_tag_ids: updates.tags.map((t) => Number(t)),
    p_image_ids: updates.image_ids,
    p_image_metadatas: updates.images,
  };
  const { error } = await supabase.rpc('update_memo_rpc', formatted);
  if (error) throw error;
};

export const deleteMemoService = async (id: string) => {
  const { error } = await supabase.from('memos').delete().eq('id', id);
  if (error) throw error;
};

export const fetchCategoryService = async () => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
};

export const getCategoryService = async (id: number) => {
  const { data, error } = await supabase.from('categories').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const addCategoryService = async (category: Category & { user_id: string }) => {
  const { data, error } = await supabase.from('categories').insert(category).single();
  if (error) throw error;
  return data;
};

export const updateCategoryService = async (data: { id: number; name: string }) => {
  const { error } = await supabase.from('categories').update({ name: data.name }).eq('id', data.id).single();
  if (error) throw error;
};

export const deleteCategoryService = async (id: number) => {
  const { error } = await supabase.from('categories').delete().eq('id', id).single();
  if (error) throw error;
};

export const fetchTagsService = async () => {
  const { data, error } = await supabase.from('tags').select('*');
  if (error) throw error;
  return data;
};

export const getTagService = async (id: number) => {
  const { data, error } = await supabase.from('tags').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const addTagService = async (tag: Tag & { user_id: string }) => {
  const { data, error } = await supabase.from('tags').insert(tag).single();
  if (error) throw error;
  return data;
};

export const updateTagService = async (data: { id: number; name: string }) => {
  const { error } = await supabase.from('tags').update({ name: data.name }).eq('id', data.id).single();
  if (error) throw error;
};

export const deleteTagService = async (id: number) => {
  const { error } = await supabase.from('tags').delete().eq('id', id).single();
  if (error) throw error;
};
