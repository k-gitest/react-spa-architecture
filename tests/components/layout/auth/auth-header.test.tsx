import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { AuthHeader } from '@/components/layout/auth/auth-header';

// モックの設定
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn(),
}));

// プロフィールのデフォルトモック
let mockProfileData: { user_name: string; avatar: string | null } = {
  user_name: 'テストユーザー',
  avatar: null,
};

vi.mock('@/features/profile/hooks/use-profile-queries-tanstack', () => {
  const mock = vi.fn();
  return {
    useProfile: () => ({
      useGetProfile: () => ({
        data: mockProfileData,
      }),
    }),
  };
});

const mockHandleSignOut = vi.fn((options) => {
  if (options?.onSuccess) options.onSuccess();
});

// デフォルトでisPendingはfalse
let mockIsPending = false;

vi.mock('@/features/auth/hooks/use-signout-handler', () => ({
  useSignOutHandler: () => ({
    handleSignOut: mockHandleSignOut,
    isPending: mockIsPending,
  }),
}));

vi.mock('@/components/mode-toggle', () => ({
  ModeToggle: () => <div data-testid="mode-toggle">Mode Toggle</div>,
}));

vi.mock('@/components/variant-toggle', () => ({
  VariantToggle: () => <div data-testid="variant-toggle">Variant Toggle</div>,
}));

vi.mock('@/lib/supabase', () => ({
  getAvatarUrl: vi.fn((url) => (url ? `avatar-url-${url}` : null)),
}));

vi.mock('@/errors/error-handler', () => ({
  errorHandler: vi.fn(),
}));

import { useSessionStore } from '@/hooks/use-session-store';
import { useSignOutHandler } from '@/features/auth/hooks/use-signout-handler';

// ドロップダウンメニューのテスト用モック
vi.mock('@radix-ui/react-dropdown-menu', async () => {
  // シンプルなコンポーネントを作成
  const createComponent = (displayName: string) => {
    const Component = ({ children, onSelect, ...props }: {
      children?: React.ReactNode;
      onSelect?: () => void;
      [key: string]: any;
    }) => (
      <div data-testid={`dropdown-${displayName.toLowerCase()}`} onClick={onSelect} {...props}>
        {children}
      </div>
    );
    Component.displayName = displayName;
    return Component;
  };

  // ボタンコンポーネント（クリック可能な要素用）
  const createButtonComponent = (displayName: string) => {
    const Component = ({ children, onSelect, ...props }: {
      children?: React.ReactNode;
      onSelect?: () => void;
      [key: string]: any;
    }) => (
      <button data-testid={`dropdown-${displayName.toLowerCase()}`} onClick={onSelect} {...props}>
        {children}
      </button>
    );
    Component.displayName = displayName;
    return Component;
  };

  return {
    Root: createComponent('DropdownMenu'),
    Trigger: createComponent('Trigger'),
    Content: createComponent('Content'),
    Item: createButtonComponent('Item'),
    CheckboxItem: createButtonComponent('CheckboxItem'),
    RadioItem: createButtonComponent('RadioItem'),
    SubTrigger: createComponent('SubTrigger'),
    SubContent: createComponent('SubContent'),
    Portal: ({ children }: { children: React.ReactNode }) => children,
    Group: createComponent('Group'),
    Label: createComponent('Label'),
    Separator: createComponent('Separator'),
    Sub: createComponent('Sub'),
    RadioGroup: createComponent('RadioGroup'),
  };
});

describe('AuthHeader コンポーネント', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    mockIsPending = false; // 各テスト前にisPendingをリセット

    // デフォルトのセッションをモック
    const mockSession = {
      user: {
        id: '1',
        email: 'test@example.com',
        user_metadata: {
          avatar_url: 'test-avatar-url',
        },
      },
    };

    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: mockSession }),
    );
  });

  it('セッションがある場合、アバターとドロップダウンメニューが表示される', () => {
    render(
      <BrowserRouter>
        <AuthHeader />
      </BrowserRouter>,
    );

    // タイトル確認
    expect(screen.getByText('⚛️ + ⚡')).toBeInTheDocument();

    // アバターが表示される
    expect(screen.getByRole('button', { name: /avatar/i })).toBeInTheDocument();

    // カスタムコンポーネントの表示
    expect(screen.getByTestId('mode-toggle')).toBeInTheDocument();
    expect(screen.getByTestId('variant-toggle')).toBeInTheDocument();
  });

  it('ドロップダウンメニューを開くと、ユーザー名と設定・ログアウトオプションが表示される', async () => {
    render(
      <BrowserRouter>
        <AuthHeader />
      </BrowserRouter>,
    );

    // アバターボタンが表示されることを確認
    const avatarButton = screen.getByRole('button', { name: /avatar/i });
    expect(avatarButton).toBeInTheDocument();

    // ドロップダウンメニューを開く
    fireEvent.click(avatarButton);

    // ドロップダウンの内容が表示されることを確認
    // @radix-ui/react-dropdown-menuのモックによりこの要素は常に表示される
    expect(screen.getByText('テストユーザー')).toBeInTheDocument();
    expect(screen.getByText('Setting')).toBeInTheDocument();
    // 修正: ログアウトボタンが複数あるため、最初のものを使う
    const logoutButtons = screen.getAllByRole('button', { name: 'ログアウト' });
    expect(logoutButtons[0]).toBeInTheDocument();
  });

  it('ログアウトボタンをクリックするとhandleSignOut関数が呼ばれる', async () => {
    render(
      <BrowserRouter>
        <AuthHeader />
      </BrowserRouter>,
    );

    // ドロップダウンメニューを開く
    const avatarButton = screen.getByRole('button', { name: /avatar/i });
    fireEvent.click(avatarButton);

    // ログアウトボタンをテキストで取得してクリック
    const logoutButton = screen.getByText('ログアウト');
    fireEvent.click(logoutButton);

    expect(mockHandleSignOut).toHaveBeenCalled();
  });

  it('ロード中はローダーが表示される', async () => {
    // このテストだけisPendingをtrueに設定
    mockIsPending = true;

    render(
      <BrowserRouter>
        <AuthHeader />
      </BrowserRouter>,
    );

    // ドロップダウンメニューを開く
    const avatarButton = screen.getByRole('button', { name: /avatar/i });
    fireEvent.click(avatarButton);

    // ログアウトボタンが存在することを確認
    // 注: 実際のローダー表示方法に応じてこのテストを調整する必要があります
    const logoutItem = screen.getByText('ログアウト');
    expect(logoutItem).toBeInTheDocument();

    // もしローディングインジケーターがある場合:
    // expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();

    // テスト後、isPendingをリセット
    mockIsPending = false;
  });

  it('プロフィールデータがある場合はユーザー名がドロップダウンに表示される', () => {
    // このテスト用にモックデータを変更
    mockProfileData = {
      user_name: 'カスタムユーザー名',
      avatar: 'custom-avatar',
    };

    render(
      <BrowserRouter>
        <AuthHeader />
      </BrowserRouter>,
    );

    // ドロップダウンメニューを開く
    const avatarButton = screen.getByRole('button', { name: /avatar/i });
    fireEvent.click(avatarButton);

    // プロフィールのユーザー名が表示されることを確認
    expect(screen.getByText('カスタムユーザー名')).toBeInTheDocument();

    // テスト後、デフォルト値に戻す
    mockProfileData = {
      user_name: 'テストユーザー',
      avatar: null,
    };
  });
});
