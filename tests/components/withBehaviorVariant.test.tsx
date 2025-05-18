import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { withBehaviorVariant } from '@/components/withBehaviorVariant';

// フックのモック
vi.mock('@/hooks/use-behavior-variant', () => ({
  useBehaviorVariant: vi.fn(),
}));

import { useBehaviorVariant } from '@/hooks/use-behavior-variant';

// ダミーコンポーネント
const VariantAComponent = () => <div>Variant A</div>;
const VariantBComponent = () => <div>Variant B</div>;
const DefaultComponent = () => <div>Default Variant</div>;

describe('withBehaviorVariant HOC', () => {
  const mockUseBehaviorVariant = useBehaviorVariant as unknown as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('variant.id が "variantA" の場合、VariantAComponent を表示する', () => {
    mockUseBehaviorVariant.mockReturnValue({
      getCurrentVariant: () => ({ id: 'variantA' }),
    });

    const WrappedComponent = withBehaviorVariant({
      variantA: VariantAComponent,
      default: DefaultComponent,
    });

    render(<WrappedComponent />);

    expect(screen.getByText('Variant A')).toBeInTheDocument();
  });

  it('variant.id が "variantB" の場合、VariantBComponent を表示する', () => {
    mockUseBehaviorVariant.mockReturnValue({
      getCurrentVariant: () =>({ id: 'variantB' }),
    });

    const WrappedComponent = withBehaviorVariant({
      variantB: VariantBComponent,
      default: DefaultComponent,
    });

    render(<WrappedComponent />);

    expect(screen.getByText('Variant B')).toBeInTheDocument();
  });

  it('variant.id が未知の値の場合、default コンポーネントを表示する', () => {
    mockUseBehaviorVariant.mockReturnValue({
      getCurrentVariant: () =>({ id: 'unknownVariant' }),
    });

    const WrappedComponent = withBehaviorVariant({
      variantA: VariantAComponent,
      default: DefaultComponent,
    });

    render(<WrappedComponent />);

    expect(screen.getByText('Default Variant')).toBeInTheDocument();
  });
});
