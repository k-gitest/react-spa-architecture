import { supabase } from '@/lib/supabase';
import FormInput from '@/components/form/form-input';
import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const AccountForm = (props: { type: string }) => {
  const validatedAccount = z.object({
    email: z.string().email({ message: 'emailアドレスは有効なアドレスを入力してください' }),
    password: z.string().min(6, { message: 'パスワードは6文字以上にしてください' }),
  });

  type Account = z.infer<typeof validatedAccount>;

  const form = useForm<Account>({
    resolver: zodResolver(validatedAccount),
    defaultValues: { email: '', password: '' },
  });

  const handleSubmit = async (formData: Account) => {
    if (props.type === 'login') {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });
      if (error) console.error('サインインエラー: ', error.message);
      console.log('サインイン成功: ', data);
      form.reset();
    }

    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
    });
    if (error) console.error('サインアップエラー: ', error.message);
    console.log('サインアップ成功：', data);
    form.reset();
  };

  const handleGithub = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: `/callback`,
      },
    });
    if (error) {
      console.error('サインアップエラー:', error);
    } else {
      console.log('サインアップ成功:', data);
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className="w-full flex flex-col gap-2 items-center">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6">
            <FormInput label="email" placeholder="emailを入力してください" name="email" />
            <FormInput label="password" placeholder="パスワードを入力してください" name="password" />
            <div className='text-center'>
              <Button type="submit" className="w-32">
                送信
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="text-center">
        <Button onClick={handleGithub}>Githubで登録</Button>
      </div>
    </div>
  );
};

export { AccountForm };
