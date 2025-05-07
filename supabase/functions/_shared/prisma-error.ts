import { Prisma } from '../../../generated/client/deno/edge.ts';

// Prisma エラークラス
export class PrismaError extends Error {
  constructor(error: unknown, message: string = 'エラーが発生しました') {
    super(message);
    this.name = 'PrismaError';
    this.cause = error;
  }
}

export type PrismaErrorType = {
  type: 'known' | 'init' | 'validation' | 'unknown' | 'panic';
  code?: string;
  message: string;
  target?: string[] | null;
};

export const prismaErrorHandler = (error: PrismaError): PrismaErrorType => {
  if (error.cause instanceof Prisma.PrismaClientKnownRequestError) {
    return {
      type: 'known',
      code: error.cause.code,
      message: 'データベースエラーが発生しました。',
      target: (error.cause.meta?.target as string[]) ?? null,
    };
  }
  if (error.cause instanceof Prisma.PrismaClientInitializationError) {
    return {
      type: 'init',
      message: '初期化に失敗しました。',
    };
  }
  if (error.cause instanceof Prisma.PrismaClientValidationError) {
    return {
      type: 'validation',
      message: '入力内容に誤りがあります。',
    };
  }
  if (error.cause instanceof Prisma.PrismaClientUnknownRequestError) {
    return {
      type: 'unknown',
      message: '不明なデータベースエラーが発生しました。',
    };
  }
  if (error.cause instanceof Prisma.PrismaClientRustPanicError) {
    return {
      type: 'panic',
      message: '重大な内部エラーが発生しました。',
    };
  }

  return {
    type: 'unknown',
    message: '予期せぬエラーが発生しました。',
  };
};
