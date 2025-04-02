import { z } from 'zod';

export const clientConfigSchema = z.object({
  baseUrl: z.string().url({ message: 'baseUrlはURLの文字列を設定してください' }).optional(),
  timeout: z
    .number({ message: 'timeoutは数値を設定してください' })
    .positive({ message: 'timeoutは1以上の値を設定してください' })
    .optional(),
  maxRetry: z
    .number({ message: 'maxRetryは数値を設定してください' })
    .positive({ message: 'maxRetryは1以上の値を設定してください' })
    .optional(),
  retryDelay: z
    .number({ message: 'retryDelayは数値を設定してください' })
    .positive({ message: 'retryDelayは1以上の値を設定してください' })
    .optional(),
  baseBackoff: z
    .number({ message: 'baseBackoffは数値を設定してください' })
    .positive({ message: 'baseBackoffは1以上の値を設定してください' })
    .optional(),
  retryStatus: z.array(z.number(), { message: 'retryStatusは数値の配列に設定してください' }).optional(),
  retryMethods: z.array(z.string(), { message: 'retryMethodsは文字列の配列に設定してください' }).optional(),
});
