import { useCallback, useEffect, useState } from 'react';
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
import { MemoCategory } from '@/features/memo/components/memo-category';
import { MemoTag } from '@/features/memo/components/memo-tag';
import { useMemos } from '@/features/memo/hooks/use-memo-queries-tanstack';

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

interface CategoryOptions {
  label: string;
  value: string;
}

interface TagsOptions {
  label: string;
  id: string;
}

interface Props {
  onSubmit: (data: MemoFormData) => void;
  initialValues?: MemoFormData;
  externalZodError?: FlattenFormatted | null;
}

export const MemoForm = ({ onSubmit, initialValues, externalZodError }: Props) => {
  const { fetchCategory, fetchTags } = useMemos();
  const { data: categoryData } = fetchCategory;
  const { data: tagsData } = fetchTags;
  const [categories, setCategories] = useState<CategoryOptions[] | null>(null);
  const [tags, setTags] = useState<TagsOptions[] | null>(null);

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

  useEffect(() => {
    if (categoryData) {
      const categoryOptions = categoryData.map((category) => ({
        label: category.name,
        value: String(category.id),
      }));
      setCategories(categoryOptions);
    }
  }, [categoryData]);

  useEffect(() => {
    if (tagsData) {
      const tagsOptions = tagsData.map((tag) => ({
        label: tag.name,
        id: String(tag.id),
      }));
      setTags(tagsOptions);
    }
  }, [tagsData]);

  return (
    <div className="flex justify-center">
      <FormWrapper onSubmit={handleSubmit} form={form}>
        <FormInput label="タイトル" name="title" placeholder="タイトルを入力してください" />
        <FormSelect label="カテゴリー" name="category" options={[...(categories ?? [])]} placeholder="カテゴリ選択" />
        <MemoCategory />
        <FormTextArea label="メモの内容" name="content" placeholder="内容を記入してください" />
        <FormRadioGroup label="重要度" name="importance" options={importances} />
        <FormCheckboxGroup label="タグ" name="tags" options={[...(tags ?? [])]} />
        {tags?.length === 0 && <p>タグが登録されていません</p>}
        <MemoTag />
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
