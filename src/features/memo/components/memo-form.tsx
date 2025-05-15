import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/features/memo/schemas/memo-form-schema';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import { Button } from '@/components/ui/button';
import {
  FormWrapper,
  FormInput,
  FormTextArea,
  FormSelect,
  FormCheckboxGroup,
  FormRadioGroup,
} from '@/components/form/form-parts';
import { z } from 'zod';
import { syncZodErrors } from '@/lib/trpc';
import { MemoItemAddDialog } from '@/features/memo/components/memo-item-add-dialog';

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

type FlattenFormatted = z.inferFlattenedErrors<typeof FormSchema>;

interface CategoryOption {
  label: string;
  value: string;
}

interface TagOption {
  label: string;
  id: string;
}

interface Props {
  onSubmit: (data: MemoFormData) => void;
  initialValues?: MemoFormData;
  externalZodError?: FlattenFormatted | null;
  categories: CategoryOption[] | null;
  tags: TagOption[] | null;
  category: string;
  setCategory: (value: string) => void;
  tag: string;
  setTag: (value: string) => void;
  handleCategorySubmit: () => void;
  handleTagSubmit: () => void;
  categoryOpen: boolean;
  setCategoryOpen: (open: boolean) => void;
  tagOpen: boolean;
  setTagOpen: (open: boolean) => void;
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
}: Props) => {
  const form = useForm<MemoFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues || defaultMemoFormData,
  });

  const handleSubmit = useCallback(
    (data: MemoFormData) => {
      onSubmit(data);
    },
    [onSubmit],
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
