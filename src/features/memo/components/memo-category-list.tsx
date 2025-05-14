import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface CategoryListProps {
  categoryList: {
    created_at: string;
    id: number;
    name: string;
    updated_at: string;
    user_id: string;
  }[];
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}

export const MemoCategoryList = React.memo(({ categoryList, onEdit, onDelete }: CategoryListProps) => {
  return (
    <div className="flex flex-col gap-2 p-4">
      {categoryList?.map((category, index) => (
        <Card key={index} className='p-2'>
          <div className="flex flex-between items-center">
            <p className="break-all w-full">{category.name}</p>
            <div className="flex gap-2 justify-end">
              <Button
                variant="outline"
                onClick={() => onEdit(category.id)}
                data-testid={`update-category-${category.id}`}
              >
                編集
              </Button>
              <Button
                variant="outline"
                onClick={() => onDelete(category.id)}
                data-testid={`delete-category-${category.id}`}
              >
                削除
              </Button>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
});
MemoCategoryList.displayName = 'MemoCategoryList';
