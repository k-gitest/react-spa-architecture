import { z } from 'zod';

export const memoFormSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  importance: z.string().refine((value) => ['high', 'medium', 'low'].includes(value)),
  category: z.string().refine((value) => ['memo', 'task', 'diary'].includes(value)),
  tag: z.array(z.string()).min(1),
});