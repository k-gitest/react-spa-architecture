import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  getProfileService, 
  updateProfileService, 
  upLoadAvatarService,
  deleteAvatarService
} from '@/features/profile/services/profileService';
import { supabase } from '@/lib/supabase';
import { BUCKET_PROFILE } from '@/lib/constants';
import { Profile } from '@/features/profile/types/profile-types';

// Supabaseクライアントのモック
vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn().mockReturnThis(),
    storage: {
      from: vi.fn().mockReturnThis(),
    },
  },
}));

describe('Profile Services', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('getProfileService', () => {
    it('正常にプロファイルデータを取得する', async () => {
      // モックデータ
      const mockProfile = { id: 1, user_id: 'user123', name: 'テストユーザー' };
      
      // Supabaseのレスポンスをモック
      const selectMock = vi.fn().mockReturnThis();
      const eqMock = vi.fn().mockReturnThis();
      const singleMock = vi.fn().mockResolvedValue({
        data: mockProfile,
        error: null,
      });
      
      supabase.from = vi.fn().mockReturnValue({
        select: selectMock,
        eq: eqMock,
        single: singleMock,
      });
      
      // 関数を実行
      const result = await getProfileService('user123');
      
      // アサーション
      expect(supabase.from).toHaveBeenCalledWith('profiles');
      expect(selectMock).toHaveBeenCalledWith('*');
      expect(eqMock).toHaveBeenCalledWith('user_id', 'user123');
      expect(singleMock).toHaveBeenCalled();
      expect(result).toEqual(mockProfile);
    });

    it('エラーが発生した場合は例外をスローする', async () => {
      // エラーレスポンスをモック
      const errorMock = new Error('プロファイルが見つかりません');
      
      const selectMock = vi.fn().mockReturnThis();
      const eqMock = vi.fn().mockReturnThis();
      const singleMock = vi.fn().mockResolvedValue({
        data: null,
        error: errorMock,
      });
      
      supabase.from = vi.fn().mockReturnValue({
        select: selectMock,
        eq: eqMock,
        single: singleMock,
      });
      
      // エラーがスローされることを確認
      await expect(getProfileService('user123')).rejects.toThrow(errorMock);
    });
  });

  describe('updateProfileService', () => {
    it('正常にプロファイルを更新する', async () => {
      // モックデータ
      const mockProfile: Profile = { user_name: 'test-user-name' };
      
      // Supabaseのレスポンスをモック
      const updateMock = vi.fn().mockReturnThis();
      const eqMock = vi.fn().mockResolvedValue({
        data: null,
        error: null,
      });
      
      supabase.from = vi.fn().mockReturnValue({
        update: updateMock,
        eq: eqMock,
      });
      
      // 関数を実行
      await updateProfileService('user123', mockProfile);
      
      // アサーション
      expect(supabase.from).toHaveBeenCalledWith('profiles');
      expect(updateMock).toHaveBeenCalledWith(mockProfile);
      expect(eqMock).toHaveBeenCalledWith('user_id', 'user123');
    });

    it('エラーが発生した場合は例外をスローする', async () => {
      // モックデータ
      const mockProfile: Profile = { user_name: 'test-user-name' };
      const errorMock = new Error('更新エラー');
      
      // エラーレスポンスをモック
      const updateMock = vi.fn().mockReturnThis();
      const eqMock = vi.fn().mockResolvedValue({
        data: null,
        error: errorMock,
      });
      
      supabase.from = vi.fn().mockReturnValue({
        update: updateMock,
        eq: eqMock,
      });
      
      // エラーがスローされることを確認
      await expect(updateProfileService('user123', mockProfile)).rejects.toThrow(errorMock);
    });
  });

  describe('upLoadAvatarService', () => {
    it('正常にアバター画像をアップロードする', async () => {
      // モックデータ
      const mockFile = new File(['dummy content'], 'avatar.jpg', { type: 'image/jpeg' });
      const folderName = 'user123';
      const extension = 'jpg';
      const mockResponse = { path: `${folderName}/avatar.jpg` };
      
      // Date.now()をモック
      const dateSpy = vi.spyOn(Date, 'now');
      dateSpy.mockReturnValue(12345);
      
      // Supabaseのストレージレスポンスをモック
      const uploadMock = vi.fn().mockResolvedValue({
        data: mockResponse,
        error: null,
      });
      
      supabase.storage.from = vi.fn().mockReturnValue({
        upload: uploadMock,
      });
      
      // 関数を実行
      const result = await upLoadAvatarService(mockFile, folderName, extension);
      
      // アサーション
      expect(supabase.storage.from).toHaveBeenCalledWith(BUCKET_PROFILE);
      expect(uploadMock).toHaveBeenCalledWith(
        `${folderName}/avatar.${extension}?v=12345`,
        mockFile,
        { upsert: true, cacheControl: '3600' }
      );
      expect(result).toEqual(mockResponse);
      
      // スパイをリセット
      dateSpy.mockRestore();
    });

    it('エラーが発生した場合は例外をスローする', async () => {
      // モックデータ
      const mockFile = new File(['dummy content'], 'avatar.jpg', { type: 'image/jpeg' });
      const errorMock = new Error('アップロードエラー');
      
      // エラーレスポンスをモック
      const uploadMock = vi.fn().mockResolvedValue({
        data: null,
        error: errorMock,
      });
      
      supabase.storage.from = vi.fn().mockReturnValue({
        upload: uploadMock,
      });
      
      // エラーがスローされることを確認
      await expect(upLoadAvatarService(mockFile, 'user123', 'jpg')).rejects.toThrow(errorMock);
    });
  });

  describe('deleteAvatarService', () => {
    it('正常にアバター画像を削除する', async () => {
      // モックデータ
      const path = 'user123/avatar.jpg';
      const mockResponse = [{ name: 'avatar.jpg', id: '123' }];
      
      // Supabaseのストレージレスポンスをモック
      const removeMock = vi.fn().mockResolvedValue({
        data: mockResponse,
        error: null,
      });
      
      supabase.storage.from = vi.fn().mockReturnValue({
        remove: removeMock,
      });
      
      // 関数を実行
      const result = await deleteAvatarService(path);
      
      // アサーション
      expect(supabase.storage.from).toHaveBeenCalledWith(BUCKET_PROFILE);
      expect(removeMock).toHaveBeenCalledWith([path]);
      expect(result).toEqual(mockResponse);
    });

    it('エラーが発生した場合は例外をスローする', async () => {
      // モックデータ
      const path = 'user123/avatar.jpg';
      const errorMock = new Error('削除エラー');
      
      // エラーレスポンスをモック
      const removeMock = vi.fn().mockResolvedValue({
        data: null,
        error: errorMock,
      });
      
      supabase.storage.from = vi.fn().mockReturnValue({
        remove: removeMock,
      });
      
      // エラーがスローされることを確認
      await expect(deleteAvatarService(path)).rejects.toThrow(errorMock);
    });
  });
});