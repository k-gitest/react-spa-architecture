import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { validatedAccount } from '@/schemas/account-schema';
import { Account } from '@/types/account-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSignIn, useSignUp, useSignInWithOAuth } from '@/hooks/use-auth-queries';
import { Loader } from 'lucide-react';

export const AccountForm = (props: { type: string; }) => {

  const form = useForm<Account>({
    resolver: zodResolver(validatedAccount),
    defaultValues: { email: '', password: '' },
  });

  const signInMutation = useSignIn();
  const signUpMutation = useSignUp();
  const signInWithOAuthMutation = useSignInWithOAuth();

  const handleSubmit = async (formData: Account) => {
    if (props.type === 'login') {
      signInMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    }
    else {
      signUpMutation.mutate({
        email: formData.email,
        password: formData.password,
      });
    }

    form.reset();
  };

  const handleGithub = async () => {
    signInWithOAuthMutation.mutate();
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className="w-full flex flex-col gap-2 items-center">
        <FormWrapper onSubmit={handleSubmit} form={form}>
          <FormInput label="email" placeholder="emailを入力してください" name="email" />
          <FormInput label="password" placeholder="パスワードを入力してください" name="password" />
          <div className='text-center'>
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

