import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi, beforeEach } from 'vitest';
import { FormProvider, useFormContext } from 'react-hook-form';
import { User, Session } from '@supabase/supabase-js';

// サービスとエラーハンドラのモック化
vi.mock('@/features/auth/services/authService', () => ({
  signInWithPasswordAuthService: vi.fn(),
  signUpAuthService: vi.fn(),
  signInWithOAuthService: vi.fn(),
}));

vi.mock('@/errors/error-handler', () => ({
  errorHandler: vi.fn(),
}));

// FormWrapper / FormInput のモック
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

// AccountFormはmock後にimport
import { AccountForm } from '@/features/auth/components/auth-form';

// モックの取得
const {
  signInWithPasswordAuthService,
  signUpAuthService,
  signInWithOAuthService,
} = vi.mocked(
  await import('@/features/auth/services/authService'),
  { partial: true }
);

const { errorHandler } = vi.mocked(
  await import('@/errors/error-handler'),
  { partial: true }
);

describe('AccountForm (authService) のテスト', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('ログインとしてフォーム送信ができること', async () => {
    render(<AccountForm type="login" />);

    fireEvent.change(screen.getByPlaceholderText('emailを入力してください'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワードを入力してください'), {
      target: { value: 'secret123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await waitFor(() => {
      expect(signInWithPasswordAuthService).toHaveBeenCalledWith({
        email: 'user@example.com',
        password: 'secret123',
      });
    });
  });

  it('サインアップとしてフォーム送信ができること', async () => {
    render(<AccountForm type="signup" />);

    fireEvent.change(screen.getByPlaceholderText('emailを入力してください'), {
      target: { value: 'newuser@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワードを入力してください'), {
      target: { value: 'mypassword' },
    });

    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await waitFor(() => {
      expect(signUpAuthService).toHaveBeenCalledWith({
        email: 'newuser@example.com',
        password: 'mypassword',
      });
    });
  });

  it('Githubボタンを押すとOAuthサインインが呼ばれること', async () => {
    render(<AccountForm type="register" />);

    fireEvent.click(screen.getByRole('button', { name: /Githubで登録/i }));

    await waitFor(() => {
      expect(signInWithOAuthService).toHaveBeenCalledWith({
        provider: 'github',
        redirectTo: `${window.location.origin}/dashboard`,
      });
    });
  });

  it('サインインでエラーが発生した場合 errorHandler が呼ばれること', async () => {
    signInWithPasswordAuthService.mockRejectedValue(new Error('login error'));
    render(<AccountForm type="login" />);

    fireEvent.change(screen.getByPlaceholderText('emailを入力してください'), {
      target: { value: 'user@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワードを入力してください'), {
      target: { value: 'secret123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await waitFor(() => {
      expect(errorHandler).toHaveBeenCalledWith(expect.any(Error));
    });
  });

  it('読み込み中はボタンが無効になること', async () => {
    let resolvePromise: any;
    const dummyUser = {} as User;
    const dummySession = {} as Session;
    const mockPromise: Promise<{ user: User; session: Session }> =
      new Promise((res) => (resolvePromise = () => res({ user: dummyUser, session: dummySession })));
    signUpAuthService.mockReturnValue(mockPromise);

    render(<AccountForm type="signup" />);

    fireEvent.change(screen.getByPlaceholderText('emailを入力してください'), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワードを入力してください'), {
      target: { value: 'pass123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /送信/i })).toBeDisabled();
    });

    resolvePromise(); // Promise解決
  });

  it('ログイン時、読み込み中はボタンが無効になること', async () => {
    let resolvePromise: any;
    // ダミーのUser/Sessionを用意
    const dummyUser = {} as User;
    const dummySession = {} as Session;
    const mockPromise: Promise<{ user: User; session: Session }> =
      new Promise((res) => (resolvePromise = () => res({ user: dummyUser, session: dummySession })));
    signInWithPasswordAuthService.mockReturnValue(mockPromise);

    render(<AccountForm type="login" />);

    fireEvent.change(screen.getByPlaceholderText('emailを入力してください'), {
      target: { value: 'test2@example.com' },
    });
    fireEvent.change(screen.getByPlaceholderText('パスワードを入力してください'), {
      target: { value: 'pass456' },
    });

    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /送信/i })).toBeDisabled();
    });

    resolvePromise(); // Promise解決
  });
});
