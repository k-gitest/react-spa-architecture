import { render, screen } from '@testing-library/react';
import { Layout } from '@/components/layout/layout';
import { ReactNode } from 'react';
import { vi } from 'vitest';

describe('Layout Component', () => {
  it('ヘッダー、メインラッパー、フッター、トースターがレンダリングされること', () => {
    vi.mock('@/components/layout/header', () => ({
      Header: () => <header data-testid="header">Header</header>,
    }));
    vi.mock('@/components/layout/main-wrapper', () => ({
      MainWrapper: ({ children }: { children: ReactNode }) => (
        <main data-testid="main-wrapper">{children}</main>
      ),
    }));
    vi.mock('@/components/layout/footer', () => ({
      Footer: () => <footer data-testid="footer">Footer</footer>,
    }));
    vi.mock('@/components/ui/toaster', () => ({
      Toaster: () => <div data-testid="toaster">Toaster</div>,
    }));

    const MockChildren = () => <div data-testid="children">Children Content</div>;

    render(
      <Layout>
        <MockChildren />
      </Layout>
    );

    expect(screen.getByTestId('header')).toBeInTheDocument();
    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('footer')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  it('children prop が MainWrapper 内にレンダリングされること', () => {
    vi.mock('@/components/layout/header', () => ({
      Header: () => <header data-testid="header">Header</header>,
    }));
    vi.mock('@/components/layout/main-wrapper', () => ({
      MainWrapper: ({ children }: { children: ReactNode }) => (
        <main data-testid="main-wrapper">{children}</main>
      ),
    }));
    vi.mock('@/components/layout/footer', () => ({
      Footer: () => <footer data-testid="footer">Footer</footer>,
    }));
    vi.mock('@/components/ui/toaster', () => ({
      Toaster: () => <div data-testid="toaster">Toaster</div>,
    }));

    const MockChildren = () => <div data-testid="children">Children Content</div>;

    render(
      <Layout>
        <MockChildren />
      </Layout>
    );

    expect(screen.getByTestId('children')).toBeInTheDocument();
    expect(screen.getByTestId('main-wrapper')).toContainElement(screen.getByTestId('children'));
  });
});