import { createClient } from 'https://esm.sh/@supabase/supabase-js';

type CleanupDeleteImage = {
  id: number;
  file_path: string;
  resolved: boolean;
  error_message: string | null;
};

Deno.serve(async (_req) => {
  const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
  const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  const BUCKET_IMAGES = Deno.env.get('BUCKET_IMAGES');

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !BUCKET_IMAGES) {
    console.error('環境変数が不足しています');
    return new Response('環境変数が不足しています', { status: 500 });
  }

  const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

  const { data: records, error } = await supabase.from('cleanup_delete_images').select('*').eq('resolved', false);

  if (error) {
    console.error('cleanup_delete_images:', error);
    return new Response(JSON.stringify({ error: 'データが取得できませんでした' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!records) {
    return new Response(JSON.stringify({ error: 'レコードが取得できませんでした' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const _result = await Promise.allSettled(
    records.map(async (record: CleanupDeleteImage) => {
      const { error } = await supabase.storage.from(BUCKET_IMAGES).remove([record.file_path]);

      if (error) {
        console.error(`削除エラー [${record.file_path}]:`, error);
        await supabase.from('cleanup_delete_images').update({ error_message: error.message }).eq('id', record.id);
        return { id: record.id, status: 'error', error: error.message };
      } else {
        await supabase
          .from('cleanup_delete_images')
          .update({ resolved: true, error_message: null })
          .eq('id', record.id);
        return { id: record.id, status: 'success' };
      }
    }),
  );

  return new Response('ok', { status: 200, headers: { 'Content-Type': 'application/json' } });
});
