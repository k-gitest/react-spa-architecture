import { createClient } from 'https://esm.sh/@supabase/supabase-js';
import { initSentry, captureSentryError } from "../_shared/sentry.ts";

type CleanupDeleteImage = {
  id: number;
  file_path: string;
  resolved: boolean;
  error_message: string | null;
};

type CleanupResult = { id: number; status: "success" | "error"; error?: string };

// Cronジョブなのでバックエンド側でSentry初期化
// ✅ ユーザー情報は設定しない（Cronジョブのため）
initSentry();

Deno.serve(async (_req) => {
  const startTime = Date.now();
  let totalRecords = 0;
  
  try {
    // 環境変数チェック
    const SUPABASE_URL = Deno.env.get('SUPABASE_URL');
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
    const BUCKET_IMAGES = Deno.env.get('BUCKET_IMAGES');

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY || !BUCKET_IMAGES) {
      throw new Error('環境変数が不足しています');
    }

    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // レコード取得
    const { data: records, error } = await supabase
      .from('cleanup_delete_images')
      .select('*')
      .eq('resolved', false);

    if (error) {
      throw new Error(`cleanup_delete_images取得エラー: ${error.message}`);
    }

    if (!records || records.length === 0) {
      console.log('削除対象のレコードがありません');
      return new Response(JSON.stringify({ message: '削除対象なし' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    totalRecords = records.length;
    console.log(`${totalRecords}件のファイルを処理開始`);

    // ファイル削除処理
    const results = await Promise.allSettled<CleanupResult>(
      records.map(async (record: CleanupDeleteImage) => {
        const { error } = await supabase.storage
          .from(BUCKET_IMAGES)
          .remove([record.file_path]);

        if (error) {
          console.error(`削除エラー [${record.file_path}]:`, error);
          
          // ✅ 個別削除エラーのみSentryに送信（処理は続行されるため）
          captureSentryError(new Error(`ファイル削除エラー: ${record.file_path}`), {
            function: 'cleanup-image-delete',
            type: 'storage-delete-error',
            recordId: record.id,
            filePath: record.file_path,
            errorMessage: error.message,
          });
          
          await supabase
            .from('cleanup_delete_images')
            .update({ error_message: error.message })
            .eq('id', record.id);
          
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

    // 処理結果のサマリー
    const successCount = results.filter(r => r.status === 'fulfilled' && r.value.status === 'success').length;
    const errorCount = results.filter(r => r.status === 'fulfilled' && r.value.status === 'error').length;
    const duration = Date.now() - startTime;
    
    console.log(`クリーンアップ完了: 成功=${successCount}, 失敗=${errorCount}, 処理時間=${duration}ms`);

    return new Response(JSON.stringify({ 
      success: true,
      totalRecords,
      successCount,
      errorCount,
      duration,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    // ✅ 最上位で一括してSentryに送信
    console.error('予期しないエラー:', error);
    
    captureSentryError(error as Error, {
      function: 'cleanup-image-delete',
      type: 'cron-job-error',
      jobInfo: {
        executedAt: new Date().toISOString(),
        totalRecords,
        duration: Date.now() - startTime,
      },
    });
    
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
});