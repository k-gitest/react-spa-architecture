import { render, screen } from '@testing-library/react';
import { AuthLayout } from '@/components/layout/auth/auth-layout';

// 各子コンポーネントをモック化
vi.mock('@/components/layout/auth/auth-header', () => ({
  AuthHeader: () => <header data-testid="auth-header">Mocked AuthHeader</header>,
}));

vi.mock('@/components/layout/auth/auth-main-wrapper', () => ({
  AuthMainWrapper: ({ children }: { children: React.ReactNode }) => (
    <main data-testid="auth-main-wrapper">{children}</main>
  ),
}));

vi.mock('@/components/ui/toaster', () => ({
  Toaster: () => <div data-testid="toaster">Mocked Toaster</div>,
}));

describe('AuthLayout', () => {
  it('AuthHeader, AuthMainWrapper, Toasterが描画される', () => {
    render(
      <AuthLayout>
        <div>Test Child</div>
      </AuthLayout>
    );

    expect(screen.getByTestId('auth-header')).toBeInTheDocument();
    expect(screen.getByTestId('auth-main-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('toaster')).toBeInTheDocument();
  });

  it('childrenが正しく表示される', () => {
    render(
      <AuthLayout>
        <p>Child Content</p>
      </AuthLayout>
    );

    expect(screen.getByText('Child Content')).toBeInTheDocument();
  });
});
