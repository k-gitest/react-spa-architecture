import { render, screen, fireEvent } from '@testing-library/react';
import { SettingManager } from '@/features/settings/components/setting-manager';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// useBehaviorVariantのモック
vi.mock('@/hooks/use-behavior-variant', () => ({
  useBehaviorVariant: () => ({
    getCurrentVariant: () => ({ id: 'default' }) // デフォルトのバリアントを返す
  })
}));

// プロフィール関連のモックを修正
vi.mock('@/features/profile/components/profile-manager', () => ({
  ProfileManager: () => <div data-testid="profile-manager">プロフィール</div>
}));

vi.mock('@/features/profile/components/profile-manager-tanstack', () => ({
  ProfileManager: () => <div data-testid="profile-manager-tanstack">プロフィール</div>,
  ProfileManagerTanstack: () => <div data-testid="profile-manager-tanstack">プロフィール</div>
}));

vi.mock('@/features/profile/components/profile-manager-trpc', () => ({
  ProfileManager: () => <div data-testid="profile-manager-trpc">プロフィール</div>,
  ProfileManagerTRPC: () => <div data-testid="profile-manager-trpc">プロフィール</div>
}));

// アカウント関連のモックを修正
vi.mock('@/features/account/components/account-manager', () => ({
  AccountManager: () => <div data-testid="account-manager">アカウント</div>
}));

vi.mock('@/features/account/components/account-manager-tanstack', () => ({
  AccountManager: () => <div data-testid="account-manager-tanstack">アカウント</div>,
  AccountManagerTanstack: () => <div data-testid="account-manager-tanstack">アカウント</div>
}));

vi.mock('@/features/account/components/account-manager-trpc', () => ({
  AccountManager: () => <div data-testid="account-manager-trpc">アカウント</div>,
  AccountManagerTRPC: () => <div data-testid="account-manager-trpc">アカウント</div>
}));

// アカウントコンポーネントのモックを修正
vi.mock('@/features/account/components/account-manager', () => ({
  AccountManager: () => (
    <div data-testid="account-manager">
      <h2 className="flex justify-center">アカウント設定</h2>
      <div className="flex justify-center">
        <div className="w-96 flex flex-col gap-2">
          <p>メール：</p>
          <p>最終ログイン：</p>
          <div className="text-center">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary-foreground h-10 px-4 py-2 bg-red-700 hover:bg-red-800"
            >
              アカウント削除
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}));

// withBehaviorVariantは実際の実装をそのまま使用
vi.mock('@/components/withBehaviorVariant', async () => {
  const actual = await vi.importActual<typeof import('@/components/withBehaviorVariant')>(
    '@/components/withBehaviorVariant'
  );
  return actual;
});

describe('SettingManager', () => {
  const queryClient = new QueryClient();

  beforeAll(() => {
    // hasPointerCapture メソッドをモック
    if (!HTMLElement.prototype.hasPointerCapture) {
      HTMLElement.prototype.hasPointerCapture = function () {
        return false;
      };
    }
    // 他のJSDOMに不足しているポインター関連APIもモック
    if (!HTMLElement.prototype.setPointerCapture) {
      HTMLElement.prototype.setPointerCapture = function () {};
    }

    if (!HTMLElement.prototype.releasePointerCapture) {
      HTMLElement.prototype.releasePointerCapture = function () {};
    }

    // scrollIntoView メソッドをモック
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = function () {};
    }

    // window.matchMedia を Vitest 形式でモック
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(min-width: 768px)', // 条件を任意に調整
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('初期表示時にプロフィールコンポーネントが表示される', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SettingManager />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // プロフィールコンポーネントのみチェック
    await expect(screen.findByTestId('profile-manager')).resolves.toBeInTheDocument();
  });

  it('アカウントボタンをクリックするとアカウント設定が表示される', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SettingManager />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // 初期状態でプロフィールが表示されていることを確認
    expect(await screen.findByTestId('profile-manager')).toBeInTheDocument();
    
    // アカウントボタンをクリック
    const accountButton = screen.getByRole('button', { name: 'アカウント' });    
    fireEvent.click(accountButton);

    // アカウントコンテンツが表示されることを確認（data-testidで特定）
    const accountContent = await screen.findByTestId('account-manager');
    expect(accountContent).toBeInTheDocument();
    
    // プロフィールが非表示になっていることを確認
    expect(screen.queryByTestId('profile-manager')).not.toBeInTheDocument();
  });

  it('プロフィールボタンをクリックするとプロフィールコンポーネントが表示される', async () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SettingManager />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // アカウントボタンをクリック
    const accountButton = screen.getByRole('button', { name: 'アカウント' });
    fireEvent.click(accountButton);

    // アカウントコンポーネントが表示されるのを待つ
    const accountManager = await screen.findByTestId('account-manager');
    expect(accountManager).toBeInTheDocument();

    // プロフィールボタンをクリック
    const profileButton = screen.getByRole('button', { name: 'プロフィール' });
    fireEvent.click(profileButton);

    // プロフィールコンポーネントが表示されるのを待つ
    const profileManager = await screen.findByTestId('profile-manager');
    expect(profileManager).toBeInTheDocument();

    // アカウントコンポーネントが非表示になっていることを確認
    expect(screen.queryByTestId('account-manager')).not.toBeInTheDocument();
  });

  it('ボタンが正しく表示されていることを確認する', () => {
    render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SettingManager />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // ボタンの存在確認をroleとnameで行う
    expect(screen.getByRole('button', { name: 'プロフィール' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'アカウント' })).toBeInTheDocument();
  });

  it('レイアウト構造が期待通りであることを確認する', () => {
    const { container } = render(
      <MemoryRouter>
        <QueryClientProvider client={queryClient}>
          <SettingManager />
        </QueryClientProvider>
      </MemoryRouter>
    );

    // コンテナがflex layoutを使用していることを確認
    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('w-full');
    expect(mainContainer).toHaveClass('flex');
    expect(mainContainer).toHaveClass('gap-4');

    // サイドバーがflex-colを使用していることを確認
    const sidebar = mainContainer?.firstChild;
    expect(sidebar).toHaveClass('flex');
    expect(sidebar).toHaveClass('flex-col');
    expect(sidebar).toHaveClass('gap-2');

    // コンテンツエリアがw-fullを持っていることを確認
    const contentArea = mainContainer?.childNodes[1];
    expect(contentArea).toHaveClass('w-full');
  });
});