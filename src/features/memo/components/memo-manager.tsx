import { useState, useCallback, useEffect, useMemo } from 'react';
import { Memo, MemoFormData } from '@/features/memo/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import {
  fetchMemosService,
  addMemoRPC,
  getMemoService,
  updateMemoRPC,
  deleteMemoService,
  fetchCategoryService,
  fetchTagsService,
  addCategoryService,
  addTagService,
  getCategoryService,
  getTagService,
  updateCategoryService,
  updateTagService,
  deleteCategoryService,
  deleteTagService,
} from '@/features/memo/services/memoService';
import { errorHandler } from '@/errors/error-handler';
import { MemoManagerUI } from '@/features/memo/components/memo-manager-ui';

interface CategoryOption {
  id: number;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

interface TagOption {
  id: number;
  name: string;
  user_id: string;
  created_at: string;
  updated_at: string;
}

export const MemoManager = () => {
  const session = useSessionStore((state) => state.session);

  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [editMemo, setEditMemo] = useState<Memo | undefined>(undefined);
  const [tabValue, setTabValue] = useState('memoList');

  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState<CategoryOption[] | null>(null);
  const [tag, setTag] = useState('');
  const [tags, setTags] = useState<TagOption[] | null>(null);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addTagDialogOpen, setAddTagDialogOpen] = useState(false);

  // メモリストを取得
  const memoListFetcher = useCallback(async () => {
    try {
      const data = await fetchMemosService();
      setMemoList(data);
    } catch (err) {
      errorHandler(err);
    }
  }, [setMemoList]);

  // 単一のメモを取得
  const memoFetcher = useCallback(
    async (index: string) => {
      try {
        const data = await getMemoService(index);
        setEditMemo(data);
      } catch (err) {
        errorHandler(err);
      }
    },
    [setEditMemo],
  );

  // カテゴリを取得
  const fetchCategories = useCallback(async () => {
    try {
      const data = await fetchCategoryService();
      setCategories(data);
      return { data };
    } catch (err) {
      errorHandler(err);
      return { data: null };
    }
  }, []);

  // タグを取得
  const fetchTags = useCallback(async () => {
    try {
      const data = await fetchTagsService();
      setTags(data);
      return { data };
    } catch (err) {
      errorHandler(err);
      return { data: null };
    }
  }, []);

  // カテゴリを追加
  const addCategory = useCallback(
    async ({ name, user_id }: { name: string; user_id: string }) => {
      try {
        await addCategoryService({ name, user_id });
        await fetchCategories();
      } catch (err) {
        errorHandler(err);
      }
    },
    [fetchCategories],
  );

  // タグを追加
  const addTag = useCallback(
    async ({ name, user_id }: { name: string; user_id: string }) => {
      try {
        await addTagService({ name, user_id });
        await fetchTags();
      } catch (err) {
        errorHandler(err);
      }
    },
    [fetchTags],
  );

  // カテゴリを取得（カスタムフック）
  const useGetCategory = (id: number | null) => {
    const [data, setData] = useState<CategoryOption | null>(null);

    useEffect(() => {
      if (id) {
        getCategoryService(id).then(setData).catch(errorHandler);
      }
    }, [id]);

    return { data };
  };

  // タグを取得（カスタムフック）
  const useGetTag = (id: number | null) => {
    const [data, setData] = useState<TagOption | null>(null);

    useEffect(() => {
      if (id) {
        getTagService(id).then(setData).catch(errorHandler);
      }
    }, [id]);

    return { data };
  };

  // カテゴリを更新
  const updateCategory = useCallback(
    async (data: { id: number; name: string }) => {
      try {
        await updateCategoryService(data);
        await fetchCategories();
      } catch (err) {
        errorHandler(err);
      }
    },
    [fetchCategories],
  );

  // タグを更新
  const updateTag = useCallback(
    async (data: { id: number; name: string }) => {
      try {
        await updateTagService(data);
        await fetchTags();
      } catch (err) {
        errorHandler(err);
      }
    },
    [fetchTags],
  );

  // カテゴリを削除
  const deleteCategory = useCallback(
    async (id: number) => {
      try {
        await deleteCategoryService(id);
        await fetchCategories();
      } catch (err) {
        errorHandler(err);
      }
    },
    [fetchCategories],
  );

  // タグを削除
  const deleteTag = useCallback(
    async (id: number) => {
      try {
        await deleteTagService(id);
        await fetchTags();
      } catch (err) {
        errorHandler(err);
      }
    },
    [fetchTags],
  );

  // タグ操作オブジェクト
  const tagOperations = {
    fetchData: { data: tags },
    addItem: addTag,
    updateItem: updateTag,
    deleteItem: deleteTag,
    useGetItem: useGetTag,
  };

  // カテゴリ操作オブジェクト
  const categoryOperations = {
    fetchData: { data: categories },
    addItem: addCategory,
    updateItem: updateCategory,
    deleteItem: deleteCategory,
    useGetItem: useGetCategory,
  };

  // データを初期化
  useEffect(() => {
    if (session?.user?.id) {
      memoListFetcher();
      fetchCategories();
      fetchTags();
    }
  }, [memoListFetcher, fetchCategories, fetchTags, session?.user?.id]);

  // カテゴリ送信を処理
  const handleCategorySubmit = useCallback(() => {
    if (session?.user?.id && category.trim()) {
      addCategory({ name: category.trim(), user_id: session.user.id });
      setCategory('');
      setAddCategoryDialogOpen(false);
      setAddTagDialogOpen(false);
    }
  }, [addCategory, session?.user?.id, category]);

  // タグ送信を処理
  const handleTagSubmit = useCallback(() => {
    if (session?.user?.id && tag.trim()) {
      addTag({ name: tag.trim(), user_id: session.user.id });
      setTag('');
      setAddCategoryDialogOpen(false);
      setAddTagDialogOpen(false);
    }
  }, [addTag, session?.user?.id, tag]);

  // メモ追加を処理
  const handleAddSubmit = useCallback(
    async (data: MemoFormData) => {
      try {
        if (session?.user?.id) {
          await addMemoRPC({ ...data, user_id: session.user.id });
          await memoListFetcher();
        }
      } catch (err) {
        errorHandler(err);
      }
    },
    [session?.user?.id, memoListFetcher],
  );

  // メモ更新を処理
  const handleUpdateSubmit = useCallback(
    async (editIndex: string, data: MemoFormData) => {
      try {
        await updateMemoRPC(editIndex, data);
        await memoListFetcher();
      } catch (err) {
        errorHandler(err);
      }
    },
    [memoListFetcher],
  );

  // フォーム送信を処理
  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user?.id) {
        await handleAddSubmit(data);
      }
      if (editIndex) {
        await handleUpdateSubmit(editIndex, data);
      }
      setEditIndex(null);
      setTabValue('memoList');
    },
    [editIndex, session?.user?.id, handleAddSubmit, handleUpdateSubmit],
  );

  // 編集クリックを処理
  const handleEditClick = useCallback(
    async (index: string) => {
      setEditIndex(index);
      await memoFetcher(index);
      setTabValue('addMemo');
    },
    [memoFetcher],
  );

  // 削除クリックを処理
  const handleDeleteClick = useCallback(
    async (index: string) => {
      try {
        await deleteMemoService(index);
        await memoListFetcher();
      } catch (err) {
        errorHandler(err);
      }
    },
    [memoListFetcher],
  );

  // フォーム用のカテゴリ・タグデータを準備
  const formattedCategories = useMemo(() => {
    if (!categories) return null;
    return categories.map((cat) => ({
      label: cat.name,
      value: String(cat.id),
    }));
  }, [categories]);

  const formattedTags = useMemo(() => {
    if (!tags) return null;
    return tags.map((tag) => ({
      label: tag.name,
      id: String(tag.id),
    }));
  }, [tags]);

  // タブ切り替え時に編集インデックスをリセット
  useEffect(() => {
    if (tabValue !== 'addMemo') {
      setEditIndex(null);
      setEditMemo(undefined);
    }
  }, [tabValue]);

  if (!session) return <p className="text-center">メモ機能は会員限定です</p>;

  return (
    <div>
      <MemoManagerUI
        tabValue={tabValue}
        setTabValue={setTabValue}
        memoList={memoList}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        formProps={{
          onSubmit: handleFormSubmit,
          initialValues: editMemo,
          categories: formattedCategories,
          tags: formattedTags,
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
