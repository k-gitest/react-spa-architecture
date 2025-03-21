import { AccountForm } from '@/components/account-form';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div>
      <div className="flex justify-center">
        <AccountForm type="register" />
      </div>

      <div className="flex justify-center p-4">
        <p>
          既に登録している方は
          <Button>
            <Link to="/login">ログインページ</Link>
          </Button>
          からログインしてください
        </p>
      </div>
    </div>
  );
};

export default Register;
