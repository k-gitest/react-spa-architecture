import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, within } from '@testing-library/react';
import React from 'react';

// vi.mockはファイルの最初に巻き上げ（ホイスティング）されるため、
// モックで使われる変数もここで定義する必要があります
const mockUpdateAccount = vi.fn();
const mockResetPassword = vi.fn();
const mockDeleteAccount = vi.fn();

// モックの設定
vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn().mockImplementation((selector) => 
    selector({
      session: {
        user: {
          id: 'test-user-id',
          email: 'test@example.com',
          identities: [{ provider: 'email' }],
          updated_at: '2025-04-22T10:00:00Z',
        }
      }
    })
  ),
}));

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
        <button 
          onClick={() => onOpenChange && onOpenChange(true)}
          data-testid={`open-dialog-${buttonTitle}`}
        >
          {buttonTitle}
        </button>
        <div data-testid={`dialog-content-${buttonTitle}`}>
          {children}
        </div>
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

// ここでコンポーネントをインポート (すべてのモックが定義された後)
import { AccountManager } from '@/features/account/components/account-manager-trpc';
import { useSessionStore as originalUseSessionStore } from '@/hooks/use-session-store';

describe('AccountManager', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders the component with user data', () => {
    render(<AccountManager />);
    
    expect(screen.getByText('アカウント設定')).toBeInTheDocument();
    expect(screen.getByText('メール：test@example.com')).toBeInTheDocument();
    expect(screen.getByText(/最終ログイン：/)).toBeInTheDocument();
  });

  it('renders email change dialog button when provider is email', () => {
    render(<AccountManager />);
    
    expect(screen.getByTestId('open-dialog-メールアドレス変更')).toBeInTheDocument();
  });

  it('renders password change dialog button when provider is email', () => {
    render(<AccountManager />);
    
    expect(screen.getByTestId('open-dialog-パスワード変更')).toBeInTheDocument();
  });

  it('calls updateAccount when submitting email change form', async () => {
    render(<AccountManager />);
    
    // メールアドレス変更ダイアログを取得
    const emailChangeDialog = screen.getByTestId('dialog-メールアドレス変更');
    
    // フォームをダイアログ内で取得してsubmit
    const form = within(emailChangeDialog).getByTestId('form-wrapper');
    fireEvent.submit(form);
    
    // updateAccountが正しいデータで呼ばれることを検証
    expect(mockUpdateAccount).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });

  it('calls resetPassword when submitting password reset form', async () => {
    render(<AccountManager />);
    
    // パスワード変更ダイアログを取得
    const passwordChangeDialog = screen.getByTestId('dialog-パスワード変更');
    
    // フォームをダイアログ内で取得してsubmit
    const form = within(passwordChangeDialog).getByTestId('form-wrapper');
    fireEvent.submit(form);
    
    // resetPasswordが正しいデータで呼ばれることを検証
    expect(mockResetPassword).toHaveBeenCalledWith({ email: 'new@example.com', password: 'newpassword' });
  });

  it('calls deleteAccount when clicking the delete account button', async () => {
    render(<AccountManager />);
    
    // アカウント削除ボタンをクリック
    fireEvent.click(screen.getByText('アカウント削除'));
    
    // deleteAccountが正しいユーザーIDで呼ばれることを検証
    expect(mockDeleteAccount).toHaveBeenCalledWith('test-user-id');
  });

  /*
  it('renders new password dialog when recovery_sent_at is present', () => {
    // セッションユーザーにrecovery_sent_atを設定したモック
    vi.mock('@/hooks/use-session-store', () => ({
        useSessionStore: vi.fn().mockImplementation((selector: (state: any) => any) =>
          selector({
            session: {
              user: {
                id: 'test-user-id',
                email: 'test@example.com',
                identities: [{ provider: 'email' }],
                updated_at: '2025-04-22T10:00:00Z',
              }
            }
          })
        ),
      }));
    
    render(<AccountManager />);
    
    // 新しいパスワード設定ダイアログのボタンが表示されることを確認
    expect(screen.getByTestId('open-dialog-新しいパスワードへ変更')).toBeInTheDocument();
    
    // 通常のパスワード変更ボタンが表示されないことを確認
    expect(screen.queryByTestId('open-dialog-パスワード変更')).not.toBeInTheDocument();
    
    // モックを元に戻す
    vi.mocked(require('@/hooks/use-session-store').useSessionStore).mockImplementation(originalUseSessionStore);
  });

  it('does not render email and password change buttons for non-email providers', () => {
    // セッションユーザーにGoogle等のプロバイダーを設定したモック
    vi.mock('@/hooks/use-session-store', () => ({
        useSessionStore: vi.fn().mockImplementation((selector: (state: any) => any) =>
          selector({
            session: {
              user: {
                id: 'test-user-id',
                email: 'test@example.com',
                identities: [{ provider: 'email' }],
                updated_at: '2025-04-22T10:00:00Z',
              }
            }
          })
        ),
      }));
    
    render(<AccountManager />);
    
    // メールアドレス変更とパスワード変更のボタンが表示されないことを確認
    expect(screen.queryByTestId('open-dialog-メールアドレス変更')).not.toBeInTheDocument();
    expect(screen.queryByTestId('open-dialog-パスワード変更')).not.toBeInTheDocument();
    
    // モックを元に戻す
    vi.mocked(require('@/hooks/use-session-store').useSessionStore).mockImplementation(originalUseSessionStore);
  });
  */
});