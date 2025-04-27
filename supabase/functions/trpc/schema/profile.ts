import { z } from 'zod';

export const profileFormSchema = z.object({
  avatar: z.string().nullable().optional(),
  user_name: z.string().nullable().optional(),
});

export const uploadAvatarInput = z.object({
  file: z.string(),
  folderName: z.string(),
  extention: z.string(),
});
