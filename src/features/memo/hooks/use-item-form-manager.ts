import { useCallback, useState } from 'react';

interface ItemFormManager {
  category: string;
  setCategory: (value: string) => void;
  tag: string;
  setTag: (value: string) => void;
  addCategoryDialogOpen: boolean;
  setAddCategoryDialogOpen: (open: boolean) => void;
  addTagDialogOpen: boolean;
  setAddTagDialogOpen: (open: boolean) => void;
  // フォーム送信後に状態をリセットするためのヘルパー関数
  resetItemForm: () => void;
}

export const useItemFormManager = (): ItemFormManager => {
  const [category, setCategory] = useState('');
  const [tag, setTag] = useState('');
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [addTagDialogOpen, setAddTagDialogOpen] = useState(false);

  // カテゴリやタグの追加後にフォームをリセットするためのハンドラ
  // これは主に、各MemoManagerの `handleCategorySubmit` や `handleTagSubmit` から呼ばれることを想定
  const resetItemForm = useCallback(() => {
    setCategory('');
    setTag('');
    setAddCategoryDialogOpen(false);
    setAddTagDialogOpen(false);
  }, []);

  return {
    category,
    setCategory,
    tag,
    setTag,
    addCategoryDialogOpen,
    setAddCategoryDialogOpen,
    addTagDialogOpen,
    setAddTagDialogOpen,
    resetItemForm,
  };
};