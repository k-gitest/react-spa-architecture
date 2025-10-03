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
import { useApiSuspenseQuery } from '@/hooks/use-suspense-query';
import { useApiMutation } from '@/hooks/use-tanstack-query';

/**
 * Suspense対応のメモ管理フック
 * 
 * 使い方:
 * - データ取得系は useSuspenseQuery を使用（AsyncBoundaryで囲む必要あり）
 * - Mutation系は従来通り useMutation を使用
 */
export const useMemosSuspense = () => {
  const session = useSessionStore((state) => state.session);
  const queryClient = useQueryClient();

  // ========================================
  // データ取得系（useSuspenseQuery）
  // ========================================

  /**
   * メモ一覧取得
   * 
   * 注意: このフックを使うコンポーネントは AsyncBoundary で囲む必要がある
   * 
   * 使用例:
   * <PageAsyncBoundary>
   *   <MemoList />
   * </PageAsyncBoundary>
   */
  const memosQuery = useApiSuspenseQuery<Memo[], Error>(
    {
      queryKey: ['memos'],
      queryFn: fetchMemosService,
    },
    {
      onSuccess: (data) => {
        console.log('メモ一覧取得成功:', data.length, '件');
      },
    }
  );

  /**
   * 個別メモ取得
   * 
   * @param id - メモID
   * @returns メモデータ（必ず存在）
   * 
   * 使用例:
   * const MemoDetail = ({ id }: { id: string }) => {
   *   const { data: memo } = useGetMemo(id);
   *   return <div>{memo.title}</div>;
   * };
   */
  const useGetMemo = (id: string) => {
    return useApiSuspenseQuery<Memo, Error>(
      {
        queryKey: ['memo', id],
        queryFn: () => getMemoService(id),
      },
      {
        onSuccess: (data) => {
          console.log('メモ取得成功:', data.title);
        },
      }
    );
  };

  /**
   * カテゴリ一覧取得
   */
  const fetchCategory = useApiSuspenseQuery<Category[], Error>({
    queryKey: ['category'],
    queryFn: () => fetchCategoryService(),
  });

  /**
   * 個別カテゴリ取得
   */
  const useGetCategory = (id: number) => {
    return useApiSuspenseQuery<Category, Error>({
      queryKey: ['category', id],
      queryFn: () => getCategoryService(id),
    });
  };

  /**
   * タグ一覧取得
   */
  const fetchTags = useApiSuspenseQuery<Tag[], Error>({
    queryKey: ['tag'],
    queryFn: () => fetchTagsService(),
  });

  /**
   * 個別タグ取得
   */
  const useGetTag = (id: number) => {
    return useApiSuspenseQuery<Tag, Error>({
      queryKey: ['tag', id],
      queryFn: () => getTagService(id),
    });
  };

  // ========================================
  // Mutation系（従来通り）
  // ========================================

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

  // タグ削除用
  const deleteTagMutation = useApiMutation<void, Error, number>({
    mutationFn: (data) => deleteTagService(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tag'] });
    },
  });

  // ========================================
  // Mutationメソッド（useCallback）
  // ========================================

  const addMemo = useCallback(
    async (data: MemoFormData & { user_id: string }) => {
      await addMemoMutation.mutateAsync(data);
    },
    [addMemoMutation]
  );

  const updateMemo = useCallback(
    async (id: string, updates: MemoFormData) => {
      await updateMemoMutation.mutateAsync({ id, updates });
    },
    [updateMemoMutation]
  );

  const deleteMemo = useCallback(
    async (id: string) => {
      await deleteMemoMutation.mutateAsync(id);
    },
    [deleteMemoMutation]
  );

  const addCategory = useCallback(
    async (data: Category & { user_id: string }) => {
      await addCategoryMutation.mutateAsync(data);
    },
    [addCategoryMutation]
  );

  const updateCategory = useCallback(
    async (data: Category & { id: number }) => {
      await updateCategoryMutation.mutateAsync(data);
    },
    [updateCategoryMutation]
  );

  const deleteCategory = useCallback(
    async (id: number) => {
      await deleteCategoryMutation.mutateAsync(id);
    },
    [deleteCategoryMutation]
  );

  const addTag = useCallback(
    async (data: Tag & { user_id: string }) => {
      await addTagMutation.mutateAsync(data);
    },
    [addTagMutation]
  );

  const updateTag = useCallback(
    async (data: Tag & { id: number }) => {
      await updateTagMutation.mutateAsync(data);
    },
    [updateTagMutation]
  );

  const deleteTag = useCallback(
    async (id: number) => {
      await deleteTagMutation.mutateAsync(id);
    },
    [deleteTagMutation]
  );

  // ========================================
  // Return
  // ========================================

  return {
    // データ（必ず存在、undefined なし）
    memos: memosQuery.data,
    categories: fetchCategory.data,
    tags: fetchTags.data,

    // 個別取得用フック
    useGetMemo,
    useGetCategory,
    useGetTag,

    // Mutation
    addMemo,
    updateMemo,
    deleteMemo,
    addCategory,
    updateCategory,
    deleteCategory,
    addTag,
    updateTag,
    deleteTag,

    // Mutation状態（ボタンのdisabled制御などに使用）
    isAddingMemo: addMemoMutation.isPending,
    isUpdatingMemo: updateMemoMutation.isPending,
    isDeletingMemo: deleteMemoMutation.isPending,
  };
};