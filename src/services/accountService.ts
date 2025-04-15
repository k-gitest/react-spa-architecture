import { supabase } from '@/lib/supabase';

interface UpdateData {
  email?: string;
  password?: string;
}

export const updateAccountService = async (updateData: UpdateData) => {
  const { data, error } = await supabase.auth.updateUser(updateData, {
    emailRedirectTo: `${window.location.origin}/pass`,
  });
  if (error) throw error;
  return data;
};

export const resetPasswordForEmailAccountService = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
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
