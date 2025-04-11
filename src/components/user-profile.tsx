import { useCallback, useState } from 'react';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuth } from '@/hooks/use-auth-queries-tanstack';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { DialogFooter } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { ResponsiveDialog } from '@/components/responsive-dialog';

export const UserProfile = () => {
  const session = useAuthStore((state) => state.session);
  const userProfile = session?.user;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const {updateUser, resetPassword, deleteAccount} = useAuth();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>('');

  const handleEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  }, []);

  const handleEmailChangeSubmit = useCallback(() => {
    updateUser({ email: email });
    setOpen(false);
  }, [email, updateUser]);

  const handlePasswordChangeMailSubmit = useCallback(() => {
    resetPassword(email);
    setOpen(false);
  }, [email, resetPassword]);

  const handleDeleteUserAccountSubmit = useCallback(() => {
    if (session?.user?.id) {
      deleteAccount(session.user.id);
    }
  }, [session?.user?.id, deleteAccount]);

  if (!session) return <p className="text-center">プロフィールは登録すると閲覧できます</p>;

  return (
    <div className="flex justify-center">
      <div className="w-96 flex flex-col gap-2">
        <p>プロフィール画面</p>
        <Avatar>
          <AvatarImage src={userProfile?.user_metadata.avatar_url} alt="avatar" />
          <AvatarFallback>avatar</AvatarFallback>
        </Avatar>
        <p>名前：{userProfile?.user_metadata.user_name}</p>
        <p>メール：{userProfile?.email}</p>
        <ResponsiveDialog
          open={open}
          onOpenChange={setOpen}
          isDesktop={isDesktop}
          buttonTitle="メールアドレス変更"
          dialogTitle="メールアドレス変更"
          dialogDescription="メールアドレス変更の確認メールを送ります"
          className="flex justify-center"
        >
          <div className="flex flex-col gap-4">
            <Input id="email" onChange={handleEmail} value={email} placeholder="新しいアドレスを入力してください" />
            <DialogFooter>
              <Button type="button" onClick={handleEmailChangeSubmit}>
                送信
              </Button>
            </DialogFooter>
          </div>
        </ResponsiveDialog>
        <p>最終ログイン：{userProfile?.updated_at}</p>
        <ResponsiveDialog
          isDesktop={isDesktop}
          buttonTitle="パスワード変更"
          dialogTitle="パスワード変更"
          dialogDescription="パスワード変更の確認メールを送ります"
          className="flex justify-center"
        >
          <div className="flex flex-col gap-4">
            <Input
              id="email"
              onChange={handleEmail}
              value={email}
              placeholder="登録しているアドレスを入力してください"
            />
            <DialogFooter>
              <Button type="button" onClick={handlePasswordChangeMailSubmit}>
                送信
              </Button>
            </DialogFooter>
          </div>
        </ResponsiveDialog>
        <div className="text-center">
          <Button className="bg-red-700 hover:bg-red-800" type="button" onClick={handleDeleteUserAccountSubmit}>
            アカウント削除
          </Button>
        </div>
      </div>
    </div>
  );
};
