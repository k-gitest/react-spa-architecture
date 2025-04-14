import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getProfileService,
  updateProfileService,
  upLoadAvatarService,
  deleteAvatarService,
} from '@/services/profileService';
import { Profile } from '@/types/profile-types';

export const useProfile = () => {
  const queryClient = useQueryClient();

  const useGetProfile = (id: string) => {
    return useQuery({
      queryKey: ['profile', id],
      queryFn: () => getProfileService(id),
      enabled: !!id,
    });
  };

  const profileMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Profile }) => updateProfileService(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['profile'] }),
  });

  const updateProfile = async (id: string, data: Profile) => {
    await profileMutation.mutateAsync({ id, data });
  };

  const uploadAvatarMutation = useMutation({
    mutationFn: ({
      file,
      folderName,
      extention,
      currentUrl,
    }: {
      file: File;
      folderName: string;
      extention: string;
      currentUrl: string | null;
    }) => upLoadAvatarService(file, folderName, extention, currentUrl),
    onSuccess: (data, variables) => {
      updateProfile(variables.folderName, { avatar: data.path, user_name: null });
    },
  });

  const uploadAvatar = async (file: File, folderName: string, extention: string, currentUrl: string | null) => {
    await uploadAvatarMutation.mutateAsync({ file, folderName, extention, currentUrl });
  };

  const deleteAvatarMutation = useMutation({
    mutationFn: ({ path }: { path: string }) => deleteAvatarService(path),
  });

  const deleteAvatar = (path: string) => {
    deleteAvatarMutation.mutateAsync({ path });
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
