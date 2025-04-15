import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { updateAccountService, resetPasswordForEmailAccountService, deleteAccountService } from '@/services/accountService';
import { AccountUpdate } from '@/types/account-types';
import { toast } from '@/hooks/use-toast';
import { User, AuthError } from '@supabase/supabase-js';
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

export const useAccount = () => {
  // ユーザー情報アップデート用
  const updateUserMutation = useApiMutation<{ user: User }, AuthError, AccountUpdate>((data) => updateAccountService(data), {
    onSuccess: () => toast({ title: '変更確認メールを送信しました' }),
  });

  // パスワードリセット用
  const resetPasswordForEmailMutation = useApiMutation<{} | null, AuthError, string>(
    (email) => resetPasswordForEmailAccountService(email),
    {
      onSuccess: () => toast({ title: 'パスワードリセットの確認メールを送信しました' }),
    },
  );

  // アカウント削除用
  const deleteUserAccountMutation = useApiMutation<{ message: string }, AuthError, string>(
    (token) => deleteAccountService(token),
    {
      onSuccess: () => toast({ title: 'アカウントを削除しました' }),
    },
  );

  // 各メソッド実装
  const updateUser = async (data: AccountUpdate) => {
    await updateUserMutation.mutateAsync(data);
  };

  const resetPassword = async (data: AccountUpdate) => {
    if (data.email) await resetPasswordForEmailMutation.mutateAsync(data.email);
  };

  const deleteAccount = async (token: string) => {
    await deleteUserAccountMutation.mutateAsync(token);
  };

  return {
    updateUser,
    resetPassword,
    deleteAccount,
  };
};
