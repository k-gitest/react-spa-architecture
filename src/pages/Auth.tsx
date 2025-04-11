import { useAuthState } from '@/hooks/use-auth-state';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  useAuthState();
  const navigate = useNavigate();
  navigate('/auth/pass');
  return (<></>)
};
export default Auth;