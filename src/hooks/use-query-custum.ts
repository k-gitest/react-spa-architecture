import { useEffect } from 'react';
import {
  useQuery,
  UseQueryResult,
  UseQueryOptions,
  useMutation,
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

/**
 * 汎用的なuseQueryカスタムフック
 * @param queryKey - クエリのキー
 * @param queryFn - データを取得する非同期関数
 * @param options - useQueryのオプション
 * @returns UseQueryの結果
 */
export const useApiQuery = <TData = unknown, TError = unknown, TQueryKey extends readonly unknown[] = unknown[]>(
  queryKey: TQueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, TError> => {
  const queryResult = useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    // デフォルトオプション設定
    staleTime: 5 * 60 * 1000,
    retry: 1,
    ...options,
  });

  // onSuccess, onError, onSettledがv5で使えない為、useEffectで代用している
  const { isError, error } = queryResult;
  useEffect(() => {
    if (isError && error instanceof Error) {
      toast({ title: `エラー: ${error.message || '不明なエラー'}` });
    }
    if (isError) {
      toast({ title: `エラーが発生しました: 不明なエラー` });
      console.error('エラー詳細:', error);
    }
  }, [isError, error]);

  return queryResult;
};

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
    // デフォルトオプション設定
    onSuccess: (data, variables, context) => {
      // 成功時の共通処理をここに書く
      console.log('Mutation successful:', data);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      // エラー時の共通処理をここに書く
      console.error('Mutation error:', error);
      options?.onError?.(error, variables, context);

      if (error instanceof Error) {
        toast({ title: `エラー: ${error.message || '不明なエラー'}` });
      } else {
        toast({ title: `エラーが発生しました: 不明なエラー` });
        console.error('エラー詳細:', error);
      }
    },
    ...options,
  });
};
