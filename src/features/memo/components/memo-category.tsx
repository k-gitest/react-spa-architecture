import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { Button } from '@/components/ui/button';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Category } from '@/features/memo/types/memo-form-data';
import { MemoCategorySchema } from '@/features/memo/schemas/memo-form-schema';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { useSessionStore } from '@/hooks/use-session-store';

export const MemoCategory = () => {
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { addCategory } = useMemos();
  const session = useSessionStore((state) => state.session);
  const form = useForm<Category>({
    resolver: zodResolver(MemoCategorySchema),
    defaultValues: { name: '' },
  });

  const handleCategorySubmit = useCallback(
    (data: Category) => {
      if (session?.user?.id) {
        addCategory({ ...data, user_id: session?.user?.id });
        setOpen(false);
      }
    },
    [addCategory, session?.user?.id],
  );

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
      <FormWrapper onSubmit={handleCategorySubmit} form={form}>
        <FormInput label="カテゴリ名" name="name" placeholder="カテゴリーを入力してください" />
        <Button type="submit">送信</Button>
      </FormWrapper>
    </ResponsiveDialog>
  );
};
