import './App.css';
import { ReactNode } from 'react';
import { Router } from '@/routes/router';
import { ThemeProvider } from '@/hooks/use-theme-provider';
import { queryClient, QueryClientProvider } from '@/lib/queryClient';
import { useSessionObserver } from '@/hooks/use-session-observer';
import { HelmetProvider } from 'react-helmet-async';
import { setupZodI18n } from '@/errors/zod-error-map';

interface AppProps {
  children?: ReactNode;
}

setupZodI18n();

export default function App({ children }: AppProps) {
  useSessionObserver();

  /* エラーバウンダリーチェック
  if (true) {
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
