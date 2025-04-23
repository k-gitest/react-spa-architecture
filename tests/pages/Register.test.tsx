import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Register from '@/pages/Register';
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
      <a href={to} data-testid="link-to-login">{children}</a>
    ),
    BrowserRouter: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="browser-router">{children}</div>
    ),
  };
});

describe('Register', () => {
  it('renders the main wrapper and both register forms', () => {
    render(
      <HelmetProvider>
        <Register />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    // MainWrapper が存在することを確認
    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();

    // TanStack の登録フォームが存在することを確認
    expect(screen.getByTestId('account-form-tanstack-register')).toBeInTheDocument();

    // TRPC の登録フォームが存在することを確認
    expect(screen.getByTestId('account-form-trpc-register')).toBeInTheDocument();
  });

  it('renders the login link', () => {
    render(
      <HelmetProvider>
        <Register />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    // ログインへのリンクが存在することを確認
    const loginLink = screen.getByTestId('link-to-login');
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
    expect(loginLink).toHaveTextContent('ログインページ');
  });

  it('sets the correct page title and meta description', async () => {
    render(
      <HelmetProvider>
        <Register />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title?.textContent).toBe('新規登録ページ: React ⚛️ + Vite ⚡ + shadcn/ui');
    });

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe('メモアプリのユーザー新規登録ページです');
    });
  });
});