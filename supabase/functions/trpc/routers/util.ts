import { z } from 'zod';
import { router, procedure } from '../trpc.ts';

export const utilRouter = router({
  hello: procedure.query(() => {
    return { message: 'Hello from tRPC in Supabase Edge Function!' };
  }),
  
  greet: procedure.input(z.string({ message: '文字列を入力して下さい' })).query((opts) => {
    return { greeting: `Hello, ${opts.input}!` };
  }),
});