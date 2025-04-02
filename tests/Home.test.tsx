import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import Home from '@/pages/Home';
import { HelmetProvider } from 'react-helmet-async';
import App from '@/App'

// ResizeObserver をモックする
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// window.matchMedia をモックする
vi.stubGlobal('matchMedia', vi.fn().mockImplementation(query => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(), // 無くてもいい
  removeListener: vi.fn(), // 無くてもいい
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
})));

describe('Home コンポーネント', () => {

  it('メモの追加とリストへの表示', () => {
    render(<App><Home /></App>);

    // メモ追加ボタンを取得
    const memoAddButton = screen.getByRole('button', {name: 'メモ追加'});

    // メモ追加ボタンをクリック
    fireEvent.click(memoAddButton);

    waitFor( () => {
      expect(screen.getByText('Memo')).toBeInTheDocument();
      expect(screen.getByText('メモを残そう'));
    },{ timeout: 1000 })

    // メモフォームの入力フィールドを取得
    const titleInput = screen.getByLabelText('タイトル');
    const contentInput = screen.getByLabelText('メモの内容');
    const categoryButton = screen.getByRole('combobox', { name: 'カテゴリー' });
    const radioHigh = screen.getByRole('radio', { name: '大' });
    const checkboxRecents = screen.getByRole('checkbox', { name: 'Recents' });
    const addButton = screen.getByRole('button', { name: '送信' });
    
    // 入力フィールドに値を入力
    fireEvent.change(titleInput, { target: { value: 'テストタイトル' } });
    fireEvent.change(contentInput, { target: { value: 'テスト内容' } });
    fireEvent.click(categoryButton);
    fireEvent.click(screen.getByRole('option', { name: 'メモ' }));
    fireEvent.click(radioHigh);
    fireEvent.click(checkboxRecents);

    // 追加ボタンをクリック
    fireEvent.click(addButton);

    // メモリストに新しいメモが表示されていることを確認
    waitFor(() => {
      expect(screen.getByText('テストタイトル')).toBeInTheDocument();
      expect(screen.getByText('テスト内容')).toBeInTheDocument();
    },{ timeout: 1000 });
  });
});