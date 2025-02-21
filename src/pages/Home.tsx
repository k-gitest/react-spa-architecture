import React, { useState } from 'react';
import { MemoFormData } from '@/types/memo-form-data'
import MemoForm from "@/components/memo-form"
import MemoList from "@/components/memo-list"
import ResponsiveDialog from "@/components/responsive-dialog"
import useMediaQuery  from "@/hooks/use-media-query"

const Home = () => {
  const [memoList, setMemoList] = useState<MemoFormData[]>([]);

  const handleFormSubmit = (data: MemoFormData) => {
    setMemoList([...memoList, data]);
    setOpen(false);
  };

  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  
  return (
    <main className="w-full p-4">
      <ResponsiveDialog open={open} onOpenChange={setOpen} isDesktop={isDesktop}  buttonTitle="メモ追加" dialogTitle="Memo" dialogDescription="メモを残そう" className="flex justify-center">
        <MemoForm onSubmit={handleFormSubmit} />
      </ResponsiveDialog>
      <MemoList memoData={memoList} />
    </main>
  )
}

export default Home