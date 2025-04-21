import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/schemas/memo-form-schema';
import { MemoFormData } from '@/types/memo-form-data';
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

const importances = [
  { value: 'high', label: '大' },
  { value: 'medium', label: '中' },
  { value: 'low', label: '小' },
] as const;

const categories = [
  { value: 'memo', label: 'メモ' },
  { value: 'task', label: 'タスク' },
  { value: 'diary', label: '日記' },
] as const;

const tagItems = [
  { id: 'recents', label: 'Recents' },
  { id: 'home', label: 'Home' },
  { id: 'applications', label: 'Applications' },
  { id: 'desktop', label: 'Desktop' },
  { id: 'downloads', label: 'Downloads' },
  { id: 'documents', label: 'Documents' },
] as const;

const defaultMemoFormData = {
  title: '',
  content: '',
  importance: 'high',
  category: '',
  tags: [],
};

type FlattenFormatted = z.inferFlattenedErrors<typeof FormSchema>;

interface Props {
  onSubmit: (data: MemoFormData) => void;
  initialValues?: MemoFormData;
  externalZodError?: FlattenFormatted | null;
}

export const MemoForm = ({ onSubmit, initialValues, externalZodError }: Props) => {
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
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  useEffect(() => {
    syncZodErrors(form, externalZodError)
  }, [externalZodError, form]);

  return (
    <div className="flex justify-center">
      <FormWrapper onSubmit={handleSubmit} form={form}>
        <FormInput label="タイトル" name="title" placeholder="タイトルを入力してください" />
        <FormSelect label="カテゴリー" name="category" options={categories} placeholder="カテゴリ選択" />
        <FormTextArea label="メモの内容" name="content" placeholder="内容を記入してください" />
        <FormRadioGroup label="重要度" name="importance" options={importances} />
        <FormCheckboxGroup label="タグ" name="tags" options={tagItems} />
        {form.formState.errors.root && <p className="text-sm text-red-500">{form.formState.errors.root.message}</p>}
        <div className="flex justify-center">
          <Button type="submit" className="w-32">
            送信
          </Button>
        </div>
      </FormWrapper>
    </div>
  );
};
