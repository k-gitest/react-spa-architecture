import {z} from 'zod'
import { validatedAccount } from '@/schemas/account-schema'

export type Account = z.infer<typeof validatedAccount>