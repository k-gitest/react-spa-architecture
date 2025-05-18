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

// 各 AuthForm のモック
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

// useBehaviorVariant のモック（default を返すようにする）
vi.mock('@/hooks/use-behavior-variant', () => ({
  useBehaviorVariant: () => ({
    getCurrentVariant: () => ({ id: 'default', name: '標準' }),
    toggleVariant: vi.fn(),
  }),
}));

describe('Login Page', () => {
  it('MainWrapper と default のログインフォームを表示する', () => {
    render(
      <HelmetProvider>
        <Login />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('account-form-default-login')).toBeInTheDocument();
  });

  it('新規登録ページへのリンクが表示されている', () => {
    render(
      <HelmetProvider>
        <Login />
      </HelmetProvider>,
      { wrapper: BrowserRouter }
    );

    const registerLink = screen.getByRole('link', { name: /新規登録ページ/ });
    expect(registerLink).toBeInTheDocument();
    expect(registerLink).toHaveAttribute('href', '/register');
  });

  it('ページタイトルと meta description が正しく設定されている', async () => {
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
      const meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute('content')).toBe('メモアプリのユーザーログインページです');
    });
  });
});
