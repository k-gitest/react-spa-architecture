import { FormWrapper, FormInput } from '@/components/form/form-parts';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { validatedAccount } from '@/features/account/schemas/account-schema';
import { Account } from '@/features/account/types/account-types';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader } from 'lucide-react';
import {
  signInWithPasswordAuthService,
  signUpAuthService,
  signInWithOAuthService,
} from '@/features/auth/services/authService';
import { useState } from 'react';
import { errorHandler } from '@/errors/error-handler';

export const AccountForm = (props: { type: string }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm<Account>({
    resolver: zodResolver(validatedAccount),
    defaultValues: { email: '', password: '' },
  });

  const handleSubmit = async (formData: Account) => {
    setIsLoading(true);
    try {
      if (props.type === 'login') {
        await signInWithPasswordAuthService(formData);
      } else {
        await signUpAuthService(formData);
      }
    } catch (error) {
      errorHandler(error);
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };

  const handleGithub = async () => {
    setIsLoading(true);
    try {
      await signInWithOAuthService({
        provider: 'github',
        redirectTo: `${window.location.origin}/dashboard`,
      });
    } catch (error) {
      errorHandler(error);
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-col gap-2 items-center">
        <FormWrapper onSubmit={handleSubmit} form={form}>
          <FormInput label="email" name="email" placeholder="emailを入力してください" />
          <FormInput label="password" name="password" placeholder="パスワードを入力してください" />
          <div className="text-center">
            <Button type="submit" className="w-32" disabled={isLoading}>
              {isLoading && <Loader className="animate-spin" />} 送信
            </Button>
          </div>
        </FormWrapper>
      </div>
      <div className="text-center">
        <Button onClick={handleGithub}>{props.type === 'register' ? 'Githubで登録' : 'Githubでログイン'}</Button>
      </div>
    </div>
  );
};
