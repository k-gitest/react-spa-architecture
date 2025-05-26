import { z } from 'zod';
export declare const profileFormSchema: z.ZodObject<{
    avatar: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    user_name: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, "strip", z.ZodTypeAny, {
    avatar?: string;
    user_name?: string;
}, {
    avatar?: string;
    user_name?: string;
}>;
export declare const uploadAvatarInput: z.ZodObject<{
    file: z.ZodString;
    folderName: z.ZodString;
    extention: z.ZodString;
}, "strip", z.ZodTypeAny, {
    file?: string;
    folderName?: string;
    extention?: string;
}, {
    file?: string;
    folderName?: string;
    extention?: string;
}>;
