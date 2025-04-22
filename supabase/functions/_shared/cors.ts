import { cors } from 'https://deno.land/x/hono@v3.11.2/middleware.ts';

const allowedOrigins = ['http://localhost:3000'];
const domainUrl = Deno.env.get('DOMAIN_URL');
if (domainUrl) allowedOrigins.push(domainUrl);

export const corsMiddleware = cors({
  origin: allowedOrigins,
  allowHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey'],
  allowMethods: ['GET', 'POST', 'OPTIONS'],
  credentials: false,
});
