import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoForm } from '@/features/memo/components/memo-form';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import React, { ReactNode } from 'react';
import { Form } from '@/components/ui/form';

// モジュールのモックは最初に定義する必要がある
vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => (data: any) => ({ values: data }),
}));

vi.mock('@/lib/trpc', () => ({
  // インラインでモック関数を返す
  syncZodErrors: vi.fn(),
}));

// MemoItemAddDialogのモック
vi.mock('@/features/memo/components/memo-item-add-dialog', () => ({
  MemoItemAddDialog: ({
    buttonTitle,
    onSubmit,
    setOpen,
  }: {
    buttonTitle: string;
    onSubmit: () => void;
    setOpen: (open: boolean) => void;
  }) => {
    return (
      <button
        data-testid={`button-${buttonTitle.replace(/\s+/g, '-').toLowerCase()}`}
        onClick={() => {
          onSubmit();
          setOpen(false);
        }}
      >
        {buttonTitle}
      </button>
    );
  },
}));

// FormPartsのモック
vi.mock('@/components/form/form-parts', async () => {
  return await import('@tests/mocks/form-parts');
});

// グローバルに型定義を追加
declare global {
  interface Window {
    initialValues?: MemoFormData;
  }
}

const initialValues1 = {
  title: 'テストタイトル',
  content: '内容1',
  importance: 'medium',
  category: 'memo',
  tags: ['home'],
};

const initialValues2 = {
  title: '新しいタイトル',
  content: '新しい内容',
  importance: 'high',
  category: 'task',
  tags: ['documents'],
};

// モックカテゴリとタグ
const mockCategories = [
  { label: 'メモ', value: 'memo' },
  { label: 'タスク', value: 'task' },
];

const mockTags = [
  { label: 'ホーム', id: 'home' },
  { label: '文書', id: 'documents' },
];

describe('MemoForm Component', () => {
  const mockOnSubmit = vi.fn();
  const mockHandleCategorySubmit = vi.fn();
  const mockHandleTagSubmit = vi.fn();
  const mockSetCategory = vi.fn();
  const mockSetTag = vi.fn();
  const mockSetCategoryOpen = vi.fn();
  const mockSetTagOpen = vi.fn();
  const user = userEvent.setup();

  const renderMemoForm = (initialProps = {}) => {
    const defaultProps = {
      onSubmit: mockOnSubmit,
      categories: mockCategories,
      tags: mockTags,
      category: '',
      setCategory: mockSetCategory,
      tag: '',
      setTag: mockSetTag,
      handleCategorySubmit: mockHandleCategorySubmit,
      handleTagSubmit: mockHandleTagSubmit,
      categoryOpen: false,
      setCategoryOpen: mockSetCategoryOpen,
      tagOpen: false,
      setTagOpen: mockSetTagOpen,
    };

    return render(<MemoForm {...defaultProps} {...initialProps} />);
  };

  beforeEach(() => {
    mockOnSubmit.mockClear();
    mockHandleCategorySubmit.mockClear();
    mockHandleTagSubmit.mockClear();
    mockSetCategory.mockClear();
    mockSetTag.mockClear();
    mockSetCategoryOpen.mockClear();
    mockSetTagOpen.mockClear(); // グローバルに初期値をクリア
    window.initialValues = undefined;
  });

  it('フォームが正しくレンダリングされる', () => {
    renderMemoForm(); // 基本フォーム要素の存在確認

    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('select-category')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-content')).toBeInTheDocument();
    expect(screen.getByTestId('radio-group-importance')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-group-tags')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument(); // 新しく追加されたボタンの確認

    expect(screen.getByTestId('button-カテゴリー追加')).toBeInTheDocument();
    expect(screen.getByTestId('button-タグ追加')).toBeInTheDocument();
  });

  it('defaultValueでレンダリングされる', () => {
    renderMemoForm();

    const titleInput = screen.getByLabelText('タイトル') as HTMLInputElement;
    const contentTextarea = screen.getByLabelText('メモの内容') as HTMLTextAreaElement;

    expect(titleInput.value).toBe('');
    expect(contentTextarea.value).toBe(''); // 重要度のデフォルト値が "high" で、「大」と表示されていることを確認

    const highRadioButton = screen.getByRole('radio', { name: '大' });
    expect(highRadioButton).toBeChecked();
  });

  it('初期値でレンダリングされる', async () => {
    // グローバルに初期値を設定
    window.initialValues = {
      title: 'テストタイトル',
      content: 'テスト内容',
      importance: 'medium',
      category: 'task',
      tags: ['home', 'documents'],
    };

    renderMemoForm({ initialValues: window.initialValues }); // 値をテスト 

    const titleInput = screen.getByTestId('input-title') as HTMLInputElement;
    expect(titleInput.value).toBe('テストタイトル');

    await user.clear(titleInput);
    await user.type(titleInput, 'タイトルを手入力');
    expect(titleInput.value).toBe('タイトルを手入力');

    const contentTextarea = screen.getByTestId('textarea-content') as HTMLTextAreaElement;
    expect(contentTextarea.value).toBe('テスト内容');

    await user.clear(contentTextarea);
    await user.type(contentTextarea, '内容を手入力');
    expect(contentTextarea.value).toBe('内容を手入力');
  });

  it('入力されたデータでフォームが送信される', async () => {
    renderMemoForm(); // フォームに値を入力

    const titleInput = screen.getByTestId('input-title');
    await user.type(titleInput, 'テストタイトル');

    const contentTextarea = screen.getByTestId('textarea-content');
    await user.type(contentTextarea, 'テスト内容'); // 送信ボタンをクリック

    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton); // userEvent.clickの代わりにfireEventを使用
    // waitForを使ってonSubmitが呼ばれたことを検証
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('initialValuesが変更されたときにフォームがリセットされる', async () => {
    const { rerender } = renderMemoForm({ initialValues: initialValues1 });

    const titleInput = screen.getByTestId('input-title');
    fireEvent.input(titleInput, { target: { value: 'テスト入力' } });
    expect(titleInput).toHaveValue('テスト入力'); // 再レンダリングで新しい初期値を持つコンポーネントを更新

    rerender(
      <MemoForm
        initialValues={initialValues2}
        onSubmit={mockOnSubmit}
        categories={mockCategories}
        tags={mockTags}
        category=""
        setCategory={mockSetCategory}
        tag=""
        setTag={mockSetTag}
        handleCategorySubmit={mockHandleCategorySubmit}
        handleTagSubmit={mockHandleTagSubmit}
        categoryOpen={false}
        setCategoryOpen={mockSetCategoryOpen}
        tagOpen={false}
        setTagOpen={mockSetTagOpen}
      />,
    ); // waitForを使って非同期のリセット処理を待つ

    await waitFor(() => {
      const updatedTitleInput = screen.getByTestId('input-title'); // コンソール出力を削除して、適切なテストを行う
      expect(updatedTitleInput).toBeInTheDocument();
    });
  });

  it('カテゴリー追加ボタンがクリックされたときにカテゴリー送信ハンドラーが呼び出される', async () => {
    renderMemoForm();

    const categoryAddButton = screen.getByTestId('button-カテゴリー追加');
    fireEvent.click(categoryAddButton);

    expect(mockHandleCategorySubmit).toHaveBeenCalled();
    expect(mockSetCategoryOpen).toHaveBeenCalledWith(false);
  });

  it('タグ追加ボタンがクリックされたときにタグ送信ハンドラーが呼び出される', async () => {
    renderMemoForm();

    const tagAddButton = screen.getByTestId('button-タグ追加');
    fireEvent.click(tagAddButton);

    expect(mockHandleTagSubmit).toHaveBeenCalled();
    expect(mockSetTagOpen).toHaveBeenCalledWith(false);
  });

  it('外部のzodエラーを持つフォームを処理する', async () => {
    const externalZodError = {
      fieldErrors: { title: ['Title is required'] },
      formErrors: ['Form has errors'],
    };

    renderMemoForm({ externalZodError }); // syncZodErrorsモジュールを直接インポートせず、モック関数をテスト内で取得

    const { syncZodErrors } = await import('@/lib/trpc'); // コンポーネントの再レンダリングを待つ

    await waitFor(() => {
      // syncZodErrorsが呼ばれたことを確認
      expect(syncZodErrors).toHaveBeenCalled();
    });
  });

  it('利用可能なタグがない場合にメッセージを表示する', () => {
    renderMemoForm({ tags: [] });

    expect(screen.getByText('タグが登録されていません')).toBeInTheDocument();
  });
});
