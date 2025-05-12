import { AccountForm } from '@/features/auth/components/auth-form';
import { AccountForm as AccountFormTanstack } from '@/features/auth/components/auth-form-tanstack';
import { AccountForm as AccountFormTRPC } from '@/features/auth/components/auth-form-trpc';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { MainWrapper } from '@/components/layout/main-wrapper';
import { Helmet } from 'react-helmet-async';
import { useBehaviorVariant } from '@/hooks/use-behavior-variant';

const Register = () => {
  const { getCurrentVariant } = useBehaviorVariant();
  const currentVariant = getCurrentVariant();
  const renderForm = () => {
    switch (currentVariant.id) {
      case 'default':
        return <AccountForm type="register" />;
      case 'tanstack':
        return <AccountFormTanstack type="register" />;
      case 'trpc':
        return <AccountFormTRPC type="register" />;
      default:
        return <AccountForm type="register" />;
    }
  };

  return (
    <MainWrapper>
      <Helmet>
        <title>新規登録ページ: React ⚛️ + Vite ⚡ + shadcn/ui</title>
        <meta name="description" content="メモアプリのユーザー新規登録ページです" />
      </Helmet>
      <div className="flex justify-center">{renderForm()}</div>

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
