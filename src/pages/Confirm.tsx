import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { authEmailVerifyOpt } from '@/services/authService';
import { EmailOtpType } from '@supabase/supabase-js';

const emalOtpType = ["signup", "invite", "magiclink", "recovery", "email_change", "email"];

const EmailVerificationPage = () => {
  const [verificationStatus, setVerificationStatus] = useState('検証中...');
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token_hash = searchParams.get('token');
    const type = searchParams.get('type');

    if (token_hash && type !== null) {
      if (emalOtpType.includes(type)) {
        verifyEmail(token_hash, type as EmailOtpType);
      } else {
        setVerificationStatus('無効なリンクです。');
      }
    } else {
      setVerificationStatus('無効なリンクです。');
    }
  }, [searchParams]);

  const verifyEmail = async (token: string, type: EmailOtpType) => {
    authEmailVerifyOpt(token, type);
  };

  return (
    <div className="text-center">
      <h1>メールアドレス確認</h1>
      <p>{verificationStatus}</p>
    </div>
  );
};

export default EmailVerificationPage;