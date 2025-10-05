import './App.css';
import { ReactNode } from 'react';
import { Router } from '@/routes/router';
import { ThemeProvider } from '@/hooks/use-theme-provider';
import { queryClient, QueryClientProvider } from '@/lib/queryClient';
import { useSessionObserver } from '@/hooks/use-session-observer';
import { HelmetProvider } from 'react-helmet-async';
import { setupZodI18n } from '@/errors/zod-error-map';
// import { useSessionMonitor } from '@/hooks/use-session-monitor';

// index.tsxでローディングfallbackする場合、Routerを遅延ロードで非同期読み込みとする
// lazyで遅延コンポーネント読み込みをする場合、冒頭でのRouter importは削除する
// const Router = lazy(() => import('@/routes/router').then(m => ({ default: m.Router })));

interface AppProps {
  children?: ReactNode;
}

setupZodI18n();

export default function App({ children }: AppProps) {
  useSessionObserver();
  // 認証チェックをtanstackで行う場合
  // useSessionMonitor();

  /* エラーバウンダリーチェック
  if (isInitialized) {
    throw new Error('Test Error: This error should be caught by ErrorBoundary.');
  }
  */

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <HelmetProvider>
          {children}
          <Router />
        </HelmetProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
