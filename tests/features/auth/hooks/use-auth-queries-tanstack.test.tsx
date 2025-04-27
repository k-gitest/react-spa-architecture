import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '@/features/auth/hooks/use-auth-queries-tanstack';
import { AuthError, Provider } from '@supabase/supabase-js';
import { Account } from '@/features/account/types/account-types';

// モックのインポート
vi.mock('@/hooks/use-tanstack-query', () => ({
  useApiMutation: <TData, TError, TVariables>(config: {
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

vi.mock('@/features/auth/services/authService', () => ({
  signInWithPasswordAuthService: vi.fn().mockResolvedValue({ 
    user: { id: '123', email: 'test@example.com' }, 
    session: { access_token: 'test-token' } 
  }),
  signUpAuthService: vi.fn().mockResolvedValue({ 
    user: { id: '123', email: 'test@example.com' }, 
    session: { access_token: 'test-token' } 
  }),
  signInWithOAuthService: vi.fn().mockResolvedValue({ 
    provider: 'google', 
    url: 'https://accounts.google.com/oauth' 
  }),
  signOutAuthService: vi.fn().mockResolvedValue(undefined),
}));

// デフォルトのナビゲーションモック
const mockNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}));

describe('useAuth', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('signUp が正しく動作する', async () => {
    const { result } = renderHook(() => useAuth());
    
    const userData: Account = { email: 'new@example.com', password: 'password123' };
    
    await act(async () => {
      await result.current.signUp(userData);
    });
    
    const { signUpAuthService } = await import('@/features/auth/services/authService');
    
    expect(signUpAuthService).toHaveBeenCalledWith(userData);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('signIn が正しく動作する', async () => {
    const { result } = renderHook(() => useAuth());
    
    const userData: Account = { email: 'test@example.com', password: 'password123' };
    
    await act(async () => {
      await result.current.signIn(userData);
    });
    
    const { signInWithPasswordAuthService } = await import('@/features/auth/services/authService');
    
    expect(signInWithPasswordAuthService).toHaveBeenCalledWith(userData);
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('signInWithOAuth が正しく動作する', async () => {
    const { result } = renderHook(() => useAuth());
    
    const oauthData = { provider: 'google' as Provider, redirectTo: 'http://localhost:3000/callback' };
    
    await act(async () => {
      await result.current.signInWithOAuth(oauthData);
    });
    
    const { signInWithOAuthService } = await import('@/features/auth/services/authService');
    
    expect(signInWithOAuthService).toHaveBeenCalledWith(oauthData);
    // OAuthはナビゲーションを自動的に行わない（リダイレクトURLを返すだけ）なのでチェックしない
  });

  it('signOut が正しく動作する', async () => {
    const { result } = renderHook(() => useAuth());
    
    await act(async () => {
      await result.current.signOut();
    });
    
    const { signOutAuthService } = await import('@/features/auth/services/authService');
    
    expect(signOutAuthService).toHaveBeenCalled();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('無効な入力でもsignUpは実行される（バリデーションはコンポーネント側）', async () => {
    const { result } = renderHook(() => useAuth());
    
    const emptyData: Account = { email: '', password: '' };
    
    await act(async () => {
      await result.current.signUp(emptyData);
    });
    
    const { signUpAuthService } = await import('@/features/auth/services/authService');
    
    // 入力チェックがない場合、APIは呼び出される
    expect(signUpAuthService).toHaveBeenCalledWith(emptyData);
  });

  it('無効な入力でもsignInは実行される（バリデーションはコンポーネント側）', async () => {
    const { result } = renderHook(() => useAuth());
    
    const emptyData: Account = { email: '', password: '' };
    
    await act(async () => {
      await result.current.signIn(emptyData);
    });
    
    const { signInWithPasswordAuthService } = await import('@/features/auth/services/authService');
    
    // 入力チェックがない場合、APIは呼び出される
    expect(signInWithPasswordAuthService).toHaveBeenCalledWith(emptyData);
  });
});