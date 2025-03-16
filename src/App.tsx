import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Fetch from '@/pages/Fetch'
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';
import NotFound from '@/pages/Not-Found';
import { ThemeProvider } from "@/hooks/use-theme-provider"

export default function App() {

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/fetch" element={<Fetch />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </ThemeProvider>
  )
}