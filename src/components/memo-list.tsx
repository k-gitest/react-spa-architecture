import React from 'react';
import { MemoFormData } from '@/types/memo-form-data';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface MemoListProps {
  memoData: MemoFormData[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

const MemoList = React.memo(({ memoData, onEdit, onDelete }: MemoListProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
    {memoData.map((memo, index) => (
      <Card key={index}>
        <CardHeader>
          <CardTitle>{memo.title}</CardTitle>
          <CardDescription>{memo.category}</CardDescription>
          <CardDescription>{memo.importance}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>{memo.content}</p>
        </CardContent>
        <CardFooter>
          <ul>
            {memo.tag.map((tag, index) => (
              <li key={index}>{tag}</li>
            ))}
          </ul>
        </CardFooter>
        <CardFooter>
          <div className="w-full flex gap-2 justify-end">
            <Button variant="outline" onClick={() => onEdit(index)}>編集</Button>
            <Button variant="outline" onClick={() => onDelete(index)}>削除</Button>
          </div>
        </CardFooter>
      </Card>
    ))}
    </div>
  )
})

MemoList.displayName = 'MemoList'

export default MemoList