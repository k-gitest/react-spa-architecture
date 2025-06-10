import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { FileThumbnail } from '@/components/file-thumbnail';

// FormInputをモック
vi.mock('@/components/form/form-parts', () => ({
  FormInput: (props: any) => <input data-testid={props.name} placeholder={props.placeholder} />,
}));

describe('FileThumbnail', () => {
  const createFile = (name: string, size: number, type = 'image/png') =>
    new File(['dummy content'], name, { type, lastModified: Date.now() });

  const files = [
    createFile('test1.png', 1234),
    createFile('test2.jpg', 5678, 'image/jpeg'),
  ];

  beforeEach(() => {
    vi.stubGlobal('URL', {
      createObjectURL: vi.fn(() => 'blob:http://localhost/dummy'),
    });
  });

  it('選択ファイルの見出しが表示される', () => {
    render(<FileThumbnail files={files} onDelete={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText('選択ファイル')).toBeInTheDocument();
  });

  it('ファイル名とサイズが表示される', () => {
    render(<FileThumbnail files={files} onDelete={vi.fn()} onRemove={vi.fn()} />);
    expect(screen.getByText('test1.png')).toBeInTheDocument();
    expect(screen.getByText('test2.jpg')).toBeInTheDocument();

    // ファイルサイズはFile APIの仕様で13 bytesになるため部分一致で検証
    expect(screen.getAllByText((content) => content.includes('bytes'))).toHaveLength(2);
  });

  it('削除ボタンがクリックされるとonDeleteが呼ばれる', () => {
    const onDelete = vi.fn();
    render(<FileThumbnail files={files} onDelete={onDelete} onRemove={vi.fn()} />);
    const buttons = screen.getAllByRole('button', { name: '削除' });
    fireEvent.click(buttons[0]);
    expect(onDelete).toHaveBeenCalledWith(0);
  });

  it('altテキストと説明のFormInputが表示される', () => {
    render(<FileThumbnail files={files} onDelete={vi.fn()} onRemove={vi.fn()} />);
    // 2ファイル分のinputがあることを確認
    expect(screen.getAllByPlaceholderText('画像の代替テキストを入力')).toHaveLength(2);
    expect(screen.getAllByPlaceholderText('画像の説明を入力')).toHaveLength(2);
  });
});