import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface ItemList {
  id: number;
  name: string;
  updated_at: string;
  created_at: string;
  user_id: string;
}

interface ItemListProps<T extends ItemList> {
  itemList: T[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export const MemoItemList = React.memo(
  <T extends ItemList>({ itemList, onEdit, onDelete }: ItemListProps<T>) => {
    return (
      <div className="flex flex-col gap-2 p-4">
        {itemList?.map((item) => (
          <Card key={item.id} className="p-2">
            <div className="flex justify-between items-center">
              <p className="break-all w-full">{item.name}</p>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => onEdit(item.id)} data-testid={`update-category-${item.id}`}>
                  編集
                </Button>
                <Button variant="outline" onClick={() => onDelete(item.id)} data-testid={`delete-category-${item.id}`}>
                  削除
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    );
  },
);
MemoItemList.displayName = 'MemoItemList';
