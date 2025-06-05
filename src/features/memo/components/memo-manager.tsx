import { useCallback, useEffect, useMemo, useState } from 'react';
import { Memo, MemoFormData } from '@/features/memo/types/memo-form-data';
import { useSessionStore } from '@/hooks/use-session-store';
import {
  addCategoryService,
  addMemoRPC,
  addTagService,
  deleteCategoryService,
  deleteMemoService,
  deleteTagService,
  fetchCategoryService,
  fetchMemosService,
  fetchTagsService,
  getCategoryService,
  getMemoService,
  getTagService,
  updateCategoryService,
  updateMemoRPC,
  updateTagService,
} from '@/features/memo/services/memoService';
import { errorHandler } from '@/errors/error-handler';
import { MemoManagerUI } from '@/features/memo/components/memo-manager-ui';
import { MemoForm } from '@/features/memo/components/memo-form';
import { deleteImageService, fetchImagesService, uploadImageStorageService } from '@/services/ImageService';
import { getExtensionIfAllowed } from '@/lib/utils';
import { FileList } from '@/components/file-list';
import { useLocalFileManager } from '@/hooks/use-local-file-manager';
import { useItemFormManager } from '@/features/memo/hooks/use-item-form-manager';
import { useMemoImagePreparation } from '@/features/memo/hooks/use-memo-image-preparation';

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

interface Image {
  created_at: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  id: string;
  mime_type: string | null;
  storage_object_id: string | null;
  updated_at: string;
  user_id: string;
}

export const MemoManager = () => {
  const session = useSessionStore((state) => state.session);

  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [editMemo, setEditMemo] = useState<Memo | undefined>(undefined);
  const [tabValue, setTabValue] = useState('memoList');

  const [categories, setCategories] = useState<CategoryOption[] | null>(null);
  const [tags, setTags] = useState<TagOption[] | null>(null);

  const [images, setImages] = useState<Image[]>([]);

  const { files, setFiles, setImageError, imageError, handleFileChange, handleDeleteFileClick } = useLocalFileManager();

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

  // 画像データ取得
  const fetchImages = useCallback(async () => {
    if (!session?.user?.id) return;
    try {
      const images = await fetchImagesService(session.user.id);
      setImages(images);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  }, [session?.user?.id]);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  // 画像削除ハンドラー
  const handleDeleteImage = useCallback(
    async (id: string, file_path: string, file_name: string) => {
      if (!session?.user?.id) return;
      try {
        await deleteImageService(id, session?.user?.id, file_path, file_name);
        fetchImages();
      } catch (error) {
        console.error('Error deleting image:', error);
      }
    },
    [session?.user?.id, fetchImages],
  );

  // ファイルアップロードハンドラー
  const handleFileUpload = useCallback(
    async (files: File[]) => {
      const imageIds: string[] = [];
      try {
        for (const file of files) {
          const folderName = session?.user.id || 'default_folder';
          const extension = await getExtensionIfAllowed(file);

          if (extension) {
            const imageId = await uploadImageStorageService(
              file,
              file.size,
              file.type,
              session?.user.id || 'unknown',
              folderName,
              extension,
            );
            imageIds.push(imageId);
          }
        }
        setFiles([]);
        fetchImages();
        return imageIds;
      } catch (_error) {
        console.error('Error uploading images:', _error);
        setImageError('画像のアップロードに失敗しました');
        return [];
      }
    },
    [session?.user.id, fetchImages, setFiles, setImageError],
  );

  // メモリストを取得
  const memoListFetcher = useCallback(async () => {
    try {
      const data = await fetchMemosService();
      console.log(data);
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
      resetItemForm();
    }
  }, [addCategory, session?.user?.id, category, resetItemForm]);

  // タグ送信を処理
  const handleTagSubmit = useCallback(() => {
    if (session?.user?.id && tag.trim()) {
      addTag({ name: tag.trim(), user_id: session.user.id });
      resetItemForm();
    }
  }, [addTag, session?.user?.id, tag, resetItemForm]);

  const { prepareMemoImages } = useMemoImagePreparation(handleFileUpload);

  // メモ追加を処理
  const handleAddSubmit = useCallback(
    async (data: MemoFormData & { files?: File[] }) => {
      try {
        const { imageIds, updatedImages } = await prepareMemoImages(data);
        if (session?.user?.id) {
          await addMemoRPC({ ...data, image_ids: imageIds, images: updatedImages, user_id: session.user.id });
          await memoListFetcher();
        }
      } catch (err) {
        errorHandler(err);
      }
    },
    [session?.user?.id, memoListFetcher, prepareMemoImages],
  );

  // メモ更新を処理
  const handleUpdateSubmit = useCallback(
    async (editIndex: string, data: MemoFormData & { files?: File[] }) => {
      try {
        const { imageIds, updatedImages } = await prepareMemoImages(data);
        await updateMemoRPC(editIndex, {
          ...data,
          image_ids: imageIds,
          images: updatedImages,
        });
        await memoListFetcher();
      } catch (err) {
        errorHandler(err);
      }
    },
    [memoListFetcher, prepareMemoImages],
  );

  // フォーム送信を処理
  const handleFormSubmit = useCallback(
    async (data: MemoFormData, files?: File[]) => {
      console.log('Form submitted:', data, files);
      if (!editIndex && session?.user?.id) {
        await handleAddSubmit({ ...data, files });
      }
      if (editIndex) {
        await handleUpdateSubmit(editIndex, { ...data, files });
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
      setFiles([])
    }
  }, [tabValue, setFiles]);

  const memoFormProps = {
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
    // ファイル関連propsを追加
    files,
    onFileChange: handleFileChange,
    onFileUpload: handleFileUpload,
    onFileDelete: handleDeleteFileClick,
    imageError,
    images,
  };

  if (!session) return <p className="text-center">メモ機能は会員限定です</p>;

  return (
    <div>
      <MemoManagerUI
        tabValue={tabValue}
        setTabValue={setTabValue}
        memoList={memoList}
        handleEditClick={handleEditClick}
        handleDeleteClick={handleDeleteClick}
        categoryOperations={categoryOperations}
        tagOperations={tagOperations}
      >
        <MemoForm {...memoFormProps} />
      </MemoManagerUI>

      <h2>Images</h2>
      {images.length > 0 && <FileList images={images} handleDeleteImage={handleDeleteImage} />}
      {images.length === 0 && <p>ファイルはアップロードされていません</p>}
    </div>
  );
};
