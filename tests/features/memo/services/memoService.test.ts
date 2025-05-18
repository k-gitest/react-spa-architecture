import { vi } from 'vitest';
import { supabase } from '@/lib/supabase';
import {
  fetchMemosService,
  addMemoService,
  addMemoRPC,
  getMemoService,
  updateMemoService,
  updateMemoRPC,
  deleteMemoService,
} from '@/features/memo/services/memoService';

vi.mock('@/lib/supabase', () => ({
  supabase: {
    from: vi.fn(),
    functions: {
      invoke: vi.fn(),
    },
    rpc: vi.fn(),
  },
}));

describe('memoService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetchMemosService: 正常にメモを取得・整形できること', async () => {
    const mockData = [
      {
        id: '1',
        content: 'test content',
        updated_at: new Date().toISOString(),
        category: [{ category: { id: 1, name: 'Category1' } }],
        tags: [{ tag: { id: 1, name: 'Tag1' } }],
      },
    ];

    const mockSelect = vi.fn().mockReturnValue({
      order: vi.fn().mockResolvedValue({ data: mockData, error: null }),
    });

    (supabase.from as any) = vi.fn().mockReturnValue({ select: mockSelect });

    const result = await fetchMemosService();

    expect(result).toEqual([
      {
        id: '1',
        content: 'test content',
        updated_at: expect.any(String),
        category: 'Category1',
        tags: ['Tag1'],
      },
    ]);
  });

  it('addMemoService: Supabase関数が正しく呼ばれること', async () => {
    const input = {
      title: 'test',
      content: 'test content',
      importance: 'low',
      category: '1',
      tags: ['2'],
      user_id: 'user-1',
    };

    (supabase.functions.invoke as any).mockResolvedValue({ error: null });

    await expect(addMemoService(input)).resolves.toBeUndefined();

    expect(supabase.functions.invoke).toHaveBeenCalledWith('save-memo', {
      body: {
        ...input,
        category: 1,
        tags: [2],
      },
      method: 'POST',
    });
  });

  it('addMemoRPC: RPCが正しく呼ばれること', async () => {
    const input = {
      title: 'test',
      content: 'test content',
      importance: 'low',
      category: '1',
      tags: ['2'],
      user_id: 'user-1',
    };

    (supabase.rpc as any).mockResolvedValue({ error: null });

    await expect(addMemoRPC(input)).resolves.toBeUndefined();

    expect(supabase.rpc).toHaveBeenCalledWith('save_memo_rpc', {
      p_title: input.title,
      p_content: input.content,
      p_importance: input.importance,
      p_category_id: 1,
      p_tag_ids: [2],
    });
  });

  it('getMemoService: 指定IDのメモが整形されて返ること', async () => {
    const mockData = {
      id: '1',
      content: 'memo',
      category: [{ category: { id: 1, name: 'Cat' } }],
      tags: [{ tag: { id: 1, name: 'Tag' } }],
    };

    const mockSelect = vi.fn().mockReturnValue({
      eq: vi.fn().mockReturnValue({
        single: vi.fn().mockResolvedValue({ data: mockData, error: null }),
      }),
    });

    (supabase.from as any) = vi.fn().mockReturnValue({ select: mockSelect });

    const result = await getMemoService('1');

    expect(result).toEqual({
      id: '1',
      content: 'memo',
      category: '1',
      tags: ['1'],
    });
  });

  it('updateMemoService: FunctionがPUTで呼ばれること', async () => {
    const updates = {
      title: 'updated',
      content: 'updated content',
      importance: 'high',
      category: '1',
      tags: ['2'],
    };

    (supabase.functions.invoke as any).mockResolvedValue({ error: null });

    await expect(updateMemoService('1', updates)).resolves.toBeUndefined();

    expect(supabase.functions.invoke).toHaveBeenCalledWith('save-memo/drizzle', {
      body: {
        id: '1',
        ...updates,
        category: 1,
        tags: [2],
      },
      method: 'PUT',
    });
  });

  it('updateMemoRPC: RPCが正しく呼ばれること', async () => {
    const updates = {
      title: 'updated',
      content: 'updated content',
      importance: 'high',
      category: '1',
      tags: ['2'],
    };

    (supabase.rpc as any).mockResolvedValue({ error: null });

    await expect(updateMemoRPC('1', updates)).resolves.toBeUndefined();

    expect(supabase.rpc).toHaveBeenCalledWith('update_memo_rpc', {
      p_id: '1',
      p_title: updates.title,
      p_content: updates.content,
      p_importance: updates.importance,
      p_category_id: 1,
      p_tag_ids: [2],
    });
  });

  it('deleteMemoService: 正常に削除が呼ばれること', async () => {
    const mockEq = vi.fn().mockResolvedValue({ error: null });
    const mockDelete = vi.fn().mockReturnValue({ eq: mockEq });

    (supabase.from as any) = vi.fn().mockReturnValue({ delete: mockDelete });

    await expect(deleteMemoService('1')).resolves.toBeUndefined();

    expect(supabase.from).toHaveBeenCalledWith('memos');
    expect(mockDelete).toHaveBeenCalled();
    expect(mockEq).toHaveBeenCalledWith('id', '1');
  });

  it('エラーが発生した場合 throw されること', async () => {
    const error = new Error('Something went wrong');

    (supabase.functions.invoke as any).mockResolvedValue({ error });

    await expect(
      addMemoService({
        title: 'x',
        content: 'x',
        importance: 'low',
        category: '1',
        tags: ['2'],
        user_id: 'user-1',
      }),
    ).rejects.toThrow('Something went wrong');
  });
});
