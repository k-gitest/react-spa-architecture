import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ContentHome } from '@/components/content-home';

vi.mock('@/hooks/use-session-store', () => ({
  useSessionStore: vi.fn(),
}));

import { useSessionStore } from '@/hooks/use-session-store';

describe('ContentHome Component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('セッションがない場合、「新規登録」と「ログイン」ボタンが表示される', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue(null);

    render(
      <BrowserRouter>
        <ContentHome />
      </BrowserRouter>
    );

    expect(screen.getByText('MEMO APP')).toBeInTheDocument();
    expect(screen.getByText('新規登録')).toBeInTheDocument();
    expect(screen.getByText('ログイン')).toBeInTheDocument();
    expect(screen.queryByText('dashboard')).not.toBeInTheDocument();
  });

  it('セッションがある場合、「dashboard」ボタンが表示され、「新規登録」「ログイン」は表示されない', () => {
    (useSessionStore as unknown as ReturnType<typeof vi.fn>).mockImplementation((selector) =>
      selector({ session: { user: { id: '1', name: 'テストユーザー' } } })
    );

    render(
      <BrowserRouter>
        <ContentHome />
      </BrowserRouter>
    );

    expect(screen.getByText('MEMO APP')).toBeInTheDocument();
    expect(screen.getByText('dashboard')).toBeInTheDocument();
    expect(screen.queryByText('新規登録')).not.toBeInTheDocument();
    expect(screen.queryByText('ログイン')).not.toBeInTheDocument();
  });
});
