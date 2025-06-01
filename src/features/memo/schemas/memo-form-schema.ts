import { z } from 'zod';

export const FormSchema = z.object({
  title: z.string().min(1, { message: 'タイトルは一文字以上にしてください' }),
  content: z.string().min(1, { message: '内容は一文字以上にしてください' }),
  importance: z
    .string()
    .refine((value) => ['high', 'medium', 'low'].includes(value), { message: '有効な重要度を選択してください' }),
  category: z.string({ message: '有効なカテゴリを選択してください' }),
  tags: z.array(z.string()).min(1, { message: 'タグは必須です' }),
  // 新規アップロード画像のID配列
  image_ids: z.array(z.string()).optional(),
  // 既存のアップロード済み画像（編集・表示用）
  images: z
    .array(
      z.object({
        file_path: z.string().optional(),
        file_name: z.string().optional(),
        image_id: z.string(),
        order: z.number(),
        alt_text: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
  // 新規アップロード画像のメタ情報（alt_text, descriptionのみ）
  // files: File[]とindexで対応
  fileMetadata: z
    .array(
      z.object({
        alt_text: z.string().optional(),
        description: z.string().optional(),
      }),
    )
    .optional(),
});

export const MemoSchema = FormSchema.extend({
  id: z.string(),
  user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const MemoCategorySchema = z.object({
  name: z.string(),
});

export const CategorySchema = MemoCategorySchema.extend({
  id: z.number(),
  user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const MemoTagSchema = z.object({
  name: z.string(),
});

export const TagSchema = MemoTagSchema.extend({
  id: z.number(),
  user_id: z.string(),
  created_at: z.string(),
  updated_at: z.string(),
});
