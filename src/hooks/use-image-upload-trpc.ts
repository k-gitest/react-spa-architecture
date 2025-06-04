import { trpc } from '@/lib/trpc';
import { queryClient } from '@/lib/queryClient';
import { useApiMutation, useApiQuery } from '@/hooks/use-tanstack-query';
import { fetchImagesService, uploadImageStorageService, deleteImageService } from '@/services/ImageService';
import { getExtensionIfAllowed } from '@/lib/utils';
import { skipToken } from '@tanstack/react-query';
import { convertFileToBase64 } from '@/lib/utils';

export const useImagesTRPC = (userId: string | undefined) => {
  const imagesKey = trpc.image.fetchImage.queryKey();
  // 画像一覧取得
  const imagesQueryOptions = trpc.image.fetchImage.queryOptions(userId ?? skipToken, { enabled: !!userId });
  const imagesQuery = useApiQuery(imagesQueryOptions);

  // 画像アップロード
  const uploadImageMutationOptions = trpc.image.uploadImage.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imagesKey });
    },
  });
  const uploadImageMutation = useApiMutation(uploadImageMutationOptions);

  const uploadImage = async (files: File[]) => {
    if (!userId) return [];
    const imageIds: string[] = [];
    for (const file of files) {
      const folderName = userId || 'default_folder';
      const extension = await getExtensionIfAllowed(file);
      if (!extension) continue;
      const base64 = await convertFileToBase64(file);
      const imageId = await uploadImageMutation.mutateAsync({
        file: base64,
        file_name: file.name,
        file_size: file.size,
        mime_type: file.type,
        user_id: userId,
        folderName,
        extention: extension,
      });
      imageIds.push(imageId);
    }
    return imageIds;
  };

  /*
  const uploadMutation = useApiMutation<string[], Error, File[]>({
    mutationFn: async (files: File[]) => {
      const imageIds: string[] = [];
      for (const file of files) {
        const folderName = userId || 'default_folder';
        const extension = await getExtensionIfAllowed(file);
        if (extension) {
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
      }
      return imageIds;
    },
    onSuccess: () => {
      imagesQuery.refetch?.();
    },
  });
  */

  // imagesテーブル追加
  const addImageMutationOptions = trpc.image.addImage.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: imagesKey });
    },
  });
  const addImageMutation = useApiMutation(addImageMutationOptions);

  // 画像削除
  const deleteMutation = useApiMutation<void, Error, { id: string; file_path: string; file_name: string }>({
    mutationFn: async ({ id, file_path, file_name }) => {
      if (!userId) return;
      await deleteImageService(id, userId, file_path, file_name);
    },
    onSuccess: () => {
      imagesQuery.refetch?.();
    },
  });

  return {
    images: imagesQuery.data,
    isImagesLoading: imagesQuery.isLoading,
    isImagesError: imagesQuery.isError,
    imagesError: imagesQuery.error,
    refetchImages: imagesQuery.refetch,
    uploadImages: uploadImage,
    isUploading: uploadImageMutation.isPending,
    deleteImage: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
};
