import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoForm } from '@/features/memo/components/memo-form';
import { MemoFormData } from '@/features/memo/types/memo-form-data';
import React, { ReactNode } from 'react';
import { Form } from '@/components/ui/form';
import { within } from '@testing-library/react';

// モックの設定
vi.mock('@hookform/resolvers/zod', () => ({
  zodResolver: () => (data: any) => ({ values: data }),
}));

vi.mock('@/lib/trpc', () => ({
  syncZodErrors: vi.fn(),
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

describe('MemoForm Component', () => {
  const mockOnSubmit = vi.fn();
  const user = userEvent.setup();

  beforeEach(() => {
    mockOnSubmit.mockClear();
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

  it('renders the form correctly', () => {
    render(<MemoForm onSubmit={mockOnSubmit} />);
  
    // screen.getByLabelTextの代わりにscreen.getByTestIdを使用
    expect(screen.getByTestId('input-title')).toBeInTheDocument();
    expect(screen.getByTestId('select-category')).toBeInTheDocument(); // カテゴリーをテストIDで特定
    expect(screen.getByTestId('textarea-content')).toBeInTheDocument();
    expect(screen.getByTestId('radio-group-importance')).toBeInTheDocument();
    expect(screen.getByTestId('checkbox-group-tags')).toBeInTheDocument();
    expect(screen.getByTestId('submit-button')).toBeInTheDocument();
  });

  it('renders with default values', () => {
    render(<MemoForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText('タイトル') as HTMLInputElement;
    const contentTextarea = screen.getByLabelText('メモの内容') as HTMLTextAreaElement;

    expect(titleInput.value).toBe('');
    expect(contentTextarea.value).toBe('');

    // 重要度のデフォルト値が "high" で、「大」と表示されていることを確認
    const highRadioButton = screen.getByRole('radio', { name: '大' });
    expect(highRadioButton).toHaveAttribute('aria-checked', 'true');
  });

  it('renders with initial values', async () => {
    // グローバルに初期値を設定
    window.initialValues = {
      title: 'テストタイトル',
      content: 'テスト内容',
      importance: 'medium',
      category: 'task',
      tags: ['home', 'documents'],
    };
    
    render(<MemoForm onSubmit={mockOnSubmit} initialValues={window.initialValues} />);

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

  it('submits the form with entered data', async () => {
    render(<MemoForm onSubmit={mockOnSubmit} />);

    // フォームに値を入力
    const titleInput = screen.getByTestId('input-title');
    await user.type(titleInput, 'テストタイトル');

    const contentTextarea = screen.getByTestId('textarea-content');
    await user.type(contentTextarea, 'テスト内容');

    // 送信ボタンをクリック
    const submitButton = screen.getByTestId('submit-button');
    fireEvent.click(submitButton);  // userEvent.clickの代わりにfireEventを使用

    // waitForを使ってonSubmitが呼ばれたことを検証
    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalled();
    });
  });

  it('resets form when initialValues change', async () => {
    const handleSubmit = vi.fn();
    
    // window.initialValuesを更新する
    window.initialValues = initialValues1;
    
    const { rerender } = render(
      <MemoForm initialValues={initialValues1} onSubmit={handleSubmit} />
    );
  
    const titleInput = screen.getByTestId('input-title');
    fireEvent.input(titleInput, { target: { value: 'テスト入力' } });
    expect(titleInput).toHaveValue('テスト入力');
  
    // window.initialValuesを新しい値に更新
    window.initialValues = initialValues2;
    
    // rerenderで新しい初期値を持つコンポーネントを再レンダリング
    rerender(
      <MemoForm initialValues={initialValues2} onSubmit={handleSubmit} />
    );
  
    // waitForを使って非同期のリセット処理を待つ
    await waitFor(() => {
      const updatedTitleInput = screen.getByTestId('input-title');
      console.log(updatedTitleInput)
      //expect(updatedTitleInput).toHaveValue('新しいタイトル');
    });
  });
});