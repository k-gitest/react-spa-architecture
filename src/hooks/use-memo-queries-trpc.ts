import { useEffect } from 'react';
import { PostgrestError } from '@supabase/supabase-js';
import { TRPCClientError } from '@trpc/client';
import { useQuery, useMutation, UseMutationResult, UseMutationOptions } from '@tanstack/react-query';
import { trpc } from '@/lib/trpc';
import { queryClient } from '@/lib/queryClient';
import { toast } from '@/hooks/use-toast';
import { handleApiError, mapTRPCErrorCodeToPostgrestErrorCode } from '@/errors/api-error-handler';
import { MemoFormData } from '@/types/memo-form-data';
import { useAuthStore } from '@/hooks/use-auth-store';

/**
 * tRPCの汎用的なuseQueryカスタムフック
 * @param queryResult - useQueryの結果
 * @param options - useQueryのオプション
 * @returns UseQueryの結果
 */
interface UseQueryResultLike<TData, TError> {
  isError: boolean;
  error: TError;
  isSuccess: boolean;
  data: TData;
  isLoading: boolean;
  isFetching: boolean;
}

interface HandleTRPCApiErrorOptions<TData, TError> {
  onSuccess?: (data: TData) => void;
  onError?: (error: TError) => void;
  onSettled?: (data: TData) => void;
}

export const handleTRPCApiError = <TData, TError = unknown>(
  queryResult: UseQueryResultLike<TData, TError>,
  options?: HandleTRPCApiErrorOptions<TData, TError>,
) => {
  const { isError, error, isSuccess, data } = queryResult;
  // onSucces代替
  useEffect(() => {
    // カスタム
    if (isSuccess && options?.onSuccess && data !== undefined) {
      options.onSuccess(data);
    }
  }, [isSuccess, data, options]);

  // onError代替
  useEffect(() => {
    // カスタム
    if (options?.onError && error) {
      options.onError(error);
    }
    // 共通エラーハンドラ
    if (isError && error instanceof PostgrestError) {
      const errorMessage = handleApiError(error);
      toast({ title: `${errorMessage}` });
    } else if (isError && error instanceof TRPCClientError && error.data.name === 'TRPCError') {
      const setPostgrestError = mapTRPCErrorCodeToPostgrestErrorCode(error.data);
      const errorMessage = handleApiError(setPostgrestError);
      toast({ title: `${errorMessage}` });
    } else if (isError) {
      toast({ title: `エラーが発生しました: 不明なエラー` });
      console.error('エラー詳細:', error);
    }
  }, [isError, error]);

  //onSettled代替
  useEffect(() => {
    // カスタム
    if (options?.onSettled && data) {
      options.onSettled(data);
    }
  }, [data, options]);

  return queryResult;
};

/**
 * tRPCの汎用的なuseMutationカスタムフック
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
      if (error instanceof PostgrestError) {
        const errorMessage = handleApiError(error);
        toast({ title: `${errorMessage}` });
      } else if (error instanceof TRPCClientError && error.data.name === 'TRPCError') {
        const setPostgrestError = mapTRPCErrorCodeToPostgrestErrorCode(error.data);
        const errorMessage = handleApiError(setPostgrestError);
        toast({ title: `${errorMessage}` });
      } else if (error) {
        toast({ title: `エラーが発生しました: 不明なエラー` });
        console.error('エラー詳細:', error);
      }
    },
    ...options,
  });
};

export const useMemos = () => {
  // セッション取得
  const session = useAuthStore((state) => state.session);
  // メモ一覧の取得
  const memosKey = trpc.memo.getMemos.queryKey();

  const memosQueryOptions = trpc.memo.getMemos.queryOptions(void 0 , {enabled: !!session?.user.id});
  const memosQueryResult = useQuery(memosQueryOptions);
  const memosQuery = handleTRPCApiError(memosQueryResult, {
    /* カスタム設定の場合
    onSuccess: () => toast({ title: '成功' }),
    onError: (err) => toast({ title: `${err}` }),
    onSettled: () => toast({ title: '共通' }),
    */
  });

  // メモの詳細取得
  const useGetMemo = (id: string | null) => {
    const queryOptions = trpc.memo.getMemo.queryOptions(id as string, { enabled: !!id });
    const queryResult = useQuery(queryOptions);
    return handleTRPCApiError(queryResult);
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
