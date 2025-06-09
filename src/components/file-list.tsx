import React from 'react';
import { Button } from '@/components/ui/button';
import { getImageUrl } from '@/lib/supabase';
import { Image } from '@/features/memo/types/memo-form-data';

interface FileListProps {
  images: Image[];
  handleDeleteImage: (id: string, filePath: string, fileName: string) => void;
}

export const FileList: React.FC<FileListProps> = ({ images, handleDeleteImage }) => {
  return (
    <div className="flex flex-col gap-2">
      {images?.map((image) => (
        <div key={image.id} className="flex items-center gap-2">
          <img src={getImageUrl(image.file_path)} alt={image.file_name} className="w-16 h-16 object-cover" />
          <p>{image.file_name}</p>
          <Button onClick={() => handleDeleteImage(image.id, image.file_path, image.file_name)}>
            削除
          </Button>
        </div>
      ))}
    </div>
  );
};

