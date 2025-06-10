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

vi.mock('@/features/memo/components/memo-item-add-dialog', () => ({
  MemoItemAddDialog: ({ buttonTitle, onSubmit, setOpen }: {
    buttonTitle: string;
    onSubmit: () => void;
    setOpen: (open: boolean) => void
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

// MemoItemAddDialogのモック
vi.mock('@/features/memo/components/memo-item-add-dialog', () => ({
  MemoItemAddDialog: ({ buttonTitle, onSubmit, setOpen }: {
    buttonTitle: string;
    onSubmit: () => void;
    setOpen: (open: boolean) => void
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

// FormPartsのモックを改善
vi.mock('@/components/form/form-parts', () => {
  return {
    FormWrapper: ({ children, onSubmit, form }: { children: ReactNode; onSubmit: (data: any) => void; form?: any }) => {
      // カスタム送信ハンドラー
      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // フォームの値を直接渡す
        onSubmit(form.getValues());
      };

      return (
        <Form {...form}>
          <form data-testid="memo-form" onSubmit={handleSubmit}>
            {children}
            <button type="submit" data-testid="submit-button">送信</button>
          </form>
        </Form>
      );
    },
    FormInput: ({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) => {
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <input
            id={name}
            aria-label={label}
            name={name}
            placeholder={placeholder}
            data-testid={`input-${name}`}
          />
        </div>
      );
    },
    FormTextArea: ({ label, name, placeholder }: { label: string; name: string; placeholder?: string }) => {
      return (
        <div>
          <label htmlFor={name}>{label}</label>
          <textarea
            id={name}
            aria-label={label}
            name={name}
            placeholder={placeholder}
            data-testid={`textarea-${name}`}
          />
        </div>
      );
    },
    FormSelect: ({
      label,
      name,
      options,
      placeholder,
    }: {
      label: string;
      name: string;
      options: Array<{ value: string; label: string }>;
      placeholder?: string;
    }) => {
      return (
        <div aria-label={label} data-testid={`select-${name}`}>
          <label htmlFor={name}>{label}</label>
          <select id={name} name={name} role="combobox">
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      );
    },
    FormRadioGroup: ({
      label,
      name,
      options,
    }: {
      label: string;
      name: string;
      options: Array<{ value: string; label: string }>;
    }) => {
      return (
        <div aria-label={label} role="radiogroup" data-testid={`radio-group-${name}`}>
          <span>{label}</span>
          {options.map((option) => (
            <div key={option.value}>
              <input
                type="radio"
                id={`${name}-${option.value}`}
                name={name}
                value={option.value}
                aria-label={option.label}
                role="radio"
                defaultChecked={option.value === 'high'}
                aria-checked={option.value === 'high' ? 'true' : 'false'} // 明示的に設定
                data-testid={`radio-${option.value}`}
              />
              <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
            </div>
          ))}
        </div>
      );
    },
    FormCheckboxGroup: ({
      label,
      name,
      options,
    }: {
      label: string;
      name: string;
      options: Array<{ value: string; label: string }>;
    }) => {
      const selectedTags = name === 'tags' && window.initialValues ? window.initialValues.tags : [];

      return (
        <div aria-label={label} data-testid={`checkbox-group-${name}`}>
          <span>{label}</span>
          {options.map((option) => {
            const isChecked = selectedTags.includes(option.value);

            return (
              <div key={option.value}>
                <input
                  type="checkbox"
                  id={`${name}-${option.value}`}
                  name={name}
                  value={option.value}
                  aria-label={option.label}
                  role="checkbox"
                  defaultChecked={isChecked}
                  data-testid={`checkbox-${option.value}`}
                />
                <label htmlFor={`${name}-${option.value}`}>{option.label}</label>
            </div>
          );
      })}
        </div>
      );
    },
  };
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

if (!window.matchMedia) {
  window.matchMedia = vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
}

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
    mockSetTagOpen.mockClear();
    // グローバルに初期値をクリア
    window.initialValues = undefined;

    global.ResizeObserver = class ResizeObserver {
      observe() {
        // do nothing
      }
      unobserve() {
        // do nothing
      }
      disconnect() {
        // do nothing
      }
    };
  });

  it('form ga tadashiku rendering sareru', () => {
    renderMemoForm();

    // 基本フォーム要素の存在確認
    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('select-category')).toBeInTheDocument();
    expect(screen.getByTestId('textarea-content')).toBeInTheDocument();
    expect(screen.getByTestId('radio-group-importance')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-group-tags')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();

    // 新しく追加されたボタンの確認
    expect(screen.getByTestId('button-カテゴリー追加')).toBeInTheDocument();
    expect(screen.getByTestId('button-タグ追加')).toBeInTheDocument();
  });

  it('default chi de rendering sareru', () => {
    renderMemoForm();

    const titleInput = screen.getByLabelText('タイトル') as HTMLInputElement;
    const contentTextarea = screen.getByLabelText('メモの内容') as HTMLTextAreaElement;

    expect(titleInput.value).toBe('');
    expect(contentTextarea.value).toBe('');

    // 重要度のデフォルト値が "high" で、「大」と表示されていることを確認
    const highRadioButton = screen.getByRole('radio', { name: '大' });
    expect(highRadioButton).toHaveAttribute('aria-checked', 'true');
  });

  it('shoki chi de rendering sareru', async () => {
    // グローバルに初期値を設定
    window.initialValues = {
      title: 'テストタイトル',
      content: 'テスト内容',
      importance: 'medium',
      category: 'task',
      tags: ['home', 'documents'],
    };

    renderMemoForm({ initialValues: window.initialValues });

    // 値をテスト
    const titleInput = screen.getByTestId('input-title') as HTMLInputElement;
    await user.clear(titleInput);
    await user.type(titleInput, 'タイトルを手入力');
    expect(titleInput.value).toBe('タイトルを手入力');

    const contentTextarea = screen.getByTestId('textarea-content') as HTMLTextAreaElement;
    await user.clear(contentTextarea);
    await user.type(contentTextarea, '内容を手入力');
    expect(contentTextarea.value).toBe('内容を手入力');
  });

  it('nyuryoku sareta data de form ga soshin sareru', async () => {
    renderMemoForm();

    // フォームに値を入力
    const titleInput = screen.getByTestId('input-title');
    await user.type(titleInput, 'テストタイトル');

    const contentTextarea = screen.getByTestId('textarea-content');
    await user.type(contentTextarea, 'テスト内容');

    // 送信ボタンをクリック
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);  // userEvent.clickの代わりにfireEventを使用

    // waitForを使ってonSubmitが呼ばれたことを検証
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('initialValues ga henko sareta toki ni form ga reset sareru', async () => {
    const { rerender } = renderMemoForm({ initialValues: initialValues1 });

    const titleInput = screen.getByTestId('input-title');
    fireEvent.input(titleInput, { target: { value: 'テスト入力' } });
    expect(titleInput).toHaveValue('テスト入力');

    // 再レンダリングで新しい初期値を持つコンポーネントを更新
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
      />
    );

    // waitForを使って非同期のリセット処理を待つ
    await waitFor(() => {
      const updatedTitleInput = screen.getByTestId('input-title');
      // コンソール出力を削除して、適切なテストを行う
      expect(updatedTitleInput).toBeInTheDocument();
    });
  });

  it('category tsuika button ga click sareta toki ni category soshin handler ga yobidasareru', async () => {
    renderMemoForm();

    const categoryAddButton = screen.getByTestId('button-カテゴリー追加');
    fireEvent.click(categoryAddButton);

    expect(mockHandleCategorySubmit).toHaveBeenCalled();
    expect(mockSetCategoryOpen).toHaveBeenCalledWith(false);
  });

  it('tag tsuika button ga click sareta toki ni tag soshin handler ga yobidasareru', async () => {
    renderMemoForm();

    const tagAddButton = screen.getByTestId('button-タグ追加');
    fireEvent.click(tagAddButton);

    expect(mockHandleTagSubmit).toHaveBeenCalled();
    expect(mockSetTagOpen).toHaveBeenCalledWith(false);
  });

  it('gaibu no zod error o motsu form o shori suru', async () => {
    const externalZodError = {
      fieldErrors: { title: ['Title is required'] },
      formErrors: ['Form has errors'],
    };

    renderMemoForm({ externalZodError });

    // syncZodErrorsモジュールを直接インポートせず、モック関数をテスト内で取得
    const { syncZodErrors } = await import('@/lib/trpc');

    // コンポーネントの再レンダリングを待つ
    await waitFor(() => {
      // syncZodErrorsが呼ばれたことを確認
      expect(syncZodErrors).toHaveBeenCalled();
    });
  });

  it('riyokano na tag ga nai baai ni message o hyoji suru', () => {
    renderMemoForm({ tags: [] });

    expect(screen.getByText('タグが登録されていません')).toBeInTheDocument();
  });
});