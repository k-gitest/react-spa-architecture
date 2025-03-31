import { AccountForm } from '@/components/account-form';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainWrapper from '@/components/layout/main-wrapper'

const Login = () => {
  return (
    <MainWrapper>
      <div className="flex justify-center">
        <AccountForm type="login" />
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
