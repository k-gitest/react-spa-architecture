import { z } from 'zod';
import { FormSchema } from '@/schemas/memo-form-schema';

//export interface MemoFormData extends z.infer<typeof FormSchema> {}
export type MemoFormData = z.infer<typeof FormSchema>;