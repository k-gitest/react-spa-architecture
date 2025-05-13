import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useSessionStore } from '@/hooks/use-session-store';
import { Session } from '@supabase/supabase-js';

export const useSessionObserver = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const setGlobalSession = useSessionStore((state) => state.setSession);
  const setInitialized = useSessionStore((state) => state.setInitialized);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setGlobalSession(session);
      setLoading(true);
      setInitialized(true);
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setGlobalSession(session);
      setLoading(true);
      setInitialized(true);
    });

    return () => data.subscription.unsubscribe();
  }, [setGlobalSession]);

  return { session, loading };
};
