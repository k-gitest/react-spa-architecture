import { useState, useCallback, useEffect } from 'react';
import { MemoFormData, CategoryOption, TagOption } from '@/features/memo/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { MemoManagerUI } from '@/features/memo/components/memo-manager-ui';

export const MemoManagerTanstack = () => {
  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState('memoList');

  const {
    memos: memoList,
    isMemosLoading: isMemoListLoading,
    isMemosError: isMemoListError,
    memosError: memoListError,
    useGetMemo,
    addMemo,
    updateMemo,
    deleteMemo,
    fetchCategory,
    fetchTags,
    addCategory,
    addTag,
    useGetTag,
    useGetCategory,
    updateTag,
    updateCategory,
    deleteTag,
    deleteCategory,
  } = useMemos();

  // propsで渡すタグ操作関数をまとめたオブジェクト
  const tagOperations = {
    fetchData: fetchTags,
    addItem: addTag,
    updateItem: updateTag,
    deleteItem: deleteTag,
    useGetItem: useGetTag,
  };

  // propsで渡すカテゴリ操作関数をまとめたオブジェクト
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
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryOption[] | null>(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<TagOption[] | null>(null);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addTagDialogOpen, setAddTagDialogOpen] = useState(false);

  const handleCategorySubmit = useCallback(() => {
    if (session?.user?.id && category.trim()) {
      addCategory({ name: category.trim(), user_id: session.user.id });
      setCategory('');
      setAddCategoryDialogOpen(false);
      setAddTagDialogOpen(false);
    }
  }, [addCategory, session?.user?.id, category]);

  const handleTagSubmit = useCallback(() => {
    if (session?.user?.id && tag.trim()) {
      addTag({ name: tag.trim(), user_id: session?.user?.id });
      setTag('');
      setAddCategoryDialogOpen(false);
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
      if (session?.user.id) {
        addMemo({ ...data, user_id: session.user.id });
      }
    },
    [session?.user.id, addMemo],
  );

  const handleUpdateSubmit = useCallback(
    async (editIndex: string, data: MemoFormData) => {
      updateMemo(editIndex, data);
    },
    [updateMemo],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user.id) {
        handleAddSubmit(data);
      }
      if (editIndex) {
        handleUpdateSubmit(editIndex, data);
      }
      setEditIndex(null);
      setTabValue('memoList');
    },
    [editIndex, session?.user.id, handleAddSubmit, handleUpdateSubmit],
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
  if (isMemoListError) return <p className="text-center">Error loading memos: {memoListError?.message}</p>;

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
