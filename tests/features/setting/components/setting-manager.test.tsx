import { render, screen, fireEvent } from '@testing-library/react';
import { SettingManager } from '@/features/settings/components/setting-manager';
import { describe, it, expect, vi } from 'vitest';

// モックコンポーネント
vi.mock('@/features/profile/components/profile-manager', () => ({
  ProfileManager: () => <div data-testid="profile-manager">プロフィールマネージャー</div>
}));

vi.mock('@/features/profile/components/profile-manager-trpc', () => ({
  ProfileManager: () => <div data-testid="profile-manager-trpc">プロフィールマネージャーTRPC</div>
}));

vi.mock('@/features/account/components/account-manager', () => ({
  AccountManager: () => <div data-testid="account-manager">アカウントマネージャー</div>
}));

vi.mock('@/features/account/components/account-manager-trpc', () => ({
  AccountManager: () => <div data-testid="account-manager-trpc">アカウントマネージャーTRPC</div>
}));

describe('SettingManager', () => {
  it('初期表示時にプロフィールコンポーネントが表示される', () => {
    render(<SettingManager />);
    
    // プロフィール関連のコンポーネントが表示されていることを確認
    expect(screen.getByTestId('profile-manager')).toBeInTheDocument();
    expect(screen.getByTestId('profile-manager-trpc')).toBeInTheDocument();
    
    // アカウント関連のコンポーネントが表示されていないことを確認
    expect(screen.queryByTestId('account-manager')).not.toBeInTheDocument();
    expect(screen.queryByTestId('account-manager-trpc')).not.toBeInTheDocument();
  });

  it('アカウントボタンをクリックするとアカウントコンポーネントが表示される', () => {
    render(<SettingManager />);
    
    // アカウントボタンをクリック
    const accountButton = screen.getByText('アカウント');
    fireEvent.click(accountButton);
    
    // アカウント関連のコンポーネントが表示されていることを確認
    expect(screen.getByTestId('account-manager')).toBeInTheDocument();
    expect(screen.getByTestId('account-manager-trpc')).toBeInTheDocument();
    
    // プロフィール関連のコンポーネントが表示されていないことを確認
    expect(screen.queryByTestId('profile-manager')).not.toBeInTheDocument();
    expect(screen.queryByTestId('profile-manager-trpc')).not.toBeInTheDocument();
  });

  it('プロフィールボタンをクリックするとプロフィールコンポーネントが表示される', () => {
    render(<SettingManager />);
    
    // 最初にアカウントを表示
    const accountButton = screen.getByText('アカウント');
    fireEvent.click(accountButton);
    
    // その後プロフィールボタンをクリック
    const profileButton = screen.getByText('プロフィール');
    fireEvent.click(profileButton);
    
    // プロフィール関連のコンポーネントが表示されていることを確認
    expect(screen.getByTestId('profile-manager')).toBeInTheDocument();
    expect(screen.getByTestId('profile-manager-trpc')).toBeInTheDocument();
    
    // アカウント関連のコンポーネントが表示されていないことを確認
    expect(screen.queryByTestId('account-manager')).not.toBeInTheDocument();
    expect(screen.queryByTestId('account-manager-trpc')).not.toBeInTheDocument();
  });

  it('ボタンが正しく表示されていることを確認する', () => {
    render(<SettingManager />);
    
    // 両方のボタンが存在することを確認
    const profileButton = screen.getByText('プロフィール');
    const accountButton = screen.getByText('アカウント');
    
    expect(profileButton).toBeInTheDocument();
    expect(accountButton).toBeInTheDocument();
    
  });

  it('レイアウト構造が期待通りであることを確認する', () => {
    const { container } = render(<SettingManager />);
    
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