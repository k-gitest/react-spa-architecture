import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages/Home';
import { HelmetProvider } from 'react-helmet-async';

// ContentHome のモック
vi.mock('@/components/content-home', () => ({
  ContentHome: () => <div data-testid="content-home">ContentHome Component</div>,
}));

describe('Home', () => {
  it('renders the ContentHome component', () => {
    render(
      <HelmetProvider>
        <Home />
      </HelmetProvider>
    );

    // ContentHome コンポーネントが描画されることを確認
    expect(screen.getByTestId('content-home')).toBeInTheDocument();
  });

  it('sets the correct page title and meta description', async () => {
    render(
      <HelmetProvider>
        <Home />
      </HelmetProvider>
    );

    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title?.textContent).toBe('トップページ: React ⚛️ + Vite ⚡ + shadcn/ui');
    });

    await waitFor(() => {
      const meta = document.querySelector('meta[name="description"]');
      expect(meta?.getAttribute('content')).toBe('React,vite,shadcn/uiで構築されたspaのメモapp');
    });
  });
});
