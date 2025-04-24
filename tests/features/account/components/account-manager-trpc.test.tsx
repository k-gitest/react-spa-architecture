import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { AccountManager } from '@/features/account/components/account-manager-trpc';

// vi.mockはファイルの最初に巻き上げ（ホイスティング）されるため、
// モックで使われる変数もここで定義する
const mockUpdateAccount = vi.fn();
const mockResetPassword = vi.fn();
const mockDeleteAccount = vi.fn();

vi.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: vi.fn().mockReturnValue(true), // デフォルトでデスクトップビューをテスト
}));

vi.mock('@/features/account/hooks/use-account-queries-trpc', () => ({
  useAccount: () => ({
    updateAccount: mockUpdateAccount,
    resetPassword: mockResetPassword,
    deleteAccount: mockDeleteAccount,
  }),
}));

vi.mock('react-hook-form', () => ({
  useForm: vi.fn().mockReturnValue({
    register: vi.fn(),
    handleSubmit: vi.fn((fn) => fn),
    formState: { errors: {} },
    reset: vi.fn(),
    setValue: vi.fn(),
    getValues: vi.fn(),
    control: {},
  }),
}));

// インターフェースの定義
interface DialogProps {
  children?: React.ReactNode;
  buttonTitle?: string;
  dialogTitle?: string;
  dialogDescription?: string;
  isDesktop?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

interface FormWrapperProps {
  children?: React.ReactNode;
  onSubmit: (data: any) => void;
  form: any;
}

interface FormInputProps {
  name: string;
  label: string;
  placeholder?: string;
}

// ResponsiveDialogのモック
vi.mock('@/components/responsive-dialog', () => ({
  ResponsiveDialog: ({ children, buttonTitle, dialogTitle, onOpenChange }: DialogProps) => {
    return (
      <div data-testid={`dialog-${buttonTitle}`}>
        <button onClick={() => onOpenChange && onOpenChange(true)} data-testid={`open-dialog-${buttonTitle}`}>
          {buttonTitle}
        </button>
        <div data-testid={`dialog-content-${buttonTitle}`}>{children}</div>
      </div>
    );
  },
}));

// FormWrapperとFormInputのモック
vi.mock('@/components/form/form-parts', () => ({
  FormWrapper: ({ children, onSubmit }: FormWrapperProps) => (
    <form
      data-testid="form-wrapper"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ email: 'new@example.com', password: 'newpassword' });
      }}
    >
      {children}
    </form>
  ),
  FormInput: ({ name, label, placeholder }: FormInputProps) => (
    <input data-testid={`input-${name}`} name={name} aria-label={label} placeholder={placeholder} />
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
    const emailChangeDialog = screen.getByTestId('dialog-メールアドレス変更');
    const form = within(emailChangeDialog).getByTestId('form-wrapper');
    fireEvent.submit(form);
    expect(mockUpdateAccount).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });

  it('パスワード変更フォームの送信時にresetPasswordを呼び出す', async () => {
    render(<AccountManager />);

    // パスワード変更ダイアログを取得
    const passwordChangeDialog = screen.getByTestId('dialog-パスワード変更');

    // フォームをダイアログ内で取得してsubmit
    const form = within(passwordChangeDialog).getByTestId('form-wrapper');
    fireEvent.submit(form);

    // resetPasswordが正しいデータで呼ばれることを検証
    expect(mockResetPassword).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });

  it('削除ボタンをクリックでdeleteAccountを呼び出す', async () => {
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
