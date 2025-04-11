import { initTRPC } from '@trpc/server';
import { Context } from './context.ts';
import { ZodError } from 'zod';
import { mapPostgrestErrorCodeToTRPCErrorCode } from './utils/error-mappers.ts';
import { AuthApiError, PostgrestError } from "@supabase/supabase-js";

// tRPCインスタンスの作成とエラーフォーマッターの設定
export const t = initTRPC.context<Context>().create({
  // エラーフォーマットの作成
  errorFormatter(opts) {
    const { shape, error } = opts;
    return {
      ...shape,
      data: {
        ...shape.data,
        code: mapPostgrestErrorCodeToTRPCErrorCode(error.code),
        cause: error,
        message: error.message,
        name: error.name,
        postgrestError: error.cause instanceof PostgrestError && error.cause.name === "PostgrestError" ? error.cause : null,
        authError: error.cause instanceof AuthApiError && error.cause.name === "AuthApiError" ? error.cause : null,
        zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

export const router = t.router;
export const procedure = t.procedure;