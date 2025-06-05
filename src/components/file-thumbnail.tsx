import React from 'react';
import { FormInput } from '@/components/form/form-parts';

interface FileThumbnailProps {
  files: File[];
  onDelete: (index: number) => void;
  onRemove: (index: number) => void;
}

export const FileThumbnail: React.FC<FileThumbnailProps> = ({ files, onDelete, onRemove }) => {
  const handleDeleteFileClick = (index: number) => {
    onDelete(index);
    onRemove(index);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      <h2>選択ファイル</h2>
      {files.map((file, index) => (
        <div key={file.name + file.lastModified} className="flex gap-2 w-full">
          <div className="relative w-[100px] h-[100px]">
            <button
              type="button"
              onClick={() => handleDeleteFileClick(index)}
              className="absolute top-0 right-0 bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
              aria-label="削除"
            >
              ×
            </button>
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              style={{ width: 100, height: 100, objectFit: 'cover' }}
            />
            <p className="text-xs mt-1 truncate">{file.name}</p>
            <p className="text-xs">{file.size} bytes</p>
          </div>
          <div className="flex-1">
            <div className="w-full">
              <FormInput
                name={`fileMetadata.${index}.alt_text`}
                label="Alt Text"
                placeholder="画像の代替テキストを入力"
                className="text-sm"
              />
              <FormInput
                name={`fileMetadata.${index}.description`}
                label="説明"
                placeholder="画像の説明を入力"
                className="text-sm"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
