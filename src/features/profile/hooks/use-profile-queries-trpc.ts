import { trpc } from '@/lib/trpc';
import { queryClient } from '@/lib/queryClient';
import { useApiQuery, useApiMutation } from '@/hooks/use-tanstack-query';
import { Profile } from '@/features/profile/types/profile-types';

export const useProfile = () => {
  const profileKey = trpc.profile.getProfile.queryKey();

  const useGetProfile = (id: string) => {
    const profileQueryOptions = trpc.profile.getProfile.queryOptions(id, { enabled: !!id });
    return useApiQuery(profileQueryOptions);
  };

  const updateProfileMutationOptions = trpc.profile.updateProfile.mutationOptions({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: profileKey });
    },
  });
  const updateProfileMutation = useApiMutation(updateProfileMutationOptions);

  const uploadAvatarMutationOptions = trpc.profile.uploadAvatar.mutationOptions({
    onSuccess: (data, variables) => {
      if (variables.folderName) {
        updateProfile(variables.folderName, { avatar: data.path, user_name: null });
      }
    },
  });
  const uploadAvatarMutation = useApiMutation(uploadAvatarMutationOptions);

  const deleteAvatarMutationOptions = trpc.profile.deleteAvatar.mutationOptions();
  const deleteAvatarMutation = useApiMutation(deleteAvatarMutationOptions);

  // メソッド実装
  const updateProfile = async (id: string, data: Profile) => {
    await updateProfileMutation.mutateAsync({
      id,
      avatar: data.avatar ?? undefined,
      user_name: data.user_name ?? undefined,
    });
  };

  const uploadAvatar = async (file: string, folderName: string, extention: string, currentUrl: string | null) => {
    if (currentUrl) {
      const cleanPath = currentUrl.replace(/\?.*$/, '');
      await deleteAvatar(cleanPath);
    }
    await uploadAvatarMutation.mutateAsync({ file, folderName, extention });
  };

  const deleteAvatar = async (path: string) => {
    await deleteAvatarMutation.mutateAsync(path);
  };

  return {
    useGetProfile,
    updateProfileMutation,
    uploadAvatarMutation,
    uploadAvatar,
    updateProfile,
    deleteAvatar,
  };
};
