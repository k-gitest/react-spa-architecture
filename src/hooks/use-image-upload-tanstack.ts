import { useApiMutation, useApiQuery } from '@/hooks/use-tanstack-query';
import { fetchImagesService, uploadImageStorageService, deleteImageService } from '@/services/ImageService';
import { getExtensionIfAllowed } from '@/lib/utils';

export const useImagesTanstack = (userId: string | undefined) => {
  // 画像一覧取得
  const imagesQuery = useApiQuery({
    queryKey: ['images', userId],
    queryFn: () => (userId ? fetchImagesService(userId) : []),
    enabled: !!userId,
  });

  // 画像アップロード
  const uploadMutation = useApiMutation<string[], Error, File[]>({
    mutationFn: async (files: File[]) => {
      const imageIds: string[] = [];
      for (const file of files) {
        const folderName = userId || 'default_folder';
        const extension = await getExtensionIfAllowed(file);
        if (!extension) {
          throw new Error(`許可されていないファイル形式です: ${file.name}`);
        }

        const imageId = await uploadImageStorageService(
          file,
          file.size,
          file.type,
          userId || 'unknown',
          folderName,
          extension,
        );
        imageIds.push(imageId);
      }
      return imageIds;
    },
    onSuccess: () => {
      imagesQuery.refetch?.(); // アップロード後に画像一覧を再取得
    },
  });

  // 画像削除
  const deleteMutation = useApiMutation<void, Error, { id: string; file_path: string; file_name: string }>({
    mutationFn: async ({ id, file_path, file_name }) => {
      if (!userId) return;
      await deleteImageService(id, userId, file_path, file_name);
    },
    onSuccess: () => {
      imagesQuery.refetch?.(); // 削除後に画像一覧を再取得
    },
  });

  return {
    images: imagesQuery.data,
    isImagesLoading: imagesQuery.isLoading,
    isImagesError: imagesQuery.isError,
    imagesError: imagesQuery.error,
    refetchImages: imagesQuery.refetch,
    uploadImages: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    deleteImage: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
