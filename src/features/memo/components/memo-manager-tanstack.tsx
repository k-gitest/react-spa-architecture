import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { MemoForm } from '@/features/memo/components/memo-form';
import { MemoList } from '@/features/memo/components/memo-list';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { Button } from '@/components/ui/button';

export const MemoManagerTanstack = () => {
  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const {
    memos: memoList,
    isMemosLoading: isMemoListLoading,
    isMemosError: isMemoListError,
    memosError: memoListError,
    useGetMemo,
    addMemo,
    updateMemo,
    deleteMemo,
  } = useMemos();

  const { data: editMemoData } = useGetMemo(editIndex);

  const handleAddSubmit = useCallback(
    async (data: MemoFormData) => {
      if (session?.user.id) {
        addMemo({ ...data, user_id: session.user.id });
      }
    },
    [session?.user.id, addMemo],
  );

  const handleUpdateSubmit = useCallback(
    async (editIndex: string, data: MemoFormData) => {
      updateMemo(editIndex, data);
    },
    [updateMemo],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user.id) {
        handleAddSubmit(data);
      }
      if (editIndex) {
        handleUpdateSubmit(editIndex, data);
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

  if (isMemoListLoading) return <p className="text-center">Loading memos...</p>;
  if (isMemoListError) return <p className="text-center">Error loading memos: {memoListError?.message}</p>;

  return (
    <div>
      {open && (
        <>
          <Button onClick={() => handleBackToList()}>メモ一覧</Button>
          <MemoForm onSubmit={handleFormSubmit} initialValues={editMemoData} />
        </>
      )}
      {memoList && !open && (
        <>
          <Button onClick={() => handleAddClick()}>メモ追加</Button>
          <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
        </>
      )}
    </div>
  );
};
