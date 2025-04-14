import { useCallback, useState } from 'react';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuth } from '@/hooks/use-auth-queries-tanstack';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { InputWithButton } from '@/components/input-with-button';
import { authUpdateUser } from '@/services/authService';

export const AccountManager = () => {
  const session = useAuthStore((state) => state.session);
  const userProfile = session?.user;
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const { updateUser, resetPassword, deleteAccount } = useAuth();

  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  const handleEmail = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setEmail(value);
  }, []);

  const handleEmailChangeSubmit = useCallback(() => {
    updateUser({ email: email });
    setEmail('');
    setOpen(false);
  }, [email, updateUser]);

  const handlePasswordChangeMailSubmit = useCallback(() => {
    resetPassword(email);
    setEmail('');
    setOpen(false);
  }, [email, resetPassword]);

  const handleDeleteUserAccountSubmit = useCallback(() => {
    if (session?.user?.id) {
      deleteAccount(session.user.id);
    }
  }, [session?.user?.id, deleteAccount]);

  const handleNewPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewPassword(value);
  }, []);

  const authUpdateNewPasswordSubmit = useCallback(() => {
    authUpdateUser({ password: newPassword });
    setNewPassword('');
    setOpen(false);
  }, [newPassword]);

  return (
    <div>
      <h2 className="flex justify-center">アカウント設定</h2>
      <div className="flex justify-center">
        <div className="w-96 flex flex-col gap-2">
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
            <InputWithButton
              id="email"
              onChange={() => handleEmail}
              placeholder="新しいアドレスを入力してください"
              buttonText="送信"
              onSubmit={handleEmailChangeSubmit}
              value={email}
            />
          </ResponsiveDialog>
          <p>最終ログイン：{userProfile?.updated_at}</p>
          <ResponsiveDialog
            isDesktop={isDesktop}
            buttonTitle="パスワード変更"
            dialogTitle="パスワード変更"
            dialogDescription="パスワード変更の確認メールを送ります"
            className="flex justify-center"
          >
            <InputWithButton
              id="email"
              onChange={() => handleEmail}
              placeholder="登録しているアドレスを入力してください"
              onSubmit={handlePasswordChangeMailSubmit}
              buttonText="送信"
            />
          </ResponsiveDialog>
          <ResponsiveDialog
            isDesktop={isDesktop}
            buttonTitle="パスワード変更"
            dialogTitle="パスワード変更"
            dialogDescription="新しいパスワードを入力して下さい"
            className="flex justify-center"
          >
            <InputWithButton
              id="pass"
              onChange={handleNewPassword}
              placeholder="新しいパスワードを入力して下さい"
              onSubmit={authUpdateNewPasswordSubmit}
              value={newPassword}
              buttonText="送信"
            />
          </ResponsiveDialog>
          <div className="text-center">
            <Button className="bg-red-700 hover:bg-red-800" type="button" onClick={handleDeleteUserAccountSubmit}>
              アカウント削除
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
