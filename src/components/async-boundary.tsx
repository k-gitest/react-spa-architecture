import { Suspense, ReactNode } from 'react';
import { 
  GlobalErrorBoundary,
  PageErrorBoundary, 
  ComponentErrorBoundary 
} from '@/errors/error-boundary';

interface AsyncBoundaryProps {
  children: ReactNode;
  level?: 'global' | 'page' | 'component';
  pageName?: string;
  componentName?: string;
  suspenseFallback?: ReactNode;
}

export const AsyncBoundary = ({
  children,
  level = 'component',
  pageName,
  componentName,
  suspenseFallback
}: AsyncBoundaryProps) => {
  // レベルに応じたErrorBoundaryを選択
  const ErrorBoundaryComponent = 
    level === 'global' ? GlobalErrorBoundary :
    level === 'page' ? PageErrorBoundary :
    ComponentErrorBoundary;

  const errorBoundaryProps = 
    level === 'page' ? { pageName } :
    level === 'component' ? { componentName } :
    {};

  // レベルに応じたフォールバックUI
  const fallback = suspenseFallback || getDefaultFallback(level);

  return (
    <ErrorBoundaryComponent {...errorBoundaryProps}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </ErrorBoundaryComponent>
  );
};

const getDefaultFallback = (level: string) => {
  if (level === 'global') {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">読み込み中...</p>
        </div>
      </div>
    );
  }

  if (level === 'page') {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-3"></div>
          <p className="text-muted-foreground">ページを読み込み中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center p-4">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
};

// グローバル用
export const GlobalAsyncBoundary = ({ children }: { children: ReactNode }) => (
  <AsyncBoundary level="global">
    {children}
  </AsyncBoundary>
);

// ページ用
export const PageAsyncBoundary = ({ 
  children, 
  pageName 
}: { 
  children: ReactNode; 
  pageName?: string;
}) => (
  <AsyncBoundary level="page" pageName={pageName}>
    {children}
  </AsyncBoundary>
);

// コンポーネント用
export const ComponentAsyncBoundary = ({ 
  children, 
  componentName 
}: { 
  children: ReactNode; 
  componentName?: string;
}) => (
  <AsyncBoundary level="component" componentName={componentName}>
    {children}
  </AsyncBoundary>
);