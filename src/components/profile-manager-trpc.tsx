import { useCallback, useEffect, useState } from 'react';
import { useSessionStore } from '@/hooks/use-session-store';
import { useProfile } from '@/hooks/use-profile-queries-trpc';
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
import { getAvatarUrl } from '@/lib/supabase';

export const ProfileManager = () => {
  const session = useSessionStore((state) => state.session);

  const [userId, setUserId] = useState<string | null>(null);

  const { useGetProfile, updateProfile, uploadAvatar } = useProfile();
  const { data, isError, isLoading } = useGetProfile(userId || '');

  const defaultValues = {
    avatar: "",
    user_name: "",
  };

  const form = useForm({
    resolver: zodResolver(validatedProfile),
    defaultValues: defaultValues,
  });

  const handleProfileChangeSubmit = useCallback(
    async (data: Profile) => {
      if (userId) await updateProfile(userId, data);
    },
    [updateProfile, userId],
  );

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (userId && e.target.files && e.target.files.length > 0) {
      const folderName = userId;
      const mimeType = await detectMimeTypeFromUint8Array(e.target.files[0]);
      const extention = isAllowedMimeType(mimeType);
      if (extention && data) {
        // ファイルをBase64に変換
      const fileReader = new FileReader();
      fileReader.readAsDataURL(e.target.files[0]);
      
      fileReader.onload = async () => {
        // Base64文字列を取得（data:image/jpeg;base64,xxxxx の形式）
        const base64File = fileReader.result as string;
        // プレフィックスを除去して純粋なBase64文字列を取得
        const base64Data = base64File.split(',')[1];
        
        await uploadAvatar(base64Data, folderName, extention, data.avatar);
      };
      } else {
        throw new Error('許可された画像形式ではありません。');
      }
    }
  };

  useEffect(() => {
    if (session?.user.id) setUserId(session.user.id);
    if (data) {
      form.reset({
        avatar: data.avatar || "",
        user_name: data.user_name || "",
      });
    }
  }, [data, session, form]);

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
          <Label htmlFor="picture">Picture</Label>
          <Input id="avatar" type="file" onChange={handleFileUpload} />
          <FormWrapper onSubmit={handleProfileChangeSubmit} form={form}>
            <FormInput label="ユーザー名" name="user_name" placeholder="ユーザー名を入力してください" />
            <Button type="submit">更新</Button>
          </FormWrapper>
        </div>
      </div>
    </div>
  );
};
