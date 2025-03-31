// src/hooks/useMemos.ts
import { trpc } from '@/lib/trpc';
import { MemoFormData } from '@/types/memo-form-data';

export function useMemos() {
  // メモ一覧の取得
  const memosQuery = trpc.getMemos.useQuery();

  // メモの追加
  const addMemoMutation = trpc.addMemo.useMutation({
    onSuccess: () => {
      // キャッシュの更新
      memosQuery.refetch();
    }
  });

  // メモの詳細取得
  const getMemo = (id: string | null) => {
    return trpc.getMemo.useQuery(id as string, { enabled: !!id });
  };

  // メモの更新
  const updateMemoMutation = trpc.updateMemo.useMutation({
    onSuccess: () => {
      memosQuery.refetch();
    }
  });

  // メモの削除
  const deleteMemoMutation = trpc.deleteMemo.useMutation({
    onSuccess: () => {
      memosQuery.refetch();
    }
  });

  // 各メソッドの実装
  const addMemo = async (data: MemoFormData, userId: string) => {
    await addMemoMutation.mutateAsync({
      ...data,
      user_id: userId
    });
  };

  const updateMemo = async (id: string, data: MemoFormData) => {
    await updateMemoMutation.mutateAsync({
      id,
      data
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
    getMemo,
    updateMemo,
    deleteMemo
  };
}