import React, { useCallback, useState } from 'react';
import { redirect } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { authUpdateUser } from '@/services/authService';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';
import { InputWithButton } from '@/components/input-with-button';

const NewPass = () => {
  const [newPassword, setNewPassword] = useState<string>('');

  const handleNewPassword = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setNewPassword(value);
  }, []);

  const authUpdateNewPasswordSubmit = useCallback(() => {
    authUpdateUser({ password: newPassword });
    setNewPassword('');
    redirect('/profile');
  }, [newPassword]);

  return (
    <MainWrapper>
      <Helmet>
        <title>パスワード変更ページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="パスワード変更ページです" />
      </Helmet>
      <div className="flex justify-center">
        <div className="w-96 flex flex-col gap-2">
          <p>新しいパスワード</p>
          <InputWithButton
            label="新しいパスワード"
            inputType="password"
            initialValue={newPassword}
            placeholder="新しいパスワードを入力して下さい"
            onChange={()=>handleNewPassword}
            onSubmit={authUpdateNewPasswordSubmit}
            className="w-96"
          />
          <Input
            type="password"
            value={newPassword}
            onChange={handleNewPassword}
            placeholder="新しいパスワードを入力して下さい"
          />
          <Button type="button" onClick={authUpdateNewPasswordSubmit}>
            送信
          </Button>
        </div>
      </div>
    </MainWrapper>
  );
};
export default NewPass;
