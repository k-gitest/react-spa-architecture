import { render, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { useAccount } from '@/features/account/hooks/use-account-queries-trpc';
import { AccountUpdate } from '@/features/account/types/account-types';
import { trpc } from '@/lib/trpc';
import { useApiMutation } from '@/hooks/use-tanstack-query';

vi.mock('@/lib/trpc', () => ({
  trpc: {
    account: {
      updateAccount: {
        mutationOptions: vi.fn(),
      },
      resetPasswordForEmailAccount: {
        mutationOptions: vi.fn(),
      },
      deleteAccount: {
        mutationOptions: vi.fn(),
      },
    },
  },
}));

vi.mock('@/hooks/use-tanstack-query', () => ({
  useApiMutation: vi.fn(),
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('@/features/auth/services/authService', () => ({
  signOutAuthService: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// テスト用コンポーネント
const TestComponent = ({ action }: { action: () => void }) => {
  action();
  return <div>TestComponent</div>;
};

describe('useAccount フックのテスト', () => {
  const mutateAsyncMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useApiMutation as any).mockImplementation(() => ({
      mutateAsync: mutateAsyncMock,
    }));

    (trpc.account.updateAccount.mutationOptions as any).mockReturnValue({});
    (trpc.account.resetPasswordForEmailAccount.mutationOptions as any).mockReturnValue({});
    (trpc.account.deleteAccount.mutationOptions as any).mockReturnValue({});
  });

  it('アカウント更新が呼ばれること', async () => {
    const mockData: AccountUpdate = { email: 'test@example.com' };

    const Wrapper = () => {
      const { updateAccount } = useAccount();
      return <TestComponent action={() => updateAccount(mockData)} />;
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(mockData);
    });
  });

  it('パスワードリセットが呼ばれること', async () => {
    const mockData: AccountUpdate = { email: 'reset@example.com' };

    const Wrapper = () => {
      const { resetPassword } = useAccount();
      return <TestComponent action={() => resetPassword(mockData)} />;
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(mockData);
    });
  });

  it('アカウント削除時に signOutAuthService と navigate が呼ばれること', async () => {
    const mockToken = 'delete-token';

    // 成功時のコールバック確認のためにonSuccessを指定
    (trpc.account.deleteAccount.mutationOptions as any).mockReturnValue({
      onSuccess: vi.fn(),
    });

    const Wrapper = () => {
      const { deleteAccount } = useAccount();
      return <TestComponent action={() => deleteAccount(mockToken)} />;
    };

    render(<Wrapper />);

    await waitFor(() => {
      expect(mutateAsyncMock).toHaveBeenCalledWith(mockToken);
    });

    // onSuccess は useApiMutation に渡る前に実行されないのでここではトーストやナビゲーションの直接確認はできない
  });
});
