import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AccountForm } from '@/features/auth/components/auth-form-trpc';
import { describe, it, vi, beforeEach } from 'vitest';
import { FormProvider, useFormContext } from 'react-hook-form';
import React from 'react';

// テストごとにモックの挙動を変えるため、外部変数として用意
const signUp = vi.fn();
const signIn = vi.fn();
const signInWithOAuth = vi.fn();
let isPendingSignUp = false;
let isPendingSignIn = false;

// useAuth をモック
vi.mock('@/features/auth/hooks/use-auth-queries-trpc', () => ({
  useAuth: () => ({
    signUp,
    signIn,
    signInWithOAuth,
    signUpMutation: { isPending: isPendingSignUp },
    signInMutation: { isPending: isPendingSignIn },
  }),
}));

// FormWrapper / FormInput モック（FormContext つなぎ込み）
vi.mock('@/components/form/form-parts', async () => {
  const actual = await vi.importActual<typeof import('@/components/form/form-parts')>(
    '@/components/form/form-parts'
  );
  return {
    ...actual,
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
          <input
            {...register(name)}
            id={name}
            name={name}
            placeholder={placeholder}
          />
        </div>
      );
    },
  };
});

describe('AccountForm コンポーネントのテスト', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    isPendingSignUp = false;
    isPendingSignIn = false;
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

  it('Githubで登録ボタンがクリックできること', async () => {
    render(<AccountForm type="signup" />);

    fireEvent.click(screen.getByRole('button', { name: /Githubで登録/i }));

    await waitFor(() => {
      expect(signInWithOAuth).toHaveBeenCalledWith({
        provider: 'github',
        redirectTo: window.location.origin,
      });
    });
  });

  it('読み込み中にLoaderが表示され、ボタンが無効になること', () => {
    isPendingSignUp = true;

    render(<AccountForm type="signup" />);
    const submitButton = screen.getByRole('button', { name: /送信/i });

    expect(submitButton).toBeDisabled();
    //expect(screen.getByTestId('loader-icon')).toBeInTheDocument(); // Loaderにテスト用のtestIdを付ける
  });
});
