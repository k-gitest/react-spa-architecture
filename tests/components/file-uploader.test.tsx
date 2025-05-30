import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { FileUploader } from '@/components/file-uploader';

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input {...props} />,
}));
vi.mock('@/components/ui/button', () => ({
  Button: (props: any) => <button {...props} />,
}));

describe('FileUploader', () => {
  const createFile = (name: string, type = 'image/png') =>
    new File(['dummy'], name, { type });

  it('ファイル選択時にonChangeが呼ばれる', () => {
    const onChange = vi.fn();
    const { container } = render(<FileUploader files={[]} onChange={onChange} />);
    // input[type="file"]を直接取得
    const inputEl = container.querySelector('input[type="file"]') as HTMLInputElement;
    const file = createFile('test.png');
    fireEvent.change(inputEl, { target: { files: [file] } });
    expect(onChange).toHaveBeenCalledWith([file]);
  });

  it('エラーが表示される', () => {
    render(<FileUploader files={[]} onError="アップロードエラー" />);
    expect(screen.getByText('アップロードエラー')).toBeInTheDocument();
  });

  it('送信ボタンでonUploadが呼ばれる', async () => {
    const onUpload = vi.fn();
    const files = [createFile('test.png')];
    render(<FileUploader files={files} onUpload={onUpload} />);
    const button = screen.getByRole('button', { name: '送信' });
    fireEvent.click(button);
    await waitFor(() => {
      expect(onUpload).toHaveBeenCalledWith(files);
    });
  });
});