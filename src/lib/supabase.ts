import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';
import { SUPABASE_URL, SUPABASE_ANON_KEY, BUCKET_NAME, BUCKET_PROFILE } from '@/lib/constants';

const supabaseUrl = SUPABASE_URL
const supabaseKey = SUPABASE_ANON_KEY
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const getImageUrl = (path: string) => {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${path}`;
};

const getAvatarUrl = (path: string) => {
  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_PROFILE}/${path}`;
};

export { supabase, getImageUrl, getAvatarUrl };
