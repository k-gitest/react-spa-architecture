import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useSessionStore } from '@/hooks/use-session-store';
import { useEffect } from 'react';
import { setSentryUserFromSession } from '@/lib/constants';

export const useSessionMonitor = () => {
  const setGlobalSession = useSessionStore((state) => state.setSession);
  const setInitialized = useSessionStore((state) => state.setInitialized);
  const queryClient = useQueryClient();

  // セッション取得をTanStack Queryで管理
  const { data: session, isLoading } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      // supabaseクライアントから取得する場合は以下を有効化する
      const { data: { session } } = await supabase.auth.getSession();
      return session;
      // edgeでredisから取得する場合は以下を有効化する
      /* 
      try {
        // Edge Function（Redis経由）から取得を試行
        const { data, error } = await supabase.functions.invoke('session', {
          method: 'GET',
        });

        if (error) throw error;

        // Rate Limit情報やキャッシュ情報をログ出力（オプション）
        if (data?.cached !== undefined) {
          console.log(`Session fetched: ${data.cached ? 'from cache' : 'fresh'}`);
        }

        return data.session;
      } catch (err) {
        // Edge Function失敗時はSupabaseクライアントから直接取得（フォールバック）
        console.warn('Failed to fetch session via Edge Function, falling back to Supabase client:', err);
        
        const { data: { session } } = await supabase.auth.getSession();
        return session;
      }
      */
    },
    staleTime: Infinity, // セッションは手動更新のみ
    gcTime: Infinity,
    refetchOnWindowFocus: false,
    retry: (failureCount, error) => {
      // Rate Limitエラーの場合はリトライしない
      if (error?.message?.includes('Rate limit exceeded')) {
        return false;
      }
      return failureCount < 3;
    },
  });

  // 初期化状態の管理（isLoadingのみを監視）
  useEffect(() => {
    if (!isLoading) {
      setInitialized(true);
    }
  }, [isLoading, setInitialized]);

  // Zustandストアと同期
  useEffect(() => {
    if (session !== undefined) {
      setGlobalSession(session);
      // sentryへ送信 初回ロード時またはキャッシュからの復元時
      setSentryUserFromSession(session);
    }
  }, [session, setGlobalSession]);

  // Supabaseの認証状態変更をリッスン
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      // キャッシュを更新
      queryClient.setQueryData(['auth', 'session'], newSession);
      setGlobalSession(newSession);
      // sentryへ送信 ログイン/ログアウト/リフレッシュ時
      setSentryUserFromSession(newSession);

      /* redis使用時に有効化
      // ログアウト時はEdge Function経由でRedisキャッシュも削除
      if (event === 'SIGNED_OUT') {
        try {
          // session-deleteファンクションを作成している場合
          await supabase.functions.invoke('session-delete', {
            method: 'DELETE',
          });
        } catch (error) {
          console.error('Failed to delete session cache:', error);
        }
      }
      */
    });

    return () => data.subscription.unsubscribe();
  }, [queryClient, setGlobalSession]);

  return { session, loading: isLoading };
};