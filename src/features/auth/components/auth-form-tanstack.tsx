import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { validatedAccount } from '@/features/account/schemas/account-schema';
import { Account } from '@/features/account/types/account-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAuth } from '@/features/auth/hooks/use-auth-queries-tanstack';
import { Loader } from 'lucide-react';

export const AccountForm = (props: { type: string }) => {
  const form = useForm<Account>({
    resolver: zodResolver(validatedAccount),
    defaultValues: { email: '', password: '' },
  });

  const { signUp, signIn, signInWithOAuth, signUpMutation, signInMutation } = useAuth();

  const handleSubmit = async (formData: Account) => {
    if (props.type === 'login') {
      signIn(formData);
    } else {
      signUp(formData);
    }

    form.reset();
  };

  const handleGithub = async () => {
    signInWithOAuth({
      provider: 'github',
      redirectTo: `${window.location.origin}/dashboard`,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2 items-center">
        <FormWrapper onSubmit={handleSubmit} form={form}>
          <FormInput label="email" name="email" placeholder="emailを入力してください" />
          <FormInput label="password" name="password" placeholder="パスワードを入力してください" />
          <div className="text-center">
            <Button type="submit" className="w-32" disabled={signInMutation.isPending || signUpMutation.isPending}>
              {(signInMutation.isPending || signUpMutation.isPending) && <Loader className="animate-spin" />} 送信
            </Button>
          </div>
        </FormWrapper>
      </div>
      <div className="text-center">
        <Button onClick={handleGithub}>Githubで登録</Button>
      </div>
    </div>
  );
};
