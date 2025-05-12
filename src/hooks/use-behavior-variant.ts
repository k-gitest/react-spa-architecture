import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// バリアントの型定義
type Variant = {
  id: 'default' | 'tanstack' | 'trpc';
  name: string;
};

// 実装バリアント一覧
const IMPLEMENTATION_VARIANTS: Variant[] = [
  { id: 'default', name: '標準実装' },
  { id: 'tanstack', name: 'TanStack 実装' },
  { id: 'trpc', name: 'tRPC 実装' }
];

// Zustand ストアの型
type BehaviorVariantState = {
  currentVariantIndex: number;
  toggleVariant: () => void;
  getCurrentVariant: () => Variant;
};

// ストア作成
export const useBehaviorVariant = create<BehaviorVariantState>()(
  persist(
    (set, get) => ({
      currentVariantIndex: 0,
      toggleVariant: () =>
        set((state) => ({
          currentVariantIndex:
            (state.currentVariantIndex + 1) % IMPLEMENTATION_VARIANTS.length
        })),
      getCurrentVariant: () => IMPLEMENTATION_VARIANTS[get().currentVariantIndex],
    }),
    {
      name: 'behavior-variant-storage',
    }
  )
);
