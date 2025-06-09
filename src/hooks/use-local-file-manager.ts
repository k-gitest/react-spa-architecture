import { useCallback, useState } from 'react';
import { getExtensionIfAllowed } from '@/lib/utils';

interface LocalFileManagement {
  files: File[];
  imageError: string | null;
  handleFileChange: (newFiles: File[]) => void;
  handleDeleteFileClick: (index: number) => void;
  setImageError: (error: string | null) => void;
  setFiles: (files: File[]) => void;
}

// ファイルアップロードの制限
const MAX_SIZE = 2 * 1024 * 1024; // 2MB制限
const MAX_FILES = 5;

const validateFiles = async (files: File[], prevFiles: File[]) => {
  if (files.length + prevFiles.length > MAX_FILES) {
    return `アップロードできるファイルは最大${MAX_FILES}件までです`;
  }
  for (const file of files) {
    if (file.size > MAX_SIZE) {
      return `ファイルサイズが大きすぎます: ${file.name}`;
    }
    const extension = await getExtensionIfAllowed(file);
    if (!extension) {
      return `許可されていないファイル形式です: ${file.name}`;
    }
  }
  return null;
};

export const useLocalFileManager = (): LocalFileManagement => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  // ファイル選択ハンドラ
  // 新しいファイルが選択されたときに、既存のファイルリストに追加する
  const handleFileChange = useCallback(async (newFiles: File[]) => {
    setImageError(null); // 新しいファイルが選択されたらエラーをリセット
    const error = await validateFiles(newFiles, files);
    if (error) {
      setImageError(error);
      return;
    }
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, [files]);

  // ローカルのサムネイル削除ハンドラ
  // ファイルアップロード前（ローカル）のプレビューリストからファイルを削除する
  const handleDeleteFileClick = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  return {
    files,
    imageError,
    handleFileChange,
    handleDeleteFileClick,
    setImageError,
    setFiles,
  };
};
