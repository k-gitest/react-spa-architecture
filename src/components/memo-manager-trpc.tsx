import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/types/memo-form-data';
import { MemoForm } from '@/components/memo-form';
import { MemoList } from '@/components/memo-list';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/hooks/use-memo-queries-trpc';
import { ZodError } from 'zod';
import { Memo } from '@/types/memo-form-data';
import { TRPCClientError } from '@trpc/client';

type FlattenedError = ReturnType<ZodError<Memo>['flatten']>;

export const MemoManagerTrpc = () => {
  const [zodError, setZodError] = useState<FlattenedError | null>(null);

  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { memos, isMemosLoading, memosError, useGetMemo, addMemo, updateMemo, deleteMemo } = useMemos();

  const { data: editMemoData } = useGetMemo(editIndex);

  const handleAddSubmit = useCallback(
    async (data: MemoFormData) => {
      if (session?.user.id) {
        try {
          await addMemo(data, session.user.id);
          setZodError(null);
          setOpen(false);
          setEditIndex(null);
        } catch (err) {
          if (err instanceof TRPCClientError && err.data.zodError) {
            setZodError(err.data.zodError);
          }
        }
      }
    },
    [session?.user.id, addMemo],
  );

  const handleUpdateSubmit = useCallback(
    async (data: MemoFormData, editIndex: string) => {
      try {
        await updateMemo(editIndex, data);
        setZodError(null);
        setOpen(false);
        setEditIndex(null);
      } catch (err) {
        if (err instanceof TRPCClientError && err.data.zodError) {
          setZodError(err.data.zodError);
        }
      }
    },
    [updateMemo],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user.id) {
        await handleAddSubmit(data);
      }
      if (editIndex) {
        await handleUpdateSubmit(data, editIndex);
      }
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
      deleteMemo(index);
    },
    [deleteMemo],
  );

  useEffect(() => {
    if (!open) setEditIndex(null);
  }, [open]);

  if (!session) return <p className="text-center">メモ機能は会員限定です</p>;

  if (isMemosLoading) return <p className="text-center">Loading memos...</p>;
  if (memosError) return <p className="text-center">Error loading memos: {memosError?.message}</p>;

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
        <MemoForm onSubmit={handleFormSubmit} initialValues={editMemoData} externalZodError={zodError} />
      </ResponsiveDialog>
      {memos && <MemoList memoData={memos} onEdit={handleEditClick} onDelete={handleDeleteClick} />}
    </div>
  );
};
