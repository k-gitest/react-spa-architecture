import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/database.types';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'http://localhost:54321';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'dummy-anon-key';
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

const getImageUrl = (path: string) => {
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${import.meta.env.VITE_BUCKET_NAME}/${path}`;
}

const getAvatarUrl = (path: string) => {
    return `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/${import.meta.env.VITE_BUCKET_PROFILE}/${path}`;
}

export { supabase, getImageUrl, getAvatarUrl };
