import { useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '@/schemas/memo-form-schema';
import { MemoFormData } from '@/types/memo-form-data';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { FormInput, FormTextArea, FormSelect, FormCheckboxGroup, FormRadioGroup } from '@/components/form/form-parts';

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
  tag: [],
};

interface Props {
  onSubmit: (data: MemoFormData) => void;
  initialValues?: MemoFormData;
}

export const MemoForm = ({ onSubmit, initialValues }: Props) => {
  const form = useForm<MemoFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: initialValues || defaultMemoFormData,
  });

  const handleSubmit = useCallback((data: MemoFormData) => {
    onSubmit(data);
    form.reset();
  }, [onSubmit]);

  useEffect(() => {
    if (initialValues) {
      form.reset(initialValues);
    }
  }, [initialValues, form]);

  return (
    <div className="flex justify-center">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6 p-1">
          <FormInput label="タイトル" placeholder="タイトルを入力してください" name="title" />
          <FormSelect label="カテゴリー" options={categories} placeholder="カテゴリ選択" name="category" />
          <FormTextArea label="メモの内容" placeholder="内容を記入してください" name="content" />
          <FormRadioGroup label="重要度" options={importances} name="importance" />
          <FormCheckboxGroup label="タグ" options={tagItems} name="tag" />

          <div className="flex justify-center">
            <Button type="submit" className="w-32">
              送信
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

