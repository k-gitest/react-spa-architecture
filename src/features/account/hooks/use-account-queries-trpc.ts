import { trpc } from '@/lib/trpc';
import { useApiMutation } from '../../../hooks/use-tanstack-query';
import { toast } from '@/hooks/use-toast';
import { AccountUpdate } from '@/features/account/types/account-types';
import { signOutAuthService } from '@/features/auth/services/authService';
import { useNavigate } from 'react-router-dom';

export const useAccount = () => {
  const navigate = useNavigate();

  const updateAccountMutationOptions = trpc.account.updateAccount.mutationOptions({
    onSuccess: () => toast({ title: '変更確認メールを送信しました' }),
  });
  const updateAccountMutation = useApiMutation(updateAccountMutationOptions);

  const resetPasswordForEmailMutationOptions = trpc.account.resetPasswordForEmailAccount.mutationOptions({
    onSuccess: () => toast({ title: 'パスワードリセットの確認メールを送信しました' }),
  });
  const resetPasswordForEmailMutation = useApiMutation(resetPasswordForEmailMutationOptions);

  const deleteUserAccountMutationOptions = trpc.account.deleteAccount.mutationOptions({
    onSuccess: () => {
      toast({ title: 'アカウントを削除しました' });
      signOutAuthService();
      navigate('/register');
    },
  });
  const deleteUserAccountMutation = useApiMutation(deleteUserAccountMutationOptions);

  const updateAccount = async (data: AccountUpdate) => {
    await updateAccountMutation.mutateAsync(data);
  };

  const resetPassword = async (data: AccountUpdate) => {
    if (data) await resetPasswordForEmailMutation.mutateAsync(data);
  };

  const deleteAccount = async (token: string) => {
    await deleteUserAccountMutation.mutateAsync(token);
  };

  return {
    updateAccount,
    resetPassword,
    deleteAccount,
  };
};
