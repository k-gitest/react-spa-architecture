import './App.css';
import { ReactNode } from 'react';
import { Router } from '@/routes/router';
import { ThemeProvider } from '@/hooks/use-theme-provider';
import { queryClient, QueryClientProvider } from '@/lib/queryClient';
import { useSessionObserver } from '@/hooks/use-session-observer';
import { HelmetProvider } from 'react-helmet-async';

interface AppProps {
  children?: ReactNode;
}

export default function App({ children }: AppProps) {
  useSessionObserver();

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
