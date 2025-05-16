import { trpc } from '@/lib/trpc';
import { queryClient } from '@/lib/queryClient';
import { Category, MemoFormData, Tag } from '@/features/memo/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';

export const useMemos = () => {
  // セッション取得
  const session = useSessionStore((state) => state.session);
  // メモ一覧の取得
  const memosKey = trpc.memo.getMemos.queryKey();

  const memosQueryOptions = trpc.memo.getMemos.queryOptions(void 0, { enabled: !!session?.user.id });
  const memosQuery = useApiQuery(memosQueryOptions);

  // メモの詳細取得
  const useGetMemo = (id: string | null) => {
    const queryOptions = trpc.memo.getMemo.queryOptions(id as string, { enabled: !!id });
    return useApiQuery({ ...queryOptions });
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

  // カテゴリ一覧取得
  const categoriesKey = trpc.memo.getCategories.queryKey();

  const categoriesQueryOptions = trpc.memo.getCategories.queryOptions(void 0, { enabled: !!session?.user.id });
  const fetchCategory = useApiQuery(categoriesQueryOptions);

  // カテゴリ個別取得
  const useGetCategory = (id: number | null) => {
    const queryOptions = trpc.memo.getCategory.queryOptions(id as number, { enabled: !!id });
    return useApiQuery({ ...queryOptions });
  };

  // カテゴリ追加
  const addCategoryMutationOptions = trpc.memo.addCategory.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKey });
    },
  });
  const addCategoryMutation = useApiMutation(addCategoryMutationOptions);

  // カテゴリ更新
  const updateCategoryMutationOptions = trpc.memo.updateCategory.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKey });
    },
  });
  const updateCategoryMutation = useApiMutation(updateCategoryMutationOptions);

  // カテゴリ削除
  const deleteCategoryMutationOptions = trpc.memo.deleteCategory.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: categoriesKey });
    },
  });
  const deleteCategoryMutation = useApiMutation(deleteCategoryMutationOptions);

  // タグ一覧取得
  const tagsQueryKey = trpc.memo.getTags.queryKey();
  const tagsQueryOptions = trpc.memo.getTags.queryOptions(void 0, { enabled: !!session?.user.id });
  const fetchTags = useApiQuery(tagsQueryOptions);

  // タグ個別取得
  const useGetTag = (id: number | null) => {
    const queryOptions = trpc.memo.getTag.queryOptions(id as number, { enabled: !!id });
    return useApiQuery({ ...queryOptions });
  };

  // タグ追加
  const addTagMutationOptions = trpc.memo.addTag.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsQueryKey });
    },
  });
  const addTagMutation = useApiMutation(addTagMutationOptions);

  // タグ更新
  const updateTagMutationOptions = trpc.memo.updateTag.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsQueryKey });
    },
  });
  const updateTagMutation = useApiMutation(updateTagMutationOptions);

  // タグ削除
  const deleteTagMutationOptions = trpc.memo.deleteTag.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: tagsQueryKey });
    },
  });
  const deleteTagMutation = useApiMutation(deleteTagMutationOptions);

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

  const addCategory = async (data: Category & { user_id: string }) => {
    await addCategoryMutation.mutateAsync(data);
  };

  const updateCategory = async (data: Category & { id: number }) => {
    await updateCategoryMutation.mutateAsync(data);
  };

  const deleteCategory = async (id: number) => {
    await deleteCategoryMutation.mutateAsync(id);
  };

  const addTag = async (data: Tag & { user_id: string }) => {
    return addTagMutation.mutateAsync(data);
  };

  const updateTag = async (data: Tag & { id: number }) => {
    return updateTagMutation.mutateAsync(data);
  };

  const deleteTag = async (id: number) => {
    return deleteTagMutation.mutateAsync(id);
  };

  return {
    memos: memosQuery.data,
    isMemosLoading: memosQuery.isLoading,
    memosError: memosQuery.error,
    addMemo,
    useGetMemo,
    updateMemo,
    deleteMemo,
    fetchCategory,
    useGetCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    fetchTags,
    useGetTag,
    addTag,
    updateTag,
    deleteTag,
  };
};
