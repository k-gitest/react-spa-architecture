import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-trpc';
import { FlattenFormatted, CategoryOption, TagOption } from '@/features/memo/types/memo-form-data';
import { TRPCClientError } from '@trpc/client';
import { MemoManagerUI } from '@/features/memo/components/memo-manager-ui';
import { MemoForm } from '@/features/memo/components/memo-form';
import { useImagesTRPC } from '@/hooks/use-image-upload-trpc';
import { FileList } from '@/components/file-list';
import { useLocalFileManager } from '@/hooks/use-local-file-manager';
import { useItemFormManager } from '@/features/memo/hooks/use-item-form-manager';
import { useMemoImagePreparation } from '@/features/memo/hooks/use-memo-image-preparation';

export const MemoManagerTrpc = () => {
  const [zodError, setZodError] = useState<FlattenFormatted | null>(null);
  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [tabValue, setTabValue] = useState('memoList');

  const [categories, setCategories] = useState<CategoryOption[] | null>(null);
  const [tags, setTags] = useState<TagOption[] | null>(null);

  const { files, setFiles, setImageError, imageError, handleFileChange, handleDeleteFileClick } = useLocalFileManager();

  const { images, isImagesLoading, uploadImages, deleteImage, refetchImages } = useImagesTRPC(session?.user?.id);

  const {
    category,
    setCategory,
    tag,
    setTag,
    addCategoryDialogOpen,
    setAddCategoryDialogOpen,
    addTagDialogOpen,
    setAddTagDialogOpen,
    resetItemForm,
  } = useItemFormManager();

  // 画像削除ハンドラー
  const handleDeleteImage = useCallback(
    async (id: string, file_path: string, file_name: string) => {
      await deleteImage({ id, file_path, file_name });
    },
    [session?.user?.id],
  );

  // ファイルアップロードハンドラー
  const handleFileUpload = useCallback(
    async (files: File[]) => {
      try {
        const imageIds = await uploadImages(files);
        setFiles([]);
        return imageIds;
      } catch (e) {
        setImageError('画像のアップロードに失敗しました');
        return [];
      }
    },
    [uploadImages],
  );

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
      resetItemForm();
    }
  }, [addCategory, session?.user?.id, category]);

  const handleTagSubmit = useCallback(() => {
    if (session?.user?.id && tag.trim()) {
      addTag({ name: tag.trim(), user_id: session?.user?.id });
      resetItemForm();
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

  const { prepareMemoImages } = useMemoImagePreparation(handleFileUpload);

  const handleAddSubmit = useCallback(
    async (data: MemoFormData & { files?: File[] }) => {
      const { imageIds, updatedImages } = await prepareMemoImages(data);
      if (session?.user?.id) {
        try {
          await addMemo({ ...data, image_ids: imageIds, images: updatedImages }, session.user.id);
          setZodError(null);
          setTabValue('memoList');
        } catch (err) {
          if (err instanceof TRPCClientError && err.data?.zodError) {
            setZodError(err.data.zodError);
          }
        }
      }
    },
    [session?.user?.id, addMemo, prepareMemoImages],
  );

  const handleUpdateSubmit = useCallback(
    async (editIndex: string, data: MemoFormData & { files?: File[] }) => {
      const { imageIds, updatedImages } = await prepareMemoImages(data);
      try {
        await updateMemo(editIndex, { ...data, image_ids: imageIds, images: updatedImages });
        setZodError(null);
        setTabValue('memoList');
      } catch (err) {
        if (err instanceof TRPCClientError && err.data?.zodError) {
          setZodError(err.data.zodError);
        }
      }
    },
    [updateMemo, prepareMemoImages],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData, files?: File[]) => {
      if (!editIndex && session?.user?.id) {
        await handleAddSubmit({ ...data, files });
      }
      if (editIndex) {
        await handleUpdateSubmit(editIndex, { ...data, files });
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

  const memoFormProps = {
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
    // ファイルアップロード関連のプロパティ
    files,
    onFileChange: handleFileChange,
    onFileUpload: handleFileUpload,
    onFileDelete: handleDeleteFileClick,
    imageError,
    images,
  };

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
        categoryOperations={categoryOperations}
        tagOperations={tagOperations}
      >
        <MemoForm {...memoFormProps} />
      </MemoManagerUI>

      <h2>Images</h2>
      {images && images.length > 0 && <FileList images={images} handleDeleteImage={handleDeleteImage} />}
      {!images && <p>ファイルはアップロードされていません</p>}
    </div>
  );
};
