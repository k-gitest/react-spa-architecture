import { z } from 'zod';
export declare const memoFormSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    importance: z.ZodEffects<z.ZodString, string, string>;
    category: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
}, "strip", z.ZodTypeAny, {
    content?: string;
    title?: string;
    tags?: string[];
    importance?: string;
    category?: string;
}, {
    content?: string;
    title?: string;
    tags?: string[];
    importance?: string;
    category?: string;
}>;
export declare const memoSchema: z.ZodObject<z.objectUtil.extendShape<{
    title: z.ZodString;
    content: z.ZodString;
    importance: z.ZodEffects<z.ZodString, string, string>;
    category: z.ZodString;
    tags: z.ZodArray<z.ZodString, "many">;
}, {
    id: z.ZodString;
    user_id: z.ZodString;
    created_at: z.ZodString;
    updated_at: z.ZodString;
}>, "strip", z.ZodTypeAny, {
    id?: string;
    content?: string;
    title?: string;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
    tags?: string[];
    importance?: string;
    category?: string;
}, {
    id?: string;
    content?: string;
    title?: string;
    created_at?: string;
    updated_at?: string;
    user_id?: string;
    tags?: string[];
    importance?: string;
    category?: string;
}>;
export declare const categorySchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
export declare const tagSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name?: string;
}, {
    name?: string;
}>;
