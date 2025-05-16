import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { MemoForm } from '@/features/memo/components/memo-form';
import { MemoList } from '@/features/memo/components/memo-list';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-trpc';
import { z } from 'zod';
import { FormSchema } from '@/features/memo/schemas/memo-form-schema';
import { TRPCClientError } from '@trpc/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemoTagManager, MemoCategoryManager } from '@/features/memo/components/memo-item-manager';

type FlattenFormatted = z.inferFlattenedErrors<typeof FormSchema>;

interface CategoryOptions {
  label: string;
  value: string;
}

interface TagsOptions {
  label: string;
  id: string;
}

export const MemoManagerTrpc = () => {
  const [zodError, setZodError] = useState<FlattenFormatted | null>(null);
  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState('memoList');
  
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryOptions[] | null>(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<TagsOptions[] | null>(null);
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
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <div className="flex flex-raw justify-center mb-10">
          <TabsList>
            <TabsTrigger value="memoList">メモ一覧</TabsTrigger>
            <TabsTrigger value="addMemo">メモ追加</TabsTrigger>
            <TabsTrigger value="categorySetting">カテゴリ設定</TabsTrigger>
            <TabsTrigger value="tagSetting">タグ設定</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="memoList">
          {memoList && <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />}
          {!memoList && <p>データがありませんでした。</p>}
        </TabsContent>
        <TabsContent value="addMemo">
          <MemoForm
            onSubmit={handleFormSubmit}
            initialValues={editMemoData}
            externalZodError={zodError}
            categories={categories}
            tags={tags}
            category={category}
            setCategory={setCategory}
            tag={tag}
            setTag={setTag}
            handleCategorySubmit={handleCategorySubmit}
            handleTagSubmit={handleTagSubmit}
            categoryOpen={addCategoryDialogOpen}
            setCategoryOpen={setAddCategoryDialogOpen}
            tagOpen={addTagDialogOpen}
            setTagOpen={setAddTagDialogOpen}
          />
        </TabsContent>
        <TabsContent value="categorySetting">
          <MemoCategoryManager operations={categoryOperations} />
        </TabsContent>
        <TabsContent value="tagSetting">
          <MemoTagManager operations={tagOperations} />
        </TabsContent>
      </Tabs>
    </div>
  );
};