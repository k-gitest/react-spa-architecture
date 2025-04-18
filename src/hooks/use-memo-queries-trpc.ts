import { useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc';
import { queryClient } from '@/lib/queryClient';
import { MemoFormData } from '@/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import { errorHandler } from '@/errors/error-handler';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';

/**
 * tRPCの汎用的なuseMutationカスタムフック
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
      errorHandler(error);
    },
    ...options,
  });
};

export const useMemos = () => {
  // セッション取得
  const session = useSessionStore((state) => state.session);
  // メモ一覧の取得
  const memosKey = trpc.memo.getMemos.queryKey();

  const memosQueryOptions = trpc.memo.getMemos.queryOptions(void 0, { enabled: !!session?.user.id });
  const memosQuery = useApiQuery(memosQueryOptions)

  // メモの詳細取得
  const useGetMemo = (id: string | null) => {
    const queryOptions = trpc.memo.getMemo.queryOptions(id as string, { enabled: !!id });
    return useApiQuery(queryOptions);
  };

  // メモの追加
  const addMemoMutationOptions = trpc.memo.addMemo.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memosKey });
    },
  });
  const addMemoMutation = useApiMutation(addMemoMutationOptions);

  // メモの更新
  const updateMemoMutationOptions = trpc.memo.updateMemo.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memosKey });
    },
  });
  const updateMemoMutation = useApiMutation(updateMemoMutationOptions);

  // メモの削除
  const deleteMemoMutationOptions = trpc.memo.deleteMemo.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: memosKey });
    },
  });
  const deleteMemoMutation = useApiMutation(deleteMemoMutationOptions);

  // 各メソッドの実装
  const addMemo = async (data: MemoFormData, userId: string) => {
    await addMemoMutation.mutateAsync({
      ...data,
      user_id: userId,
    });
  };

  const updateMemo = async (id: string, data: MemoFormData) => {
    await updateMemoMutation.mutateAsync({
      id,
      data,
    });
  };

  const deleteMemo = async (id: string) => {
    await deleteMemoMutation.mutateAsync(id);
  };

  return {
    memos: memosQuery.data,
    isMemosLoading: memosQuery.isLoading,
    memosError: memosQuery.error,
    addMemo,
    useGetMemo,
    updateMemo,
    deleteMemo,
  };
};
