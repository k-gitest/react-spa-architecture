import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Fetch from '@/pages/Fetch';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import NotFound from '@/pages/Not-Found';
import Confirm from '@/pages/Confirm';
import NewPass from '@/pages/NewPass';
import { ThemeProvider } from '@/hooks/use-theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthState } from '@/hooks/use-auth-state';
import { Toaster } from '@/components/ui/toaster';
import { trpc, trpcClient, TRPCProvider } from '@/lib/trpc';

const queryClient = new QueryClient();

export default function App() {
  useAuthState();

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <TRPCProvider trpcClient={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Router>
              <Header />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/fetch" element={<Fetch />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/confirm" element={<Confirm />} />
                <Route path="/pass" element={<NewPass />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
              <Footer />
              <Toaster />
            </Router>
          </ThemeProvider>
        </QueryClientProvider>
      </TRPCProvider>
    </trpc.Provider>
  );
}
