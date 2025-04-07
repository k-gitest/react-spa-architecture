import { z } from 'zod';
import { validatedAccount } from '@/schemas/account-schema';

export type Account = z.infer<typeof validatedAccount>;

export type AccountUpdate = {
  email?: string;
  password?: string;
};
