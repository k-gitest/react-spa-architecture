import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { AccountForm } from '@/features/auth/components/auth-form-tanstack';
import { useFormContext, FormProvider } from 'react-hook-form';
import { useAuth } from '@/features/auth/hooks/use-auth-queries-tanstack';

vi.mock('@/features/auth/hooks/use-auth-queries-tanstack', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/components/form/form-parts', () => ({
  FormWrapper: ({ children, onSubmit, form }: any) => (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  ),
  FormInput: ({ label, name, placeholder }: any) => {
    const { register } = useFormContext();
    return (
      <div>
        <label htmlFor={name}>{label}</label>
        <input {...register(name)} id={name} name={name} placeholder={placeholder} />
      </div>
    );
  },
}));

describe('AccountForm コンポーネントのテスト', () => {
  const signUp = vi.fn();
  const signIn = vi.fn();
  const signInWithOAuth = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useAuth as any).mockReturnValue({
      signUp,
      signIn,
      signInWithOAuth,
      signUpMutation: { isPending: false },
      signInMutation: { isPending: false },
    });
  });

  it('サインアップフォームとして送信できること', async () => {
    render(<AccountForm type="signup" />);

    fireEvent.change(screen.getByPlaceholderText('emailを入力してください'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワードを入力してください'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await waitFor(() => {
      expect(signUp).toHaveBeenCalledWith({
        email: 'test@example.com',
        password: 'password123',
      });
    });
  });

  it('ログインフォームとして送信できること', async () => {
    render(<AccountForm type="login" />);

    fireEvent.change(screen.getByPlaceholderText('emailを入力してください'), {
      target: { value: 'login@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワードを入力してください'), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        email: 'login@example.com',
        password: 'password123',
      });
    });
  });

  it('Githubボタン（register）でOAuthが呼ばれること', async () => {
    render(<AccountForm type="register" />);

    fireEvent.click(screen.getByRole('button', { name: /Githubで登録/i }));

    await waitFor(() => {
      expect(signInWithOAuth).toHaveBeenCalledWith({
        provider: 'github',
        redirectTo: `${window.location.origin}/dashboard`,
      });
    });
  });

  it('Githubボタン（login）でOAuthが呼ばれること', async () => {
    render(<AccountForm type="login" />);

    fireEvent.click(screen.getByRole('button', { name: /Githubでログイン/i }));

    await waitFor(() => {
      expect(signInWithOAuth).toHaveBeenCalledWith({
        provider: 'github',
        redirectTo: `${window.location.origin}/dashboard`,
      });
    });
  });

  it('読み込み中にLoaderが表示され、ボタンが無効になること', async () => {
    (useAuth as any).mockReturnValue({
      signUp,
      signIn,
      signInWithOAuth,
      signUpMutation: { isPending: true },
      signInMutation: { isPending: false },
    });

    render(<AccountForm type="signup" />);
    const button = screen.getByRole('button', { name: /送信/i });

    expect(button).toBeDisabled();
    expect(button.querySelector('svg')).toBeInTheDocument(); // Lucide Loader icon が含まれているか
  });
});
