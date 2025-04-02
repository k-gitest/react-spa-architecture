import { supabase } from '@/lib/supabase';
import { Account } from '@/types/account-types';
import { EmailOtpType } from '@supabase/supabase-js';

interface UpdateData {
  email?: string;
  password?: string;
}

export const authSignInWithPassword = async (signInData: Account) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: signInData.email,
      password: signInData.password,
    });
    if (error) throw error;
    console.log('サインイン認証成功：', data);
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const authSignUp = async (signUpData: Account) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: signUpData.email,
      password: signUpData.password,
    });
    if (error) throw error;
    console.log('サインアップ認証成功：', data);
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const authSignInWithOAuth = async () => {
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `${window.location.origin}`,
      },
    });
    if (error) throw error;
    console.log('github認証成功:', data);
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const authSignOut = async () => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('ログアウトエラー:', error);
      throw error;
    }
    console.log('ログアウトしました');
    return true;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const authUpdateUser = async (updateData: UpdateData) => {
  try {
    const { data, error } = await supabase.auth.updateUser(updateData);
    if (error) {
      throw new Error('ユーザー情報更新エラー:', error);
    }
    console.log('ユーザー情報更新の確認メールを送信しました', data);
    return true;
  } catch (err) {
    console.error('ユーザー情報更新エラー:', err);
    throw err;
  }
};

export const authResetPasswordForEmail = async (email: string) => {
  try {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/pass`,
    });
    if (error) {
      throw error;
    }
    console.log('パスワードリセットの確認メールを送信しました', data);
    return true;
  } catch (err) {
    console.error('パスワードリセットの確認メール送信エラー', err);
    throw err;
  }
};

export const authEmailVerifyOpt = async (token_hash: string, type: EmailOtpType) => {
  const { data, error } = await supabase.auth.verifyOtp({
    token_hash: token_hash,
    type: type,
  });
  if (error) {
    console.error('メール解析エラー：', error);
    throw new Error('メール解析エラー：', error);
  }
  console.log('メール解析成功：', data);
  return data;
};

export const deleteUserAccount = async (userId: string) => {
  try {
    const { data, error } = await supabase.functions.invoke('delete-user-account', {
      body: { user_id: userId },
    });
    if (error) {
      throw error;
    }
    console.log('関数呼び出し成功:', data);
    return true;
  } catch (err) {
    console.error('関数呼び出しエラー:', err);
    throw err;
  }
};
