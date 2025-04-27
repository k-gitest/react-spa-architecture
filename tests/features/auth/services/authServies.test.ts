import { describe, it, expect, vi, beforeEach } from 'vitest';
import {
  signInWithPasswordAuthService,
  signUpAuthService,
  signInWithOAuthService,
  signOutAuthService,
  emailVerifyOptAuthService
} from '@/features/auth/services/authService';
import { supabase } from '@/lib/supabase';

// supabaseのモック
vi.mock('@/lib/supabase', () => ({
  supabase: {
    auth: {
      signInWithPassword: vi.fn(),
      signUp: vi.fn(),
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
      verifyOtp: vi.fn()
    }
  }
}));

describe('Auth Service', () => {
  // 各テスト前にモックをリセット
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('signInWithPasswordAuthService', () => {
    it('正常にサインインできる場合', async () => {
      // モックの設定
      const mockData = { session: { user: { id: 'test-user-id' } } };
      (supabase.auth.signInWithPassword as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: mockData,
        error: null
      });

      // 関数を実行
      const signInData = { email: 'test@example.com', password: 'password123' };
      const result = await signInWithPasswordAuthService(signInData);

      // 検証
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: signInData.email,
        password: signInData.password
      });
      expect(result).toEqual(mockData);
    });

    it('エラーが発生した場合、例外をスローする', async () => {
      // モックの設定
      const mockError = new Error('認証エラー');
      (supabase.auth.signInWithPassword as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: null,
        error: mockError
      });

      // 関数を実行して例外が発生することを検証
      const signInData = { email: 'test@example.com', password: 'wrong-password' };
      await expect(signInWithPasswordAuthService(signInData)).rejects.toThrow(mockError);

      // 関数が正しく呼ばれたことを検証
      expect(supabase.auth.signInWithPassword).toHaveBeenCalledWith({
        email: signInData.email,
        password: signInData.password
      });
    });
  });

  describe('signUpAuthService', () => {
    it('正常にサインアップできる場合', async () => {
      // モックの設定
      const mockData = { user: { id: 'new-user-id' }, session: null };
      (supabase.auth.signUp as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: mockData,
        error: null
      });

      // 関数を実行
      const signUpData = { email: 'newuser@example.com', password: 'newpassword123' };
      const result = await signUpAuthService(signUpData);

      // 検証
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: signUpData.email,
        password: signUpData.password
      });
      expect(result).toEqual(mockData);
    });

    it('エラーが発生した場合、例外をスローする', async () => {
      // モックの設定
      const mockError = new Error('サインアップエラー');
      (supabase.auth.signUp as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: null,
        error: mockError
      });

      // 関数を実行して例外が発生することを検証
      const signUpData = { email: 'invalid@example.com', password: 'short' };
      await expect(signUpAuthService(signUpData)).rejects.toThrow(mockError);

      // 関数が正しく呼ばれたことを検証
      expect(supabase.auth.signUp).toHaveBeenCalledWith({
        email: signUpData.email,
        password: signUpData.password
      });
    });
  });

  describe('signInWithOAuthService', () => {
    it('正常にOAuth認証URLを取得できる場合', async () => {
      // モックの設定
      const mockData = { url: 'https://oauth-provider.com/auth-redirect' };
      (supabase.auth.signInWithOAuth as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: mockData,
        error: null
      });

      // 関数を実行
      const oauthData = { provider: 'github' as const, redirectTo: '/dashboard' };
      const result = await signInWithOAuthService(oauthData);

      // 検証
      expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: oauthData.provider,
        options: {
          redirectTo: oauthData.redirectTo
        }
      });
      expect(result).toEqual(mockData);
    });

    it('エラーが発生した場合、例外をスローする', async () => {
      // モックの設定
      const mockError = new Error('OAuth認証エラー');
      (supabase.auth.signInWithOAuth as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: null,
        error: mockError
      });

      // 関数を実行して例外が発生することを検証
      const oauthData = { provider: 'github' as const, redirectTo: '/dashboard' };
      await expect(signInWithOAuthService(oauthData)).rejects.toThrow(mockError);

      // 関数が正しく呼ばれたことを検証
      expect(supabase.auth.signInWithOAuth).toHaveBeenCalledWith({
        provider: oauthData.provider,
        options: {
          redirectTo: oauthData.redirectTo
        }
      });
    });
  });

  describe('signOutAuthService', () => {
    it('正常にサインアウトできる場合', async () => {
      // モックの設定
      (supabase.auth.signOut as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        error: null
      });

      // 関数を実行
      await signOutAuthService();

      // 検証
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });

    it('エラーが発生した場合、例外をスローする', async () => {
      // モックの設定
      const mockError = new Error('サインアウトエラー');
      (supabase.auth.signOut as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        error: mockError
      });

      // 関数を実行して例外が発生することを検証
      await expect(signOutAuthService()).rejects.toThrow(mockError);

      // 関数が正しく呼ばれたことを検証
      expect(supabase.auth.signOut).toHaveBeenCalled();
    });
  });

  describe('emailVerifyOptAuthService', () => {
    it('正常にOTPを検証できる場合', async () => {
      // モックの設定
      const mockData = { session: { user: { id: 'verified-user-id' } } };
      (supabase.auth.verifyOtp as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: mockData,
        error: null
      });

      // 関数を実行
      const tokenHash = 'abc123hash';
      const type = 'email' as const;
      const result = await emailVerifyOptAuthService(tokenHash, type);

      // 検証
      expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
        token_hash: tokenHash,
        type: type
      });
      expect(result).toEqual(mockData);
    });

    it('エラーが発生した場合、例外をスローする', async () => {
      // モックの設定
      const mockError = new Error('検証エラー');
      (supabase.auth.verifyOtp as ReturnType<typeof vi.fn>).mockResolvedValueOnce({
        data: null,
        error: mockError
      });

      // 関数を実行して例外が発生することを検証
      const tokenHash = 'invalid-hash';
      const type = 'email' as const;
      await expect(emailVerifyOptAuthService(tokenHash, type)).rejects.toThrow();

      // 関数が正しく呼ばれたことを検証
      expect(supabase.auth.verifyOtp).toHaveBeenCalledWith({
        token_hash: tokenHash,
        type: type
      });
    });
  });
});