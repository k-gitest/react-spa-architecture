import { useState, useCallback, useEffect } from 'react';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { MemoForm } from '@/features/memo/components/memo-form';
import { MemoList } from '@/features/memo/components/memo-list';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';
//import { Button } from '@/components/ui/button';
//import { MemoCategoryManager } from '@/features/memo/components/memo-category-manager';
//import { MemoTagManager } from '@/features/memo/components/memo-tag-manager';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MemoTagManager, MemoCategoryManager } from '@/features/memo/components/memo-item-manager';

export const MemoManagerTanstack = () => {
  const session = useSessionStore((state) => state.session);
  const [editIndex, setEditIndex] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  //const [viewCategory, setViewCategory] = useState<boolean>(false);

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

  /*
  const handleAddClick = useCallback(() => {
    setEditIndex(null);
    setOpen(true);
    setViewCategory(false);
  }, []);

  const handleBackToList = useCallback(() => {
    setOpen(false);
    setViewCategory(false);
  }, []);

  const handleCategoryClick = useCallback(() => {
    setViewCategory(true);
  }, []);
  */

  if (!session) return <p className="text-center">メモ機能は会員限定です</p>;

  if (isMemoListLoading) return <p className="text-center">Loading memos...</p>;
  if (isMemoListError) return <p className="text-center">Error loading memos: {memoListError?.message}</p>;

  return (
    <div>
      <Tabs defaultValue="memoList" className="w-full">
        <div className="flex flex-raw justify-center mb-10">
          <TabsList>
            <TabsTrigger value="memoList">メモ一覧</TabsTrigger>
            <TabsTrigger value="addMemo">メモ追加</TabsTrigger>
            <TabsTrigger value="categorySetting">カテゴリ設定</TabsTrigger>
            <TabsTrigger value="tagSetting">タグ設定</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="memoList">
          {memoList && <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />}
          {!memoList && <p>データがありませんでした。</p>}
        </TabsContent>
        <TabsContent value="addMemo">
          <MemoForm onSubmit={handleFormSubmit} initialValues={editMemoData} />
        </TabsContent>
        <TabsContent value="categorySetting">
          <MemoCategoryManager />
        </TabsContent>
        <TabsContent value="tagSetting">
          <MemoTagManager />
        </TabsContent>
      </Tabs>

      {/*
      <div className="flex gap-2">
        <Button onClick={handleAddClick}>メモ追加</Button>
        <Button onClick={handleBackToList}>メモ一覧</Button>
        <Button onClick={handleCategoryClick}>カテゴリ設定</Button>
      </div>
      {viewCategory ? (
        <MemoCategoryManager />
      ) : open ? (
        <MemoForm onSubmit={handleFormSubmit} initialValues={editMemoData} />
      ) : (
        memoList && <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
      )}
      */}
    </div>
  );
};
