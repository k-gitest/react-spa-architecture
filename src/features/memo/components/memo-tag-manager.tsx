import { useState, useCallback, useEffect } from 'react';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { TagCategoryList } from '@/features/memo/components/memo-tag-category-list';
import { MemoItemAddDialog } from '@/features/memo/components/memo-item-add-dialog';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { MemoCategorySchema } from '@/features/memo/schemas/memo-form-schema';
import { Category } from '@/features/memo/types/memo-form-data';
import { zodResolver } from '@hookform/resolvers/zod';

export const MemoTagManager = () => {
  const session = useSessionStore((state) => state.session);
  const [tag, setTag] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const { fetchTags, useGetTag, addTag, updateTag, deleteTag } = useMemos();
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<Category>({
    resolver: zodResolver(MemoCategorySchema),
    defaultValues: { name: '' },
  });

  const handleTagSubmit = useCallback(() => {
    if (session?.user?.id && tag.trim()) {
      addTag({ name: tag.trim(), user_id: session?.user?.id });
      setTag('');
    }
  }, [addTag, session?.user?.id]);

  const handleUpdateTagSubmit = useCallback(
    async (data: { name: string }) => {
      if (editIndex) updateTag({ ...data, id: editIndex });
      setOpen(false);
    },
    [updateTag],
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
      deleteTag(index);
    },
    [deleteTag],
  );

  useEffect(() => {
    if (!open) setEditIndex(null);
  }, [open]);

  const { data } = useGetTag(editIndex);

  useEffect(() => {
    if (editIndex && data) {
      form.reset({
        name: data.name,
      });
    }
  }, [editIndex, form, data]);

  return (
    <div>
      {fetchTags.data && (
        <>
          <MemoItemAddDialog
            buttonTitle="タグ追加"
            dialogTitle="Tag"
            dialogDescription="新しいタグを追加"
            placeholder="登録するタグを入力してください"
            value={tag}
            setValue={setTag}
            onSubmit={handleTagSubmit}
          />
          <TagCategoryList itemList={fetchTags.data} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
      )}
      {open && (
        <ResponsiveDialog
          open={open}
          onOpenChange={setOpen}
          isDesktop={isDesktop}
          dialogTitle="タグ名の変更"
          dialogDescription="タグ名を変更してください"
          className="flex justify-center"
        >
          <FormWrapper onSubmit={handleUpdateTagSubmit} form={form}>
            <FormInput label="タグ" name="name" placeholder="タグ名を入力してください" />
            <Button type="submit">送信</Button>
          </FormWrapper>
        </ResponsiveDialog>
      )}
    </div>
  );
};
