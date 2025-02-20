import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Home from './Home';

// ResizeObserver をモックする
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('Home コンポーネント', () => {
  it('メモの追加とリストへの表示', async() => {
    render(<Home />);

    // メモフォームの入力フィールドとボタンを取得
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