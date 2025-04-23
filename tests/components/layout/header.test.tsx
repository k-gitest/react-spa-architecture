import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/components/layout/header';

// モックの設定
vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn(),
}));

vi.mock('@/features/auth/hooks/use-auth-queries-tanstack', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/features/auth/hooks/use-auth-queries-trpc', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/components/mode-toggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

vi.mock('lucide-react', () => ({
  Loader: () => <div data-testid="loader">Loading...</div>,
}));

// テストで使用するモックの実装
import { useSessionStore } from '@/hooks/use-session-store';
import { useAuth } from '@/features/auth/hooks/use-auth-queries-tanstack';
import { useAuth as useAuthTRPC } from '@/features/auth/hooks/use-auth-queries-trpc';

describe('Header Component', () => {
  const mockSignOutMutate = vi.fn();
  const mockSignOutTRPCMutate = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    // モックの設定をリセット
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);
    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      signOutMutation: {
        mutate: mockSignOutMutate,
        isPending: false,
      },
    });
    (useAuthTRPC as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      signOutMutation: {
        mutate: mockSignOutTRPCMutate,
        isPending: false,
      },
    });
  });

  it('ヘッダーが正しくレンダリングされること', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // ヘッダータイトルが表示されるか確認
    expect(screen.getByText('React ⚛️ + Vite ⚡ + shadcn/ui')).toBeInTheDocument();

    // 基本のナビゲーションリンクが表示されるか確認
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Fetch')).toBeInTheDocument();

    // ModeToggleが表示されるか確認
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
  });

  it('セッションがない場合はログインと新規登録リンクが表示されること', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // ログインと新規登録リンクが表示されるか確認
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    expect(screen.getByText('新規登録')).toBeInTheDocument();

    // セッション関連のリンクが表示されていないことを確認
    expect(screen.queryByText('Setting')).not.toBeInTheDocument();
    expect(screen.queryByText('ログアウト')).not.toBeInTheDocument();
  });

  it('セッションがある場合は設定とログアウトリンクが表示されること', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: '1', name: 'Test User' } } }),
    );

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // 設定とログアウトリンクが表示されるか確認
    expect(screen.getByText('Setting')).toBeInTheDocument();
    expect(screen.getAllByText('ログアウト')[0]).toBeInTheDocument();
    expect(screen.getAllByText('ログアウト')[1]).toBeInTheDocument();

    // ログインと新規登録リンクが表示されていないことを確認
    expect(screen.queryByText('ログイン')).not.toBeInTheDocument();
  });

  it('ログアウトボタンをクリックするとmutateが呼び出されること', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: '1', name: 'Test User' } } }),
    );

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // ログアウトボタンをクリック
    const logoutLinks = screen.getAllByText('ログアウト');
    fireEvent.click(logoutLinks[0]);

    // mutateが呼び出されたことを確認
    expect(mockSignOutMutate).toHaveBeenCalledTimes(1);
  });

  it('TRPCログアウトボタンをクリックするとTRPC mutateが呼び出されること', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: '1', name: 'Test User' } } }),
    );

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // TRPCログアウトボタンをクリック
    const logoutLinks = screen.getAllByText('ログアウト');
    fireEvent.click(logoutLinks[1]);

    // TRPC mutateが呼び出されたことを確認
    expect(mockSignOutTRPCMutate).toHaveBeenCalledTimes(1);
  });

  it('ログアウト処理中はローディングアイコンが表示されること', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: '1', name: 'Test User' } } }),
    );

    (useAuth as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      signOutMutation: {
        mutate: mockSignOutMutate,
        isPending: true,
      },
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // ローディングアイコンが表示されているか確認
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // Button自体にdata-testidを追加し、属性チェック
    const logoutLinks = screen.getAllByRole('link', { name: /ログアウト/ });

    // 1つ目のログアウトリンクには disabled がある
    expect(logoutLinks[0]).toHaveAttribute('disabled');

    // 2つ目のログアウトリンクには disabled がない
    expect(logoutLinks[1]).not.toHaveAttribute('disabled');
  });

  it('TRPCログアウト処理中はローディングアイコンが表示されること', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: '1', name: 'Test User' } } }),
    );

    (useAuthTRPC as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      signOutMutation: {
        mutate: mockSignOutTRPCMutate,
        isPending: true,
      },
    });

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>,
    );

    // TRPCローディングアイコンが表示されることを確認
    expect(screen.getByTestId('loader')).toBeInTheDocument();

    // ボタンが無効化されていることを確認 - 修正版
    const logoutLinks = screen.getAllByRole('link', { name: /ログアウト/ });

    // 1つ目のログアウトリンクには disabled がない
    expect(logoutLinks[0]).not.toHaveAttribute('disabled');

    // 2つ目のログアウトリンクには disabled がある（TRPCの方）
    expect(logoutLinks[1]).toHaveAttribute('disabled');
  });
});
