import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import About from '@/pages/About';
import { HelmetProvider } from 'react-helmet-async';

// MainWrapper のモック
vi.mock('@/components/layout/main-wrapper', () => ({
  MainWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-wrapper">{children}</div>
  ),
}));

describe('About', () => {
  it('renders the main wrapper and about content', () => {
    render(
      <HelmetProvider>
        <About />
      </HelmetProvider>
    );

    // MainWrapper が存在することを確認
    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();

    // "About" の見出しが存在することを確認
    expect(screen.getByRole('heading', { name: 'About', level: 2 })).toBeInTheDocument();

    // 説明のテキストが存在することを確認
    expect(screen.getByText('このアプリはreactとviteとshadcn/uiで開発されています')).toBeInTheDocument();
    expect(
      screen.getByText('react-hook-formとzodとshadcn/uiのフォームコンポーネントを使用したメモアプリです。')
    ).toBeInTheDocument();
  });

  it('sets the correct page title and meta description', async () => {
    render(
      <HelmetProvider>
        <About />
      </HelmetProvider>
    );

    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title?.textContent).toBe('Aboutページ: React ⚛️ + Vite ⚡ + shadcn/ui');
    });

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe(
        'このメモアプリはReactとViteとshadcn/uiで開発されています'
      );
    });
  });
});