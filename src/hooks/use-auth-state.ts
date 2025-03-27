import { useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/hooks/use-auth-store';

export const useAuthState = () => {
  const setGlobalSession = useAuthStore((state) => state.setSession);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setGlobalSession(session);
    });

    const { data } = supabase.auth.onAuthStateChange((_, session) => {
      setGlobalSession(session);
    });

    return () => data.subscription.unsubscribe();
  }, []);
}


