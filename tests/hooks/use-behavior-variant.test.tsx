import { describe, it, expect, beforeEach } from 'vitest';
import { act } from '@testing-library/react';
import { useBehaviorVariant } from '@/hooks/use-behavior-variant';

describe('useBehaviorVariant', () => {
  beforeEach(() => {
    // ストアを初期状態にリセット（Zustandの公式手法）
    const { toggleVariant } = useBehaviorVariant.getState();
    while (useBehaviorVariant.getState().getCurrentVariant().id !== 'default') {
      act(() => toggleVariant());
    }
  });

  it('初期状態は "default" バリアントである', () => {
    const variant = useBehaviorVariant.getState().getCurrentVariant();
    expect(variant.id).toBe('default');
    expect(variant.name).toBe('標準');
  });

  it('toggleVariant を1回呼ぶと "tanstack" に切り替わる', () => {
    act(() => {
      useBehaviorVariant.getState().toggleVariant();
    });

    const variant = useBehaviorVariant.getState().getCurrentVariant();
    expect(variant.id).toBe('tanstack');
    expect(variant.name).toBe('TanStack');
  });

  it('toggleVariant を3回呼ぶと再び "default" に戻る', () => {
    act(() => {
      useBehaviorVariant.getState().toggleVariant(); // tanstack
      useBehaviorVariant.getState().toggleVariant(); // trpc
      useBehaviorVariant.getState().toggleVariant(); // default
    });

    const variant = useBehaviorVariant.getState().getCurrentVariant();
    expect(variant.id).toBe('default');
  });
});
