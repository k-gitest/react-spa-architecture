import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/hooks/use-auth-store';
import { Session } from '@supabase/supabase-js';

export const useAuthState = () => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);
  const setGlobalSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setGlobalSession(session);
      setLoading(false);
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
      setGlobalSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, [setGlobalSession]);

  return { session, loading };
};
