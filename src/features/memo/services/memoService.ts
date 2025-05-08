import { supabase } from '@/lib/supabase';
import { MemoFormData, Category, Tag } from '@/features/memo/types/memo-form-data';

export const fetchMemosService = async () => {
  //const { data, error } = await supabase.from('memos').select('*').order('created_at', { ascending: false });
  const { data, error } = await supabase.from('memos').select(`
    id,
    title,
    content,
    importance,
    user_id,
    created_at,
    updated_at,
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
    )
  `);
  if (error) throw error;

  const formatted = data.map((memo) => ({
    id: memo.id,
    title: memo.title,
    content: memo.content,
    importance: memo.importance,
    created_at: memo.created_at,
    updated_at: memo.updated_at,
    user_id: memo.user_id,
    category: memo.category?.[0]?.category?.name ?? '',
    tags: memo.tags?.map((t) => t.tag.name) ?? [],
  }));
  return formatted;
};

export const addMemoService = async (props: MemoFormData & { user_id: string }) => {
  //const { error } = await supabase.from('memos').insert(props).single();
  const formatted = {
    ...props,
    category: Number(props.category),
    tags: props.tags.map((t) => Number(t)),
  };
  const { error } = await supabase.functions.invoke('save-memo', { body: formatted, method: 'POST' });
  if (error) throw error;
};

export const getMemoService = async (id: string) => {
  //const { data: hoge } = await supabase.from('memos').select('*').eq('id', id).single();
  const { data, error } = await supabase
    .from('memos')
    .select(
      `
    id,
    title,
    content,
    importance,
    user_id,
    created_at,
    updated_at,
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
    )
  `,
    )
    .eq('id', id)
    .single();

  if (error) throw error;

  const formatted = {
    id: data.id,
    title: data.title,
    content: data.content,
    importance: data.importance,
    created_at: data.created_at,
    updated_at: data.updated_at,
    user_id: data.user_id,
    category: String(data.category?.[0]?.category?.id) ?? '',
    tags: data.tags?.map((t) => String(t.tag.id)) ?? [],
  };
  return formatted;
};

export const updateMemoService = async (id: string, updates: MemoFormData) => {
  //const { error } = await supabase.from('memos').update(updates).eq('id', id);
  const formatted = {
    id: id,
    ...updates,
    category: Number(updates.category),
    tags: updates.tags.map((t) => Number(t)),
  };
  const { error } = await supabase.functions.invoke('save-memo/drizzle', { body: formatted, method: 'PUT' });
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

export const addCategoryService = async (category: Category & { user_id: string }) => {
  const { data, error } = await supabase.from('categories').insert(category).single();
  if (error) throw error;
  return data;
};
export const fetchTagsService = async () => {
  const { data, error } = await supabase.from('tags').select('*');
  if (error) throw error;
  return data;
};
export const addTagService = async (tag: Tag & { user_id: string }) => {
  const { data, error } = await supabase.from('tags').insert(tag).single();
  if (error) throw error;
  return data;
};
