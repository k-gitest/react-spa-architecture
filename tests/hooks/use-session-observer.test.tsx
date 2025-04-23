import { render, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useSessionObserver } from '@/hooks/use-session-observer';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}));

const mockSetSession = vi.fn();

vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn((selector) =>
    selector({
      setSession: mockSetSession,
    }),
  ),
}));

// ダミーのセッション
const mockSession = {
  access_token: 'mock-token',
  user: { id: '123', email: 'test@example.com' },
} as unknown as Session;

// テスト用のコンポーネント
const TestComponent = () => {
  const { session, loading } = useSessionObserver();
  return (
    <div>
      <p>{loading ? 'Loading...' : 'Done'}</p>
      <p>{session ? session.user.email : 'No session'}</p>
    </div>
  );
};

describe('useSessionObserver', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getSessionからセッションを設定し、グローバル状態を更新する', async () => {
    const unsubscribe = vi.fn();

    const supabase = (await import('@/lib/supabase')).supabase;
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: mockSession },
    });

    (supabase.auth.onAuthStateChange as any).mockReturnValue({
      data: { subscription: { unsubscribe } },
    });

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Done')).toBeTruthy();
      expect(getByText('test@example.com')).toBeTruthy();
    });

    expect(mockSetSession).toHaveBeenCalledWith(mockSession);
    expect(unsubscribe).not.toHaveBeenCalled(); // yet
  });

  it('認証状態の変更時にセッションを更新する', async () => {
    let authCallback: (event: any, session: Session | null) => void = () => {};

    const unsubscribe = vi.fn();

    const supabase = (await import('@/lib/supabase')).supabase;
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
    });

    (supabase.auth.onAuthStateChange as any).mockImplementation(
      (cb: (event: AuthChangeEvent, session: Session | null) => void) => {
        authCallback = cb;
        return {
          data: { subscription: { unsubscribe } },
        };
      },
    );

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('Done')).toBeTruthy();
      expect(getByText('No session')).toBeTruthy();
    });

    authCallback('SIGNED_IN', mockSession);

    await waitFor(() => {
      expect(getByText('test@example.com')).toBeTruthy();
    });

    expect(mockSetSession).toHaveBeenCalledWith(null); // 初期状態
    expect(mockSetSession).toHaveBeenCalledWith(mockSession); // SIGNED_IN 時
  });
});
