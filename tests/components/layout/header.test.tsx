import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from '@/components/layout/header';

vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn(),
}));

vi.mock('@/components/mode-toggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

vi.mock('@/components/variant-toggle', () => ({
  VariantToggle: () => <div data-testid="variant-toggle">Variant Toggle</div>,
}));

import { useSessionStore } from '@/hooks/use-session-store';

describe('Header Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('セッションがない場合はログインと新規登録リンクが表示される', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // タイトル確認
    expect(screen.getByText('React ⚛️ + Vite ⚡ + shadcn/ui')).toBeInTheDocument();

    // 共通ナビゲーション
    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Fetch')).toBeInTheDocument();

    // セッションなしのリンク
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    expect(screen.getByText('新規登録')).toBeInTheDocument();

    // カスタムコンポーネントの表示
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('variant-toggle')).toBeInTheDocument();
  });

  it('セッションがある場合はダッシュボードリンクが表示され、ログイン・新規登録リンクは非表示', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: '1', name: 'テストユーザー' } } })
    );

    render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );

    // ダッシュボードリンクが表示される
    expect(screen.getByText('ダッシュボード')).toBeInTheDocument();

    // ログイン、新規登録リンクは表示されない
    expect(screen.queryByText('ログイン')).not.toBeInTheDocument();
    expect(screen.queryByText('新規登録')).not.toBeInTheDocument();

    // カスタムコンポーネントの表示
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('variant-toggle')).toBeInTheDocument();
  });
});
