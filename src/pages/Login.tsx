import { AccountForm } from '@/features/auth/components/auth-form';
import { AccountForm as AccountFormTanstack } from '@/features/auth/components/auth-form-tanstack';
import { AccountForm as AccountFormTRPC } from '@/features/auth/components/auth-form-trpc';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';
import { withBehaviorVariant } from '@/components/withBehaviorVariant';

const AuthFormComponents = withBehaviorVariant({
  default: AccountForm,
  tanstack: AccountFormTanstack,
  trpc: AccountFormTRPC,
});

const Login = () => {
  return (
    <MainWrapper>
      <Helmet>
        <title>Loginページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリのユーザーログインページです" />
      </Helmet>
      <div className="flex justify-center">
        <AuthFormComponents type="login" />
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
