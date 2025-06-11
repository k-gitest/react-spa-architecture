import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoManager } from '@/features/memo/components/memo-manager';
import {
  fetchMemosService,
  addMemoRPC,  // addMemoService → addMemoRPC に変更
  getMemoService,
  updateMemoService,
  deleteMemoService,
  fetchCategoryService,
  fetchTagsService,
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
  addMemoRPC: vi.fn(),  // addMemoService → addMemoRPC に変更
  getMemoService: vi.fn(),
  updateMemoService: vi.fn(),
  deleteMemoService: vi.fn(),
  fetchCategoryService: vi.fn(),
  fetchTagsService: vi.fn(),
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
    // 「メモ追加」タブをクリックしてアクティブにする
    const addTab = screen.getByRole('tab', { name: 'メモ追加' });
    await userEvent.click(addTab);

    // 「タイトル」ラベルが現れるまで待つ
    await waitFor(() => {
      expect(screen.getByLabelText('タイトル')).toBeInTheDocument();
    });
  });

  it('メモ追加ボタンを押してaddMemoを呼ぶ', async () => {
    const mockAddMemoRPC = addMemoRPC as unknown as ReturnType<typeof vi.fn>;  // 変数名も修正
    mockAddMemoRPC.mockResolvedValue(undefined);

    (fetchMemosService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue([]);
    // カテゴリ・タグのモックを追加
    const mockCategories = [{ id: 1, name: 'カテゴリ名' }];
    const mockTags = [{ id: 'recents', name: 'タグ名' }];
    (fetchCategoryService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockCategories);
    (fetchTagsService as unknown as ReturnType<typeof vi.fn>).mockResolvedValue(mockTags);

    render(<MemoManager />);
    await waitFor(() => expect(fetchMemosService).toHaveBeenCalled());

    // 「メモ追加」タブをクリック
    const addTab = screen.getByRole('tab', { name: 'メモ追加' });
    await userEvent.click(addTab);

    // フォームが表示されるまで待つ
    await waitFor(() => {
      expect(screen.getByLabelText('タイトル')).toBeInTheDocument();
      expect(screen.getByLabelText('メモの内容')).toBeInTheDocument();
      expect(screen.getByRole('combobox')).toBeInTheDocument();
    });

    await userEvent.type(screen.getByLabelText('タイトル'), 'テストメモ');
    await userEvent.type(screen.getByLabelText('メモの内容'), 'これはテストです');
    await userEvent.click(screen.getByRole('radio', { name: '大' }));

    // カテゴリー選択
    const categoryCombo = screen.getByRole('combobox');
    await userEvent.click(categoryCombo);

    // 全optionからtextContentで探す
    const options = screen.getByRole('option', { name: 'カテゴリ名' });
    await userEvent.click(options);

    // タグ選択
    const tagCheckbox = screen.getByRole('checkbox', { name: 'タグ名' });
    await userEvent.click(tagCheckbox);

    await userEvent.click(screen.getByRole('button', { name: /送信/i }));

    expect(mockAddMemoRPC).toHaveBeenCalledWith(  // 期待値のチェックも修正
      expect.objectContaining({
        title: 'テストメモ',
        content: 'これはテストです',
        category: "1",
        importance: 'high',
        tags: ['recents'],
        user_id: 'test-user-id',
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
