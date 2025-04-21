import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createContext } from './context.ts';
import { appRouter } from './router.ts';
import { trpcServer } from '@hono/trpc-server';
import { TRPCError } from '@trpc/server';
import { ZodErrorMapper } from './utils/zod-error-mappers.ts';

ZodErrorMapper

const app = new Hono();
app.use(
  '/trpc/*',
  cors({
    origin: ['http://localhost:3000', Deno.env.get('DOMAIN_URL')!],
    allowHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey'],
    allowMethods: ['GET', 'POST', 'OPTIONS'],
    credentials: false,
  }),
);
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
