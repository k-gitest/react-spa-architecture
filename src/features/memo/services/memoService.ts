import { supabase } from '@/lib/supabase';
import { MemoFormData } from '@/features/memo/types/memo-form-data';

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
