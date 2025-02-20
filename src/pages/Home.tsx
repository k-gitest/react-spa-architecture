import React, { useState } from 'react';
import { MemoFormData } from '@/types/memo-form-data';
import MemoForm from "@/components/memo-form"
import MemoList from "@/components/memo-list"

const Home = () => {
  const [memoList, setMemoList] = useState<MemoFormData[]>([]);

  const handleFormSubmit = (data: MemoFormData) => {
    setMemoList([...memoList, data]);
  };
  
  return (
    <main className="w-full p-4">
      <MemoForm onSubmit={handleFormSubmit} />
      <MemoList memoData={memoList} />
    </main>
  )
}

export default Home