import { z } from "zod";

export const validatedProfile = z.object({
    avatar: z.string().nullable(),
    user_name: z.string().nullable(),
})