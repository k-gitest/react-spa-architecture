import React, { useState, useCallback, useEffect } from 'react';
import { Memo, MemoFormData } from '@/types/memo-form-data';
import { MemoForm } from '@/components/memo-form';
import { MemoList } from '@/components/memo-list';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuthStore } from '@/hooks/use-auth-store';
import { fetchMemos, addMemo, showMemo, updateMemo, deleteMemo } from '@/services/memoService';

export const MemoManager = () => {
  const session = useAuthStore((state) => state.session);

  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [editMemo, setEditMemo] = useState<Memo | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const memoListFetcher = useCallback(async () => {
    try {
      const data = await fetchMemos();
      setMemoList(data);
    } catch (err) {
      console.error(err);
    }
  }, [setMemoList]);

  const memoFetcher = useCallback(
    async (index: string) => {
      try {
        const data = await showMemo(index);
        setEditMemo(data);
      } catch (err) {
        console.error(err);
      }
    },
    [setEditMemo],
  );

  useEffect(() => {
    if(session?.user.id){
      memoListFetcher();
    }
  }, [memoListFetcher, session]);

  const handleAddSubmit = useCallback(
    async (data: MemoFormData, userId: string) => {
      try {
        await addMemo({ ...data, user_id: userId });
        memoListFetcher();
      } catch (err) {
        console.error(err);
      }
    },
    [memoListFetcher],
  );

  const handleUpdateSubmit = useCallback(
    async (data: MemoFormData, editIndex: string) => {
      try {
        await updateMemo(editIndex, { ...data });
        memoListFetcher();
        setEditIndex(null);
      } catch (err) {
        console.error(err);
      }
    },
    [memoListFetcher, setEditIndex],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user.id) {
        handleAddSubmit(data, session.user.id);
      }
      if (editIndex) {
        handleUpdateSubmit(data, editIndex);
      }
      setOpen(false);
    },
    [editIndex, session?.user.id, handleAddSubmit, handleUpdateSubmit, setOpen],
  );

  const handleEditClick = useCallback(
    (index: string) => {
      setEditIndex(index);
      memoFetcher(index);
      setOpen(true);
    },
    [setEditIndex, memoFetcher, setOpen],
  );

  const handleDeleteClick = useCallback(
    async (index: string) => {
      try {
        await deleteMemo(index);
        memoListFetcher();
      } catch (err) {
        console.error(err);
      }
    },
    [memoListFetcher],
  );

  /* メモ取得別手法 memoListからeditIndexでメモを取得する
  const getEditMemo = async () => {
    const initialValues = editIndex ? memoList.find((memo) => memo.id === editIndex) : undefined;
    setEditMemo(initialValues);
  };
  */

  if (!session) return <p className="text-center">メモ機能は会員限定です</p>;

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
      >
        <MemoForm onSubmit={handleFormSubmit} initialValues={editMemo} />
      </ResponsiveDialog>
      <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
    </div>
  );
};
