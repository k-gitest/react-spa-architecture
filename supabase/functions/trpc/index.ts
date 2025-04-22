import { Hono } from 'hono';
import { createContext } from './context.ts';
import { appRouter } from './router.ts';
import { trpcServer } from '@hono/trpc-server';
import { TRPCError } from '@trpc/server';
import { ZodErrorMapper } from './utils/zod-error-mappers.ts';
import { corsMiddleware } from '../_shared/cors.ts';

ZodErrorMapper;

const app = new Hono();
app.use('/trpc/*', corsMiddleware);
app.use(
  '/trpc/*',
  trpcServer({
    router: appRouter,
    createContext,
    onError: ({ error }: { error: TRPCError }) => {
      console.error('tRPC Error:', error);
    },
  }),
);

Deno.serve(app.fetch);
