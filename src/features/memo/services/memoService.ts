import { supabase } from '@/lib/supabase';
import { MemoFormData, Category, Tag } from '@/features/memo/types/memo-form-data';

export const fetchMemosService = async () => {
  const { data, error } = await supabase.from('memos').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const addMemoService = async (props: MemoFormData & { user_id: string }) => {
  const { error } = await supabase.from('memos').insert(props).single();
  if (error) throw error;
};

export const getMemoService = async (id: string) => {
  const { data, error } = await supabase.from('memos').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const updateMemoService = async (id: string, updates: MemoFormData) => {
  const { error } = await supabase.from('memos').update(updates).eq('id', id);
  if (error) throw error;
};

export const deleteMemoService = async (id: string) => {
  const { error } = await supabase.from('memos').delete().eq('id', id);
  if (error) throw error;
};

export const getCategoryService = async () => {
  const { data, error } = await supabase.from('categories').select('*');
  if (error) throw error;
  return data;
};

export const addCategoryService = async (category: Category) => {
  const { data, error } = await supabase.from('categories').insert(category).single();
  if (error) throw error;
  return data;
};
export const fetchTagsService = async () => {
  const { data, error } = await supabase.from('tags').select('*');
  if (error) throw error;
  return data;
};
export const addTagService = async (tag: Tag) => {
  const { data, error } = await supabase.from('tags').insert(tag).single();
  if (error) throw error;
  return data;
};
