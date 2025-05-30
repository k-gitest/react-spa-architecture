import { render, screen } from '@testing-library/react';
import { describe, it, vi } from 'vitest';
import { FileList } from '@/components/file-list';

// getImageUrlをモック
vi.mock('@/lib/supabase', () => ({
  getImageUrl: (path: string) => `https://example.com/${path}`,
}));

describe('FileList', () => {
  const images = [
    {
      created_at: '2024-05-30T00:00:00Z',
      file_name: 'test1.png',
      file_path: 'path/to/test1.png',
      file_size: 1234,
      id: '1',
      mime_type: 'image/png',
      storage_object_id: 'obj1',
      updated_at: '2024-05-30T00:00:00Z',
      user_id: 'user1',
    },
    {
      created_at: '2024-05-30T00:00:00Z',
      file_name: 'test2.jpg',
      file_path: 'path/to/test2.jpg',
      file_size: 5678,
      id: '2',
      mime_type: 'image/jpeg',
      storage_object_id: 'obj2',
      updated_at: '2024-05-30T00:00:00Z',
      user_id: 'user2',
    },
  ];

  it('画像リストが正しく表示される', () => {
    render(<FileList images={images} handleDeleteImage={vi.fn()} />);
    expect(screen.getByAltText('test1.png')).toBeInTheDocument();
    expect(screen.getByAltText('test2.jpg')).toBeInTheDocument();
    expect(screen.getByText('test1.png')).toBeInTheDocument();
    expect(screen.getByText('test2.jpg')).toBeInTheDocument();
  });

  it('削除ボタンがクリックされるとhandleDeleteImageが呼ばれる', () => {
    const handleDeleteImage = vi.fn();
    render(<FileList images={images} handleDeleteImage={handleDeleteImage} />);
    const buttons = screen.getAllByRole('button', { name: '削除' });
    buttons[0].click();
    expect(handleDeleteImage).toHaveBeenCalledWith('1', 'path/to/test1.png', 'test1.png');
  });
});