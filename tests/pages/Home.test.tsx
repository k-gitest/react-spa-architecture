import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/Home';
import { HelmetProvider } from 'react-helmet-async';

// モックの作成
vi.mock('@/components/layout/main-wrapper', () => ({
  MainWrapper: ({ children }: { children: React.ReactNode }) => <div data-testid="main-wrapper">{children}</div>,
}));

vi.mock('@/features/memo/components/memo-manager', () => ({
  MemoManager: () => <div data-testid="memo-manager">MemoManager</div>,
}));

vi.mock('@/features/memo/components/memo-manager-trpc', () => ({
  MemoManagerTrpc: () => <div data-testid="memo-manager-trpc">MemoManagerTrpc</div>,
}));

vi.mock('@/features/memo/components/memo-manager-tanstack', () => ({
  MemoManagerTanstack: () => <div data-testid="memo-manager-tanstack">MemoManagerTanstack</div>,
}));

describe('Home', () => {
  it('renders the main wrapper with all memo components', () => {
    render(
      <HelmetProvider>
        <Home />
      </HelmetProvider>
    );
    
    // MainWrapperが存在することを確認
    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();
    
    // 各メモ管理コンポーネントが存在することを確認
    expect(screen.getByTestId('memo-manager')).toBeInTheDocument();
    expect(screen.getByTestId('memo-manager-trpc')).toBeInTheDocument();
    expect(screen.getByTestId('memo-manager-tanstack')).toBeInTheDocument();
  });

  it('sets the correct page title and meta description', async () => {
    render(
      <HelmetProvider>
        <Home />
      </HelmetProvider>
    );

    await waitFor(() => {
      const helmet = document.querySelector('title');
      expect(helmet?.textContent).toBe('トップページ: React ⚛️ + Vite ⚡ + shadcn/ui');
    });

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe('React,vite,shadcn/uiで構築されたspaのメモapp');
    });
  });
});