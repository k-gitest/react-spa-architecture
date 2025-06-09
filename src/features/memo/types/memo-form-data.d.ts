import { z } from 'zod';
import {
  FormSchema,
  MemoSchema,
  MemoCategorySchema,
  MemoTagSchema,
  CategorySchema,
  TagSchema,
} from '@/features/memo/schemas/memo-form-schema';

// memo-formで使用するスキーマの型定義
export type MemoFormData = z.infer<typeof FormSchema>;

// memosテーブルから取得したデータで使用するスキーマの型定義
// FormSchemmaをベースにid, user_id, created_at, updated_atを追加しfileMetadataを除外
export type Memo = z.infer<typeof MemoSchema>;

// memo-formのpropsで使用する型定義
export interface MemoFormProps {
  onSubmit: (data: MemoFormData, files?: File[]) => void;
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
  // ファイル関連props
  files?: File[];
  onFileChange?: (files: File[]) => void;
  onFileUpload?: (files: File[]) => Promise<string[]>;
  onFileDelete?: (index: number) => void;
  imageError?: string | null;
}

// memo-item-managerで使用するスキーマの型定義
export type Category = z.infer<typeof MemoCategorySchema>;
export type Tag = z.infer<typeof MemoTagSchema>;

// categoriesテーブルから取得したデータで使用するスキーマの型定義
// MemoCategorySchemaをベースにid, user_id, created_at, updated_atを追加
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

// categories, tagsテーブルから取得したデータから必要データのみに加工しstate格納する型定義
export interface CategoryOption {
  label: string;
  value: string;
}
export interface TagOption {
  label: string;
  id: string;
}

// trpcでのzodエラーをフラット化した型定義
export type FlattenFormatted = z.inferFlattenedErrors<typeof FormSchema>;

// memo-formで使用するファイルアップロード関連のprops型定義
export interface MemoFormFileProps {
  files: File[];
  onFileChange: (files: File[]) => void;
  onFileUpload: (files: File[]) => Promise<void>;
  onFileDelete: (index: number) => void;
  imageError?: string | null;
}

// imagesテーブルのデータ型定義
export interface Image {
  created_at: string;
  file_name: string;
  file_path: string;
  file_size: number | null;
  id: string;
  mime_type: string | null;
  storage_object_id: string | null;
  updated_at: string;
  user_id: string;
}

// ファイルアップロード時の画像メタデータ型定義
export interface ImageMetadata {
  image_id: string;
  order: number;
  file_path?: string | undefined;
  file_name?: string | undefined;
  alt_text?: string | undefined;
  description?: string | undefined;
}
