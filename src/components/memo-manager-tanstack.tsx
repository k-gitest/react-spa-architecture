import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/types/memo-form-data';
import { MemoForm } from '@/components/memo-form';
import { MemoList } from '@/components/memo-list';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useGetMemos, useGetMemo, useAddMemo, useUpdateMemo, useDeleteMemo, } from '@/hooks/use-memo-queries-tanstack';

export const MemoManagerTanstack = () => {
  const session = useAuthStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const {
    data: memoList,
    isLoading: isMemoListLoading,
    isError: isMemoListError,
    error: memoListError,
  } = useGetMemos();

  const { data: editMemoData } = useGetMemo(editIndex);

  const addMemoMutation = useAddMemo();
  const updateMemoMutation = useUpdateMemo();
  const deleteMemoMutation = useDeleteMemo();

  const handleAddSubmit = useCallback(
    async (data: MemoFormData) => {
      if (session?.user.id) {
        addMemoMutation.mutate({ ...data, user_id: session.user.id });
      }
    },
    [session?.user.id, addMemoMutation],
  );

  const handleUpdateSubmit = useCallback(
    async (data: MemoFormData, editIndex: string) => {
      updateMemoMutation.mutate({ id: editIndex, updates: data });
    },
    [updateMemoMutation],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user.id) {
        handleAddSubmit(data);
      }
      if (editIndex) {
        handleUpdateSubmit(data, editIndex);
      }
      setOpen(false);
      setEditIndex(null);
    },
    [editIndex, session?.user.id, handleAddSubmit, handleUpdateSubmit],
  );

  const handleEditClick = useCallback(
    (index: string) => {
      setEditIndex(index);
      setOpen(true);
    },
    [setEditIndex],
  );

  const handleDeleteClick = useCallback(
    async (index: string) => {
      deleteMemoMutation.mutate(index);
    },
    [deleteMemoMutation],
  );

  useEffect(() => {
    if (!open) setEditIndex(null);
  }, [open]);

  if (!session) return <p className='text-center'>メモ機能は会員限定です</p>;

  if (isMemoListLoading) return <p className='text-center'>Loading memos...</p>;
  if (isMemoListError) return <p className='text-center'>Error loading memos: {memoListError?.message}</p>;

  return (
    <div>
      <ResponsiveDialog
        open={open}
        onOpenChange={setOpen}
        isDesktop={isDesktop}
        buttonTitle="メモ追加"
        dialogTitle="Memo"
        dialogDescription="メモを残そう"
        className="flex justify-center"
        hasOverflow={true}
      >
        <MemoForm onSubmit={handleFormSubmit} initialValues={editMemoData} />
      </ResponsiveDialog>
      {memoList && (
        <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      )}
    </div>
  );
};
