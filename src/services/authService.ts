import { supabase } from '@/lib/supabase';
import { Account } from '@/types/account-types';
import { EmailOtpType, Provider } from '@supabase/supabase-js';

interface UpdateData {
  email?: string;
  password?: string;
}

export const authSignInWithPassword = async (signInData: Account) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: signInData.email,
    password: signInData.password,
  });
  if (error) throw error;
  return data;
};

export const authSignUp = async (signUpData: Account) => {
  const { data, error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
  });
  if (error) throw error;
  return data;
};

export const authSignInWithOAuth = async (items: { provider: Provider, redirectTo: string}) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: items.provider,
    options: {
      redirectTo: items.redirectTo,
    },
  });
  if (error) throw error;
  return data;
};

export const authSignOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return;
};

export const authUpdateUser = async (updateData: UpdateData) => {
  const { data, error } = await supabase.auth.updateUser(updateData);
  if (error) throw error;
  return data;
};

export const authResetPasswordForEmail = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/pass`,
  });
  if (error) throw error;
  return data;
};

export const authEmailVerifyOpt = async (token_hash: string, type: EmailOtpType) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token_hash,
    type: type,
  });
  if (error) throw new Error('メール解析エラー：', error);
  return data;
};

export const deleteUserAccount = async (userId: string): Promise<{ message: string }> => {
  const { data, error } = await supabase.functions.invoke('delete-user-account', {
    body: { user_id: userId },
  });
  if (error) throw error;
  return data as { message: string };
};
