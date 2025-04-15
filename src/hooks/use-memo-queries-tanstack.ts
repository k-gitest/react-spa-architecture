import {
  useQuery,
  useMutation,
  useQueryClient,
  UseQueryResult,
  UseQueryOptions,
  UseMutationResult,
  UseMutationOptions,
} from '@tanstack/react-query';
import { useEffect, useCallback } from 'react';
import {
  fetchMemosService,
  addMemoService,
  getMemoService,
  updateMemoService,
  deleteMemoService,
} from '@/services/memoService';
import { Memo, MemoFormData } from '@/types/memo-form-data';
import { toast } from '@/hooks/use-toast';
import { handleApiError } from '@/errors/api-error-handler';
import { PostgrestError } from '@supabase/supabase-js';
import { useAuthStore } from '@/hooks/use-auth-store';

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
  onSuccess?: (data: TData) => void, //optionsから除外し引数で受け取る
  onError?: (data: TError) => void, //optionsから除外し引数で受け取る
  onSettled?: (data: TData) => void, //optionsから除外し引数で受け取る
  options?: Omit<UseQueryOptions<TData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>,
): UseQueryResult<TData, TError> => {
  const queryResult = useQuery<TData, TError, TData, TQueryKey>({
    queryKey,
    queryFn,
    // 共通オプション設定
    staleTime: 5 * 60 * 1000,
    retry: 1,
    ...options,
  });

  // onSuccess, onError, onSettledがv5で使えない為、useEffectで代用している
  const { isError, error, isSuccess, data } = queryResult;

  // onSucces代替
  useEffect(() => {
    // カスタム
    if (isSuccess && onSuccess && data !== undefined) {
      onSuccess(data);
    }
  }, [isSuccess, data, options]);

  // onError代替
  useEffect(() => {
    // カスタム
    if (onError && error) {
      onError(error);
    }
    // 共通エラーハンドラ
    if (isError && error instanceof PostgrestError) {
      const errorMessage = handleApiError(error);
      toast({ title: `${errorMessage}` });
    } else if (isError) {
      toast({ title: `エラーが発生しました: 不明なエラー` });
      console.error('エラー詳細:', error);
    }
  }, [isError, error]);

  //onSettled代替
  useEffect(() => {
    // カスタム
    if (onSettled && data) {
      onSettled(data);
    }
  }, [data]);

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
    // 共通オプション設定
    onSuccess: (data, variables, context) => {
      console.log('Mutation successful:', data);
      options?.onSuccess?.(data, variables, context);
    },
    onError: (error, variables, context) => {
      console.error('Mutation error:', error);
      options?.onError?.(error, variables, context);

      // 共通エラーハンドリング
      if (error instanceof PostgrestError) {
        const errorMessage = handleApiError(error);
        toast({ title: `${errorMessage}` });
      } else {
        toast({ title: `エラーが発生しました: 不明なエラー` });
        console.error('エラー詳細:', error);
      }
    },
    ...options,
  });
};

export const useMemos = () => {
  const session = useAuthStore((state) => state.session);
  const queryClient = useQueryClient();

  // メモ一覧取得用
  const memosQuery = useApiQuery<Memo[], Error>(['memos'], fetchMemosService, undefined, undefined, undefined, {
    enabled: !!session?.user.id,
  });

  // 個別メモ取得用
  const useGetMemo = useCallback((id: string | null) => {
    return useApiQuery<Memo | undefined, Error>(
      ['memo', id],
      () => (id ? getMemoService(id) : Promise.resolve(undefined)),
      undefined,
      undefined,
      undefined,
      {
        enabled: !!id,
      },
    );
  }, []);

  // メモ追加用
  const addMemoMutation = useApiMutation<void, Error, MemoFormData & { user_id: string }>(
    (data) => addMemoService(data),
    {
      onSuccess: () => {
        toast({ title: `メモを追加しました` });
        queryClient.invalidateQueries({ queryKey: ['memos'] });
      },
    },
  );

  // メモ更新用
  const updateMemoMutation = useApiMutation<void, Error, { id: string; updates: MemoFormData }>(
    ({ id, updates }) => updateMemoService(id, updates),
    {
      onSuccess: () => {
        toast({ title: `メモを更新しました` });
        queryClient.invalidateQueries({ queryKey: ['memos'] });
      },
    },
  );

  // メモ削除用
  const deleteMemoMutation = useApiMutation<void, Error, string>((id) => deleteMemoService(id), {
    onSuccess: () => {
      toast({ title: `メモを削除しました` });
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });

  // 各メソッドの実装
  const addMemo = useCallback(
    async (data: MemoFormData & { user_id: string }) => {
      await addMemoMutation.mutateAsync(data);
    },
    [addMemoMutation],
  );

  const updateMemo = useCallback(
    async (id: string, updates: MemoFormData) => {
      await updateMemoMutation.mutateAsync({ id, updates });
    },
    [updateMemoMutation],
  );

  const deleteMemo = useCallback(
    async (id: string) => {
      await deleteMemoMutation.mutateAsync(id);
    },
    [deleteMemoMutation],
  );

  return {
    memos: memosQuery.data,
    isMemosLoading: memosQuery.isLoading,
    isMemosError: memosQuery.isError,
    memosError: memosQuery.error,
    useGetMemo,
    addMemo,
    updateMemo,
    deleteMemo,
  };
};
