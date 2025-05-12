import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { MemoForm } from '@/features/memo/components/memo-form';
import { MemoList } from '@/features/memo/components/memo-list';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-trpc';
import { z } from 'zod';
import { FormSchema } from '@/features/memo/schemas/memo-form-schema';
import { TRPCClientError } from '@trpc/client';
import { Button } from '@/components/ui/button';

type FlattenFormatted = z.inferFlattenedErrors<typeof FormSchema>;

export const MemoManagerTrpc = () => {
  const [zodError, setZodError] = useState<FlattenFormatted | null>(null);

  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

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

  const handleAddClick = useCallback(() => {
    setEditIndex(null);
    setOpen(true);
  }, []);

  const handleBackToList = useCallback(() => {
    setOpen(false);
  }, []);

  if (!session) return <p className="text-center">メモ機能は会員限定です</p>;

  if (isMemosLoading) return <p className="text-center">Loading memos...</p>;
  if (memosError) return <p className="text-center">Error loading memos: {memosError?.message}</p>;

  return (
    <div>
      {open && (
        <>
          <Button onClick={() => handleBackToList()}>メモ一覧</Button>
          <MemoForm onSubmit={handleFormSubmit} initialValues={editMemoData} externalZodError={zodError} />
        </>
      )}
      {memos && !open && (
        <>
          <Button onClick={() => handleAddClick()}>メモ追加</Button>
          <MemoList memoData={memos} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
      )}
    </div>
  );
};
