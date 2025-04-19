import { router } from './trpc.ts';
import { memoRouter } from './routers/memo.ts';
import { authRouter } from './routers/auth.ts';
import { utilRouter } from './routers/util.ts';
import { profileRouter } from './routers/profile.ts';
import { accontRouter } from "./routers/account.ts";

// 各サブルーターをまとめたメインルーター
export const appRouter = router({
  memo: memoRouter,
  auth: authRouter,
  util: utilRouter,
  profile: profileRouter,
  account: accontRouter,
});

export type AppRouter = typeof appRouter;
