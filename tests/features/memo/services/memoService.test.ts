import { supabase } from '@/lib/supabase';
import {
  fetchMemosService,
  addMemoService,
  getMemoService,
  updateMemoService,
  deleteMemoService,
} from '@/features/memo/services/memoService';
import { vi } from 'vitest';

vi.mock('@/lib/supabase', () => {
  return {
    supabase: {
      from: vi.fn(),
    },
  };
});

describe('Memo Service Functions', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('メモ一覧を取得', async () => {
    const mockData = [{ id: 1, content: 'Memo 1', created_at: new Date().toISOString() }];

    // チェーンモック構築
    const mockOrder = vi.fn().mockResolvedValue({ data: mockData, error: null });
    const mockSelect = vi.fn().mockReturnValue({ order: mockOrder });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });

    // supabase.from を完全に置き換える
    (supabase.from as any) = mockFrom;

    const result = await fetchMemosService();

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(result).toEqual(mockData);
  });

  it('正常にメモを追加できること', async () => {
    const input = {
      category: 'test-category',
      content: 'new memo',
      importance: 'test-importance',
      tags: ['test'],
      title: 'test-title',
      user_id: 'user-1',
    };

    const mockSingle = vi.fn().mockResolvedValue({ error: null });
    const mockInsert = vi.fn().mockReturnValue({ single: mockSingle });
    const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

    (supabase.from as any) = mockFrom;

    await expect(addMemoService(input)).resolves.toBeUndefined();

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockInsert).toHaveBeenCalledWith(input);
    expect(mockSingle).toHaveBeenCalled();
  });

  it('指定IDのメモを取得できること', async () => {
    const mockData = { id: '1', content: 'Memo 1' };

    const mockSingle = vi.fn().mockResolvedValue({ data: mockData, error: null });
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });

    (supabase.from as any) = mockFrom;

    const result = await getMemoService('1');

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('id', '1');
    expect(mockSingle).toHaveBeenCalled();
    expect(result).toEqual(mockData);
  });

  it('メモが正常に更新されること', async () => {
    const mockEq = vi.fn().mockResolvedValue({ error: null });
    const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ update: mockUpdate });

    (supabase.from as any) = mockFrom;

    const updates = {
      category: '更新カテゴリー',
      content: '更新されたメモ',
      importance: '更新重要度',
      tags: ['更新タグ'],
      title: '更新タイトル',
    };
    const id = '1';

    await expect(updateMemoService(id, updates)).resolves.toBeUndefined();

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockUpdate).toHaveBeenCalledWith(updates);
    expect(mockEq).toHaveBeenCalledWith('id', id);
  });

  it('メモが正常に削除されること', async () => {
    const mockEq = vi.fn().mockResolvedValue({ error: null });
    const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ delete: mockDelete });

    (supabase.from as any) = mockFrom;

    const id = '1';

    await expect(deleteMemoService(id)).resolves.toBeUndefined();

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith('id', id);
  });

  it('エラーが発生した場合は throw されること', async () => {
    const input = {
      category: 'test-category',
      content: 'new memo',
      importance: 'test-importance',
      tags: ['test'],
      title: 'test-title',
      user_id: 'user-1',
    };
    const mockError = new Error('DB Error');

    const mockSingle = vi.fn().mockResolvedValue({ error: mockError });
    const mockInsert = vi.fn().mockReturnValue({ single: mockSingle });
    const mockFrom = vi.fn().mockReturnValue({ insert: mockInsert });

    (supabase.from as any) = mockFrom;

    await expect(addMemoService(input)).rejects.toThrow('DB Error');

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockInsert).toHaveBeenCalledWith(input);
    expect(mockSingle).toHaveBeenCalled();
  });

  it('指定メモ取得時にエラーが発生したら throw されること', async () => {
    const mockError = new Error('取得失敗');

    const mockSingle = vi.fn().mockResolvedValue({ data: null, error: mockError });
    const mockEq = vi.fn().mockReturnValue({ single: mockSingle });
    const mockSelect = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ select: mockSelect });

    (supabase.from as any) = mockFrom;

    await expect(getMemoService('2')).rejects.toThrow('取得失敗');

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockSelect).toHaveBeenCalledWith('*');
    expect(mockEq).toHaveBeenCalledWith('id', '2');
    expect(mockSingle).toHaveBeenCalled();
  });

  it('更新時にエラーが発生したら throw されること', async () => {
    const mockError = new Error('更新失敗');

    const mockEq = vi.fn().mockResolvedValue({ error: mockError });
    const mockUpdate = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ update: mockUpdate });

    (supabase.from as any) = mockFrom;

    const updates = {
      category: '更新カテゴリー',
      content: '更新されたメモ',
      importance: '更新重要度',
      tags: ['更新タグ'],
      title: '更新タイトル',
    };
    const id = '2';

    await expect(updateMemoService(id, updates)).rejects.toThrow('更新失敗');

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockUpdate).toHaveBeenCalledWith(updates);
    expect(mockEq).toHaveBeenCalledWith('id', id);
  });

  it('削除時にエラーが発生したら throw されること', async () => {
    const mockError = new Error('削除失敗');

    const mockEq = vi.fn().mockResolvedValue({ error: mockError });
    const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });
    const mockFrom = vi.fn().mockReturnValue({ delete: mockDelete });

    (supabase.from as any) = mockFrom;

    const id = '2';

    await expect(deleteMemoService(id)).rejects.toThrow('削除失敗');

    expect(mockFrom).toHaveBeenCalledWith('memos');
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith('id', id);
  });
});
