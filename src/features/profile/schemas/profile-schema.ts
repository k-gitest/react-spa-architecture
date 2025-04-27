import { z } from "zod";

export const validatedProfile = z.object({
    avatar: z.string().nullable().optional(),
    user_name: z.string().nullable().optional(),
})