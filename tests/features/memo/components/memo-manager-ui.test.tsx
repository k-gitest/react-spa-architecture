import { render, screen, fireEvent } from '@testing-library/react';
import { MemoManagerUI } from '@/features/memo/components/memo-manager-ui';

describe('MemoManagerUI', () => {
  const mockSetTabValue = vi.fn();
  const mockHandleEditClick = vi.fn();
  const mockHandleDeleteClick = vi.fn();

  const baseProps = {
    tabValue: 'memoList',
    setTabValue: mockSetTabValue,
    memoList: [],
    handleEditClick: mockHandleEditClick,
    handleDeleteClick: mockHandleDeleteClick,
    formProps: {
      onSubmit: vi.fn(),
      initialValues: undefined,
      categories: [],
      tags: [],
      category: '',
      setCategory: vi.fn(),
      tag: '',
      setTag: vi.fn(),
      handleCategorySubmit: vi.fn(),
      handleTagSubmit: vi.fn(),
      categoryOpen: false,
      setCategoryOpen: vi.fn(),
      tagOpen: false,
      setTagOpen: vi.fn(),
    },
    categoryOperations: {
      fetchData: { data: [] },
      addItem: vi.fn(),
      updateItem: vi.fn(),
      deleteItem: vi.fn(),
      useGetItem: () => ({ data: null }),
    },
    tagOperations: {
      fetchData: { data: [] },
      addItem: vi.fn(),
      updateItem: vi.fn(),
      deleteItem: vi.fn(),
      useGetItem: () => ({ data: null }),
    },
  };

  it('「メモはまだありません」と追加ボタンが表示される', () => {
    render(<MemoManagerUI {...baseProps} ><></></MemoManagerUI>);
    expect(screen.getByText('メモはまだありません')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'メモ追加' })).toBeInTheDocument();
  });

  it('メモ追加ボタンを押すとsetTabValueが呼ばれる', () => {
    render(<MemoManagerUI {...baseProps} ><></></MemoManagerUI>);
    fireEvent.click(screen.getByRole('button', { name: 'メモ追加' }));
    expect(mockSetTabValue).toHaveBeenCalledWith('addMemo');
  });

  it('メモ一覧が表示される', () => {
    const props = {
      ...baseProps,
      memoList: [
        {
          id: '1',
          title: 'タイトル1',
          content: '内容1',
          importance: 'low',
          category: 'cat1',
          user_id: 'u',
          tags: [],
          created_at: '',
          updated_at: '',
        },
      ],
    };
    render(<MemoManagerUI {...props} ><></></MemoManagerUI>);
    expect(screen.getByText('タイトル1')).toBeInTheDocument();
  });

  it('タブ切り替えでフォームやマネージャーが表示される', () => {
    // メモ追加タブ
    let { unmount } = render(
      <MemoManagerUI
        {...baseProps}
        tabValue="addMemo"
        // childrenにinputを渡す
      >
        <input placeholder="タイトルを入力してください" />
      </MemoManagerUI>,
    );
    expect(screen.getByPlaceholderText('タイトルを入力してください')).toBeInTheDocument();

    // カテゴリ設定タブ
    unmount();
    ({ unmount } = render(
      <MemoManagerUI {...baseProps} tabValue="categorySetting">
        <input placeholder="タイトルを入力してください" />
      </MemoManagerUI>,
    ));
    expect(screen.getByRole('tab', { name: 'カテゴリ設定' })).toBeInTheDocument();
    expect(screen.getByText(/カテゴリ.*まだありません/)).toBeInTheDocument();

    // タグ設定タブ
    unmount();
    render(
      <MemoManagerUI {...baseProps} tabValue="tagSetting">
        <input placeholder="タイトルを入力してください" />
      </MemoManagerUI>,
    );
    expect(screen.getAllByRole('tab', { name: 'タグ設定' }).length).toBeGreaterThan(0);
    expect(screen.getByText(/タグ.*まだありません/)).toBeInTheDocument();
  });
});
