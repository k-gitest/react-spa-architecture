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

// withBehaviorVariant に渡す各フォームをモック
vi.mock('@/features/auth/components/auth-form', () => ({
  AccountForm: ({ type }: { type: 'login' | 'register' }) => (
    <div data-testid={`account-form-default-${type}`}>AccountForm (Default) - {type}</div>
  ),
}));

vi.mock('@/features/auth/components/auth-form-tanstack', () => ({
  AccountForm: ({ type }: { type: 'login' | 'register' }) => (
    <div data-testid={`account-form-tanstack-${type}`}>AccountForm (TanStack) - {type}</div>
  ),
}));

vi.mock('@/features/auth/components/auth-form-trpc', () => ({
  AccountForm: ({ type }: { type: 'login' | 'register' }) => (
    <div data-testid={`account-form-trpc-${type}`}>AccountForm (TRPC) - {type}</div>
  ),
}));

// useBehaviorVariant のモック
vi.mock('@/hooks/use-behavior-variant', () => ({
  useBehaviorVariant: () => ({
    getCurrentVariant: () => ({ id: 'default', name: '標準' }),
    toggleVariant: vi.fn(),
  }),
}));

describe('Register Page', () => {
  it('MainWrapper と default の登録フォームを表示する', () => {
    render(
      <HelmetProvider>
        <Register />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('account-form-default-register')).toBeInTheDocument();
  });

  it('ログインページへのリンクが表示されている', () => {
    render(
      <HelmetProvider>
        <Register />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    const loginLink = screen.getByRole('link', { name: /ログインページ/ });
    expect(loginLink).toBeInTheDocument();
    expect(loginLink).toHaveAttribute('href', '/login');
  });

  it('ページタイトルと meta description が正しく設定されている', async () => {
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
      const meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute('content')).toBe('メモアプリのユーザー新規登録ページです');
    });
  });
});
