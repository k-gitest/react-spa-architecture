import { trpc } from '@/lib/trpc';
import { MemoFormData } from '@/types/memo-form-data';
import { queryClient } from '@/lib/queryClient';
import { useQuery, useMutation } from '@tanstack/react-query';
import { toast } from '@/hooks/use-toast';

export function useMemos() {
  // メモ一覧の取得
  const memosOptions = trpc.getMemos.queryOptions();
  const memosQuery = useQuery(memosOptions);

  // キャッシュからキーを取得
  const memosKey = trpc.getMemos.queryKey();

  // メモの追加
  const addMemoMutation = useMutation(
    trpc.addMemo.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: memosKey });
      },
      onError: (err) => toast({ title: err.message }),
    }),
  );

  // メモの詳細取得
  const useGetMemo = (id: string | null) => {
    const queryOptions = trpc.getMemo.queryOptions(id as string, { enabled: !!id })
    return useQuery(queryOptions);
  };

  // メモの更新
  const updateMemoMutation = useMutation(
    trpc.updateMemo.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: memosKey });
      },
      onError: (err) => toast({ title: err.message }),
    }),
  );

  // メモの削除
  const deleteMemoMutation = useMutation(
    trpc.deleteMemo.mutationOptions({
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: memosKey });
      },
      onError: (err) => toast({ title: err.message }),
    }),
  );

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
}
