import {
  updateAccountService,
  resetPasswordForEmailAccountService,
  deleteAccountService,
} from '@/services/accountService';
import { AccountUpdate } from '@/types/account-types';
import { toast } from '@/hooks/use-toast';
import { User, AuthError } from '@supabase/supabase-js';
import { useApiMutation } from '@/hooks/use-tanstack-query';
import { signOutAuthService } from '@/services/authService';
import { useNavigate } from 'react-router-dom';

export const useAccount = () => {
  const navigate = useNavigate();
  // ユーザー情報アップデート用
  const updateUserMutation = useApiMutation<{ user: User }, AuthError, AccountUpdate>({
    mutationFn: (data) => updateAccountService(data),
    onSuccess: () => toast({ title: '変更確認メールを送信しました' }),
  });

  // パスワードリセット用
  const resetPasswordForEmailMutation = useApiMutation<object | null, AuthError, AccountUpdate>({
    mutationFn: (data) => resetPasswordForEmailAccountService(data),
    onSuccess: () => toast({ title: 'パスワードリセットの確認メールを送信しました' }),
  });

  // アカウント削除用
  const deleteUserAccountMutation = useApiMutation<{ message: string }, AuthError, string>({
    mutationFn: (token) => deleteAccountService(token),
    onSuccess: () => {
      toast({ title: 'アカウントを削除しました' });
      signOutAuthService();
      navigate('/register');
    },
  });

  // 各メソッド実装
  const updateUser = async (data: AccountUpdate) => {
    await updateUserMutation.mutateAsync(data);
  };

  const resetPassword = async (data: AccountUpdate) => {
    if (data) await resetPasswordForEmailMutation.mutateAsync(data);
  };

  const deleteAccount = async (token: string) => {
    await deleteUserAccountMutation.mutateAsync(token);
  };

  return {
    updateUser,
    resetPassword,
    deleteAccount,
  };
};
