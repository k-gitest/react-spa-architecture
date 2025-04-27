import { render, screen, fireEvent } from '@testing-library/react';
import { MemoManagerTanstack } from '@/features/memo/components/memo-manager-tanstack';
import { useMemos as useMemosMock } from '@/features/memo/hooks/use-memo-queries-tanstack';
import userEvent from '@testing-library/user-event';

let defaultSession: {
  session?: {
    user: {
      id: string;
      email: string;
      updated_at: string;
      identities: { provider: string }[];
      recovery_sent_at?: string;
    } | null;
  };
} = {
  session: {
    user: {
      id: 'test-user-id',
      email: 'user@example.com',
      updated_at: '2025-04-01T00:00:00Z',
      identities: [{ provider: 'email' }],
    },
  },
};
// useSessionStoreモック
vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: (selector: any) => selector(defaultSession),
}));

vi.mock('@/features/memo/hooks/use-memo-queries-tanstack', () => ({
  useMemos: vi.fn(),
}));

describe('MemoManagerTanstack', () => {
  beforeAll(() => {
    // hasPointerCapture メソッドをモック
    if (!HTMLElement.prototype.hasPointerCapture) {
      HTMLElement.prototype.hasPointerCapture = function () {
        return false;
      };
    }
    // 他のJSDOMに不足しているポインター関連APIもモック
    if (!HTMLElement.prototype.setPointerCapture) {
      HTMLElement.prototype.setPointerCapture = function () {};
    }

    if (!HTMLElement.prototype.releasePointerCapture) {
      HTMLElement.prototype.releasePointerCapture = function () {};
    }

    // scrollIntoView メソッドをモック
    if (!HTMLElement.prototype.scrollIntoView) {
      HTMLElement.prototype.scrollIntoView = function () {};
    }

    // window.matchMedia を Vitest 形式でモック
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation((query: string) => ({
        matches: query === '(min-width: 768px)', // 条件を任意に調整
        media: query,
        onchange: null,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });

    global.ResizeObserver = class ResizeObserver {
      observe() {}
      unobserve() {}
      disconnect() {}
    };
  });

  it('ローディングを描画', () => {
    (useMemosMock as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      memos: [],
      isMemosLoading: true,
      isMemosError: false,
      memosError: null,
      useGetMemo: () => ({ data: null }),
      addMemo: vi.fn(),
      updateMemo: vi.fn(),
      deleteMemo: vi.fn(),
    });
    render(<MemoManagerTanstack />);
    expect(screen.getByText('Loading memos...')).toBeInTheDocument();
  });

  it('エラーを描画', () => {
    (useMemosMock as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      memos: [],
      isMemosLoading: false,
      isMemosError: true,
      memosError: { message: 'Failed to load memos' },
      useGetMemo: () => ({ data: null }),
      addMemo: vi.fn(),
      updateMemo: vi.fn(),
      deleteMemo: vi.fn(),
    });

    render(<MemoManagerTanstack />);
    expect(screen.getByText('Error loading memos: Failed to load memos')).toBeInTheDocument();
  });

  it('メモリストを描画', () => {
    (useMemosMock as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      memos: [
        {
          id: '1',
          title: 'テストメモ1',
          content: '内容1',
          user_id: 'test-user-id',
          tags: [],
          created_at: '',
          updated_at: '',
        },
        {
          id: '2',
          title: 'テストメモ2',
          content: '内容2',
          user_id: 'test-user-id',
          tags: [],
          created_at: '',
          updated_at: '',
        },
      ],
      isMemosLoading: false,
      isMemosError: false,
      memosError: null,
      useGetMemo: () => ({ data: null }),
      addMemo: vi.fn(),
      updateMemo: vi.fn(),
      deleteMemo: vi.fn(),
    });

    render(<MemoManagerTanstack />);
    expect(screen.getByText('テストメモ1')).toBeInTheDocument();
    expect(screen.getByText('テストメモ2')).toBeInTheDocument();
  });

  it('メモ追加ボタンクリックでダイアログを開く', () => {
    render(<MemoManagerTanstack />);
    fireEvent.click(screen.getByText('メモ追加'));
    expect(screen.getByText('Memo')).toBeInTheDocument();
  });

  it('メモ追加ボタンを押してaddMemoを呼ぶ', async () => {
    const addMemoMock = vi.fn();

    (useMemosMock as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      memos: [],
      isMemosLoading: false,
      isMemosError: false,
      memosError: null,
      useGetMemo: () => ({ data: null }),
      addMemo: addMemoMock,
      updateMemo: vi.fn(),
      deleteMemo: vi.fn(),
    });

    render(<MemoManagerTanstack />);

    // ダイアログを開く
    fireEvent.click(screen.getByText('メモ追加'));

    // フォームに入力
    fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: 'テストメモ' } });
    fireEvent.change(screen.getByLabelText('メモの内容'), { target: { value: 'これはテストです' } });
    fireEvent.click(screen.getByRole('checkbox', { name: 'Recents' }));

    // セレクトボックスが存在することを確認
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    // オプションが表示されていることを確認 (最初は閉じた状態なので、aria-expanded="false" であることを確認)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    const selectElement = screen.getByRole('combobox');
    // セレクトボックスをクリックしてオプションリストを開く
    await userEvent.click(selectElement);
    expect(selectElement).toHaveAttribute('aria-expanded', 'true');
    // 「タスク」を選択する
    const selectedOption = screen.getByRole('option', { name: 'タスク' });
    await userEvent.click(selectedOption);

    // 送信
    fireEvent.click(screen.getByRole('button', { name: /送信/i }));

    await screen.findByText('メモ追加'); // 待機 (UIが再表示されるまで)

    // 関数が呼ばれたことを確認
    expect(addMemoMock).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'テストメモ',
        content: 'これはテストです',
        tags: ['recents'],
        category: 'task',
      }),
    );
  });

  it('削除ボタンをクリックしてdeleteMemoを呼ぶ', () => {
    const deleteMemoMock = vi.fn();
    (useMemosMock as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      memos: [
        {
          id: '1',
          title: 'テストメモ1',
          content: '内容1',
          user_id: 'test-user-id',
          tags: [],
          created_at: '',
          updated_at: '',
        },
        {
          id: '2',
          title: 'テストメモ2',
          content: '内容2',
          user_id: 'test-user-id',
          tags: [],
          created_at: '',
          updated_at: '',
        },
      ],
      isMemosLoading: false,
      isMemosError: false,
      memosError: null,
      useGetMemo: () => ({ data: null }),
      addMemo: vi.fn(),
      updateMemo: vi.fn(),
      deleteMemo: deleteMemoMock,
    });

    render(<MemoManagerTanstack />);
    // ID が '1' のメモに対応する削除ボタンを選択
    const deleteButton1 = screen.getByTestId('delete-memo-1');
    fireEvent.click(deleteButton1);
    expect(deleteMemoMock).toHaveBeenCalledWith('1');

  });
});
