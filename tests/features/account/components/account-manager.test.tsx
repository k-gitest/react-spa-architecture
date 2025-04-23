import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';
import { AccountManager } from '@/features/account/components/account-manager';

// モック関数の定義
const mockUpdateAccount = vi.fn();
const mockResetPassword = vi.fn();
const mockDeleteAccount = vi.fn();
const mockSetSession = vi.fn();

// モックの宣言（すべてファイルの先頭に書く）
// ダイアログの内容部分を直接モックする方法
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
        <button
          data-testid={`open-dialog-${buttonTitle}`}
          {...rest}
        >
          {buttonTitle}
        </button>
        <div data-testid={`dialog-content-${buttonTitle}`}>
          <h2>{dialogTitle}</h2>
          <p>{dialogDescription}</p>
          {children}
        </div>
      </div>
    )
  }));

// useSessionStore のモック
vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn().mockImplementation((selector) =>
    selector({
      session: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          identities: [{ provider: 'email' }],
          updated_at: '2025-04-22T10:00:00Z',
          recovery_sent_at: null,
        },
      },
      setSession: mockSetSession,
    }),
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

// FormWrapper と FormInput のモック
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

describe('AccountManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // ダイアログの開閉状態を管理する useState のモック
    vi.spyOn(React, 'useState').mockReturnValue([false, vi.fn()]);
  });

  it('renders user information', () => {
    render(<AccountManager />);
    expect(screen.getByText('アカウント設定')).toBeInTheDocument();
    expect(screen.getByText('メール：test@example.com')).toBeInTheDocument();
    expect(screen.getByText(/最終ログイン：/)).toBeInTheDocument();
  });

  it('renders email change dialog button for email provider', () => {
    render(<AccountManager />);
    expect(screen.getByTestId('open-dialog-メールアドレス変更')).toBeInTheDocument();
  });

  it('renders password change dialog button for email provider and no recovery_sent_at', () => {
    render(<AccountManager />);
    expect(screen.getByTestId('open-dialog-パスワード変更')).toBeInTheDocument();
  });

  it('calls updateAccount on email change form submit', async () => {
    render(<AccountManager />);
    fireEvent.click(screen.getByTestId('open-dialog-メールアドレス変更'));
    const form = within(screen.getByTestId('dialog-メールアドレス変更')).getByTestId('form-wrapper');
    fireEvent.submit(form);
    expect(mockUpdateAccount).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });

  it('calls resetPassword on password change form submit', () => {
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

  it('calls deleteAccount on delete button click', () => {
    render(<AccountManager />);
    fireEvent.click(screen.getByText('アカウント削除'));
    expect(mockDeleteAccount).toHaveBeenCalledWith('test-user-id');
  });

  /*
  it('renders new password dialog when recovery_sent_at is present', () => {
    const mockUseSessionStore = vi.mocked(require('@/hooks/use-session-store').useSessionStore); // テスト内で取得
    mockUseSessionStore.mockImplementationOnce((selector: (state: any) => any) =>
      selector({
        session: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            identities: [{ provider: 'email' }],
            updated_at: '2025-04-22T10:00:00Z',
            recovery_sent_at: '2025-04-22T09:00:00Z',
          },
        },
        setSession: vi.fn(),
      }),
    );
    render(<AccountManager />);
    expect(screen.getByTestId('open-dialog-新しいパスワードへ変更')).toBeInTheDocument();
    expect(screen.queryByTestId('open-dialog-パスワード変更')).not.toBeInTheDocument();
  });
  */

  /*
  it('calls updateAccount on new password form submit', async () => {
    const mockUseSessionStore = vi.mocked(require('@/hooks/use-session-store').useSessionStore);
    mockUseSessionStore.mockImplementationOnce((selector: (state: any) => any) =>
      selector({
        session: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            identities: [{ provider: 'google' }],
            updated_at: '2025-04-22T10:00:00Z',
            recovery_sent_at: null,
          },
        },
        setSession: vi.fn(), // こちらもモック
      }),
    );
    render(<AccountManager />);
    fireEvent.click(screen.getByTestId('open-dialog-新しいパスワードへ変更'));
    const form = within(screen.getByTestId('dialog-新しいパスワードへ変更')).getByTestId('form-wrapper');
    fireEvent.submit(form);
    expect(mockUpdateAccount).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });
  */

  /*
  it('does not render email and password change buttons for non-email providers', () => {
    const mockUseSessionStore = vi.mocked(require('@/hooks/use-session-store').useSessionStore);
    mockUseSessionStore.mockImplementationOnce((selector: (state: any) => any) =>
      selector({
        session: {
          user: {
            id: 'test-user-id',
            email: 'test@example.com',
            identities: [{ provider: 'google' }],
            updated_at: '2025-04-22T10:00:00Z',
            recovery_sent_at: null,
          },
        },
        setSession: vi.fn(), // こちらもモック
      }),
    );
    render(<AccountManager />);
    expect(screen.queryByTestId('open-dialog-メールアドレス変更')).not.toBeInTheDocument();
    expect(screen.queryByTestId('open-dialog-パスワード変更')).not.toBeInTheDocument();
    expect(screen.queryByTestId('open-dialog-新しいパスワードへ変更')).not.toBeInTheDocument();
  });
  */
});
