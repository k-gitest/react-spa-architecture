import './App.css';
import { Router } from '@/routes/router';
import { ThemeProvider } from '@/hooks/use-theme-provider';
import { queryClient, QueryClientProvider } from '@/lib/queryClient';
import { trpc, trpcClient, TRPCProvider } from '@/lib/trpc';
import { useAuthState } from '@/hooks/use-auth-state';
import { HelmetProvider } from 'react-helmet-async';

export default function App() {
  useAuthState();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <HelmetProvider>
              <Router />
            </HelmetProvider>
          </ThemeProvider>
        </QueryClientProvider>
      </TRPCProvider>
    </trpc.Provider>
  );
}
