import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Header from '@/components/layout/header';
import Footer from '@/components/layout/footer';

export default function App() {

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </Router>
  )
}
