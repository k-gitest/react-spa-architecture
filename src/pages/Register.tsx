import { AccountForm } from '@/components/account-form';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import MainWrapper from '@/components/layout/main-wrapper';

const Register = () => {
  return (
    <MainWrapper>
      <div className="flex justify-center">
        <AccountForm type="register" />
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
