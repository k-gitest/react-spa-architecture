import { useState, useCallback, useEffect } from 'react';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { MemoCategoryList } from '@/features/memo/components/memo-category-list';
import { MemoCategory } from '@/features/memo/components/memo-category';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { MemoCategorySchema } from '@/features/memo/schemas/memo-form-schema';
import { Category } from '@/features/memo/types/memo-form-data';
import { zodResolver } from '@hookform/resolvers/zod';

export const MemoCategoryManager = () => {
  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { fetchCategory, useGetCategory, updateCategory, deleteCategory } = useMemos();
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<Category>({
    resolver: zodResolver(MemoCategorySchema),
    defaultValues: { name: '' },
  });

  const handleUpdateCategorySubmit = useCallback(
    async (data: { name: string }) => {
      if (editIndex) updateCategory({ ...data, id: editIndex });
      setOpen(false);
    },
    [updateCategory],
  );

  const handleEditClick = useCallback(
    (index: number) => {
      setEditIndex(index);
      setOpen(true);
    },
    [setEditIndex],
  );

  const handleDeleteClick = useCallback(
    async (index: number) => {
      deleteCategory(index);
    },
    [deleteCategory],
  );

  useEffect(() => {
    if (!open) setEditIndex(null);
  }, [open]);

  const { data } = useGetCategory(editIndex);

  useEffect(() => {
    if (editIndex && data) {
      form.reset({
        name: data.name,
      });
    }
  }, [editIndex, form, data]);

  return (
    <div>
      {fetchCategory.data && (
        <>
          <MemoCategory />
          <MemoCategoryList categoryList={fetchCategory.data} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
      )}
      {open && (
        <ResponsiveDialog
          open={open}
          onOpenChange={setOpen}
          isDesktop={isDesktop}
          dialogTitle="カテゴリ名の変更"
          dialogDescription="カテゴリ名を変更してください"
          className="flex justify-center"
        >
          <FormWrapper onSubmit={handleUpdateCategorySubmit} form={form}>
            <FormInput label="カテゴリ" name="name" placeholder="カテゴリ名を入力してください" />
            <Button type="submit">送信</Button>
          </FormWrapper>
        </ResponsiveDialog>
      )}
    </div>
  );
};
