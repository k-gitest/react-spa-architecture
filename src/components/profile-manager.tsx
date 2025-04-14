import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useProfile } from '@/hooks/use-profile-queries-tanstack';
import { Profile } from '@/types/profile-types';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { validatedProfile } from '@/schemas/profile-schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { detectMimeTypeFromUint8Array, isAllowedMimeType } from '@/lib/utils';
import { getImageUrl } from '@/lib/supabase';

export const ProfileManager = () => {
  const session = useAuthStore((state) => state.session);

  const [userId, setUserId] = useState<string | null>(null);

  const { useGetProfile, updateProfile, uploadAvatar } =
    useProfile();
  const { data, isError, isLoading } = useGetProfile(userId || '');

  const form = useForm({
    resolver: zodResolver(validatedProfile),
    defaultValues: { avatar: '', user_name: '' },
  });

  const handleProfileChangeSubmit = useCallback(
    (data: Profile) => {
      console.log(data);
      //updateProfile(profile, data);
    },
    [updateProfile],
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (session?.user.id && e.target.files && e.target.files.length > 0) {
      const folderName = session.user.id;
      const mimeType = await detectMimeTypeFromUint8Array(e.target.files[0]);
      const extention = isAllowedMimeType(mimeType);
      if (extention && data) {
        uploadAvatar(e.target.files[0], folderName, extention, data.avatar);
      } else {
        throw new Error('許可された画像形式ではありません。');
      }
    }
  };

  useEffect(() => {
    if (session?.user.id) setUserId(session.user.id);
    if (data) {
      form.reset({
        avatar: data.avatar || '',
        user_name: data.user_name || session?.user.user_metadata?.user_name || '',
      });
    }
  }, [data, session, form]);

  if (!session) return <p className="text-center">プロフィールは登録すると閲覧できます</p>;

  return (
    <div>
      <h2 className="flex justify-center">プロフィール設定</h2>
      <div className="flex justify-center">
        <div className="w-96 flex flex-col gap-2">
          <FormWrapper onSubmit={handleProfileChangeSubmit} form={form}>
            <Avatar>
              <AvatarImage
                src={data?.avatar ? getImageUrl(data.avatar) : session?.user.user_metadata.avatar_url}
                alt="avatar"
              />
              <AvatarFallback>avatar</AvatarFallback>
            </Avatar>
            <Label htmlFor="picture">Picture</Label>
            <Input id="avatar" name="avatar" type="file" onChange={handleFileUpload} />
            <FormInput label="ユーザー名" placeholder="ユーザー名を入力してください" name="user_name" />
            <Button type="submit">更新</Button>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};
