import { render, screen, fireEvent } from '@testing-library/react';
import { MemoItemAddDialog } from '@/features/memo/components/memo-item-add-dialog';

// ResponsiveDialogとuseMediaQueryのモック
vi.mock('@/components/responsive-dialog', async () => {
  return await import('@tests/mocks/responsive-dialog');
});

vi.mock('@/hooks/use-media-query', () => ({
  useMediaQuery: () => true,
}));

describe('MemoItemAddDialog', () => {
  const defaultProps = {
    buttonTitle: 'カテゴリー追加',
    dialogTitle: 'カテゴリー追加ダイアログ',
    dialogDescription: '新しいカテゴリーを追加します',
    placeholder: 'カテゴリー名を入力してください',
    value: '',
    open: true,
    setOpen: vi.fn(),
    setValue: vi.fn(),
    onSubmit: vi.fn(),
  };

  it('ダイアログのタイトル・説明・ボタン・インプットが表示される', () => {
    render(<MemoItemAddDialog {...defaultProps} />);
    expect(screen.getByTestId('dialog-カテゴリー追加')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('カテゴリー名を入力してください')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: '送信' })).toBeInTheDocument();
  });

  it('インプットに入力するとsetValueが呼ばれる', () => {
    render(<MemoItemAddDialog {...defaultProps} />);
    const input = screen.getByPlaceholderText('カテゴリー名を入力してください');
    fireEvent.change(input, { target: { value: 'テストカテゴリー' } });
    expect(defaultProps.setValue).toHaveBeenCalledWith('テストカテゴリー');
  });

  it('送信ボタンを押すとonSubmitが呼ばれる', () => {
    render(<MemoItemAddDialog {...defaultProps} />);
    const button = screen.getByRole('button', { name: '送信' });
    fireEvent.click(button);
    expect(defaultProps.onSubmit).toHaveBeenCalled();
  });
});