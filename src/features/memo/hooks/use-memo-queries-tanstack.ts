import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import {
  fetchMemosService,
  addMemoService,
  getMemoService,
  updateMemoService,
  deleteMemoService,
  addCategoryService,
  fetchCategoryService,
  getCategoryService,
  updateCategoryService,
  deleteCategoryService,
  addTagService,
  fetchTagsService,
  getTagService,
  updateTagService,
  deleteTagService,
} from '@/features/memo/services/memoService';
import { Memo, MemoFormData, Category, Tag } from '@/features/memo/types/memo-form-data';
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
  const updateMemoMutation = useApiMutation<
    void,
    Error,
    { id: string; updates: MemoFormData }
  >({
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

  // カテゴリ一覧取得用
  const fetchCategory = useApiQuery({
    queryKey: ['category'],
    queryFn: () => fetchCategoryService(),
    enabled: !!session?.user.id,
  });

  // カテゴリ取得用
  const useGetCategory = (id: number | null) => {
    return useApiQuery({
      queryKey: ['category', id],
      queryFn: () => (id ? getCategoryService(id) : Promise.resolve(undefined)),
      enabled: !!id,
    });
  };

  // カテゴリ追加用
  const addCategoryMutation = useApiMutation<void, Error, Category & { user_id: string }>({
    mutationFn: (data) => addCategoryService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
  });

  // カテゴリ更新用
  const updateCategoryMutation = useApiMutation<void, Error, Category & { id: number }>({
    mutationFn: (data) => updateCategoryService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
  });

  // カテゴリ削除用
  const deleteCategoryMutation = useApiMutation<void, Error, number>({
    mutationFn: (data) => deleteCategoryService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['category'] });
    },
  });

  // タグ取得用
  const fetchTags = useApiQuery({
    queryKey: ['tag'],
    queryFn: () => fetchTagsService(),
    enabled: !!session?.user.id,
  });

  // タグ取得用
  const useGetTag = (id: number | null) => {
    return useApiQuery({
      queryKey: ['tag', id],
      queryFn: () => (id ? getTagService(id) : Promise.resolve(undefined)),
      enabled: !!id,
    });
  };

  // タグ追加用
  const addTagMutation = useApiMutation<void, Error, Tag & { user_id: string }>({
    mutationFn: (data) => addTagService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tag'] });
    },
  });

  // タグ更新用
  const updateTagMutation = useApiMutation<void, Error, Tag & { id: number }>({
    mutationFn: (data) => updateTagService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tag'] });
    },
  });

  const deleteTagMutation = useApiMutation<void, Error, number>({
    mutationFn: (data) => deleteTagService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tag'] });
    },
  });

  // 各メソッドの実装
  const addMemo = useCallback(
    async (data: MemoFormData & { user_id: string; }) => {
      await addMemoMutation.mutateAsync(data);
    },
    [addMemoMutation],
  );

  const updateMemo = useCallback(
    async (id: string, updates: MemoFormData ) => {
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

  const addCategory = useCallback(
    async (data: Category & { user_id: string }) => {
      await addCategoryMutation.mutateAsync(data);
    },
    [addCategoryMutation],
  );

  const updateCategory = useCallback(
    async (data: Category & { id: number }) => {
      await updateCategoryMutation.mutateAsync(data);
    },
    [updateCategoryMutation],
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      await deleteCategoryMutation.mutateAsync(id);
    },
    [deleteCategoryMutation],
  );

  const addTag = useCallback(
    async (data: Tag & { user_id: string }) => {
      await addTagMutation.mutateAsync(data);
    },
    [addTagMutation],
  );

  const updateTag = useCallback(
    async (data: Tag & { id: number }) => {
      await updateTagMutation.mutateAsync(data);
    },
    [updateTagMutation],
  );

  const deleteTag = useCallback(
    async (id: number) => {
      await deleteTagMutation.mutateAsync(id);
    },
    [deleteTagMutation],
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
    addCategory,
    fetchCategory,
    useGetCategory,
    updateCategory,
    deleteCategory,
    addTag,
    fetchTags,
    useGetTag,
    updateTag,
    deleteTag,
  };
};
