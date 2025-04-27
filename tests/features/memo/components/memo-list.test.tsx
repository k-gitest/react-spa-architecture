import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import { MemoList } from '@/features/memo/components/memo-list';
import type { Memo } from '@/features/memo/types/memo-form-data';

describe('MemoList', () => {
  const mockMemos: Memo[] = [
    {
      id: '1',
      title: 'タイトル1',
      content: '内容1',
      category: 'カテゴリ1',
      importance: '重要',
      tags: ['タグ1', 'タグ2'],
      user_id: 'user-1',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-01T00:00:00Z',
    },
    {
      id: '2',
      title: 'タイトル2',
      content: '内容2',
      category: 'カテゴリ2',
      importance: '普通',
      tags: ['タグ3'],
      user_id: 'user-2',
      created_at: '2024-02-01T00:00:00Z',
      updated_at: '2024-02-01T00:00:00Z',
    },
  ];

  const onEdit = vi.fn();
  const onDelete = vi.fn();

  it('メモリストが正しく表示される', () => {
    render(<MemoList memoData={mockMemos} onEdit={onEdit} onDelete={onDelete} />);
    expect(screen.getByText('タイトル1')).toBeInTheDocument();
    expect(screen.getByText('内容2')).toBeInTheDocument();
    expect(screen.getAllByText('編集')).toHaveLength(2);
    expect(screen.getAllByText('削除')).toHaveLength(2);
  });

  it('編集ボタンをクリックすると onEdit が呼ばれる', () => {
    render(<MemoList memoData={mockMemos} onEdit={onEdit} onDelete={onDelete} />);
    const editButtons = screen.getAllByText('編集');
    fireEvent.click(editButtons[0]);
    expect(onEdit).toHaveBeenCalledWith('1');
  });

  it('削除ボタンをクリックすると onDelete が呼ばれる', () => {
    render(<MemoList memoData={mockMemos} onEdit={onEdit} onDelete={onDelete} />);
    const deleteButtons = screen.getAllByText('削除');
    fireEvent.click(deleteButtons[1]);
    expect(onDelete).toHaveBeenCalledWith('2');
  });
});
