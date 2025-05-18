import { render, screen, fireEvent } from '@testing-library/react';
import { MemoManagerTanstack } from '@/features/memo/components/memo-manager-tanstack';
import { useMemos as useMemosMock } from '@/features/memo/hooks/use-memo-queries-tanstack';
import { useSessionStore as useSessionStoreMock } from '@/hooks/use-session-store';
import userEvent from '@testing-library/user-event';
import { vi, Mock } from 'vitest';

// セッションモック
vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn(),
}));

// useMemos モック
vi.mock('@/features/memo/hooks/use-memo-queries-tanstack', () => ({
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

describe('MemoManagerTanstack', () => {
  beforeAll(() => {
    (useSessionStoreMock as unknown as Mock).mockImplementation((selector) => selector(defaultSession));

    // 必要なブラウザAPIのモック
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

    HTMLElement.prototype.scrollIntoView = vi.fn();
    HTMLElement.prototype.hasPointerCapture = vi.fn();
    HTMLElement.prototype.setPointerCapture = vi.fn();
    HTMLElement.prototype.releasePointerCapture = vi.fn();

    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('ローディングを描画', () => {
    (useMemosMock as unknown as Mock).mockReturnValue(createUseMemosMockReturn({ isMemosLoading: true }));

    render(<MemoManagerTanstack />);
    expect(screen.getByText('Loading memos...')).toBeInTheDocument();
  });

  it('エラーを描画', () => {
    (useMemosMock as unknown as Mock).mockReturnValue(
      createUseMemosMockReturn({
        isMemosError: true,
        memosError: { message: 'Failed to load memos' },
      }),
    );

    render(<MemoManagerTanstack />);
    expect(screen.getByText(/Error loading memos: Failed to load memos/i)).toBeInTheDocument();
  });

  it('メモリストを描画', () => {
    (useMemosMock as unknown as Mock).mockReturnValue(
      createUseMemosMockReturn({
        memos: [
          {
            id: '1',
            title: 'メモ1',
            content: '内容1',
            user_id: 'test-user-id',
            tags: [],
            created_at: '',
            updated_at: '',
          },
          {
            id: '2',
            title: 'メモ2',
            content: '内容2',
            user_id: 'test-user-id',
            tags: [],
            created_at: '',
            updated_at: '',
          },
        ],
      }),
    );

    render(<MemoManagerTanstack />);
    expect(screen.getByText('メモ1')).toBeInTheDocument();
    expect(screen.getByText('メモ2')).toBeInTheDocument();
  });

  it('メモ追加タブを開いてフォーム送信し addMemo を呼び出す', async () => {
    const user = userEvent.setup();
    const addMemoMock = vi.fn();

    (useMemosMock as unknown as Mock).mockReturnValue(
      createUseMemosMockReturn({
        addMemo: addMemoMock,
        fetchCategory: { data: [{ id: 1, name: 'タスク' }] },
        fetchTags: { data: [{ name: 'Recents', id: 'recents' }] },
      }),
    );

    render(<MemoManagerTanstack />);
    await user.click(screen.getByText('メモ追加'));

    // プレースホルダーにマッチする input 要素を待つ（表示完了を待つ）
    const titleInput = await screen.findByPlaceholderText('タイトルを入力してください');
    const contentInput = await screen.findByPlaceholderText('内容を記入してください');

    await user.type(titleInput, 'テストメモ');
    await user.type(contentInput, 'これはテストです');

    await user.click(screen.getByRole('checkbox', { name: 'Recents' }));

    const combobox = screen.getByRole('combobox');
    await user.click(combobox);
    const option = screen.getByRole('option', { name: 'タスク' });
    await user.click(option);

    await user.click(screen.getByRole('button', { name: /送信/i }));

    expect(addMemoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'テストメモ',
        content: 'これはテストです',
        tags: ['recents'],
        category: '1',
        user_id: 'test-user-id',
      }),
    );
  });

  it('削除ボタンをクリックして deleteMemo を呼ぶ', () => {
    const deleteMemoMock = vi.fn();

    (useMemosMock as unknown as Mock).mockReturnValue(
      createUseMemosMockReturn({
        deleteMemo: deleteMemoMock,
        memos: [
          {
            id: '1',
            title: 'メモ削除対象',
            content: '内容',
            user_id: 'test-user-id',
            tags: [],
            created_at: '',
            updated_at: '',
          },
        ],
      }),
    );

    render(<MemoManagerTanstack />);
    const deleteButton = screen.getByTestId('delete-memo-1');
    fireEvent.click(deleteButton);
    expect(deleteMemoMock).toHaveBeenCalledWith('1');
  });

  it('カテゴリ・タグ設定タブを表示', () => {
    (useMemosMock as unknown as Mock).mockReturnValue(createUseMemosMockReturn());

    render(<MemoManagerTanstack />);
    fireEvent.click(screen.getByRole('tab', { name: 'カテゴリ設定' }));
    expect(screen.getByText(/カテゴリ/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('tab', { name: 'タグ設定' }));
    expect(screen.getByText(/タグ/i)).toBeInTheDocument();
  });
});
