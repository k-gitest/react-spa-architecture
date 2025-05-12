import { Button } from '@/components/ui/button';
import { useState, useCallback } from 'react';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { useSessionStore } from '@/hooks/use-session-store';
import { Input } from '@/components/ui/input';

export const MemoTag = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [tag, setTag] = useState('');
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { addTag } = useMemos();
  const session = useSessionStore((state) => state.session);

  const handleTagSubmit = useCallback(() => {
    if (session?.user?.id && tag.trim()) {
      addTag({ name: tag.trim(), user_id: session?.user?.id });
      setTag('');
      setOpen(false);
    }
  }, [addTag, session?.user?.id]);

  return (
    <ResponsiveDialog
      open={open}
      onOpenChange={setOpen}
      isDesktop={isDesktop}
      buttonTitle="タグ追加"
      dialogTitle="Tag"
      dialogDescription="新しいタグを追加"
      className="flex justify-center"
      hasOverflow={true}
    >
      <Input value={tag} onChange={(e) => setTag(e.target.value)} placeholder="登録するタグを入力してください" />
      <Button type="button" onClick={() => handleTagSubmit()}>
        送信
      </Button>
    </ResponsiveDialog>
  );
};
