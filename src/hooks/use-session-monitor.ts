import { useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';
import { useSessionStore } from '@/hooks/use-session-store';
import { useEffect } from 'react';

export const useSessionMonitor = () => {
  const setGlobalSession = useSessionStore((state) => state.setSession);
  const setInitialized = useSessionStore((state) => state.setInitialized);
  const queryClient = useQueryClient();

  // セッション取得をTanStack Queryで管理
  const { data: session, isLoading } = useQuery({
    queryKey: ['auth', 'session'],
    queryFn: async () => {
      const { data: { session } } = await supabase.auth.getSession();
      return session;
    },
    staleTime: Infinity, // セッションは手動更新のみ
    gcTime: Infinity,
    refetchOnWindowFocus: false,
  });

  // Zustandストアと同期
  useEffect(() => {
    if (session !== undefined) {
      setGlobalSession(session);
      if (!isLoading) {
        setInitialized(true);
      }
    }
  }, [session, isLoading, setGlobalSession, setInitialized]);

  // Supabaseの認証状態変更をリッスン
  useEffect(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      // キャッシュを更新
      queryClient.setQueryData(['auth', 'session'], newSession);
      setGlobalSession(newSession);
    });

    return () => data.subscription.unsubscribe();
  }, [queryClient, setGlobalSession]);

  return { session, loading: isLoading };
};