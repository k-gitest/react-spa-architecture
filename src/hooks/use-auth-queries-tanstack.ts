import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import {
  signInWithPasswordAuthService,
  signUpAuthService,
  signInWithOAuthService,
  signOutAuthService,
} from '@/services/authService';
import { Account } from '@/types/account-types';
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
    ({ data }) => signUpAuthService(data),
    {
      onSuccess: () => navigate('/'),
    },
  );

  // サインイン用
  const signInMutation = useApiMutation<{ user: User | null; session: Session | null }, AuthError, { data: Account }>(
    ({ data }) => signInWithPasswordAuthService(data),
    {
      onSuccess: () => navigate('/'),
    },
  );

  // OAuth用
  const signInWithOAuthMutation = useApiMutation<
    { provider: Provider; url: string | null },
    AuthError,
    { provider: Provider; redirectTo: string }
  >((data) => signInWithOAuthService(data));

  // サインアウト用
  const signOutMutation = useApiMutation<void, AuthError>(signOutAuthService, {
    onSuccess: () => navigate('/auth/login'),
  });

  // 各メソッド実装
  const signUp = async (data: Account) => {
    await signUpMutation.mutateAsync({ data });
  };

  const signIn = async (data: Account) => {
    await signInMutation.mutateAsync({ data });
  };

  const signInWithOAuth = async (data: { provider: Provider; redirectTo: string }) => {
    await signInWithOAuthMutation.mutateAsync(data);
  };

  const signOut = async () => {
    await signOutMutation.mutateAsync();
  };

  return {
    signUp,
    signUpMutation,
    signIn,
    signInMutation,
    signInWithOAuth,
    signOut,
    signOutMutation,
  };
};
