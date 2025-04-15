import { useCallback, useEffect, useState } from 'react';
import { useAuthStore } from '@/hooks/use-auth-store';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAuth } from '@/hooks/use-auth-queries-tanstack';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { InputWithButton } from '@/components/input-with-button';
import { authUpdateUser } from '@/services/authService';
import { useForm } from 'react-hook-form';
import { FormWrapper, FormInput } from './form/form-parts';
import { AccountUpdate } from '@/types/account-types';

export const AccountManager = () => {
  const session = useAuthStore((state) => state.session);
  const userData = session?.user;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { updateUser, resetPassword, deleteAccount } = useAuth();
  const [provider, setProvider] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: { email: '', password: '' },
  });

  const handleEmailChangeSubmit = useCallback(
    (data: AccountUpdate) => {
      updateUser(data);
      setOpen(false);
    },
    [updateUser],
  );

  const handlePasswordChangeMailSubmit = useCallback(
    (data: AccountUpdate) => {
      resetPassword(data);
      setOpen(false);
    },
    [resetPassword],
  );

  const authUpdateNewPasswordSubmit = useCallback(
    (data: AccountUpdate) => {
      authUpdateUser(data);
      setOpen(false);
    },
    [authUpdateUser],
  );

  const handleDeleteUserAccountSubmit = useCallback(() => {
    if (session?.user?.id) {
      deleteAccount(session.user.id);
    }
  }, [session?.user?.id, deleteAccount]);

  useEffect(() => {
    console.log(session?.user);
    if (session?.user.identities) {
      console.log(session?.user?.identities[0]?.provider);
      if (session?.user?.identities[0]?.provider === 'email') setProvider(true);
    }
    if (session?.user.recovery_sent_at) setNewPassword(true);
  }, [session]);

  return (
    <div>
      <h2 className="flex justify-center">アカウント設定</h2>
      <div className="flex justify-center">
        <div className="w-96 flex flex-col gap-2">
          <p>メール：{userData?.email}</p>
          {provider && (
            <ResponsiveDialog
              open={open}
              onOpenChange={setOpen}
              isDesktop={isDesktop}
              buttonTitle="メールアドレス変更"
              dialogTitle="メールアドレス変更"
              dialogDescription="メールアドレス変更の確認メールを送ります"
              className="flex justify-center"
            >
              <FormWrapper onSubmit={handleEmailChangeSubmit} form={form}>
                <FormInput label="email" placeholder="新しいアドレスを入力してください" name="email" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

          <p>最終ログイン：{userData?.updated_at}</p>

          {provider && !newPassword && (
            <ResponsiveDialog
              isDesktop={isDesktop}
              buttonTitle="パスワード変更"
              dialogTitle="パスワード変更"
              dialogDescription="パスワード変更の確認メールを送ります"
              className="flex justify-center"
            >
              <FormWrapper onSubmit={handlePasswordChangeMailSubmit} form={form}>
                <FormInput label="email" placeholder="登録しているアドレスを入力してください" name="email" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

          {newPassword && (
            <ResponsiveDialog
              isDesktop={isDesktop}
              buttonTitle="新しいパスワードへ変更"
              dialogTitle="パスワード変更"
              dialogDescription="新しいパスワードを入力して下さい"
              className="flex justify-center"
            >
              <FormWrapper onSubmit={authUpdateNewPasswordSubmit} form={form}>
                <FormInput label="password" placeholder="新しいパスワードを入力して下さい" name="password" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

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
