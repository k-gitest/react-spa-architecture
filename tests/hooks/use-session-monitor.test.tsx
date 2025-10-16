import { waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { renderWithQueryClient } from '@tests/test-utils';
import { useSessionMonitor } from '@/hooks/use-session-monitor';
import { Session, AuthChangeEvent } from '@supabase/supabase-js';

// Supabaseのモック
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(),
    },
  },
}));

// Zustandストアのモック
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

// テストコンポーネント
const TestComponent = () => {
  const { session, loading } = useSessionMonitor();
  return (
    <div>
      <p data-testid="loading-status">{loading ? 'Loading...' : 'Done'}</p>
      <p data-testid="session-email">{session ? session.user.email : 'No session'}</p>
    </div>
  );
};

describe('useSessionMonitor', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('初期化時にgetSessionを呼び出し、セッションを取得する', async () => {
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

    const { getByTestId } = renderWithQueryClient(<TestComponent />);

    // ローディング状態の確認
    expect(getByTestId('loading-status').textContent).toBe('Loading...');

    // セッション取得完了を待つ
    await waitFor(() => {
      expect(getByTestId('loading-status').textContent).toBe('Done');
    });

    // セッション情報の確認
    expect(getByTestId('session-email').textContent).toBe('test@example.com');

    // Zustandストアが更新されたことを確認
    expect(mockSetSession).toHaveBeenCalledWith(mockSession);
    expect(mockSetInitialized).toHaveBeenCalledWith(true);
  });

  it('セッションが存在しない場合、nullが設定される', async () => {
    const unsubscribe = vi.fn();
    const supabase = (await import('@/lib/supabase')).supabase;

    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: null },
    });

    (supabase.auth.onAuthStateChange as any).mockImplementation(
      (cb: (event: AuthChangeEvent, session: Session | null) => void) => ({
        data: { subscription: { unsubscribe } },
      }),
    );

    const { getByTestId } = renderWithQueryClient(<TestComponent />);

    await waitFor(() => {
      expect(getByTestId('loading-status').textContent).toBe('Done');
    });

    expect(getByTestId('session-email').textContent).toBe('No session');
    expect(mockSetSession).toHaveBeenCalledWith(null);
    expect(mockSetInitialized).toHaveBeenCalledWith(true);
  });

  it('認証状態の変更（SIGNED_IN）が反映される', async () => {
    let authCallback: (event: any, session: Session | null) => void = () => {};
    const unsubscribe = vi.fn();
    const supabase = (await import('@/lib/supabase')).supabase;

    // 初期状態：セッションなし
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

    const { getByTestId } = renderWithQueryClient(<TestComponent />);

    // 初期状態（未認証）でローディングが完了するまで待つ
    await waitFor(() => {
      expect(getByTestId('loading-status').textContent).toBe('Done');
    });

    // 初期状態でNo sessionであることを確認
    expect(getByTestId('session-email').textContent).toBe('No session');

    // useSessionMonitorのuseEffectでsessionがnullで呼ばれる
    await waitFor(() => {
      expect(mockSetSession).toHaveBeenCalledWith(null);
    });

    // モックをクリア
    mockSetSession.mockClear();

    // 認証状態の変化（サインイン）をシミュレート
    authCallback('SIGNED_IN', mockSession);

    // セッションが更新されることを確認
    await waitFor(() => {
      expect(getByTestId('session-email').textContent).toBe('test@example.com');
    });

    // SIGNED_IN後にmockSessionで呼ばれたことを確認
    expect(mockSetSession).toHaveBeenCalledWith(mockSession);
  });

  it('認証状態の変更（SIGNED_OUT）が反映される', async () => {
    let authCallback: (event: any, session: Session | null) => void = () => {};
    const unsubscribe = vi.fn();
    const supabase = (await import('@/lib/supabase')).supabase;

    (supabase.auth.getSession as any).mockResolvedValue({
      data: { session: mockSession },
    });

    (supabase.auth.onAuthStateChange as any).mockImplementation(
      (cb: (event: AuthChangeEvent, session: Session | null) => void) => {
        authCallback = cb;
        return {
          data: { subscription: { unsubscribe } },
        };
      },
    );

    const { getByTestId } = renderWithQueryClient(<TestComponent />);

    // 初期状態（認証済み）の確認
    await waitFor(() => {
      expect(getByTestId('session-email').textContent).toBe('test@example.com');
    });

    // モックをクリア
    mockSetSession.mockClear();

    // ログアウトをシミュレート
    authCallback('SIGNED_OUT', null);

    // セッションがクリアされることを確認
    await waitFor(() => {
      expect(getByTestId('session-email').textContent).toBe('No session');
    });

    expect(mockSetSession).toHaveBeenCalledWith(null);
  });

  it('コンポーネントのアンマウント時にサブスクリプションが解除される', async () => {
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

    const { unmount } = renderWithQueryClient(<TestComponent />);

    await waitFor(() => {
      expect(mockSetInitialized).toHaveBeenCalledWith(true);
    });

    // アンマウント
    unmount();

    // サブスクリプションが解除されたことを確認
    expect(unsubscribe).toHaveBeenCalledTimes(1);
  });

  it('isLoadingがfalseになった時点でsetInitializedが呼ばれる', async () => {
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

    renderWithQueryClient(<TestComponent />);

    // ローディング完了時にsetInitializedが呼ばれることを確認
    await waitFor(() => {
      expect(mockSetInitialized).toHaveBeenCalledWith(true);
    });

    // setInitializedは1回だけ呼ばれる
    expect(mockSetInitialized).toHaveBeenCalledTimes(1);
  });

  it('getSessionでエラーが発生した場合でも初期化が完了する', async () => {
    const unsubscribe = vi.fn();
    const supabase = (await import('@/lib/supabase')).supabase;

    // getSessionがエラーを返す
    (supabase.auth.getSession as any).mockRejectedValueOnce(new Error('Network error'));

    (supabase.auth.onAuthStateChange as any).mockImplementation(
      (cb: (event: AuthChangeEvent, session: Session | null) => void) => ({
        data: { subscription: { unsubscribe } },
      }),
    );

    const { getByTestId } = renderWithQueryClient(<TestComponent />);

    // エラーが発生してもローディングが終了するまで待つ
    await waitFor(
      () => {
        const loadingText = getByTestId('loading-status').textContent;
        console.log('Loading status:', loadingText); // デバッグ用
        expect(loadingText).toBe('Done');
      },
      { timeout: 5000, interval: 100 }
    );

    // 初期化は完了する
    expect(mockSetInitialized).toHaveBeenCalledWith(true);
  });

  it('sessionがundefinedから値に変わった時にsetGlobalSessionが呼ばれる', async () => {
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

    renderWithQueryClient(<TestComponent />);

    // sessionがundefinedから値に変わるまで待つ
    await waitFor(() => {
      expect(mockSetSession).toHaveBeenCalledWith(mockSession);
    });

    // 正しい値で呼ばれていることを確認
    expect(mockSetSession).toHaveBeenCalledWith(mockSession);
  });
});