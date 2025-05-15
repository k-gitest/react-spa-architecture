import { useState, useCallback, useEffect } from 'react';
import { useSessionStore } from '@/hooks/use-session-store';
import { TagCategoryList } from '@/features/memo/components/memo-item-list';
import { MemoItemAddDialog } from '@/features/memo/components/memo-item-add-dialog';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { MemoCategorySchema } from '@/features/memo/schemas/memo-form-schema';
import { Category, CategoryOutput, TagOutput } from '@/features/memo/types/memo-form-data';
import { zodResolver } from '@hookform/resolvers/zod';

// 受け取るprops.operationsのデータ取得・操作機能の型定義
type MemoOperations = {
  fetchData: { data?: CategoryOutput[] | TagOutput[] | null };
  addItem: (data: { name: string; user_id: string }) => Promise<void>;
  updateItem: (data: { id: number; name: string }) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  useGetItem: (id: number | null) => { data?: CategoryOutput | TagOutput | null };
};

// 受け取るpropsの型定義
type MemoManagerProps = {
  buttonTitle: string;
  dialogTitle: string;
  dialogDescription: string;
  itemLabel: string;
  itemPlaceholder: string;
  editDialogTitle: string;
  editDialogDescription: string;
  operations: MemoOperations;
};

export const MemoItemManager = ({
  buttonTitle,
  dialogTitle,
  dialogDescription,
  itemLabel,
  itemPlaceholder,
  editDialogTitle,
  editDialogDescription,
  operations,
}: MemoManagerProps) => {
  const session = useSessionStore((state) => state.session);
  const [itemValue, setItemValue] = useState('');
  const [editIndex, setEditIndex] = useState<number | null>(null);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const form = useForm<Category>({
    resolver: zodResolver(MemoCategorySchema),
    defaultValues: { name: '' },
  });

  const { fetchData, addItem, updateItem, deleteItem, useGetItem } = operations;

  const handleItemSubmit = useCallback(() => {
    if (session?.user?.id && itemValue.trim()) {
      addItem({ name: itemValue.trim(), user_id: session.user.id });
      setItemValue('');
      setAddDialogOpen(false);
    }
  }, [addItem, session?.user?.id, itemValue]);

  const handleUpdateItemSubmit = useCallback(
    async (data: { name: string }) => {
      if (editIndex) updateItem({ ...data, id: editIndex });
      setOpen(false);
    },
    [updateItem, editIndex],
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
      deleteItem(index);
    },
    [deleteItem],
  );

  useEffect(() => {
    if (!open) setEditIndex(null);
  }, [open]);

  const { data } = useGetItem(editIndex);

  useEffect(() => {
    if (editIndex && data) {
      form.reset({
        name: data.name,
      });
    }
  }, [editIndex, form, data]);

  return (
    <div>
      {fetchData.data && (
        <>
          <MemoItemAddDialog
            buttonTitle={buttonTitle}
            dialogTitle={dialogTitle}
            dialogDescription={dialogDescription}
            placeholder={itemPlaceholder}
            value={itemValue}
            setValue={setItemValue}
            onSubmit={handleItemSubmit}
            open={addDialogOpen}
            setOpen={setAddDialogOpen}
          />
          <TagCategoryList itemList={fetchData.data} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
      )}
      {open && (
        <ResponsiveDialog
          open={open}
          onOpenChange={setOpen}
          isDesktop={isDesktop}
          dialogTitle={editDialogTitle}
          dialogDescription={editDialogDescription}
          className="flex justify-center"
        >
          <FormWrapper onSubmit={handleUpdateItemSubmit} form={form}>
            <FormInput label={itemLabel} name="name" placeholder={itemPlaceholder} />
            <Button type="submit">送信</Button>
          </FormWrapper>
        </ResponsiveDialog>
      )}
    </div>
  );
};

export const MemoTagManager = ({ operations }: { operations: MemoOperations }) => {
  return (
    <MemoItemManager
      buttonTitle="タグ追加"
      dialogTitle="Tag"
      dialogDescription="新しいタグを追加"
      itemLabel="タグ"
      itemPlaceholder="登録するタグを入力してください"
      editDialogTitle="タグ名の変更"
      editDialogDescription="タグ名を変更してください"
      operations={operations}
    />
  );
};

export const MemoCategoryManager = ({ operations }: { operations: MemoOperations }) => {
  return (
    <MemoItemManager
      buttonTitle="カテゴリー追加"
      dialogTitle="Category"
      dialogDescription="新しいカテゴリーを追加"
      itemLabel="カテゴリ"
      itemPlaceholder="カテゴリーを入力してください"
      editDialogTitle="カテゴリ名の変更"
      editDialogDescription="カテゴリ名を変更してください"
      operations={operations}
    />
  );
};
