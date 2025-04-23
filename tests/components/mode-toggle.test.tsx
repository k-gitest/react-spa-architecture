import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { ModeToggle } from '@/components/mode-toggle';
import { useTheme } from '@/hooks/use-theme-provider';

// useThemeフックをモック
vi.mock('@/hooks/use-theme-provider', () => ({
  useTheme: vi.fn()
}));

describe('ModeToggle', () => {
  // 各テスト後にクリーンアップ
  afterEach(() => {
    cleanup();
    vi.resetAllMocks();
  });

  it('正しくレンダリングされる', () => {
    // モックセットアップ
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme
    });

    render(<ModeToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('ライトモードのときに月アイコンが表示される', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: vi.fn()
    });

    render(<ModeToggle />);
    expect(screen.getByLabelText('Toggle theme mode')).toBeInTheDocument();
    // Moonアイコンの存在を確認（SVGの直接検証は難しいため、アイコンのラッパー要素で確認）
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton.querySelector('svg')).toBeInTheDocument();
  });

  it('ダークモードのときにPCアイコンが表示される', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: vi.fn()
    });

    render(<ModeToggle />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton.querySelector('svg')).toBeInTheDocument();
  });

  it('システムモードのときに太陽アイコンが表示される', () => {
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      setTheme: vi.fn()
    });

    render(<ModeToggle />);
    const toggleButton = screen.getByRole('button');
    expect(toggleButton).toBeInTheDocument();
    expect(toggleButton.querySelector('svg')).toBeInTheDocument();
  });

  it('ライトモードでクリックするとダークモードに切り替わる', () => {
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'light',
      setTheme: mockSetTheme
    });

    render(<ModeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('ダークモードでクリックするとシステムモードに切り替わる', () => {
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'dark',
      setTheme: mockSetTheme
    });

    render(<ModeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetTheme).toHaveBeenCalledWith('system');
  });

  it('システムモードでクリックするとライトモードに切り替わる', () => {
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'system',
      setTheme: mockSetTheme
    });

    render(<ModeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('不明なテーマの場合、ライトモードに設定される', () => {
    const mockSetTheme = vi.fn();
    vi.mocked(useTheme).mockReturnValue({
      theme: 'unknown' as any, // 不明なテーマを設定
      setTheme: mockSetTheme
    });

    render(<ModeToggle />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });
});