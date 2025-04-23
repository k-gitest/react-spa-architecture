import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Login from '@/pages/Login';
import { HelmetProvider } from 'react-helmet-async';
import { BrowserRouter } from 'react-router-dom';

// MainWrapper のモック
vi.mock('@/components/layout/main-wrapper', () => ({
  MainWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-wrapper">{children}</div>
  ),
}));

// AccountForm (TanStack) のモック
vi.mock('@/features/auth/components/auth-form-tanstack', () => ({
  AccountForm: ({ type }: { type: 'login' | 'register' }) => (
    <div data-testid={`account-form-tanstack-${type}`}>AccountForm (TanStack) - {type}</div>
  ),
}));

// AccountForm (TRPC) のモック
vi.mock('@/features/auth/components/auth-form-trpc', () => ({
  AccountForm: ({ type }: { type: 'login' | 'register' }) => (
    <div data-testid={`account-form-trpc-${type}`}>AccountForm (TRPC) - {type}</div>
  ),
}));

// react-router-dom の Link と BrowserRouter のモック
vi.mock('react-router-dom', () => {
    const original = vi.importActual('react-router-dom');
    return {
      ...original,
      Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
        <a href={to} data-testid="link-to-register">{children}</a>
      ),
      BrowserRouter: ({ children }: { children: React.ReactNode }) => (
        <div data-testid="browser-router">{children}</div>
      ),
    };
  });

describe('Login', () => {
  it('renders the main wrapper and both login forms', () => {
    render(
      <HelmetProvider>
        <Login />
      </HelmetProvider>,
      { wrapper: BrowserRouter } // Link コンポーネントを使用するため BrowserRouter でラップ
    );

    // MainWrapper が存在することを確認
    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();

    // TanStack のログインフォームが存在することを確認
    expect(screen.getByTestId('account-form-tanstack-login')).toBeInTheDocument();

    // TRPC のログインフォームが存在することを確認
    expect(screen.getByTestId('account-form-trpc-login')).toBeInTheDocument();
  });

  it('renders the registration link', () => {
    render(
      <HelmetProvider>
        <Login />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    // 新規登録へのリンクが存在することを確認
    const registerLink = screen.getByTestId('link-to-register');
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
    expect(registerLink).toHaveTextContent('新規登録ページ');
  });

  it('sets the correct page title and meta description', async () => {
    render(
      <HelmetProvider>
        <Login />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title?.textContent).toBe('Loginページ: React ⚛️ + Vite ⚡ + shadcn/ui');
    });

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe('メモアプリのユーザーログインページです');
    });
  });
});