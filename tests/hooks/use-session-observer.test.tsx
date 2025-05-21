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
const mockSetInitialized = vi.fn();

vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn((selector) =>
    selector({
      setSession: mockSetSession,
      setInitialized: mockSetInitialized,
    }),
  ),
}));

const mockSession = {
  access_token: 'mock-token',
  user: { id: '123', email: 'test@example.com' },
} as unknown as Session;

const TestComponent = () => {
  const { session, loading } = useSessionObserver();
  return (
    <div>
      <p>{loading ? 'Loading...' : 'Done'}</p>
      <p>{session ? session.user.email : 'No session'}</p>
    </div>
  );
};

describe('useSessionObserver (modified)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('getSessionで初期化される + グローバル状態を更新する', async () => {
    const unsubscribe = vi.fn();

    const supabase = (await import('@/lib/supabase')).supabase;
    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: mockSession },
    });

    (supabase.auth.onAuthStateChange as any).mockImplementation(
      (cb: (event: AuthChangeEvent, session: Session | null) => void) => ({
        data: { subscription: { unsubscribe } },
      }),
    );

    const { getByText } = render(<TestComponent />);

    await waitFor(() => {
      expect(getByText('test@example.com')).toBeTruthy();
    });

    expect(mockSetSession).toHaveBeenCalledWith(mockSession);
    expect(mockSetInitialized).toHaveBeenCalledWith(true);
    expect(getByText('Done')).toBeTruthy();
  });

  it('認証状態の変更が反映される（SIGNED_IN）', async () => {
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
      expect(getByText('No session')).toBeTruthy();
    });

    // 認証状態の変化（サインイン）
    authCallback('SIGNED_IN', mockSession);

    await waitFor(() => {
      expect(getByText('test@example.com')).toBeTruthy();
    });

    expect(mockSetSession).toHaveBeenCalledWith(null); // getSession 初期値
    expect(mockSetSession).toHaveBeenCalledWith(mockSession); // SIGNED_IN 後
    expect(mockSetInitialized).toHaveBeenCalledTimes(2); // getSession + authChange 両方で呼ばれる
  });
});
