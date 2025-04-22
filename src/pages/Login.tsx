import { AccountForm } from '@/features/auth/components/auth-form-tanstack';
import { AccountForm as AccountFormTRPC } from '@/features/auth/components/auth-form-trpc';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';

const Login = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>Loginページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリのユーザーログインページです" />
      </Helmet>
      <div className="flex justify-center">
        <AccountForm type="login" />
        <AccountFormTRPC type="login" />
      </div>

      <div className="flex justify-center p-4">
        <p>
          登録がまだの方は
          <Button variant="ghost">
            <Link to="/register">新規登録ページ</Link>
          </Button>
          から登録してください
        </p>
      </div>
    </MainWrapper>
  );
};

export default Login;
