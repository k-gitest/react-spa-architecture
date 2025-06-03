import React, { useState } from 'react';
import { getImageUrl } from '@/lib/supabase';
import { Image } from '@/features/memo/types/memo-form-data';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';

interface MemoImageAddDialogProps {
  open: boolean;
  images: Image[];
  onSelect: (image: Image[]) => void;
  onClose: () => void;
}

export const MemoImageAddDialog: React.FC<MemoImageAddDialogProps> = ({ open, images, onSelect, onClose }) => {
  const [selected, setSelected] = useState<string[]>([]);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const buttonTitle = '画像を追加';
  const dialogTitle = '画像を選択';
  const dialogDescription = 'アップロード済みの画像から選択してください。';

  if (!open) return null;
  const handleToggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  const handleAdd = () => {
    const selectedImages = images.filter((img) => selected.includes(img.id));
    onSelect(selectedImages);
    setSelected([]);
  };

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={onClose}
      isDesktop={isDesktop}
      buttonTitle={buttonTitle}
      dialogTitle={dialogTitle}
      dialogDescription={dialogDescription}
      className="flex justify-center"
    >
      <div className="flex flex-row flex-wrap gap-4 justify-center-safe max-h-80 overflow-y-auto">
        {images.map((img) => (
          <button
            key={img.id}
            type="button"
            onClick={() => handleToggle(img.id)}
          >
            <div
              className={`relative w-24 h-24 rounded overflow-hidden
                before:content-[''] before:absolute before:inset-0
                ${selected.includes(img.id)
                  ? 'before:bg-black before:opacity-20 border-2 border-black'
                  : 'before:bg-transparent hover:before:bg-gray-400 hover:before:opacity-20'
                }
                transition
              `}
            >
              <img src={getImageUrl(img.file_path)} className="w-24 h-24 object-cover" />
            </div>
          </button>
        ))}
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          onClick={handleAdd}
          disabled={selected.length === 0}
        >
          追加
        </Button>
        <Button variant="outline" onClick={onClose}>
          閉じる
        </Button>
      </div>
    </ResponsiveDialog>
  );
};
