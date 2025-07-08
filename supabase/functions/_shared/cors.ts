import { cors } from 'npm:hono@^4.0.0/cors';

const allowedOrigins = ['http://localhost:5173', 'http://localhost:3000'];
const domainUrl = Deno.env.get('DOMAIN_URL');
console.log(domainUrl, 'domainUrl');
if (domainUrl) allowedOrigins.push(domainUrl);

export const corsMiddleware = cors({
  origin: allowedOrigins,
  allowHeaders: ['Content-Type', 'Authorization', 'x-client-info', 'apikey'],
  allowMethods: ['GET', 'POST', 'PUT', 'OPTIONS'],
  credentials: false,
});

export const corsHeaders = {
  'Access-Control-Allow-Origin': Deno.env.get('DOMAIN_URL') ?? 'http://localhost:5173',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, GET, PUT, OPTIONS',
  'Content-Type': 'application/json',
};
