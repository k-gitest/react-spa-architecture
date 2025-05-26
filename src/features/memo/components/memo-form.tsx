import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/features/memo/schemas/memo-form-schema';
import { MemoFormData, MemoFormProps } from '@/features/memo/types/memo-form-data';
import { Button } from '@/components/ui/button';
import {
  FormWrapper,
  FormInput,
  FormTextArea,
  FormSelect,
  FormCheckboxGroup,
  FormRadioGroup,
} from '@/components/form/form-parts';
import { syncZodErrors } from '@/lib/trpc';
import { MemoItemAddDialog } from '@/features/memo/components/memo-item-add-dialog';
import { FileUploader } from '@/components/file-uploader';
import { FileThumbnail } from '@/components/file-thumbnail';

const importances = [
  { value: 'high', label: '大' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '小' },
] as const;

const defaultMemoFormData = {
  title: '',
  content: '',
  importance: 'high',
  category: '',
  tags: [],
};

export interface MemoFormFileProps {
  files: File[];
  onFileChange: (files: File[]) => void;
  onFileUpload: (files: File[]) => Promise<string[]>;
  onFileDelete: (index: number) => void;
  imageError?: string | null;
}

export const MemoForm = ({
  onSubmit,
  initialValues,
  externalZodError,
  categories,
  tags,
  category,
  setCategory,
  tag,
  setTag,
  handleCategorySubmit,
  handleTagSubmit,
  categoryOpen,
  setCategoryOpen,
  tagOpen,
  setTagOpen,
  // ファイル関連props
  files,
  onFileChange,
  onFileUpload,
  onFileDelete,
  imageError,
}: MemoFormProps & Partial<MemoFormFileProps>) => {
  const form = useForm<MemoFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues || defaultMemoFormData,
  });

  const handleSubmit = useCallback(
    (data: MemoFormData) => {
      onSubmit(data, files);
    },
    [onSubmit, files],
  );

  useEffect(() => {
    if (initialValues && !externalZodError) {
      console.log(initialValues);
      form.reset(initialValues);
    }
  }, [initialValues, externalZodError, form]);

  useEffect(() => {
    syncZodErrors(form, externalZodError);
  }, [externalZodError, form]);

  return (
    <div className="flex justify-center">
      <FormWrapper onSubmit={handleSubmit} form={form}>
        <FormInput label="タイトル" name="title" placeholder="タイトルを入力してください" />
        <FormSelect label="カテゴリー" name="category" options={[...(categories ?? [])]} placeholder="カテゴリ選択" />
        <MemoItemAddDialog
          buttonTitle="カテゴリー追加"
          dialogTitle="Category"
          dialogDescription="新しいカテゴリーを追加"
          placeholder="カテゴリーを入力してください"
          value={category}
          setValue={setCategory}
          onSubmit={handleCategorySubmit}
          open={categoryOpen}
          setOpen={setCategoryOpen}
        />
        <FormTextArea label="メモの内容" name="content" placeholder="内容を記入してください" />
        <FormRadioGroup label="重要度" name="importance" options={importances} />
        <FormCheckboxGroup label="タグ" name="tags" options={[...(tags ?? [])]} />
        {tags?.length === 0 && <p>タグが登録されていません</p>}
        <MemoItemAddDialog
          buttonTitle="タグ追加"
          dialogTitle="Tag"
          dialogDescription="新しいタグを追加"
          placeholder="登録するタグを入力してください"
          value={tag}
          setValue={setTag}
          onSubmit={handleTagSubmit}
          open={tagOpen}
          setOpen={setTagOpen}
        />
        {/* ファイルアップロード・サムネイル */}
        {files && onFileChange && onFileUpload && onFileDelete && (
          <div className="my-4">
            <label className="block font-bold mb-2">画像アップロード</label>
            <FileUploader files={files} onChange={onFileChange} onUpload={onFileUpload} onError={imageError} />
            <FileThumbnail files={files} onDelete={onFileDelete} />
          </div>
        )}
        {form.formState.errors?.root && <p className="text-sm text-red-500">{form.formState.errors.root?.message}</p>}
        <div className="flex justify-center">
          <Button type="submit" className="w-32">
            送信
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};
