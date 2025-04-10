import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { Account, AccountUpdate } from '@/types/account-types';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';
import { User, Session, AuthError, AuthApiError, Provider, PostgrestError } from '@supabase/supabase-js';
import { handleAuthError } from '@/errors/auth-error-handler';
import { trpc } from '@/lib/trpc';
import { TRPCClientError } from '@trpc/client';
import {
  handleApiError,
  mapTRPCErrorCodeToPostgrestErrorCode,
  createPostgrestErrorFromData,
} from '@/errors/api-error-handler';
import { createAuthApiErrorFromData } from '@/errors/auth-error-handler';
import { handleAuthSuccess, removeLocalStorageAccessToken, setSupabaseSession } from '@/lib/auth';
import { useAuthStore } from '@/hooks/use-auth-store';
import { supabase } from '@/lib/supabase';

/**
 * 汎用的なuseMutationカスタムフック
 * @param mutationFn - 実行する非同期関数
 * @param options - useMutationのオプション
 * @returns UseMutationの結果
 */
export const useApiMutation = <TData = unknown, TError = unknown, TVariables = void, TContext = unknown>(
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
      if (error instanceof TRPCClientError && error.data.name === 'TRPCError') {
        const setPostgrestError = mapTRPCErrorCodeToPostgrestErrorCode(error.data);
        const errorMessage = handleApiError(setPostgrestError);
        toast({ title: `${errorMessage}` });

        if (error.data.authError) {
          const authApiError = createAuthApiErrorFromData(error.data.authError);
          const errorMessage = handleAuthError(authApiError);
          toast({ title: `${errorMessage}` });
        }
        if (error.data.postgrestError) {
          const postgrestError = createPostgrestErrorFromData(error.data.postgrestError);
          const errorMessage = handleApiError(postgrestError);
          toast({ title: `${errorMessage}` });
        }
      } else if (error) {
        toast({ title: `エラーが発生しました: 不明なエラー` });
        console.error('エラー詳細:', error);
      }
    },
    ...options,
  });
};

export const useAuth = () => {
  const setGlobalSession = useAuthStore((state) => state.setSession);
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
