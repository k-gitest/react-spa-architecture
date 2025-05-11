import { AccountForm } from '@/features/auth/components/auth-form';
import { AccountForm as AccountFormTanstack } from '@/features/auth/components/auth-form-tanstack';
import { AccountForm as AccountFormTRPC } from '@/features/auth/components/auth-form-trpc';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const Register = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>新規登録ページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリのユーザー新規登録ページです" />
      </Helmet>
      <div className="flex justify-center">
        <AccountForm type="register" />
        <AccountFormTanstack type="register" />
        <AccountFormTRPC type="register" />
      </div>

      <div className="flex justify-center p-4">
        <p>
          既に登録している方は
          <Button variant="ghost">
            <Link to="/login">ログインページ</Link>
          </Button>
          からログインしてください
        </p>
      </div>
    </MainWrapper>
  );
};

export default Register;
