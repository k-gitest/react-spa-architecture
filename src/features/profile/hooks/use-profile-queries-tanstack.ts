import { useQueryClient } from '@tanstack/react-query';
import {
  getProfileService,
  updateProfileService,
  upLoadAvatarService,
  deleteAvatarService,
} from '@/features/profile/services/profileService';
import { Profile } from '@/features/profile/types/profile-types';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const useGetProfile = (id: string | null) => {
    return useApiQuery({
      queryKey: ['profile', id],
      queryFn: () => (id ? getProfileService(id) : Promise.resolve(undefined)),
      enabled: !!id,
    });
  };

  const profileMutation = useApiMutation({
    mutationFn: ({ id, data }: { id: string; data: Profile }) => updateProfileService(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });

  const updateProfile = async (id: string, data: Profile) => {
    return profileMutation.mutateAsync({ id, data });
  };

  const uploadAvatarMutation = useApiMutation({
    mutationFn: ({ file, folderName, extention }: { file: File; folderName: string; extention: string }) =>
      upLoadAvatarService(file, folderName, extention),
    onSuccess: (data, variables) => {
      updateProfile(variables.folderName, { avatar: data.path });
    },
  });

  const uploadAvatar = async (file: File, folderName: string, extention: string, currentUrl: string | null) => {
    // avatar画像アップロード前に現在のavatarを削除する
    if (currentUrl) {
      const cleanPath = currentUrl.replace(/\?.*$/, '');
      await deleteAvatar(cleanPath);
    }
    return await uploadAvatarMutation.mutateAsync({ file, folderName, extention });
  };

  const deleteAvatarMutation = useApiMutation({
    mutationFn: ({ path }: { path: string }) => deleteAvatarService(path),
  });

  const deleteAvatar = (path: string) => {
    return deleteAvatarMutation.mutateAsync({ path });
  };

  return {
    useGetProfile,
    updateProfile,
    uploadAvatar,
    deleteAvatar,
    uploadAvatarMutation,
    deleteAvatarMutation,
  };
};
