import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
  fetchMemosService,
  addMemoService,
  getMemoService,
  updateMemoService,
  deleteMemoService,
} from '@/services/memoService';
import { Memo, MemoFormData } from '@/types/memo-form-data';
import { toast } from '@/hooks/use-toast';
import { useSessionStore } from '@/hooks/use-session-store';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';

export const useMemos = () => {
  const session = useSessionStore((state) => state.session);
  const queryClient = useQueryClient();

  // メモ一覧取得用
  const memosQuery = useApiQuery<Memo[], Error>({
    queryKey: ['memos'],
    queryFn: fetchMemosService,
    enabled: !!session?.user.id,
  });

  // 個別メモ取得用
  const useGetMemo = (id: string | null) => {
    return useApiQuery<Memo | undefined, Error>({
      queryKey: ['memo', id],
      queryFn: () => (id ? getMemoService(id) : Promise.resolve(undefined)),
      enabled: !!id,
    });
  };

  // メモ追加用
  const addMemoMutation = useApiMutation<void, Error, MemoFormData & { user_id: string }>({
    mutationFn: (data) => addMemoService(data),
    onSuccess: () => {
      toast({ title: `メモを追加しました` });
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });

  // メモ更新用
  const updateMemoMutation = useApiMutation<void, Error, { id: string; updates: MemoFormData }>({
    mutationFn: ({ id, updates }) => updateMemoService(id, updates),
    onSuccess: () => {
      toast({ title: `メモを更新しました` });
      queryClient.invalidateQueries({ queryKey: ['memos'] });
    },
  });

  // メモ削除用
  const deleteMemoMutation = useApiMutation<void, Error, string>({
    mutationFn: (id) => deleteMemoService(id),
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
