import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { VariantToggle } from '@/components/variant-toggle';

// フックのモック
vi.mock('@/hooks/use-behavior-variant', () => ({
  useBehaviorVariant: vi.fn(),
}));

// アイコンのモック（lucide-react）
vi.mock('lucide-react', () => ({
  RotateCw: () => <svg data-testid="rotate-icon" />,
}));

import { useBehaviorVariant } from '@/hooks/use-behavior-variant';

describe('VariantToggle Component', () => {
  const mockToggleVariant = vi.fn();

  beforeEach(() => {
    vi.resetAllMocks();

    (useBehaviorVariant as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      toggleVariant: mockToggleVariant,
      getCurrentVariant: () => ({
        name: 'variantA',
      }),
    });
  });

  it('現在のバリアント名が表示される', () => {
    render(<VariantToggle />);

    expect(screen.getByText('variantA')).toBeInTheDocument();
    expect(screen.getByTestId('rotate-icon')).toBeInTheDocument();
  });

  it('ボタンをクリックすると toggleVariant が呼び出される', () => {
    render(<VariantToggle />);

    fireEvent.click(screen.getByRole('button'));

    expect(mockToggleVariant).toHaveBeenCalledTimes(1);
  });
});
