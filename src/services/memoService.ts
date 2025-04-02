import { supabase } from '@/lib/supabase';
import { MemoFormData } from '@/types/memo-form-data';

export const fetchMemos = async () => {
  const { data, error } = await supabase.from('memos').select('*').order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const addMemo = async (props: MemoFormData & { user_id: string }) => {
  const { error } = await supabase.from('memos').insert(props).single();
  if (error) throw error;
};

export const showMemo = async (id: string) => {
  const { data, error } = await supabase.from('memos').select('*').eq('id', id).single();
  if (error) throw error;
  return data;
};

export const updateMemo = async (id: string, updates: MemoFormData) => {
  const { error } = await supabase.from('memos').update(updates).eq('id', id);
  if (error) throw error;
};

export const deleteMemo = async (id: string) => {
  const { error } = await supabase.from('memos').delete().eq('id', id);
  if (error) throw error;
};
