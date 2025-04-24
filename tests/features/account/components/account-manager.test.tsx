import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { AccountManager } from '@/features/account/components/account-manager';

// モック関数の定義
const mockUpdateAccount = vi.fn();
const mockResetPassword = vi.fn();
const mockDeleteAccount = vi.fn();

// ダイアログのモック
vi.mock('@/components/responsive-dialog', () => ({
  ResponsiveDialog: ({
    children,
    buttonTitle,
    dialogTitle,
    dialogDescription,
    ...rest
  }: {
    children: React.ReactNode;
    buttonTitle: string;
    dialogTitle: string;
    dialogDescription: string;
    [key: string]: any;
  }) => (
    <div data-testid={`dialog-${buttonTitle}`}>
      <button data-testid={`open-dialog-${buttonTitle}`} {...rest}>
        {buttonTitle}
      </button>
      <div data-testid={`dialog-content-${buttonTitle}`}>
        <h2>{dialogTitle}</h2>
        <p>{dialogDescription}</p>
        {children}
      </div>
    </div>
  ),
}));

// useMediaQuery のモック
vi.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: vi.fn().mockReturnValue(true), // デフォルトでデスクトップビュー
}));

// useAccount のモック
vi.mock('@/features/account/hooks/use-account-queries-tanstack', () => ({
  useAccount: () => ({
    updateAccount: mockUpdateAccount,
    resetPassword: mockResetPassword,
    deleteAccount: mockDeleteAccount,
  }),
}));

// react-hook-form のモック
vi.mock('react-hook-form', () => {
  //rhfのuseFormプロパティ設定
  const useFormMock = vi.fn().mockReturnValue({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => fn),
    formState: { errors: {} },
    reset: vi.fn(),
    setValue: vi.fn(),
    getValues: vi.fn(),
    control: {},
  });
  const FormProviderMock = ({ children }: { children: React.ReactNode }) => <>{children}</>;
  const ControllerMock = ({ field, children }: any) => (typeof children === 'function' ? children({ ...field }) : null);
  return { useForm: useFormMock, FormProvider: FormProviderMock, Controller: ControllerMock };
});

// FormWrapperとFormInput のモック
vi.mock('@/components/form/form-parts', () => ({
  FormWrapper: ({ children, onSubmit }: any) => (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email: 'new@example.com', password: 'newpassword' });
      }}
      data-testid="form-wrapper"
    >
      {children}
    </form>
  ),
  FormInput: ({ label, name, placeholder }: any) => (
    <input aria-label={label} name={name} placeholder={placeholder} data-testid={`input-${name}`} />
  ),
}));

// useSessionStoreモックの初期値を設定
let defaultSession: {
  session?: {
    user: {
      id: string;
      email: string;
      updated_at: string;
      identities: { provider: string }[];
      recovery_sent_at?: string;
    } | null;
  };
} = {
  session: {
    user: {
      id: 'test-user-id',
      email: 'user@example.com',
      updated_at: '2025-04-01T00:00:00Z',
      identities: [{ provider: 'email' }],
    },
  },
};
// useSessionStoreモック
vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: (selector: any) => selector(defaultSession),
}));

describe('AccountManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // ダイアログの開閉状態を管理する useState のモック
    vi.spyOn(React, 'useState').mockReturnValue([false, vi.fn()]);
  });

  it('ユーザー情報をレンダリング', () => {
    render(<AccountManager />);
    expect(screen.getByText('アカウント設定')).toBeInTheDocument();
    expect(screen.getByText('メール：user@example.com')).toBeInTheDocument();
    expect(screen.getByText(/最終ログイン：/)).toBeInTheDocument();
  });

  it('メール変更ダイアログボタンをレンダリング', () => {
    render(<AccountManager />);
    expect(screen.getByTestId('open-dialog-メールアドレス変更')).toBeInTheDocument();
  });

  it('providerがemail且つrecovery_sent_atが存在する場合はパスワード変更ダイアログボタン表示', () => {
    render(<AccountManager />);
    expect(screen.getByTestId('open-dialog-パスワード変更')).toBeInTheDocument();
  });

  it('メール変更フォームの送信時にupdateAccountを呼び出す', async () => {
    render(<AccountManager />);
    fireEvent.click(screen.getByTestId('open-dialog-メールアドレス変更'));
    const form = within(screen.getByTestId('dialog-メールアドレス変更')).getByTestId('form-wrapper');
    fireEvent.submit(form);
    expect(mockUpdateAccount).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });

  it('パスワード変更フォームの送信時にresetPasswordを呼び出す', () => {
    // アカウントマネージャーをレンダリング
    render(<AccountManager />);

    // パスワード変更ボタンの親要素を取得
    const dialogContainer = screen.getByTestId('dialog-パスワード変更');

    // この親要素内のフォームを取得
    const form = within(dialogContainer).getByTestId('form-wrapper');

    // フォームを送信
    fireEvent.submit(form);

    // resetPasswordが呼ばれたことを確認
    expect(mockResetPassword).toHaveBeenCalledWith({
      email: 'new@example.com',
      password: 'newpassword',
    });
  });

  it('削除ボタンをクリックでdeleteAccountを呼び出す', () => {
    render(<AccountManager />);
    fireEvent.click(screen.getByText('アカウント削除'));
    expect(mockDeleteAccount).toHaveBeenCalledWith('test-user-id');
  });

  it('providerがemail且つrecovery_sent_atが存在する場合は新しいパスワードダイアログを表示', () => {
    if (defaultSession.session?.user) {
      defaultSession.session.user.recovery_sent_at = 'test-date';
    }
    render(<AccountManager />);
    expect(screen.getByTestId('open-dialog-新しいパスワードへ変更')).toBeInTheDocument();
    expect(screen.queryByTestId('open-dialog-パスワード変更')).not.toBeInTheDocument();
  });

  it('新しいパスワードフォームの送信時にupdateAccountを呼び出す', async () => {
    render(<AccountManager />);
    fireEvent.click(screen.getByTestId('open-dialog-新しいパスワードへ変更'));
    const form = within(screen.getByTestId('dialog-新しいパスワードへ変更')).getByTestId('form-wrapper');
    fireEvent.submit(form);
    expect(mockUpdateAccount).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });

  it('メールプロバイダ以外の場合はメールとパスワードの変更ボタン非表示', () => {
    if (defaultSession.session?.user) {
      defaultSession.session.user.identities[0].provider = 'google';
    }
    render(<AccountManager />);
    expect(screen.queryByTestId('open-dialog-メールアドレス変更')).not.toBeInTheDocument();
    expect(screen.queryByTestId('open-dialog-パスワード変更')).not.toBeInTheDocument();
    expect(screen.queryByTestId('open-dialog-新しいパスワードへ変更')).not.toBeInTheDocument();
  });
});
