import React from 'react';
import { Memo } from '@/features/memo/types/memo-form-data';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getImageUrl } from '@/lib/supabase';

interface MemoListProps {
  memoData: Memo[];
  onEdit: (index: string) => void;
  onDelete: (index: string) => void;
}

export const MemoList = React.memo(({ memoData, onEdit, onDelete }: MemoListProps) => {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {memoData?.map((memo, index) => (
        <Card key={index}>
          <CardHeader>
            {memo.images && memo?.images?.length > 0 && (
              <div className="mb-2">
                <img
                  src={getImageUrl(memo.images[0].file_path || '')}
                  alt={memo.images[0].alt_text || 'Memo Image'}
                  className="w-full h-auto object-cover"
                />
              </div>
            )}
            <CardTitle className="break-words">{memo.title}</CardTitle>
            <CardDescription>{memo.category}</CardDescription>
            <CardDescription>{memo.importance}</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="break-all">{memo.content}</p>
          </CardContent>
          <CardFooter>
            <ul>{memo?.tags?.map((tag, index) => <li key={index}>{tag}</li>)}</ul>
          </CardFooter>
          <CardFooter>
            <div className="w-full flex gap-2 justify-end">
              <Button variant="outline" onClick={() => onEdit(memo.id)} data-testid={`update-memo-${memo.id}`}>
                編集
              </Button>
              <Button variant="outline" onClick={() => onDelete(memo.id)} data-testid={`delete-memo-${memo.id}`}>
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
