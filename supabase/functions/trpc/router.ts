import { router } from './trpc.ts';
import { memoRouter } from './routers/memo.ts';
import { authRouter } from './routers/auth.ts';
import { utilRouter } from './routers/util.ts';

// 各サブルーターをまとめたメインルーター
export const appRouter = router({
  memo: memoRouter,
  auth: authRouter,
  util: utilRouter,
});

export type AppRouter = typeof appRouter;