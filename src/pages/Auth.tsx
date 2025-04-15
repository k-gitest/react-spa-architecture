import { useSessionObserver } from '@/hooks/use-session-observer';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const Auth = () => {
  //email_change_sent_at , recovery_sent_at
  const { session, loading } = useSessionObserver();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;

    if (session) {
      navigate('/auth/setting');
    } else {
      navigate('/');
    }
  }, [session, loading, navigate]);

  return loading ? <div>認証状態確認中...</div> : null;
};
export default Auth;
