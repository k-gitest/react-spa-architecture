import { trpc } from '@/lib/trpc';
import { queryClient } from '@/lib/queryClient';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';

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
