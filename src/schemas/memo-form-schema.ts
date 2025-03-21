import { z } from 'zod';

export const FormSchema = z.object({
  title: z.string().min(1, { message: "タイトルは一文字以上にしてください" }),
  content: z.string().min(1, { message: "内容は一文字以上にしてください" }),
  importance: z.string().refine(
    (value) => ['high', 'medium', 'low'].includes(value),
    { message: "有効な重要度を選択してください" }
  ),
  category: z.string().refine(
    (value) => ['memo', 'task', 'diary'].includes(value),
    { message: "有効なカテゴリを選択してください" }
  ),
  tag: z.array(z.string()).min(1, { message: "タグは必須です" }),
});

export const MemoSchema = FormSchema.extend({
  id: z.string(),
  user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});