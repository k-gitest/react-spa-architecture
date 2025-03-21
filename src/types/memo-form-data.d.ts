import { z } from 'zod';
import { FormSchema } from '@/schemas/memo-form-schema';
import { MemoSchema } from '@/schemas/memo-form-schema';

//export interface MemoListSchema extends z.infer<typeof FormSchema> {}
export type MemoFormData = z.infer<typeof FormSchema>;
export type Memo = z.infer<typeof MemoSchema>;