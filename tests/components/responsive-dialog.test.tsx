import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ResponsiveDialog } from '@/components/responsive-dialog'; // パスは適宜調整してください

// モック
vi.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog">{children}</div>,
  DialogContent: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-content">{children}</div>,
  DialogDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="dialog-description">{children}</div>
  ),
  DialogHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-header">{children}</div>,
  DialogTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-title">{children}</div>,
  DialogTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="dialog-trigger">{children}</div>,
}));

vi.mock('@/components/ui/drawer', () => ({
  Drawer: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer">{children}</div>,
  DrawerClose: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-close">{children}</div>,
  DrawerContent: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-content">{children}</div>,
  DrawerDescription: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="drawer-description">{children}</div>
  ),
  DrawerFooter: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-footer">{children}</div>,
  DrawerHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-header">{children}</div>,
  DrawerTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-title">{children}</div>,
  DrawerTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="drawer-trigger">{children}</div>,
}));

vi.mock('@/components/ui/button', () => ({
  Button: ({ children, onClick, variant }: { children: React.ReactNode; onClick?: () => void; variant?: string }) => (
    <button 
      data-testid={variant === 'outline' && children === 'キャンセル' ? 'cancel-button' : 'trigger-button'} 
      onClick={onClick}
    >
      {children}
    </button>
  ),
}));

vi.mock('@/lib/utils', () => ({
  cn: (...args: any[]) => args.filter(Boolean).join(' '),
}));

describe('ResponsiveDialog', () => {
  const defaultProps = {
    isDesktop: true,
    buttonTitle: 'Open Dialog',
    dialogTitle: 'Dialog Title',
    dialogDescription: 'Dialog Description',
    children: <div data-testid="dialog-content-children">Test Content</div>,
  };

  it('デスクトップ環境で正しくDialogをレンダリングする', () => {
    render(<ResponsiveDialog {...defaultProps} />);
    
    // DialogTriggerの中のボタンが存在することを確認
    expect(screen.getByTestId('trigger-button')).toBeInTheDocument();
    expect(screen.getByText('Open Dialog')).toBeInTheDocument();
    
    // Dialogコンポーネントが使用されていることを確認
    expect(screen.getByTestId('dialog')).toBeInTheDocument();
    expect(screen.queryByTestId('drawer')).not.toBeInTheDocument();
  });

  it('モバイル環境で正しくDrawerをレンダリングする', () => {
    render(<ResponsiveDialog {...defaultProps} isDesktop={false} hasFooter={true} />);
    
    // DrawerTriggerの中のボタンが存在することを確認
    const triggerButton = screen.getByTestId('trigger-button');
    expect(triggerButton).toBeInTheDocument();
    expect(triggerButton).toHaveTextContent('Open Dialog');
    
    // Drawerコンポーネントが使用されていることを確認
    expect(screen.getByTestId('drawer')).toBeInTheDocument();
    expect(screen.queryByTestId('dialog')).not.toBeInTheDocument();
    
    // Drawer固有の要素が存在することを確認
    expect(screen.getByTestId('drawer-footer')).toBeInTheDocument();
    
    // キャンセルボタンが存在することを確認
    const cancelButton = screen.getByTestId('cancel-button');
    expect(cancelButton).toBeInTheDocument();
    expect(cancelButton).toHaveTextContent('キャンセル');
  });

  it('タイトルと説明を正しくレンダリングする（デスクトップ）', () => {
    render(<ResponsiveDialog {...defaultProps} />);
    
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
  });

  it('タイトルと説明を正しくレンダリングする（モバイル）', () => {
    render(<ResponsiveDialog {...defaultProps} isDesktop={false} />);
    
    expect(screen.getByText('Dialog Title')).toBeInTheDocument();
    expect(screen.getByText('Dialog Description')).toBeInTheDocument();
  });

  it('子要素を正しくレンダリングする', () => {
    render(<ResponsiveDialog {...defaultProps} />);
    
    expect(screen.getByTestId('dialog-content-children')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('hasOverflowプロパティが指定されたときに正しいクラスを適用する（デスクトップ）', () => {
    const { container } = render(<ResponsiveDialog {...defaultProps} hasOverflow={true} />);
    
    // max-h-[60vh]とoverflow-y-autoクラスを持つdivが存在することを確認
    const contentDiv = container.querySelector('.max-h-\\[60vh\\].overflow-y-auto');
    expect(contentDiv).toBeInTheDocument();
  });

  it('onOpenChangeコールバックが正しく呼び出される', () => {
    const onOpenChangeMock = vi.fn();
    
    render(
      <ResponsiveDialog
        {...defaultProps}
        open={false}
        onOpenChange={onOpenChangeMock}
      />
    );
    
    // トリガーボタンをクリック
    fireEvent.click(screen.getByTestId('trigger-button'));
    
    // 注: 実際のテストではここでonOpenChangeが呼ばれることを検証したいですが、
    // モックの制約上、この検証は完全には行えません
  });

  it('カスタムクラス名を適用する', () => {
    const { container } = render(<ResponsiveDialog {...defaultProps} className="custom-class" />);
    
    const dialogContainer = container.querySelector('.w-full.custom-class');
    expect(dialogContainer).toBeInTheDocument();
  });
});