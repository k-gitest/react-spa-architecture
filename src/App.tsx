import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Fetch from '@/pages/Fetch';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import Callback from '@/pages/Callback';
import Register from '@/pages/Register';
import Login from '@/pages/Login'
import NotFound from '@/pages/Not-Found';
import { ThemeProvider } from '@/hooks/use-theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuthState } from '@/hooks/use-auth-state';

const queryClient = new QueryClient();

export default function App() {
  useAuthState();
  
  return (
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
            <Route path="/callback" element={<Callback />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  );
}
