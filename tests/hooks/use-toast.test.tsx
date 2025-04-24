import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useToast } from '@/hooks/use-toast';
import { describe, it, expect, beforeEach } from 'vitest';

// Toaster をここで定義（テスト用）
const Toaster = () => {
  const { toasts } = useToast();
  return (
    <div>
      {toasts.map((toast) => (
        <div key={toast.id}>
          <strong>{toast.title}</strong>
          <p>{toast.description}</p>
        </div>
      ))}
    </div>
  );
};

// テスト用のコンポーネント
const TestComponent = () => {
  const { toast } = useToast();

  return (
    <>
      <button
        onClick={() => {
          toast({
            title: 'Test Toast',
            description: 'This is a test toast',
          });
        }}
      >
        Show Toast
      </button>
      <Toaster />
    </>
  );
};

describe('Toast Component', () => {
  beforeEach(() => {
    // 状態リセットが必要ならここで
  });

  it('ボタンをクリックするとトーストが表示される', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Show Toast'));

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
      expect(screen.getByText('This is a test toast')).toBeInTheDocument();
    });
  });

  it('トーストの遅延非表示', async () => {
    render(<TestComponent />);

    fireEvent.click(screen.getByText('Show Toast'));

    await waitFor(() => {
      expect(screen.getByText('Test Toast')).toBeInTheDocument();
    });

    // TOAST_REMOVE_DELAY より短く設定（現状 1000000ms なのでここでは消えない）
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // 確認：消えていないこと（正しくはここでまだ存在している）
    expect(screen.queryByText('Test Toast')).toBeInTheDocument();
  });
});
