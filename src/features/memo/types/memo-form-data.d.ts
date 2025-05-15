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
export type Category = z.infer<typeof MemoCategorySchema>;
export type Tag = z.infer<typeof MemoTagSchema>;
export type CategoryOutput = z.infer<typeof CategorySchema>;
export type TagOutput = z.infer<typeof TagSchema>;
