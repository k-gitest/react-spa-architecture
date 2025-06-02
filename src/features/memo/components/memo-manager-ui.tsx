import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { MemoList } from '@/features/memo/components/memo-list';
import { MemoTagManager, MemoCategoryManager } from '@/features/memo/components/memo-item-manager';
import { Memo } from '@/features/memo/types/memo-form-data';
import { MemoOperations } from '@/features/memo/types/memo-form-data';

interface MemoManagerUIProps {
  tabValue: string;
  setTabValue: (value: string) => void;
  memoList: Memo[];
  handleEditClick: (index: string) => void;
  handleDeleteClick: (index: string) => void;
  categoryOperations: MemoOperations;
  tagOperations: MemoOperations;
  children: React.ReactNode;
}

export const MemoManagerUI: React.FC<MemoManagerUIProps> = ({
  tabValue,
  setTabValue,
  memoList,
  handleEditClick,
  handleDeleteClick,
  categoryOperations,
  tagOperations,
  children,
}) => {
  return (
    <div>
      <Tabs value={tabValue} onValueChange={setTabValue} className="w-full">
        <div className="flex flex-raw justify-center mb-10">
          <TabsList>
            <TabsTrigger value="memoList">メモ一覧</TabsTrigger>
            <TabsTrigger value="addMemo">メモ追加</TabsTrigger>
            <TabsTrigger value="categorySetting">カテゴリ設定</TabsTrigger>
            <TabsTrigger value="tagSetting">タグ設定</TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="memoList">
          <div className="flex flex-col items-center gap-2">
            {!Array.isArray(memoList) && <p>データがありませんでした。</p>}
            {Array.isArray(memoList) && memoList.length === 0 && (
              <>
                <p>メモはまだありません</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setTabValue('addMemo');
                  }}
                >
                  メモ追加
                </Button>
              </>
            )}
          </div>

          {Array.isArray(memoList) && memoList.length > 0 && (
            <MemoList memoData={memoList} onEdit={handleEditClick} onDelete={handleDeleteClick} />
          )}
        </TabsContent>
        <TabsContent value="addMemo">
          {children}
        </TabsContent>
        <TabsContent value="categorySetting">
          <MemoCategoryManager operations={categoryOperations} />
        </TabsContent>
        <TabsContent value="tagSetting">
          <MemoTagManager operations={tagOperations} />
        </TabsContent>
      </Tabs>
    </div>
  );
};
