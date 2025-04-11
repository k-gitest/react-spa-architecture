import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import {
  authSignInWithPassword,
  authSignUp,
  authSignInWithOAuth,
  authSignOut,
  authUpdateUser,
  authResetPasswordForEmail,
  deleteUserAccount,
} from '@/services/authService';
import { Account, AccountUpdate } from '@/types/account-types';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { User, Session, AuthError, Provider } from '@supabase/supabase-js';
import { handleAuthError } from '@/errors/auth-error-handler';

/**
 * 汎用的なuseMutationカスタムフック
 * @param mutationFn - 実行する非同期関数
 * @param options - useMutationのオプション
 * @returns UseMutationの結果
 */
export const useApiMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn,
    // 共通オプション設定
    onSuccess: (data, variables, context) => {
      console.log('Mutation successful:', data);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Mutation error:', error);
      options?.onError?.(error, variables, context);

      // 共通エラーハンドリング
      if (error instanceof AuthError) {
        const errorMessage = handleAuthError(error);
        toast({ title: `${errorMessage}` });
      } else {
        toast({ title: `エラーが発生しました: 不明なエラー` });
        console.error('エラー詳細:', error);
      }
    },
    ...options,
  });
};

export const useAuth = () => {
  const navigate = useNavigate();

  // サインアップ用
  const signUpMutation = useApiMutation<{ user: User | null; session: Session | null }, AuthError, { data: Account }>(
    ({ data }) => authSignUp(data),
    {
      onSuccess: () => navigate('/'),
    },
  );

  // サインイン用
  const signInMutation = useApiMutation<{ user: User | null; session: Session | null }, AuthError, { data: Account }>(
    ({ data }) => authSignInWithPassword(data),
    {
      onSuccess: () => navigate('/'),
    },
  );

  // OAuth用
  const signInWithOAuthMutation = useApiMutation<
    { provider: Provider, url: string | null},
    AuthError,
    { provider: Provider, redirectTo: string }
  >((data) => authSignInWithOAuth(data));

  // サインアウト用
  const signOutMutation = useApiMutation<void, AuthError>(authSignOut, {
    onSuccess: () => navigate('/auth/login'),
  });

  // ユーザー情報アップデート用
  const updateUserMutation = useApiMutation<{ user: User }, AuthError, AccountUpdate>((data) => authUpdateUser(data), {
    onSuccess: () => toast({ title: '変更確認メールを送信しました' }),
  });

  // パスワードリセット用
  const resetPasswordForEmailMutation = useApiMutation<{} | null, AuthError, string>(
    (email) => authResetPasswordForEmail(email),
    {
      onSuccess: () => toast({ title: 'パスワードリセットの確認メールを送信しました' }),
    },
  );

  // アカウント削除用
  const deleteUserAccountMutation = useApiMutation<{ message: string }, AuthError, string>(
    (token) => deleteUserAccount(token),
    {
      onSuccess: () => toast({ title: 'アカウントを削除しました' }),
    },
  );

  // 各メソッド実装
  const signUp = async (data: Account) => {
    await signUpMutation.mutateAsync({ data });
  };

  const signIn = async (data: Account) => {
    await signInMutation.mutateAsync({ data });
  };

  const signInWithOAuth = async (data: { provider: Provider, redirectTo: string }) => {
    await signInWithOAuthMutation.mutateAsync(data);
  };

  const signOut = async () => {
    await signOutMutation.mutateAsync();
  };

  const updateUser = async (data: AccountUpdate) => {
    await updateUserMutation.mutateAsync(data);
  };

  const resetPassword = async (email: string) => {
    await resetPasswordForEmailMutation.mutateAsync(email);
  };

  const deleteAccount = async (token: string) => {
    await deleteUserAccountMutation.mutateAsync(token);
  };

  return {
    signUp,
    signUpMutation,
    signIn,
    signInMutation,
    signInWithOAuth,
    signOut,
    signOutMutation,
    updateUser,
    resetPassword,
    deleteAccount,
  };
};
