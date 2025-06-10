import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { ProfileManager } from '@/features/profile/components/profile-manager-tanstack';
import { useProfile } from '@/features/profile/hooks/use-profile-queries-tanstack';
import { useSessionStore } from '@/hooks/use-session-store';
import userEvent from '@testing-library/user-event';
import { getExtensionIfAllowed } from '@/lib/utils';

vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn(),
}));

vi.mock('@/features/profile/hooks/use-profile-queries-tanstack', () => ({
  useProfile: vi.fn(),
}));

// コンポーネントで使用されているgetAvatarUrl関数をモック
vi.mock('@/lib/supabase', () => ({
  getAvatarUrl: vi.fn().mockReturnValue('mocked-avatar-url'),
}));

// getExtensionIfAllowed をモック
vi.mock('@/lib/utils', () => ({
  getExtensionIfAllowed: vi.fn(),
  cn: vi.fn().mockImplementation((...classes: any[]) => classes.filter(Boolean).join(' ')),
}));

describe('ProfileManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: 'test-user-id', user_metadata: { avatar_url: 'test-avatar-url' } } } }),
    );

    (useProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      useGetProfile: vi.fn().mockReturnValue({
        data: null,
        isLoading: true,
        isError: false,
      }),
      updateProfile: vi.fn(),
      uploadAvatar: vi.fn(),
    });
  });

  it('ローディング中のテキストを表示する', () => {
    render(<ProfileManager />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('エラー状態を表示する', () => {
    (useProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      useGetProfile: vi.fn().mockReturnValue({
        data: null,
        isLoading: false,
        isError: true,
      }),
      updateProfile: vi.fn(),
      uploadAvatar: vi.fn(),
    });

    render(<ProfileManager />);
    expect(screen.getByText('データが取得できませんでした')).toBeInTheDocument();
  });

  it('未ログイン状態を表示する', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: null }),
    );

    render(<ProfileManager />);
    expect(screen.getByText('プロフィールは登録すると閲覧できます')).toBeInTheDocument();
  });

  it('データを含むプロフィールフォームを表示する', async () => {
    (useProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      useGetProfile: vi.fn().mockReturnValue({
        data: {
          avatar: 'test-profile-avatar.jpg',
          user_name: 'テストユーザー',
        },
        isLoading: false,
        isError: false,
      }),
      updateProfile: vi.fn(),
      uploadAvatar: vi.fn(),
    });

    render(<ProfileManager />);

    await waitFor(() => {
      expect(screen.getByText('プロフィール設定')).toBeInTheDocument();
    });

    expect(screen.getByText('ユーザー名')).toBeInTheDocument();
    expect(screen.getByText('Picture')).toBeInTheDocument();
    expect(screen.getByText('更新')).toBeInTheDocument();
  });

  it('更新されたプロフィールデータでフォームを送信する', async () => {
    const mockUpdateProfile = vi.fn();

    (useProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      useGetProfile: vi.fn().mockReturnValue({
        data: {
          avatar: 'test-profile-avatar.jpg',
          user_name: 'テストユーザー',
        },
        isLoading: false,
        isError: false,
      }),
      updateProfile: mockUpdateProfile,
      uploadAvatar: vi.fn(),
    });
    render(<ProfileManager />);

    const nameInput = screen.getByLabelText('ユーザー名');
    fireEvent.change(nameInput, { target: { value: '更新された名前' } });

    const submitButton = screen.getByText('更新');
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockUpdateProfile).toHaveBeenCalledWith('test-user-id', { user_name: '更新された名前' });
    });
  });

  it('アバターのアップロードを処理する', async () => {
    const mockUploadAvatar = vi.fn();

    (useProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      useGetProfile: vi.fn().mockReturnValue({
        data: {
          avatar: 'test-profile-avatar.jpg',
          user_name: 'テストユーザー',
        },
        isLoading: false,
        isError: false,
      }),
      updateProfile: vi.fn(),
      uploadAvatar: mockUploadAvatar,
    });

    render(<ProfileManager />);
    // ダミー画像ファイルを作成
    const file = new File(['ダミーコンテンツ'], 'test.jpg', { type: 'image/jpeg' });

    // getExtensionIfAllowed をモックして常に 'jpg' を返す
    (getExtensionIfAllowed as ReturnType<typeof vi.fn>).mockResolvedValue('jpg');

    // アップロード用のファイル入力を取得
    const fileInput = screen.getByLabelText('Picture');

    // ファイルのアップロードをシミュレート
    await userEvent.upload(fileInput, file);

    // アップロード後に uploadAvatar が正しく呼ばれることを確認
    await waitFor(() => {
      expect(mockUploadAvatar).toHaveBeenCalledWith(file, 'test-user-id', 'jpg', 'test-profile-avatar.jpg');
    });
  });

  it('無効なファイルタイプをアップロードした場合にエラーを表示する', async () => {
    const mockUploadAvatar = vi.fn();

    (useProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      useGetProfile: vi.fn().mockReturnValue({
        data: {
          avatar: 'test-profile-avatar.jpg',
          user_name: 'テストユーザー',
        },
        isLoading: false,
        isError: false,
      }),
      updateProfile: vi.fn(),
      uploadAvatar: mockUploadAvatar,
    });

    render(<ProfileManager />);

    const file = new File(['ダミーコンテンツ'], 'test.txt', { type: 'text/plain' });
    (getExtensionIfAllowed as ReturnType<typeof vi.fn>).mockResolvedValue(null);
    const fileInput = screen.getByLabelText('Picture');
    // ファイルのアップロードをシミュレート
    await userEvent.upload(fileInput, file);

    // エラーメッセージが表示されることを検証
    await waitFor(() => {
      expect(screen.getByText('許可された画像形式ではありません')).toBeInTheDocument();
    });
  });

  it('ファイルが選択されなかった場合にエラーを表示する', async () => {
    (useProfile as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      useGetProfile: vi.fn().mockReturnValue({
        data: {
          avatar: 'test-profile-avatar.jpg',
          user_name: 'テストユーザー',
        },
        isLoading: false,
        isError: false,
      }),
      updateProfile: vi.fn(),
      uploadAvatar: vi.fn(),
    });
  
    render(<ProfileManager />);
  
    const fileInput = screen.getByLabelText('Picture');
  
    // ファイルを選択せずに onChange イベントを発生させる (files は空)
    fireEvent.change(fileInput, { target: { files: [] } });
  
    // エラーメッセージが表示されることを検証
    await waitFor(() => {
      expect(screen.getByText('ファイルが選択されていません')).toBeInTheDocument();
    });
  });
});
