import { useCallback, useEffect, useState } from 'react';
import { useSessionStore } from '@/hooks/use-session-store';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import { ResponsiveDialog } from '@/components/responsive-dialog';
import { useForm } from 'react-hook-form';
import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { AccountUpdate } from '@/features/account/types/account-types';
import {
  updateAccountService,
  resetPasswordForEmailAccountService,
  deleteAccountService,
} from '@/features/account/services/accountService';
import { errorHandler } from '@/errors/error-handler';
import { formatToJST } from '@/lib/utils';

export const AccountManager = () => {
  const session = useSessionStore((state) => state.session);
  const userData = session?.user;
  const isDesktop = useMediaQuery('(min-width: 768px)');
  const [provider, setProvider] = useState<boolean>(false);
  const [newPassword, setNewPassword] = useState<boolean>(false);
  const [open, setOpen] = useState(false);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [newPasswordDialogOpen, setNewPasswordDialogOpen] = useState(false);

  const emailForm = useForm({
    defaultValues: { email: '' },
  });

  const passwordForm = useForm({
    defaultValues: { password: '' },
  });

  const handleEmailChangeSubmit = useCallback(async (data: AccountUpdate) => {
    try {
      await updateAccountService(data);
      setOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  }, []);

  const handlePasswordChangeMailSubmit = useCallback(async (data: AccountUpdate) => {
    try {
      await resetPasswordForEmailAccountService(data);
      setPasswordDialogOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  }, []);

  const handleNewPasswordSubmit = useCallback(async (data: AccountUpdate) => {
    try {
      await updateAccountService(data);
      setNewPasswordDialogOpen(false);
    } catch (error) {
      errorHandler(error);
    }
  }, []);

  const handleDeleteUserAccountSubmit = useCallback(async () => {
    if (session?.user?.id) {
      try {
        await deleteAccountService(session.user.id);
      } catch (error) {
        errorHandler(error);
      }
    }
  }, [session?.user?.id]);

  useEffect(() => {
    if (session?.user.identities && session?.user?.identities[0]?.provider === 'email') {
      setProvider(true);
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
              <FormWrapper onSubmit={handleEmailChangeSubmit} form={emailForm}>
                <FormInput label="email" name="email" placeholder="新しいアドレスを入力してください" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

          {provider && !newPassword && (
            <ResponsiveDialog
              isDesktop={isDesktop}
              open={passwordDialogOpen}
              onOpenChange={setPasswordDialogOpen}
              buttonTitle="パスワード変更"
              dialogTitle="パスワード変更"
              dialogDescription="パスワード変更の確認メールを送ります"
              className="flex justify-center"
            >
              <FormWrapper onSubmit={handlePasswordChangeMailSubmit} form={emailForm}>
                <FormInput label="email" name="email" placeholder="登録しているアドレスを入力してください" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

          {provider && newPassword && (
            <ResponsiveDialog
              isDesktop={isDesktop}
              open={newPasswordDialogOpen}
              onOpenChange={setNewPasswordDialogOpen}
              buttonTitle="新しいパスワードへ変更"
              dialogTitle="パスワード変更"
              dialogDescription="新しいパスワードを入力して下さい"
              className="flex justify-center"
            >
              <FormWrapper onSubmit={handleNewPasswordSubmit} form={passwordForm}>
                <FormInput label="password" name="password" placeholder="新しいパスワードを入力して下さい" />
                <Button type="submit">送信</Button>
              </FormWrapper>
            </ResponsiveDialog>
          )}

          <p>最終ログイン：{userData?.updated_at ? formatToJST(userData?.updated_at) : ''}</p>

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
