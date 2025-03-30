import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export interface Context {
  supabase: SupabaseClient;
  req: Request;
}

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function createContext(opts: FetchCreateContextFnOptions) {
  return {
    supabase,
    req: opts.req,
  } satisfies Context;
}