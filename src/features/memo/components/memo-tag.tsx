import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { Button } from '@/components/ui/button';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Tag } from '@/features/memo/types/memo-form-data';
import { MemoTagSchema } from '@/features/memo/schemas/memo-form-schema';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { useSessionStore } from '@/hooks/use-session-store';

export const MemoTag = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { addTag } = useMemos();
  const session = useSessionStore((state) => state.session);
  const form = useForm<Tag>({
    resolver: zodResolver(MemoTagSchema),
    defaultValues: { name: '' },
  });

  const handleCategorySubmit = useCallback(
    (data: Tag) => {
      if (session?.user?.id) {
        addTag({ ...data, user_id: session?.user?.id });
        setOpen(false);
      }
    },
    [addTag, session?.user?.id],
  );

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
      <FormWrapper onSubmit={handleCategorySubmit} form={form}>
        <FormInput label="タグ名" name="name" placeholder="登録するタグを入力してください" />
        <Button type="submit">送信</Button>
      </FormWrapper>
    </ResponsiveDialog>
  );
};
