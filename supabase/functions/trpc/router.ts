import { router } from './trpc.ts';
import { memoRouter } from './routers/memo.ts';
import { authRouter } from './routers/auth.ts';
import { utilRouter } from './routers/util.ts';
import { profileRouter } from './routers/profile.ts';

// 各サブルーターをまとめたメインルーター
export const appRouter = router({
  memo: memoRouter,
  auth: authRouter,
  util: utilRouter,
  profile: profileRouter,
});

export type AppRouter = typeof appRouter;
