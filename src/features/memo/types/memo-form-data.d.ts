import { z } from 'zod';
import {
  FormSchema,
  MemoSchema,
  MemoCategorySchema,
  MemoTagSchema,
  CategorySchema,
  TagSchema,
} from '@/features/memo/schemas/memo-form-schema';

//export interface MemoListSchema extends z.infer<typeof FormSchema> {}
export type MemoFormData = z.infer<typeof FormSchema>;
export type Memo = z.infer<typeof MemoSchema>;

export interface MemoFormProps {
  onSubmit: (data: MemoFormData) => void;
  initialValues?: MemoFormData;
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
  externalZodError?: FlattenFormatted | null;
}

export type Category = z.infer<typeof MemoCategorySchema>;
export type Tag = z.infer<typeof MemoTagSchema>;
export type CategoryOutput = z.infer<typeof CategorySchema>;
export type TagOutput = z.infer<typeof TagSchema>;

// memo-item-managerが受け取るprops.operationsのデータ取得・操作機能の型定義
export type MemoOperations = {
  fetchData: { data?: CategoryOutput[] | TagOutput[] | null };
  addItem: (data: { name: string; user_id: string }) => Promise<void>;
  updateItem: (data: { id: number; name: string }) => Promise<void>;
  deleteItem: (id: number) => Promise<void>;
  useGetItem: (id: number | null) => { data?: CategoryOutput | TagOutput | null };
};

export interface CategoryOption {
  label: string;
  value: string;
}
export interface TagOption {
  label: string;
  id: string;
}

export type FlattenFormatted = z.inferFlattenedErrors<typeof FormSchema>;