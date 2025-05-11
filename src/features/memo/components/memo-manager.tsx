import React, { useState, useCallback, useEffect } from 'react';
import { Memo, MemoFormData } from '@/features/memo/types/memo-form-data';
import { MemoForm } from '@/features/memo/components/memo-form';
import { MemoList } from '@/features/memo/components/memo-list';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useSessionStore } from '@/hooks/use-session-store';
import {
  fetchMemosService,
  addMemoRPC,
  getMemoService,
  updateMemoRPC,
  deleteMemoService,
} from '@/features/memo/services/memoService';
import { errorHandler } from '@/errors/error-handler';

export const MemoManager = () => {
  const session = useSessionStore((state) => state.session);

  const [memoList, setMemoList] = useState<Memo[]>([]);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [editMemo, setEditMemo] = useState<Memo | undefined>(undefined);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const memoListFetcher = useCallback(async () => {
    try {
      const data = await fetchMemosService();
      setMemoList(data);
    } catch (err) {
      errorHandler(err);
    }
  }, [setMemoList]);

  const memoFetcher = useCallback(
    async (index: string) => {
      try {
        const data = await getMemoService(index);
        setEditMemo(data);
      } catch (err) {
        errorHandler(err);
      }
    },
    [setEditMemo],
  );

  useEffect(() => {
    if (session?.user.id) {
      memoListFetcher();
    }
  }, [memoListFetcher, session?.user.id]);

  const handleAddSubmit = useCallback(
    async (data: MemoFormData, userId: string) => {
      try {
        await addMemoRPC({ ...data, user_id: userId });
        await memoListFetcher();
      } catch (err) {
        errorHandler(err);
      }
    },
    [memoListFetcher],
  );

  const handleUpdateSubmit = useCallback(
    async (data: MemoFormData, editIndex: string) => {
      try {
        await updateMemoRPC(editIndex, { ...data });
        await memoListFetcher();
        setEditIndex(null);
      } catch (err) {
        errorHandler(err);
      }
    },
    [memoListFetcher, setEditIndex],
  );

  const handleFormSubmit = useCallback(
    async (data: MemoFormData) => {
      if (!editIndex && session?.user.id) {
        await handleAddSubmit(data, session.user.id);
      }
      if (editIndex) {
        await handleUpdateSubmit(data, editIndex);
      }
      setOpen(false);
    },
    [editIndex, session?.user.id, handleAddSubmit, handleUpdateSubmit, setOpen],
  );

  const handleEditClick = useCallback(
    async (index: string) => {
      setEditIndex(index);
      await memoFetcher(index);
      setOpen(true);
    },
    [setEditIndex, memoFetcher, setOpen],
  );

  const handleDeleteClick = useCallback(
    async (index: string) => {
      try {
        await deleteMemoService(index);
        await memoListFetcher();
      } catch (err) {
        errorHandler(err);
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
        hasOverflow={true}
      >
        <MemoForm onSubmit={handleFormSubmit} initialValues={editMemo} />
      </ResponsiveDialog>
      <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
    </div>
  );
};
