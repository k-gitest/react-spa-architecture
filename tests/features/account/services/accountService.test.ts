import {
    updateAccountService,
    resetPasswordForEmailAccountService,
    deleteAccountService,
  } from '@/features/account/services/accountService';
  
  import { vi } from 'vitest';
  import { supabase } from '@/lib/supabase';
  
  vi.mock('@/lib/supabase', () => ({
    supabase: {
      auth: {
        updateUser: vi.fn(),
        resetPasswordForEmail: vi.fn(),
      },
      functions: {
        invoke: vi.fn(),
      },
    },
  }));
  
  describe('accountService 関数のテスト', () => {
    beforeEach(() => {
      vi.clearAllMocks();
    });
  
    it('アカウント更新が成功すること', async () => {
      const mockData = { id: 'user123' };
      (supabase.auth.updateUser as any).mockResolvedValue({ data: mockData, error: null });
  
      const result = await updateAccountService({ email: 'test@example.com' });
  
      expect(supabase.auth.updateUser).toHaveBeenCalledWith(
        { email: 'test@example.com' },
        { emailRedirectTo: `${window.location.origin}/pass` }
      );
      expect(result).toEqual(mockData);
    });
  
    it('アカウント更新が失敗すること', async () => {
      const error = new Error('更新失敗');
      (supabase.auth.updateUser as any).mockResolvedValue({ data: null, error });
  
      await expect(updateAccountService({ email: 'fail@example.com' })).rejects.toThrow('更新失敗');
    });
  
    it('パスワードリセットが成功すること', async () => {
      const mockData = { message: 'sent' };
      (supabase.auth.resetPasswordForEmail as any).mockResolvedValue({ data: mockData, error: null });
  
      const result = await resetPasswordForEmailAccountService({ email: 'reset@example.com' });
  
      expect(supabase.auth.resetPasswordForEmail).toHaveBeenCalledWith(
        'reset@example.com',
        { redirectTo: `${window.location.origin}/pass` }
      );
      expect(result).toEqual(mockData);
    });
  
    it('パスワードリセットでemail未入力時にエラーを投げること', async () => {
      await expect(resetPasswordForEmailAccountService({})).rejects.toThrow('emailが入力されていません');
    });
  
    it('パスワードリセットが失敗すること', async () => {
      const error = new Error('リセット失敗');
      (supabase.auth.resetPasswordForEmail as any).mockResolvedValue({ data: null, error });
  
      await expect(resetPasswordForEmailAccountService({ email: 'fail@example.com' })).rejects.toThrow('リセット失敗');
    });
  
    it('アカウント削除が成功すること', async () => {
      const mockData = { message: '削除しました' };
      (supabase.functions.invoke as any).mockResolvedValue({ data: mockData, error: null });
  
      const result = await deleteAccountService('user-123');
  
      expect(supabase.functions.invoke).toHaveBeenCalledWith('delete-user-account', {
        body: { user_id: 'user-123' },
      });
      expect(result).toEqual(mockData);
    });
  
    it('アカウント削除が失敗すること', async () => {
      const error = new Error('削除失敗');
      (supabase.functions.invoke as any).mockResolvedValue({ data: null, error });
  
      await expect(deleteAccountService('user-456')).rejects.toThrow('削除失敗');
    });
  });
  