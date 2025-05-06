import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
import { Database } from '../_shared/database.types.ts';
import { PrismaClient } from '../../../generated/client/deno/edge.ts';

export interface Context {
  supabase: SupabaseClient<Database>;
  prisma: PrismaClient;
  req: Request;
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;

export async function createContext(opts: FetchCreateContextFnOptions) {
  const authHeader = opts.req.headers.get('Authorization')!;
  const token = authHeader.replace('Bearer ', '');
  if (!token) throw new Error(`トークンが見つかりませんでした`);

  // リクエストごとに Supabase クライアントを初期化し、認証ヘッダーを設定
  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    global: {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  });

  try {
    const { data, error } = await supabase.auth.getUser(token);
    if (error) throw error;
    console.log(`認証ユーザー： ${data}`);
  } catch (error) {
    console.log(`未認証ユーザー: ${error}`);
  }

  const prisma = new PrismaClient({
    datasourceUrl: Deno.env.get('DATABASE_URL'),
  });

  return {
    supabase,
    prisma,
    req: opts.req,
  } satisfies Context;
}
