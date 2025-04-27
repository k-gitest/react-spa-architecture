import { renderHook, act } from '@testing-library/react';
import { useQueryClient } from '@tanstack/react-query';
import { useProfile } from '@/features/profile/hooks/use-profile-queries-tanstack';
import {
  getProfileService,
  updateProfileService,
  upLoadAvatarService,
  deleteAvatarService,
} from '@/features/profile/services/profileService';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';
import { vi } from 'vitest';
import { Profile } from '@/features/profile/types/profile-types';

vi.mock('@tanstack/react-query');
vi.mock('@/hooks/use-tanstack-query');
vi.mock('@/features/profile/services/profileService');

describe('useProfile Hook', () => {
  let queryClient: ReturnType<typeof useQueryClient>;

  beforeEach(() => {
    vi.clearAllMocks();
    queryClient = {
      invalidateQueries: vi.fn(),
    } as unknown as ReturnType<typeof useQueryClient>;
    (useQueryClient as ReturnType<typeof vi.fn>).mockReturnValue(queryClient);
  });

  it('useGetProfile は useApiQuery を正しいパラメータで呼び出す', () => {
    (useApiQuery as ReturnType<typeof vi.fn>).mockReturnValue({ data: {}, isLoading: false, isError: false });

    const { result } = renderHook(() => useProfile().useGetProfile('test-id'));

    expect(useApiQuery).toHaveBeenCalledWith({
      queryKey: ['profile', 'test-id'],
      queryFn: expect.any(Function),
      enabled: true,
    });

    const queryFnArgs = (useApiQuery as ReturnType<typeof vi.fn>).mock.calls[0][0].queryFn;
    queryFnArgs();
    expect(getProfileService).toHaveBeenCalledWith('test-id');
  });

  it('useGetProfile は id が空の場合 useApiQuery を呼び出さない', () => {
    (useApiQuery as ReturnType<typeof vi.fn>).mockReturnValue({ data: {}, isLoading: false, isError: false });

    renderHook(() => useProfile().useGetProfile(''));

    expect(useApiQuery).toHaveBeenCalledWith({
      queryKey: ['profile', ''],
      queryFn: expect.any(Function),
      enabled: false,
    });
  });

  it('updateProfile は profileMutation.mutateAsync を正しいパラメータで呼び出し、成功時にクエリを無効化する', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({});
    (useApiMutation as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockMutateAsync });

    const { result } = renderHook(() => useProfile());
    const { updateProfile } = result.current;
    const profileData = { user_name: 'Updated Name' } as Profile;

    await act(async () => {
      await updateProfile('test-id', profileData);
    });

    expect(useApiMutation).toHaveBeenCalledWith({
      mutationFn: expect.any(Function),
      onSuccess: expect.any(Function),
    });
    expect(mockMutateAsync).toHaveBeenCalledWith({ id: 'test-id', data: profileData });

    const onSuccessCallback = (useApiMutation as ReturnType<typeof vi.fn>).mock.calls[0][0].onSuccess;
    onSuccessCallback();
    expect(queryClient.invalidateQueries).toHaveBeenCalledWith({ queryKey: ['profile'] });

    const mutationFnArgs = (useApiMutation as ReturnType<typeof vi.fn>).mock.calls[0][0].mutationFn;
    await mutationFnArgs({ id: 'test-id', data: profileData });
    expect(updateProfileService).toHaveBeenCalledWith('test-id', profileData);
  });

  it('uploadAvatar は uploadAvatarMutation.mutateAsync を正しいパラメータで呼び出し、成功時に updateProfile を呼び出す', async () => {
    // モックの設定
    (deleteAvatarService as ReturnType<typeof vi.fn>).mockResolvedValue({});
    (upLoadAvatarService as ReturnType<typeof vi.fn>).mockResolvedValue({ path: 'new-avatar.jpg' });

    // テスト内で使用する updateProfile のモックを作成
    const mockUpdateProfile = vi.fn().mockResolvedValue({});

    // onSuccess コールバックを捕捉するための変数を宣言
    let capturedOnSuccess: any = null;

    // useApiMutation をモックし、onSuccess を捕捉し、適切な mutateAsync を返すように実装
    (useApiMutation as ReturnType<typeof vi.fn>).mockImplementation((options) => {
      if (options.onSuccess) {
        capturedOnSuccess = options.onSuccess;
      }

      if (options.mutationFn && options.mutationFn.toString().includes('upLoadAvatarService')) {
        return {
          mutateAsync: vi.fn().mockResolvedValue({ path: 'new-avatar.jpg' }),
        };
      } else if (options.mutationFn && options.mutationFn.toString().includes('deleteAvatarService')) {
        return {
          mutateAsync: vi.fn().mockImplementation(async (params) => {
            await deleteAvatarService(params.path);
            return {};
          }),
        };
      } else if (options.mutationFn && options.mutationFn.toString().includes('updateProfileService')) {
        return {
          mutateAsync: mockUpdateProfile,
        };
      }

      return { mutateAsync: vi.fn().mockResolvedValue({}) };
    });

    // フックのレンダリング
    const { result } = renderHook(() => useProfile());

    // 作成したモックをフックの結果の updateProfile に上書き
    result.current.updateProfile = mockUpdateProfile;

    const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });

    // uploadAvatar 関数の呼び出し
    await act(async () => {
      await result.current.uploadAvatar(file, 'test-user-id', 'jpg', 'old-avatar.jpg');
    });

    // deleteAvatarService が正しいパスで呼び出されたことを検証
    expect(deleteAvatarService).toHaveBeenCalledWith('old-avatar.jpg');

    // 捕捉した onSuccess 関数を手動で実行
    if (capturedOnSuccess) {
      await act(async () => {
        await capturedOnSuccess({ path: 'new-avatar.jpg' }, { file, folderName: 'test-user-id', extention: 'jpg' });
      });

      // updateProfile が正しいパラメータで呼び出されたことを検証
      expect(mockUpdateProfile).toHaveBeenCalledWith({
        data: {
          avatar: 'new-avatar.jpg',
        },
        id: 'test-user-id',
      });
    } else {
      throw new Error('onSuccess コールバックが捕捉されませんでした');
    }
  });

  it('uploadAvatar は currentUrl が null の場合 deleteAvatar を呼び出さない', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue({ path: 'new-avatar.jpg' });
    (useApiMutation as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockMutateAsync });

    // deleteAvatarService が呼び出されたかどうかを追跡するためにモックをクリア
    (deleteAvatarService as ReturnType<typeof vi.fn>).mockClear();

    const { result } = renderHook(() => useProfile());
    const file = new File(['dummy'], 'test.jpg', { type: 'image/jpeg' });

    // updateProfile のモック
    result.current.updateProfile = vi.fn().mockResolvedValue({});

    await act(async () => {
      await result.current.uploadAvatar(file, 'test-user-id', 'jpg', null);
    });

    // deleteAvatarService が呼び出されなかったことを検証
    expect(deleteAvatarService).not.toHaveBeenCalled();

    // uploadAvatarMutation.mutateAsync が呼び出されたことは依然として検証
    expect(mockMutateAsync).toHaveBeenCalledWith({
      file,
      folderName: 'test-user-id',
      extention: 'jpg',
    });
  });

  it('deleteAvatar は deleteAvatarMutation.mutateAsync を正しいパラメータで呼び出す', async () => {
    const mockMutateAsync = vi.fn().mockImplementation(async (params) => {
      // mutateAsync が呼び出されたときに実際のサービスを呼び出す
      await deleteAvatarService(params.path);
      return {};
    });

    (useApiMutation as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockMutateAsync });

    const { result } = renderHook(() => useProfile());

    await act(async () => {
      await result.current.deleteAvatar('test-path');
    });

    expect(useApiMutation).toHaveBeenCalledWith({
      mutationFn: expect.any(Function),
    });

    expect(mockMutateAsync).toHaveBeenCalledWith({ path: 'test-path' });

    // mutateAsync 内で deleteAvatarService を呼び出しているので、この検証は成功するはず
    expect(deleteAvatarService).toHaveBeenCalledWith('test-path');
  });
});