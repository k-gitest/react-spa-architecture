import { z } from 'zod';
import { validatedAccount, validatedAccountUpdate } from '@/schemas/account-schema';

export type Account = z.infer<typeof validatedAccount>;
export type AccountUpdate = z.infer<typeof validatedAccountUpdate>
