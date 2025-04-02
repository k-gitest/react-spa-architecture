import { z } from 'zod';

export const validatedAccount = z.object({
  email: z.string().email({ message: 'emailアドレスは有効なアドレスを入力してください' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上にしてください' }),
});
