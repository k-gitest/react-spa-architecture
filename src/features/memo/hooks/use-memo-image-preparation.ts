import { useCallback } from 'react';
import { MemoFormData, ImageMetadata } from '@/features/memo/types/memo-form-data';

/**
 * メモの追加/更新時に、画像関連の前処理を行うカスタムフック。
 *
 * @param onFileUpload - ファイルアップロードを行う関数（各MemoManagerコンポーネントから渡される）
 * Promise<string[]> を返し、アップロードされた画像のIDの配列を期待する。
 */
export const useMemoImagePreparation = (onFileUpload: (filesToUpload: File[]) => Promise<string[] | undefined>) => {
  /**
   * メモのフォームデータから画像関連の情報を整形し、アップロード処理を行う関数。
   *
   * @param data - メモのフォームデータ（既存の画像データや新規ファイルを含む）
   * @returns 画像IDの配列と、整形された画像メタデータの配列を含むオブジェクト
   */
  const prepareMemoImages = useCallback(
    async (data: MemoFormData & { files?: File[] }) => {
      let imageIds: string[] = [];
      let updatedImages: ImageMetadata[] = [];

      // 既存の画像IDを初期値として取得
      if (data.images && data.images.length > 0) {
        imageIds = data.images.map((image) => image.image_id);
        updatedImages = [...data.images];
      }

      // 新規ファイルがある場合、アップロード処理を実行
      if (data.files && data.files.length > 0) {
        const uploadImageIds = (await onFileUpload(data.files)) ?? [];
        imageIds = [...imageIds, ...uploadImageIds]; // 既存 + 新規の画像ID

        if (data.fileMetadata && uploadImageIds.length > 0) {
          // 新規アップロードされたファイルのメタデータを整形
          // 既存の画像の後ろに順序付けする
          const newImageMetadatas: ImageMetadata[] = data.fileMetadata.map((metadata, index) => ({
            ...metadata,
            image_id: uploadImageIds[index],
            order: updatedImages.length + index, // 既存画像の後に順序付け
          }));
          updatedImages = [...updatedImages, ...newImageMetadatas]; // 既存 + 新規の画像メタデータ
        }
      }

      return { imageIds, updatedImages };
    },
    [onFileUpload], // onFileUploadが依存配列に含まれる
  );

  return { prepareMemoImages };
};
