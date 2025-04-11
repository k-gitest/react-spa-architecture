import { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

export const setLocalStorageAccessToken = (accessToken: string) => {
  localStorage.setItem('supabase.auth.token', accessToken);
};

export const removeLocalStorageAccessToken = () => {
  const projectId = import.meta.env.VITE_PROJECT_ID;
  localStorage.removeItem('supabase.auth.token');
  localStorage.removeItem(`sb-${projectId}-auth-token`);
};

export const getLocalStorageAccessToken = () => {
  const projectId = import.meta.env.VITE_PROJECT_ID;
  return localStorage.getItem(`sb-${projectId}-auth-token`);
}

export const setSupabaseSession = (session: Session) => {
  supabase.auth.setSession(session);
};

export const handleAuthSuccess = (session: Session, navigate: (path: string) => void, path: string) => {
  setSupabaseSession(session);
  navigate(path);
};
