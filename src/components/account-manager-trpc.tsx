import { useCallback, useEffect, useState } from 'react';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMediaQuery } from '@/hooks/use-media-query';
import { useAccount } from '@/hooks/use-account-queries-trpc';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useForm } from 'react-hook-form';
import { FormWrapper, FormInput } from './form/form-parts';
import { AccountUpdate } from '@/types/account-types';

export const AccountManager = () => {
  const session = useSessionStore((state) => state.session);
  const userData = session?.user;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const { updateAccount, resetPassword, deleteAccount } = useAccount();
  const [provider, setProvider] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: { email: '', password: '' },
  });

  const handleEmailChangeSubmit = useCallback(
    (data: AccountUpdate) => {
      updateAccount(data);
      setOpen(false);
    },
    [updateAccount],
  );

  const handlePasswordChangeMailSubmit = useCallback(
    (data: AccountUpdate) => {
      resetPassword(data);
      setOpen(false);
    },
    [resetPassword],
  );

  const handleNewPasswordSubmit = useCallback(
    (data: AccountUpdate) => {
      updateAccount(data);
      setOpen(false);
    },
    [updateAccount],
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
                <FormInput label="email" name="email" placeholder="新しいアドレスを入力してください" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

          {provider && !newPassword && (
            <ResponsiveDialog
              isDesktop={isDesktop}
              buttonTitle="パスワード変更"
              dialogTitle="パスワード変更"
              dialogDescription="パスワード変更の確認メールを送ります"
              className="flex justify-center"
            >
              <FormWrapper onSubmit={handlePasswordChangeMailSubmit} form={form}>
                <FormInput label="email" name="email" placeholder="登録しているアドレスを入力してください" />
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
              <FormWrapper onSubmit={handleNewPasswordSubmit} form={form}>
                <FormInput label="password" name="password" placeholder="新しいパスワードを入力して下さい" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

          <p>最終ログイン：{userData?.updated_at}</p>

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
