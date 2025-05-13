import { create } from 'zustand';
import { Session } from '@supabase/supabase-js';

export interface AuthState {
  session: Session | null;
  isInitialized: boolean;
  setSession: (newSession: Session | null) => void;
  setInitialized: (value: boolean) => void;
}

export const useSessionStore = create<AuthState>((set) => ({
  session: null,
  isInitialized: false,
  setSession: (newSession) => set({ session: newSession }),
  setInitialized: (value) => set({ isInitialized: value }),
}));
