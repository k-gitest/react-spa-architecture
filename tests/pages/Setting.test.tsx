import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import Setting from '@/pages/Setting';
import { HelmetProvider } from 'react-helmet-async';

// MainWrapper のモック
vi.mock('@/components/layout/main-wrapper', () => ({
  MainWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="main-wrapper">{children}</div>
  ),
}));

// SettingManager のモック
vi.mock('@/features/settings/components/setting-manager', () => ({
  SettingManager: () => <div data-testid="setting-manager">SettingManager</div>,
}));

describe('Setting', () => {
  it('renders the main wrapper and the setting manager', () => {
    render(
      <HelmetProvider>
        <Setting />
      </HelmetProvider>
    );

    // MainWrapper が存在することを確認
    expect(screen.getByTestId('main-wrapper')).toBeInTheDocument();

    // SettingManager が存在することを確認
    expect(screen.getByTestId('setting-manager')).toBeInTheDocument();
  });

  it('sets the correct page title and meta description', async () => {
    render(
      <HelmetProvider>
        <Setting />
      </HelmetProvider>
    );

    await waitFor(() => {
      const title = document.querySelector('title');
      expect(title?.textContent).toBe('Settingページ: React ⚛️ + Vite ⚡ + shadcn/ui');
    });

    await waitFor(() => {
      const metaDescription = document.querySelector('meta[name="description"]');
      expect(metaDescription?.getAttribute('content')).toBe('メモアプリのユーザー設定のページです');
    });
  });
});