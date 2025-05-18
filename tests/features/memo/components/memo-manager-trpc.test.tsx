import { render, screen, waitFor } from '@testing-library/react';
import { MemoManagerTrpc } from '@/features/memo/components/memo-manager-trpc';
import { useMemos as useMemosMock } from '@/features/memo/hooks/use-memo-queries-trpc';
import { useSessionStore as useSessionStoreMock } from '@/hooks/use-session-store';
import userEvent from '@testing-library/user-event';
import { vi, Mock } from 'vitest';

// セッションモック
vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn(),
}));

// useMemos モック
vi.mock('@/features/memo/hooks/use-memo-queries-trpc', () => ({
  useMemos: vi.fn(),
}));

const defaultSession = {
  session: {
    user: {
      id: 'test-user-id',
      email: 'user@example.com',
      updated_at: '2025-04-01T00:00:00Z',
      identities: [{ provider: 'email' }],
    },
  },
};

// 共通の base モック戻り値
const createUseMemosMockReturn = (overrides = {}) => ({
  memos: [],
  isMemosLoading: false,
  isMemosError: false,
  memosError: null,
  useGetMemo: () => ({ data: null }),
  addMemo: vi.fn(),
  updateMemo: vi.fn(),
  deleteMemo: vi.fn(),
  fetchCategory: { data: [] },
  fetchTags: { data: [] },
  addCategory: vi.fn(),
  addTag: vi.fn(),
  useGetTag: () => ({}),
  useGetCategory: () => ({}),
  updateTag: vi.fn(),
  updateCategory: vi.fn(),
  deleteTag: vi.fn(),
  deleteCategory: vi.fn(),
  ...overrides,
});

describe('MemoManagerTrpc', () => {
  beforeAll(() => {
    (useSessionStoreMock as unknown as Mock).mockImplementation((selector) => selector(defaultSession));

    // ブラウザAPIのモックを追加
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(min-width: 768px)',
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    // その他必要なブラウザAPIのモック
    HTMLElement.prototype.scrollIntoView = vi.fn();
    HTMLElement.prototype.hasPointerCapture = vi.fn();
    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.releasePointerCapture = vi.fn();

    // ResizeObserverのモック
    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('メモ追加フォームを送信してaddMemoを呼ぶ', async () => {
    const user = userEvent.setup();
    const addMemoMock = vi.fn().mockResolvedValue({ success: true });

    // カテゴリ・タグのモックデータを追加
    (useMemosMock as unknown as Mock).mockReturnValue(
      createUseMemosMockReturn({
        addMemo: addMemoMock,
        fetchCategory: { data: [{ id: 1, name: 'タスク' }] },
        fetchTags: { data: [{ id: 'recents', name: 'Recents' }] },
      })
    );

    render(<MemoManagerTrpc />);
    await user.click(screen.getByText('メモ追加'));

    const titleInput = await screen.findByPlaceholderText('タイトルを入力してください');
    const contentInput = await screen.findByPlaceholderText('内容を記入してください');
    await user.type(titleInput, 'テストメモ');
    await user.type(contentInput, 'これはテストです');

    // タグ選択
    const tagCheckbox = screen.getByRole('checkbox', { name: 'Recents' });
    await user.click(tagCheckbox);

    // カテゴリ選択
    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    const option = screen.getByRole('option', { name: 'タスク' });
    await user.click(option);

    // 重要度
    const lowRadio = screen.getByRole('radio', { name: '小' });
    await user.click(lowRadio);

    // 送信
    const submitButton = screen.getByRole('button', { name: /送信/i });
    await user.click(submitButton);

    // 検証
    await waitFor(() => {
      expect(addMemoMock).toHaveBeenCalledWith(
        {
          title: 'テストメモ',
          content: 'これはテストです',
          importance: 'low',
          category: '1', // ←カテゴリIDが入る
          tags: ['recents'],
        },
        'test-user-id'
      );
    });
  });
});