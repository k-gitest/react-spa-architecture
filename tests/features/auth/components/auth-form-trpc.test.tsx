import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AccountForm } from '@/features/auth/components/auth-form-trpc';
import { describe, it, vi, beforeEach } from 'vitest';
import { FormProvider, useFormContext } from 'react-hook-form';
import React from 'react';

// 外部変数でモック関数とフラグを管理
const signUp = vi.fn();
const signIn = vi.fn();
const signInWithOAuth = vi.fn();
let isPendingSignUp = false;
let isPendingSignIn = false;

// useAuth のモック
vi.mock('@/features/auth/hooks/use-auth-queries-trpc', () => ({
  useAuth: () => ({
    signUp,
    signIn,
    signInWithOAuth,
    signUpMutation: { isPending: isPendingSignUp },
    signInMutation: { isPending: isPendingSignIn },
  }),
}));

// FormWrapper / FormInput のモック（FormContext 反映）
vi.mock('@/components/form/form-parts', async () => {
  return await import('@tests/mocks/form-parts');
});

describe('AccountForm (trpc版) のテスト', () => {
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

  it('Githubボタン（register）のクリックでOAuthが呼ばれること', async () => {
    render(<AccountForm type="register" />);

    fireEvent.click(screen.getByRole('button', { name: /Githubで登録/i }));

    await waitFor(() => {
      expect(signInWithOAuth).toHaveBeenCalledWith({
        provider: 'github',
        redirectTo: `${window.location.origin}/dashboard`,
      });
    });
  });

  it('Githubボタン（login）のクリックでOAuthが呼ばれること', async () => {
    render(<AccountForm type="login" />);

    fireEvent.click(screen.getByRole('button', { name: /Githubでログイン/i }));

    await waitFor(() => {
      expect(signInWithOAuth).toHaveBeenCalledWith({
        provider: 'github',
        redirectTo: `${window.location.origin}/dashboard`,
      });
    });
  });

  it('読み込み中にLoaderが表示され、送信ボタンが無効になること', () => {
    isPendingSignUp = true;

    render(<AccountForm type="signup" />);
    const submitButton = screen.getByRole('button', { name: /送信/i });

    expect(submitButton).toBeDisabled();
    expect(submitButton.querySelector('svg')).toBeInTheDocument(); // LucideのLoaderが存在する
  });
});
