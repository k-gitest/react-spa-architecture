import React, { useState, useCallback } from 'react';
import { MemoFormData } from '@/types/memo-form-data'
import MemoForm from "@/components/memo-form"
import MemoList from "@/components/memo-list"
import ResponsiveDialog from "@/components/responsive-dialog"
import useMediaQuery  from "@/hooks/use-media-query"

const Home = () => {
  const [memoList, setMemoList] = useState<MemoFormData[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleFormSubmit = useCallback((data: MemoFormData) => {
    if(editIndex !== null){
      const updateMemoList = [...memoList]
      updateMemoList[editIndex] = data
      setMemoList(updateMemoList)
      setEditIndex(null)
    }
    else {
      setMemoList([...memoList, data])
    }
    setOpen(false);
  }, [memoList, editIndex]);

  const handleEditClick = useCallback((index: number) => {
    setEditIndex(index);
    setOpen(true);
  }, []);

  const handleDeleteClick = useCallback((index: number) => {
    const updatedMemoList = memoList.filter((_, i) => i !== index);
    setMemoList(updatedMemoList);
  }, [memoList]);
  
  return (
    <main className="w-full p-4">
      <ResponsiveDialog open={open} onOpenChange={setOpen} isDesktop={isDesktop}  buttonTitle="メモ追加" dialogTitle="Memo" dialogDescription="メモを残そう" className="flex justify-center">
        <MemoForm onSubmit={handleFormSubmit} initialValues={editIndex !== null ? memoList[editIndex] : undefined} />
      </ResponsiveDialog>
      <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
    </main>
  )
}

export default Home