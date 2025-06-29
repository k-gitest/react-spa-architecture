import { useCallback, useEffect, useState } from 'react';
import { useSessionStore } from '@/hooks/use-session-store';
import { Profile } from '@/features/profile/types/profile-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { validatedProfile } from '@/features/profile/schemas/profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { getExtensionIfAllowed } from '@/lib/utils';
import { getAvatarUrl } from '@/lib/supabase';
import {
  getProfileService,
  updateProfileService,
  upLoadAvatarService,
  deleteAvatarService,
} from '@/features/profile/services/profileService';
import { errorHandler } from '@/errors/error-handler';

export const ProfileManager = () => {
  const session = useSessionStore((state) => state.session);

  const [userId, setUserId] = useState<string | null>(null);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [data, setData] = useState<Profile | null>(null);
  const [isError, setIsError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validatedProfileForm = validatedProfile.pick({
    user_name: true,
  });

  const form = useForm({
    resolver: zodResolver(validatedProfileForm),
    defaultValues: {
      user_name: '',
    },
  });

  const handleProfileChangeSubmit = useCallback(
    async (data: Profile) => {
      if (userId) {
        try {
          await updateProfileService(userId, { user_name: data.user_name });
        } catch (error) {
          errorHandler(error);
        }
      }
    },
    [userId],
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAvatarError(null);
    if (userId && e.target.files && e.target.files.length > 0) {
      const folderName = userId;
      const extention = await getExtensionIfAllowed(e.target.files[0]);

      if (extention && data) {
        // avatar画像アップロード前に現在のavatarを削除する
        if (data.avatar) {
          const cleanPath = data.avatar.replace(/\?.*$/, '');
          try {
            await deleteAvatarService(cleanPath);
          } catch (error) {
            errorHandler(error);
          }
        }

        try {
          const avatarData = await upLoadAvatarService(e.target.files[0], folderName, extention);
          await updateProfileService(folderName, { avatar: avatarData.path });
          await getProfile(folderName); 
        } catch (error) {
          errorHandler(error);
        }
      } else {
        setAvatarError('許可された画像形式ではありません');
      }
    } else setAvatarError('ファイルが選択されていません');
  };

  const getProfile = async (userId: string) => {
    setIsLoading(true);
    try {
      const data = await getProfileService(userId);
      setData(data);
    } catch (error) {
      setIsError(true);
      errorHandler(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (session?.user.id) {
      setUserId(session.user.id);
    }
  }, [session]);

  useEffect(() => {
    if (userId) {
      getProfile(userId);
    }
  }, [userId]);

  useEffect(() => {
    if (data) {
      form.reset({
        user_name: data.user_name || '',
      });
    }
  }, [data, form]);

  if (!session) return <p className="text-center">プロフィールは登録すると閲覧できます</p>;
  if (isError) return <p>データが取得できませんでした</p>;
  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2 className="flex justify-center">プロフィール設定</h2>
      <div className="flex justify-center">
        <div className="w-96 flex flex-col gap-2">
          <Avatar>
            <AvatarImage
              src={data?.avatar ? getAvatarUrl(data.avatar) : session?.user.user_metadata.avatar_url}
              alt="avatar"
            />
            <AvatarFallback>avatar</AvatarFallback>
          </Avatar>
          <Label htmlFor="avatar">Picture</Label>
          <Input id="avatar" type="file" onChange={handleFileUpload} />
          {avatarError && <p className="color-red-600">{avatarError}</p>}
          <FormWrapper onSubmit={handleProfileChangeSubmit} form={form}>
            <FormInput label="ユーザー名" name="user_name" placeholder="ユーザー名を入力してください" />
            <Button type="submit">更新</Button>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};
