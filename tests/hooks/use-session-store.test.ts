import { describe, it, expect, beforeEach } from 'vitest';
import { useSessionStore } from '@/hooks/use-session-store';
import { Session } from '@supabase/supabase-js';

// Zustand の状態を毎回リセットするためのヘルパー（必須！）
const resetStore = () => {
  const initialState = {
    session: null,
    setSession: (newSession: Session | null) => useSessionStore.setState({ session: newSession }),
  };
  useSessionStore.setState(initialState);
};

describe('useSessionStore', () => {
  beforeEach(() => {
    resetStore(); // 各テスト前に状態をリセット
  });

  it('初期セッションはnullにする', () => {
    const state = useSessionStore.getState();
    expect(state.session).toBeNull();
  });

  it('セッションを正しく更新する', () => {
    const mockSession = { user: { id: '123' } } as unknown as Session;

    useSessionStore.getState().setSession(mockSession);
    const state = useSessionStore.getState();
    expect(state.session).toEqual(mockSession);
  });

  it('セッションをnullに戻す', () => {
    const mockSession = { user: { id: '123' } } as unknown as Session;
    useSessionStore.getState().setSession(mockSession);
    useSessionStore.getState().setSession(null);
    const state = useSessionStore.getState();
    expect(state.session).toBeNull();
  });
});
