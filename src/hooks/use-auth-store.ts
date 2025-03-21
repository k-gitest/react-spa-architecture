import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';

interface AuthState {
  session: Session | null;
  setSession: (newSession: Session | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  setSession: (newSession) => set({ session: newSession }),
}));
