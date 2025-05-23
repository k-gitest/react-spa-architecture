import { useBehaviorVariant } from '@/hooks/use-behavior-variant';
import { ComponentType } from 'react';

export const withBehaviorVariant = <P extends object>(
  componentsMap: Record<string, ComponentType<P>>
): ComponentType<P> => {
  const BehaviorVariantComponent = (props: P) => {
    const { getCurrentVariant } = useBehaviorVariant();
    const currentVariant = getCurrentVariant();
    const Component = componentsMap[currentVariant.id] ?? componentsMap.default;
    return <Component {...props} />;
  };
  BehaviorVariantComponent.displayName = 'withBehaviorVariant';

  return BehaviorVariantComponent;
};
