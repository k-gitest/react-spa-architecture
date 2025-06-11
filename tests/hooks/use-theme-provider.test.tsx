import { render, screen, act, waitFor } from '@testing-library/react';
import { ThemeProvider, useTheme } from '@/hooks/use-theme-provider';
import { expect, vi } from 'vitest';

// localStorage をモックする
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    clear: () => {
      store = {};
    },
    removeItem: (key: string) => {
      delete store[key];
    },
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// matchMedia をモックする
const matchMediaMock = (matches: boolean) =>
  ({
    matches,
    addListener: vi.fn(),
    removeListener: vi.fn(),
  }) as unknown as MediaQueryList;
// setupのmatchMediaの内容を上書きする
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn(() => matchMediaMock(false)), // デフォルトは light に設定
});

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
    // 各テスト前に document.documentElement の classList をクリア
    document.documentElement.className = '';
  });

  it('childrenをレンダリング', () => {
    render(
      <ThemeProvider>
        <div>Test Child</div>
      </ThemeProvider>,
    );
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('デフォルトのテーマをシステムに設定し、システム設定を適用する', () => {
    window.matchMedia = vi.fn(() => matchMediaMock(true)); // システム設定が dark の場合
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);

    window.matchMedia = vi.fn(() => matchMediaMock(false)); // システム設定が light の場合
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('デフォルトのテーマを指定の値に設定する', () => {
    render(
      <ThemeProvider defaultTheme="dark">
        <div>Test</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('テーマが存在する場合はlocalStorageからテーマを読み込む', () => {
    localStorage.setItem('vite-ui-theme', 'light');
    render(
      <ThemeProvider>
        <div>Test</div>
      </ThemeProvider>,
    );
    expect(document.documentElement.classList.contains('light')).toBe(true);
  });

  it('setThemeが呼び出されたときにテーマを更新し、localStorageに保存する', async () => {
    const TestComponent = () => {
      const { theme, setTheme } = useTheme();
      return (
        <div>
          <span data-testid="theme">{theme}</span>
          <button onClick={() => setTheme('dark')}>Set Dark</button>
          <button onClick={() => setTheme('light')}>Set Light</button>
        </div>
      );
    };

    let renderResult;
    await act(async () => {
      renderResult = render(
        <ThemeProvider>
          <TestComponent />
        </ThemeProvider>,
      );
    });

    // 初回レンダリング後の effect を待つ
    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('system');
    });
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('vite-ui-theme')).toBeNull(); // まだ setTheme 呼ばれてないので null

    await act(async () => {
      screen.getByText('Set Dark').click();
    });
    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('dark');
    });
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(localStorage.getItem('vite-ui-theme')).toBe('dark');

    await act(async () => {
      screen.getByText('Set Light').click();
    });
    await waitFor(() => {
      expect(screen.getByTestId('theme')).toHaveTextContent('light');
    });
    expect(document.documentElement.classList.contains('light')).toBe(true);
    expect(localStorage.getItem('vite-ui-theme')).toBe('light');
  });

  it('カスタムストレージキーを使用する', async () => {
    const storageKey = 'custom-theme-key';
    const TestComponent = () => {
      const { setTheme } = useTheme();
      return <button onClick={() => setTheme('dark')}>Set Dark</button>;
    };

    render(
      <ThemeProvider storageKey={storageKey}>
        <TestComponent />
      </ThemeProvider>,
    );

    await act(async () => {
      screen.getByText('Set Dark').click();
    });
    expect(localStorage.getItem(storageKey)).toBe('dark');
    expect(localStorage.getItem('vite-ui-theme')).toBeNull(); // デフォルトのキーには保存されない
  });

  it('useThemeがThemeProviderの外部で使用されている場合はエラーをスローする', () => {
    const useThemeOutsideProvider = () => useTheme();
    expect(useThemeOutsideProvider).toThrowError(
      'Invalid hook call. Hooks can only be called inside of the body of a function component.',
    );
  });
});
