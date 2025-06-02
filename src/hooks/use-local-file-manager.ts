import { useCallback, useState } from 'react';

interface LocalFileManagement {
  files: File[];
  imageError: string | null;
  handleFileChange: (newFiles: File[]) => void;
  handleDeleteFileClick: (index: number) => void;
  setImageError: (error: string | null) => void;
  setFiles: (files: File[]) => void;
}

export const useLocalFileManager = (): LocalFileManagement => {
  const [files, setFiles] = useState<File[]>([]);
  const [imageError, setImageError] = useState<string | null>(null);

  // ファイル選択ハンドラ
  // 新しいファイルが選択されたときに、既存のファイルリストに追加する
  const handleFileChange = useCallback((newFiles: File[]) => {
    setImageError(null); // 新しいファイルが選択されたらエラーをリセット
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
  }, []);

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