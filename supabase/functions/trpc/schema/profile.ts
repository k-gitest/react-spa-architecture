import { z } from 'zod';

export const profileFormSchema = z.object({
  avatar: z.string().nullable(),
  user_name: z.string().nullable(),
});

export const uploadAvatarInput = z.object({
  file: z.string(),
  folderName: z.string(),
  extention: z.string(),
});
