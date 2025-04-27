import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoManager } from '@/features/memo/components/memo-manager';
import {
  fetchMemosService,
  addMemoService,
  getMemoService,
  updateMemoService,
  deleteMemoService,
} from '@/features/memo/services/memoService';
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

// サービス関数をモック化
vi.mock('@/features/memo/services/memoService', () => ({
  fetchMemosService: vi.fn(),
  addMemoService: vi.fn(),
  getMemoService: vi.fn(),
  updateMemoService: vi.fn(),
  deleteMemoService: vi.fn(),
}));

describe('MemoManager', () => {
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

  it('メモリストを描画', async () => {
    const mockMemos = [
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
    ];
    (fetchMemosService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockMemos);
    render(<MemoManager />);
    // fetchMemosService が呼び出されるのを待つ（念のため）
    await waitFor(() => expect(fetchMemosService).toHaveBeenCalled());
    // MemoList が描画され、「テストメモ1」が表示されるのを待つ
    await waitFor(() => expect(screen.getByText('テストメモ1')).toBeInTheDocument());
    expect(screen.getByText('テストメモ2')).toBeInTheDocument();
  });

  it('メモ追加ボタンクリックでダイアログを開く', async () => {
    render(<MemoManager />);
    
    // 「メモ追加」が出るまで待つ！（fetch完了後）
    await screen.findByText('メモ追加');
  
    fireEvent.click(screen.getByText('メモ追加'));
  
    // ダイアログが開くのを待つ
    await screen.findByText('Memo');
  });

  it('メモ追加ボタンを押してaddMemoを呼ぶ', async () => {
    const mockAddMemoService = addMemoService as unknown as ReturnType<typeof vi.fn>;
    mockAddMemoService.mockResolvedValue(undefined); // 成功時の戻り値をモック

    (fetchMemosService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([]);

    render(<MemoManager />);
    // MemoList が描画され、「メモ追加」が表示されるのを待つ
    await waitFor(() => expect(fetchMemosService).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByText('メモ追加')).toBeInTheDocument());

    // ダイアログを開く
    await userEvent.click(screen.getByText('メモ追加'));
    await waitFor(() => {
      expect(screen.getByLabelText('タイトル')).toBeInTheDocument();
      expect(screen.getByLabelText('メモの内容')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    // フォームに入力
    await userEvent.type(screen.getByLabelText('タイトル'), 'テストメモ');
    await userEvent.type(screen.getByLabelText('メモの内容'), 'これはテストです');
    //fireEvent.change(screen.getByLabelText('タイトル'), { target: { value: 'テストメモ' } });
    //fireEvent.change(screen.getByLabelText('メモの内容'), { target: { value: 'これはテストです' } });
    await userEvent.click(screen.getByRole('checkbox', { name: 'Recents' }));

    // セレクトボックスが存在することを確認
    await waitFor(()=>{
      expect(screen.getByRole('combobox')).toBeInTheDocument();
      // オプションが表示されていることを確認 (最初は閉じた状態なので、aria-expanded="false" であることを確認)
    expect(screen.getByRole('combobox')).toHaveAttribute('aria-expanded', 'false');
    })
    
    
    const selectElement = screen.getByRole('combobox');
    // セレクトボックスをクリックしてオプションリストを開く
    await userEvent.click(selectElement);
    await waitFor(() => {
      expect(selectElement).toHaveAttribute('aria-expanded', 'true');
    });

    // 「タスク」を選択する
    const selectedOption = screen.getByRole('option', { name: 'タスク' });
    await userEvent.click(selectedOption);

    // 送信
    await userEvent.click(screen.getByRole('button', { name: /送信/i }));
    await waitFor(() => {
      expect(mockAddMemoService).toHaveBeenCalled();
    });

    await screen.findByText('メモ追加'); // 待機 (UIが再表示されるまで)
    await waitFor(() => {});

    // 関数が呼ばれたことを確認
    expect(mockAddMemoService).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'テストメモ',
        content: 'これはテストです',
        tags: ['recents'],
        category: 'task',
      }),
    );
  });

  it('削除ボタンをクリックしてdeleteMemoを呼ぶ', async () => {
    const mockMemos = [
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
    ];
    const mockDeleteMemoService = deleteMemoService as unknown as ReturnType<typeof vi.fn>;
    mockDeleteMemoService.mockResolvedValue(undefined);
    (fetchMemosService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockMemos);

    render(<MemoManager />);
    // MemoList が描画され、「delete-memo-1」が表示されるのを待つ
    await waitFor(() => expect(fetchMemosService).toHaveBeenCalled());
    await waitFor(() => expect(screen.getByTestId('delete-memo-1')).toBeInTheDocument());
    // ID が '1' のメモに対応する削除ボタンを選択
    const deleteButton1 = screen.getByTestId('delete-memo-1');
    fireEvent.click(deleteButton1);

    await waitFor(() => expect(mockDeleteMemoService).toHaveBeenCalledWith('1'));
  });
});
