import { renderHook, act } from '@testing-library/react';
import { useProfile } from '@/features/profile/hooks/use-profile-queries-trpc';
import { trpc } from '@/lib/trpc';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';
import { vi } from 'vitest';

vi.mock('@/lib/trpc', () => ({
  trpc: {
    profile: {
      getProfile: {
        queryOptions: vi.fn(),
        queryKey: vi.fn(() => ['profile', 'getProfile']),
      },
      updateProfile: {
        mutationOptions: vi.fn(),
      },
      uploadAvatar: {
        mutationOptions: vi.fn(),
      },
      deleteAvatar: {
        mutationOptions: vi.fn(),
      },
    },
  },
}));

vi.mock('@/hooks/use-tanstack-query', () => ({
  useApiQuery: vi.fn(),
  useApiMutation: vi.fn(),
}));

vi.mock('@/lib/queryClient', () => ({
  queryClient: {
    invalidateQueries: vi.fn(),
  },
}));

describe('useProfile', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('useGetProfile はプロファイルデータを取得する', () => {
    const mockQueryResult = { data: { user_name: 'test' }, isLoading: false };
    (useApiQuery as ReturnType<typeof vi.fn>).mockReturnValue(mockQueryResult);
    (trpc.profile.getProfile.queryOptions as ReturnType<typeof vi.fn>).mockReturnValue({
      queryKey: ['profile', 'getProfile'],
      queryFn: vi.fn(),
    });

    const { result } = renderHook(() => useProfile());
    const { useGetProfile } = result.current;

    const profile = useGetProfile('test-id');

    expect(profile).toEqual(mockQueryResult);
    expect(trpc.profile.getProfile.queryOptions).toHaveBeenCalledWith('test-id', { enabled: true });
    expect(useApiQuery).toHaveBeenCalled();
  });

  it('updateProfile はプロファイルを正しく更新する', async () => {
    const mockMutateAsync = vi.fn().mockResolvedValue(undefined);
    (useApiMutation as unknown as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockMutateAsync });
    (trpc.profile.updateProfile.mutationOptions as ReturnType<typeof vi.fn>).mockReturnValue({});

    const { result } = renderHook(() => useProfile());
    const { updateProfile } = result.current;

    await act(async () => {
      await updateProfile('user-id', { user_name: 'new name', avatar: null });
    });

    expect(mockMutateAsync).toHaveBeenCalledWith({
      id: 'user-id',
      user_name: 'new name',
      avatar: undefined,
    });
  });

  it('uploadAvatar は currentUrl がある場合、先に deleteAvatar を呼び出す', async () => {
    const mockDeleteMutateAsync = vi.fn().mockResolvedValue(undefined);
    (useApiMutation as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockDeleteMutateAsync });
    (trpc.profile.deleteAvatar.mutationOptions as ReturnType<typeof vi.fn>).mockReturnValue({});

    const { result } = renderHook(() => useProfile());
    const { uploadAvatar } = result.current;

    await act(async () => {
      await uploadAvatar('file-content', 'folder-name', 'jpg', 'avatar/path.jpg?token=123');
    });

    expect(mockDeleteMutateAsync).toHaveBeenCalledWith('avatar/path.jpg');
  });
  
  it('uploadAvatar は currentUrlがない場合、アバターをアップロードする', async () => {
    const mockUploadMutateAsync = vi.fn().mockResolvedValue(undefined);
  
    (useApiMutation as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockUploadMutateAsync });
  
    (trpc.profile.uploadAvatar.mutationOptions as unknown as ReturnType<typeof vi.fn>).mockReturnValue({});
  
    const { result } = renderHook(() => useProfile());
    const { uploadAvatar } = result.current;
    await act(async () => {
      await uploadAvatar('file-content', 'folder-name', 'jpg', null);
    });
    
    expect(mockUploadMutateAsync).toHaveBeenCalledWith({
      file: 'file-content',
      folderName: 'folder-name',
      extention: 'jpg',
    });
  });
  
  it('deleteAvatar はアバターを削除する', async () => {
    const mockDeleteMutateAsync = vi.fn().mockResolvedValue(undefined);
    (useApiMutation as ReturnType<typeof vi.fn>).mockReturnValue({ mutateAsync: mockDeleteMutateAsync });
    (trpc.profile.deleteAvatar.mutationOptions as ReturnType<typeof vi.fn>).mockReturnValue({});

    const { result } = renderHook(() => useProfile());
    const { deleteAvatar } = result.current;

    await act(async () => {
      await deleteAvatar('avatar/path.jpg');
    });

    expect(mockDeleteMutateAsync).toHaveBeenCalledWith('avatar/path.jpg');
  });
});