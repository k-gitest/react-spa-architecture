import React from 'react';
import { Memo } from '@/types/memo-form-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface MemoListProps {
  memoData: Memo[];
  onEdit: (index: string) => void;
  onDelete: (index: string) => void;
}

export const MemoList = React.memo(({ memoData, onEdit, onDelete }: MemoListProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {memoData.map((memo, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle className="break-words">{memo.title}</CardTitle>
            <CardDescription>{memo.category}</CardDescription>
            <CardDescription>{memo.importance}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="break-all">{memo.content}</p>
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
              <Button variant="outline" onClick={() => onEdit(memo.id)}>
                編集
              </Button>
              <Button variant="outline" onClick={() => onDelete(memo.id)}>
                削除
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
});
MemoList.displayName = 'MemoList';