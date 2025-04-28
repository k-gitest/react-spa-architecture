import {
  signInWithPasswordAuthService,
  signUpAuthService,
  signInWithOAuthService,
  signOutAuthService,
} from '@/features/auth/services/authService';
import { Account } from '@/features/account/types/account-types';
import { useNavigate } from 'react-router-dom';
import { User, Session, AuthError, Provider } from '@supabase/supabase-js';
import { useApiMutation } from '@/hooks/use-tanstack-query';

export const useAuth = () => {
  const navigate = useNavigate();

  // サインアップ用
  const signUpMutation = useApiMutation<{ user: User | null; session: Session | null }, AuthError, { data: Account }>({
    mutationFn: ({ data }) => signUpAuthService(data),
    onSuccess: () => navigate('/dashboard'),
  });

  // サインイン用
  const signInMutation = useApiMutation<{ user: User | null; session: Session | null }, AuthError, { data: Account }>({
    mutationFn: ({ data }) => signInWithPasswordAuthService(data),
    onSuccess: () => navigate('/dashboard'),
  });

  // OAuth用
  const signInWithOAuthMutation = useApiMutation<
    { provider: Provider; url: string | null },
    AuthError,
    { provider: Provider; redirectTo: string }
  >({ mutationFn: (data) => signInWithOAuthService(data) });

  // サインアウト用
  const signOutMutation = useApiMutation<void, AuthError>({
    mutationFn: signOutAuthService,
    onSuccess: () => navigate('/login'),
  });

  // 各メソッド実装
  const signUp = async (data: Account) => {
    await signUpMutation.mutateAsync({ data });
  };

  const signIn = async (data: Account) => {
    await signInMutation.mutateAsync({ data });
  };

  const signInWithOAuth = async (data: { provider: Provider; redirectTo: string }) => {
    await signInWithOAuthMutation.mutateAsync(data);
  };

  const signOut = async () => {
    await signOutMutation.mutateAsync();
  };

  return {
    signUp,
    signUpMutation,
    signIn,
    signInMutation,
    signInWithOAuth,
    signOut,
    signOutMutation,
  };
};
