import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAccount } from '@/features/account/hooks/use-account-queries-tanstack';
import { AccountUpdate } from '@/features/account/types/account-types';

// モックのインポート
vi.mock('@/hooks/use-tanstack-query', () => ({
  useApiMutation: <TData, TVariables>(config: {
    onSuccess?: (data: TData) => void;
    mutationFn: (variables: TVariables) => Promise<TData>;
  }) => ({
    mutateAsync: vi.fn().mockImplementation(async (data: TVariables) => {
      const result = await config.mutationFn(data);
      if (config.onSuccess) {
        config.onSuccess(result);
      }
      return result;
    }),
    isPending: false,
    isError: false,
    error: null,
  }),
}));

vi.mock('@/hooks/use-toast', () => ({
  toast: vi.fn(),
}));

vi.mock('@/features/account/services/accountService', () => ({
  updateAccountService: vi.fn().mockResolvedValue({ user: { id: '123', email: 'test@example.com' } }),
  resetPasswordForEmailAccountService: vi.fn().mockResolvedValue({}),
  deleteAccountService: vi.fn().mockResolvedValue({ message: 'アカウントが削除されました' }),
}));

vi.mock('@/features/auth/services/authService', () => ({
  signOutAuthService: vi.fn(),
}));

// デフォルトのナビゲーションモック
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('useAccount', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('updateAccount が正しく動作する', async () => {
    const { result } = renderHook(() => useAccount());
    
    const userData: AccountUpdate = { email: 'new@example.com' };
    
    await act(async () => {
      await result.current.updateAccount(userData);
    });
    
    const { updateAccountService } = await import('@/features/account/services/accountService');
    const { toast } = await import('@/hooks/use-toast');
    
    expect(updateAccountService).toHaveBeenCalledWith(userData);
    expect(toast).toHaveBeenCalledWith({ title: '変更確認メールを送信しました' });
  });

  it('resetPassword が有効なメールアドレスで正しく動作する', async () => {
    const { result } = renderHook(() => useAccount());
    
    const userData: AccountUpdate = { email: 'test@example.com' };
    
    await act(async () => {
      await result.current.resetPassword(userData);
    });
    
    const { resetPasswordForEmailAccountService } = await import('@/features/account/services/accountService');
    const { toast } = await import('@/hooks/use-toast');
    
    expect(resetPasswordForEmailAccountService).toHaveBeenCalledWith(userData);
    expect(toast).toHaveBeenCalledWith({ title: 'パスワードリセットの確認メールを送信しました' });
  });

  it('無効な入力では resetPassword は実行されない - null の場合', async () => {
    const { result } = renderHook(() => useAccount());
    
    // TypeScriptの型エラーを回避するために型アサーションを使用
    await act(async () => {
      await result.current.resetPassword(null as unknown as AccountUpdate);
    });
    
    const { resetPasswordForEmailAccountService } = await import('@/features/account/services/accountService');
    expect(resetPasswordForEmailAccountService).not.toHaveBeenCalled();
  });

  it('無効な入力では resetPassword は実行されない - undefined の場合', async () => {
    const { result } = renderHook(() => useAccount());
    
    await act(async () => {
      await result.current.resetPassword(undefined as unknown as AccountUpdate);
    });
    
    const { resetPasswordForEmailAccountService } = await import('@/features/account/services/accountService');
    expect(resetPasswordForEmailAccountService).not.toHaveBeenCalled();
  });

  it('無効な入力では resetPassword は実行されない - 空オブジェクトの場合', async () => {
    const { result } = renderHook(() => useAccount());
    
    const emptyData: AccountUpdate = {}; // メールアドレスなどがない空のオブジェクト
    
    await act(async () => {
      await result.current.resetPassword(emptyData);
    });
    
    // 元のコードの実装によっては、空のオブジェクトでもチェックが入るはず
    const { resetPasswordForEmailAccountService } = await import('@/features/account/services/accountService');
    expect(resetPasswordForEmailAccountService).not.toHaveBeenCalled();
  });

  it('deleteAccount が正しく動作する', async () => {
    const { result } = renderHook(() => useAccount());
    
    const token = 'test-token';
    
    await act(async () => {
      await result.current.deleteAccount(token);
    });
    
    const { deleteAccountService } = await import('@/features/account/services/accountService');
    const { signOutAuthService } = await import('@/features/auth/services/authService');
    const { toast } = await import('@/hooks/use-toast');
    
    expect(deleteAccountService).toHaveBeenCalledWith(token);
    expect(signOutAuthService).toHaveBeenCalled();
    expect(toast).toHaveBeenCalledWith({ title: 'アカウントを削除しました' });
    
    expect(mockNavigate).toHaveBeenCalledWith('/register');
  });
});