import { Button } from '@/components/ui/button';
import { useState, useCallback } from 'react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { useSessionStore } from '@/hooks/use-session-store';
import { Input } from '@/components/ui/input';

export const MemoCategory = () => {
  const [category, setCategory] = useState('');
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { addCategory } = useMemos();
  const session = useSessionStore((state) => state.session);

  const handleCategorySubmit = useCallback(() => {
    if (session?.user?.id && category.trim()) {
      addCategory({ name: category.trim(), user_id: session.user.id });
      setCategory('');
      setOpen(false);
    }
  }, [addCategory, session?.user?.id]);

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      isDesktop={isDesktop}
      buttonTitle="カテゴリー追加"
      dialogTitle="Category"
      dialogDescription="新しいカテゴリーを追加"
      className="flex justify-center"
      hasOverflow={true}
    >
      <Input
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        placeholder="カテゴリーを入力してください"
      />
      <Button type="button" onClick={() => handleCategorySubmit()}>
        送信
      </Button>
    </ResponsiveDialog>
  );
};
