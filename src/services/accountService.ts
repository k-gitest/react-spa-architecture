import { supabase } from '@/lib/supabase';
import { AccountUpdate } from '@/types/account-types';

export const updateAccountService = async (updateData: AccountUpdate) => {
  const { data, error } = await supabase.auth.updateUser(updateData, {
    emailRedirectTo: `${window.location.origin}/pass`,
  });
  if (error) throw error;
  return data;
};

export const resetPasswordForEmailAccountService = async (updateData: AccountUpdate) => {
  if (!updateData.email) throw new Error('emailが入力されていません');
  const { data, error } = await supabase.auth.resetPasswordForEmail(updateData.email, {
    redirectTo: `${window.location.origin}/pass`,
  });
  if (error) throw error;
  return data;
};

export const deleteAccountService = async (userId: string): Promise<{ message: string }> => {
  const { data, error } = await supabase.functions.invoke('delete-user-account', {
    body: { user_id: userId },
  });
  if (error) throw error;
  return data as { message: string };
};
