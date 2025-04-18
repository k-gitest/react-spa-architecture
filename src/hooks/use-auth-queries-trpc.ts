import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { Account, AccountUpdate } from '@/types/account-types';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { Provider } from '@supabase/supabase-js';
import { trpc } from '@/lib/trpc';
import { handleAuthSuccess, removeLocalStorageAccessToken } from '@/lib/auth';
import { useSessionStore } from '@/hooks/use-session-store';
import { errorHandler } from '@/errors/error-handler';
import { useApiMutation } from '@/hooks/use-tanstack-query';

/**
 * 汎用的なuseMutationカスタムフック
 * @param mutationFn - 実行する非同期関数
 * @param options - useMutationのオプション
 * @returns UseMutationの結果
 */
export const useApiMutationDefault = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
  options?: Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation<TData, TError, TVariables, TContext>({
    // 共通オプション設定
    onSuccess: (data, variables, context) => {
      console.log('Mutation successful:', data);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Mutation error:', error);
      options?.onError?.(error, variables, context);

      // 共通エラーハンドリング
      errorHandler(error)
    },
    ...options,
  });
};

export const useAuth = () => {
  const setGlobalSession = useSessionStore((state) => state.setSession);
  const navigate = useNavigate();

  // サインアップ用
  const signUpMutationOptions = trpc.auth.signUp.mutationOptions({
    onSuccess: (data) => {
      if (data.session) handleAuthSuccess(data.session, navigate, '/');
    },
  });
  const signUpMutation = useApiMutation(signUpMutationOptions);

  // サインイン用
  const signInMutationOptions = trpc.auth.signInWithPassword.mutationOptions({
    onSuccess: (data) => {
      if (data.session) handleAuthSuccess(data.session, navigate, '/');
    },
  });
  const signInMutation = useApiMutation(signInMutationOptions);

  // OAuth用
  const signInWithOAuthMutationOptions = trpc.auth.signInWithOAuth.mutationOptions({
    onSuccess: (data) => {
      if (data.url) window.location.href = data.url;
    },
  });
  const signInWithOAuthMutation = useApiMutation(signInWithOAuthMutationOptions);

  // サインアウト用
  const signOutMutationOptions = trpc.auth.signOut.mutationOptions({
    onSuccess: () => {
      removeLocalStorageAccessToken();
      setGlobalSession(null);
      navigate('/auth/login');
    },
  });
  const signOutMutation = useApiMutation(signOutMutationOptions);

  // ユーザー情報アップデート用
  const updateUserMutationOptions = trpc.auth.updateUser.mutationOptions({
    onSuccess: () => toast({ title: '変更確認メールを送信しました' }),
  });
  const updateUserMutation = useApiMutation(updateUserMutationOptions);

  // パスワードリセット用
  const resetPasswordForEmailMutationOptions = trpc.auth.resetPasswordForEmail.mutationOptions({
    onSuccess: () => toast({ title: 'パスワードリセットの確認メールを送信しました' }),
  });
  const resetPasswordForEmailMutation = useApiMutation(resetPasswordForEmailMutationOptions);

  // アカウント削除用
  const deleteUserAccountMutationOptions = trpc.auth.deleteUserAccont.mutationOptions({
    onSuccess: () => toast({ title: 'アカウントを削除しました' }),
  });
  const deleteUserAccountMutation = useApiMutation(deleteUserAccountMutationOptions);

  // 各メソッド実装
  const signUp = async (data: Account) => {
    await signUpMutation.mutateAsync(data);
  };

  const signIn = async (data: Account) => {
    await signInMutation.mutateAsync(data);
  };

  const signInWithOAuth = async (data: { provider: Provider; redirectTo: string }) => {
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
