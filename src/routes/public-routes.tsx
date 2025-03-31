import { Routes, Route } from 'react-router-dom';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Fetch from '@/pages/Fetch';
import NotFound from '@/pages/Not-Found';

export const PublicRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/fetch" element={<Fetch />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};