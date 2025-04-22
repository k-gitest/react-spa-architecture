import { supabase } from '@/lib/supabase';
import { Account } from '@/features/account/types/account-types';
import { EmailOtpType, Provider } from '@supabase/supabase-js';

export const signInWithPasswordAuthService = async (signInData: Account) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: signInData.email,
    password: signInData.password,
  });
  if (error) throw error;
  return data;
};

export const signUpAuthService = async (signUpData: Account) => {
  const { data, error } = await supabase.auth.signUp({
    email: signUpData.email,
    password: signUpData.password,
  });
  if (error) throw error;
  return data;
};

export const signInWithOAuthService = async (items: { provider: Provider; redirectTo: string }) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: items.provider,
    options: {
      redirectTo: items.redirectTo,
    },
  });
  if (error) throw error;
  return data;
};

export const signOutAuthService = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
  return;
};

export const emailVerifyOptAuthService = async (token_hash: string, type: EmailOtpType) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token_hash,
    type: type,
  });
  if (error) throw new Error('メール解析エラー：', error);
  return data;
};

