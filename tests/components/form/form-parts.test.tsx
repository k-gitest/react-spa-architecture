import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  FormWrapper,
  FormInput,
  FormTextArea,
  FormRadioGroup,
  FormCheckboxGroup,
  FormSelect,
} from '@/components/form/form-parts';

// モックの設定
vi.mock('@/components/ui/form', () => ({
  Form: ({ children }: { children: React.ReactNode }) => <div data-testid="form">{children}</div>,
  FormField: ({ render }: { render: (args: any) => React.ReactNode }) =>
    render({ field: { value: '', onChange: vi.fn(), name: '', ref: vi.fn() } }),
  FormItem: ({ children }: { children: React.ReactNode }) => <div data-testid="form-item">{children}</div>,
  FormLabel: ({ children }: { children: React.ReactNode }) => <label data-testid="form-label">{children}</label>,
  FormControl: ({ children }: { children: React.ReactNode }) => <div data-testid="form-control">{children}</div>,
  FormMessage: () => <div data-testid="form-message"></div>,
}));

vi.mock('@/components/ui/input', () => ({
  Input: (props: any) => <input data-testid="input" {...props} />,
}));

vi.mock('@/components/ui/textarea', () => ({
  Textarea: (props: any) => <textarea data-testid="textarea" {...props} />,
}));

vi.mock('@/components/ui/radio-group', () => ({
  RadioGroup: ({
    children,
    onValueChange,
    value,
  }: {
    children: React.ReactNode;
    onValueChange: (value: string) => void;
    value: string;
  }) => (
    <div
      data-testid="radio-group"
      data-value={value}
      onClick={(e: any) => {
        // 子要素のクリックイベントをシミュレート
        const target = e.target as HTMLElement;
        if (target.hasAttribute('value')) {
          onValueChange(target.getAttribute('value') || '');
        }
      }}
    >
      {children}
    </div>
  ),
  RadioGroupItem: ({ value }: { value: string }) => (
    <input type="radio" data-testid={`radio-item-${value}`} value={value} />
  ),
}));

vi.mock('@/components/ui/checkbox', () => ({
  Checkbox: ({ checked, onCheckedChange }: { checked: boolean; onCheckedChange: (checked: boolean) => void }) => (
    <input
      type="checkbox"
      data-testid="checkbox"
      checked={checked}
      onChange={(e) => onCheckedChange(e.target.checked)}
    />
  ),
}));

vi.mock('@/components/ui/select', () => ({
  Select: ({
    children,
    onValueChange,
    value,
  }: {
    children: React.ReactNode;
    onValueChange: (value: string) => void;
    value: string;
  }) => (
    <div
      data-testid="select"
      data-value={value}
      onClick={(e: any) => {
        // オプションの選択をシミュレート
        const target = e.target as HTMLElement;
        if (target.hasAttribute('value')) {
          onValueChange(target.getAttribute('value') || '');
        }
      }}
    >
      {children}
    </div>
  ),
  SelectContent: ({ children }: { children: React.ReactNode }) => <div data-testid="select-content">{children}</div>,
  SelectItem: ({ children, value }: { children: React.ReactNode; value: string }) => (
    <option data-testid={`select-item-${value}`} value={value}>
      {children}
    </option>
  ),
  SelectTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="select-trigger">{children}</div>,
  SelectValue: ({ placeholder }: { placeholder?: string }) => <div data-testid="select-value">{placeholder}</div>,
}));

// テストスキーマの定義
const testSchema = z.object({
  name: z.string(),
  description: z.string(),
  gender: z.string(),
  interests: z.array(z.string()),
  country: z.string(),
});

type TestFormData = z.infer<typeof testSchema>;

// テスト用のラッパーコンポーネント
const TestFormComponent = () => {
  const form = useForm<TestFormData>({
    resolver: zodResolver(testSchema),
    defaultValues: {
      name: '',
      description: '',
      gender: '',
      interests: [],
      country: '',
    },
  });

  const onSubmit = vi.fn();

  return (
    <FormWrapper form={form} onSubmit={onSubmit}>
      <FormInput label="Name" name="name" />
      <FormTextArea label="Description" name="description" />
      <FormRadioGroup
        label="Gender"
        name="gender"
        options={[
          { value: 'male', label: 'Male' },
          { value: 'female', label: 'Female' },
          { value: 'other', label: 'Other' },
        ]}
      />
      <FormCheckboxGroup
        label="Interests"
        name="interests"
        options={[
          { id: 'sports', label: 'Sports' },
          { id: 'music', label: 'Music' },
          { id: 'reading', label: 'Reading' },
        ]}
      />
      <FormSelect
        label="Country"
        name="country"
        placeholder="Select a country"
        options={[
          { value: 'us', label: 'United States' },
          { value: 'uk', label: 'United Kingdom' },
          { value: 'jp', label: 'Japan' },
        ]}
      />
      <button type="submit">Submit</button>
    </FormWrapper>
  );
};

describe('Form Components', () => {
  describe('FormWrapper', () => {
    it('正しくレンダリングされる', () => {
      const TestComponent = () => {
        const form = useForm();
        const onSubmit = vi.fn();
        return (
          <FormWrapper form={form} onSubmit={onSubmit}>
            <div data-testid="test-content">Test Content</div>
          </FormWrapper>
        );
      };

      render(<TestComponent />);
      expect(screen.getByTestId('form')).toBeInTheDocument();
      expect(screen.getByTestId('test-content')).toBeInTheDocument();
    });
  });

  describe('FormInput', () => {
    it('正しくレンダリングされる', () => {
      render(<TestFormComponent />);

      // ラベルが正しく表示されるか確認
      expect(screen.getByText('Name')).toBeInTheDocument();

      // インプット要素が存在するか確認
      expect(screen.getByTestId('input')).toBeInTheDocument();
    });
  });

  describe('FormTextArea', () => {
    it('正しくレンダリングされる', () => {
      render(<TestFormComponent />);

      // ラベルが正しく表示されるか確認
      expect(screen.getByText('Description')).toBeInTheDocument();

      // テキストエリア要素が存在するか確認
      expect(screen.getByTestId('textarea')).toBeInTheDocument();
    });
  });

  describe('FormRadioGroup', () => {
    it('正しくレンダリングされる', () => {
      render(<TestFormComponent />);

      // ラベルが正しく表示されるか確認
      expect(screen.getByText('Gender')).toBeInTheDocument();

      // ラジオグループが存在するか確認
      expect(screen.getByTestId('radio-group')).toBeInTheDocument();

      // オプションが正しく表示されるか確認
      expect(screen.getByText('Male')).toBeInTheDocument();
      expect(screen.getByText('Female')).toBeInTheDocument();
      expect(screen.getByText('Other')).toBeInTheDocument();

      // ラジオボタンが正しく存在するか確認
      expect(screen.getByTestId('radio-item-male')).toBeInTheDocument();
      expect(screen.getByTestId('radio-item-female')).toBeInTheDocument();
      expect(screen.getByTestId('radio-item-other')).toBeInTheDocument();
    });
  });

  describe('FormCheckboxGroup', () => {
    it('正しくレンダリングされる', () => {
      render(<TestFormComponent />);

      // ラベルが正しく表示されるか確認
      expect(screen.getByText('Interests')).toBeInTheDocument();

      // オプションが正しく表示されるか確認
      expect(screen.getByText('Sports')).toBeInTheDocument();
      expect(screen.getByText('Music')).toBeInTheDocument();
      expect(screen.getByText('Reading')).toBeInTheDocument();

      // チェックボックスが存在するか確認
      const checkboxes = screen.getAllByTestId('checkbox');
      expect(checkboxes.length).toBe(3);
    });
  });

  describe('FormSelect', () => {
    it('正しくレンダリングされる', () => {
      render(<TestFormComponent />);

      // ラベルが正しく表示されるか確認
      expect(screen.getByText('Country')).toBeInTheDocument();

      // セレクト要素が存在するか確認
      expect(screen.getByTestId('select')).toBeInTheDocument();

      // プレースホルダーが表示されるか確認
      expect(screen.getByText('Select a country')).toBeInTheDocument();

      // オプションが正しく用意されているか確認
      expect(screen.getByTestId('select-content')).toBeInTheDocument();
      expect(screen.getByTestId('select-item-us')).toBeInTheDocument();
      expect(screen.getByTestId('select-item-uk')).toBeInTheDocument();
      expect(screen.getByTestId('select-item-jp')).toBeInTheDocument();
    });
  });

  describe('全体のフォーム', () => {
    it('すべてのコンポーネントを含む完全なフォームがレンダリングされる', () => {
      render(<TestFormComponent />);

      // すべてのフォーム要素が存在するか確認
      expect(screen.getByText('Name')).toBeInTheDocument();
      expect(screen.getByText('Description')).toBeInTheDocument();
      expect(screen.getByText('Gender')).toBeInTheDocument();
      expect(screen.getByText('Interests')).toBeInTheDocument();
      expect(screen.getByText('Country')).toBeInTheDocument();

      // 送信ボタンが存在するか確認
      expect(screen.getByText('Submit')).toBeInTheDocument();

      // フォームアイテムが正しく存在するか確認
      const formItems = screen.getAllByTestId('form-item');
      expect(formItems.length).toBe(11); // 5つのメインコンポーネント + チェックボックスの各アイテム（3つ）+ 1つの親
    });
  });
});
