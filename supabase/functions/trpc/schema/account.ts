import { z } from 'zod';

export const accountFormSchema = z.object({
  email: z.string().email({ message: 'emailアドレスは有効なアドレスを入力してください' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上にしてください' }),
});

export const accountUpdateFormSchema = z.object({
  email: z.string().email({ message: 'emailアドレスは有効なアドレスを入力してください' }).optional(),
  password: z.string().min(6, { message: 'パスワードは6文字以上にしてください' }).optional(),
});
