import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-trpc';
import { FlattenFormatted, CategoryOption, TagOption } from '@/features/memo/types/memo-form-data';
import { TRPCClientError } from '@trpc/client';
import { MemoManagerUI } from '@/features/memo/components/memo-manager-ui';

export const MemoManagerTrpc = () => {
  const [zodError, setZodError] = useState<FlattenFormatted | null>(null);
  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState('memoList');

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryOption[] | null>(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<TagOption[] | null>(null);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addTagDialogOpen, setAddTagDialogOpen] = useState(false);

  const {
    memos: memoList,
    isMemosLoading: isMemoListLoading,
    memosError: memoListError,
    useGetMemo,
    addMemo,
    updateMemo,
    deleteMemo,
    fetchCategory,
    fetchTags,
    useGetCategory,
    addCategory,
    updateCategory,
    deleteCategory,
    useGetTag,
    addTag,
    updateTag,
    deleteTag,
  } = useMemos();

  // タグ操作関数をまとめたオブジェクト
  const tagOperations = {
    fetchData: fetchTags,
    addItem: addTag,
    updateItem: updateTag,
    deleteItem: deleteTag,
    useGetItem: useGetTag,
  };

  // カテゴリ操作関数をまとめたオブジェクト
  const categoryOperations = {
    fetchData: fetchCategory,
    addItem: addCategory,
    updateItem: updateCategory,
    deleteItem: deleteCategory,
    useGetItem: useGetCategory,
  };

  const { data: editMemoData } = useGetMemo(editIndex);

  const { data: categoryData } = fetchCategory;
  const { data: tagsData } = fetchTags;

  const handleCategorySubmit = useCallback(() => {
    if (session?.user?.id && category.trim()) {
      addCategory({ name: category.trim(), user_id: session.user.id });
      setCategory('');
      setAddCategoryDialogOpen(false);
    }
  }, [addCategory, session?.user?.id, category]);

  const handleTagSubmit = useCallback(() => {
    if (session?.user?.id && tag.trim()) {
      addTag({ name: tag.trim(), user_id: session?.user?.id });
      setTag('');
      setAddTagDialogOpen(false);
    }
  }, [addTag, session?.user?.id, tag]);

  useEffect(() => {
    if (categoryData) {
      const categoryOptions = categoryData.map((category) => ({
        label: category.name,
        value: String(category.id),
      }));
      setCategories(categoryOptions);
    }
  }, [categoryData]);

  useEffect(() => {
    if (tagsData) {
      const tagsOptions = tagsData.map((tag) => ({
        label: tag.name,
        id: String(tag.id),
      }));
      setTags(tagsOptions);
    }
  }, [tagsData]);

  const handleAddSubmit = useCallback(
    async (data: MemoFormData) => {
      if (session?.user?.id) {
        try {
          await addMemo(data, session.user.id);
          setZodError(null);
          setTabValue('memoList');
        } catch (err) {
          if (err instanceof TRPCClientError && err.data?.zodError) {
            setZodError(err.data.zodError);
          }
        }
      }
    },
    [session?.user?.id, addMemo],
  );

  const handleUpdateSubmit = useCallback(
    async (data: MemoFormData, editIndex: string) => {
      try {
        await updateMemo(editIndex, data);
        setZodError(null);
        setTabValue('memoList');
      } catch (err) {
        if (err instanceof TRPCClientError && err.data?.zodError) {
          setZodError(err.data.zodError);
        }
      }
    },
    [updateMemo],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user?.id) {
        await handleAddSubmit(data);
      }
      if (editIndex) {
        await handleUpdateSubmit(data, editIndex);
      }
    },
    [editIndex, session?.user?.id, handleAddSubmit, handleUpdateSubmit],
  );

  const handleEditClick = useCallback((index: string) => {
    setEditIndex(index);
    setTabValue('addMemo');
  }, []);

  const handleDeleteClick = useCallback(
    async (index: string) => {
      deleteMemo(index);
    },
    [deleteMemo],
  );

  useEffect(() => {
    if (tabValue !== 'addMemo') {
      setEditIndex(null);
    }
  }, [tabValue]);

  if (!session) return <p className="text-center">メモ機能は会員限定です</p>;

  if (isMemoListLoading) return <p className="text-center">Loading memos...</p>;
  if (memoListError) return <p className="text-center">Error loading memos: {memoListError?.message}</p>;

  return (
    <div>
      <MemoManagerUI
        tabValue={tabValue}
        setTabValue={setTabValue}
        memoList={memoList ?? []}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        formProps={{
          onSubmit: handleFormSubmit,
          initialValues: editMemoData,
          externalZodError: zodError, // tRPC版特有
          categories,
          tags,
          category,
          setCategory,
          tag,
          setTag,
          handleCategorySubmit,
          handleTagSubmit,
          categoryOpen: addCategoryDialogOpen,
          setCategoryOpen: setAddCategoryDialogOpen,
          tagOpen: addTagDialogOpen,
          setTagOpen: setAddTagDialogOpen,
        }}
        categoryOperations={categoryOperations}
        tagOperations={tagOperations}
      />
    </div>
  );
};
