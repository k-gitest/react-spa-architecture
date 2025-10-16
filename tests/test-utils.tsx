import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React, { ReactNode } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, RenderOptions, RenderResult } from '@testing-library/react';

/**
 * queryClientWrapper
 *
 * テスト用のラッパーコンポーネントです。
 * - React Query（@tanstack/react-query）の QueryClientProvider
 * - React Router の MemoryRouter
 * でchildrenをラップします。
 *
 * 主に「react-query」や「react-router」を利用するコンポーネントやカスタムフックのテストで、
 * 必要なProviderをまとめて適用したい場合に使用します。
 */
export const queryClientWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
      },
    },
  });
  return ({ children }: { children: ReactNode }) => (
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </MemoryRouter>
  );
};

/**
 * renderWithQueryClient
 *
 * @param ui - テスト対象のReact要素
 * @param options - @testing-library/react の render オプション（wrapper以外）
 * @returns RenderResult
 *
 * テスト対象が「react-query」や「react-router」に依存している場合に、
 * 必要なProviderで自動的にラップしてレンダリングします。
 *
 * 例:
 *   import { renderWithQueryClient } from '@tests/test-utils';
 *   renderWithQueryClient(<MyComponent />);
 *
 * 通常のrenderの代わりに使うことで、Providerの重複記述を防げます。
 */
export const renderWithQueryClient = (
  ui: React.ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
): RenderResult =>
  render(ui, { wrapper: queryClientWrapper(), ...options });