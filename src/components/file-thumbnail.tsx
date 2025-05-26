import React from 'react';

interface FileThumbnailProps {
  files: File[];
  onDelete: (index: number) => void;
}

export const FileThumbnail: React.FC<FileThumbnailProps> = ({ files, onDelete }) => {
  const handleDeleteFileClick = (index: number) => {
    onDelete(index);
  };

  return (
    <div className="flex gap-2 flex-wrap">
      {files.map((file, index) => (
        <div key={index}>
          <div className="relative w-[100px] h-[100px]">
            <button
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
          </div>
          <p className="text-xs mt-1 truncate">{file.name}</p>
          <p className="text-xs">{file.size} bytes</p>
        </div>
      ))}
    </div>
  );
};