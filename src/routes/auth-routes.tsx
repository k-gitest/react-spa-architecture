import { Routes, Route } from 'react-router-dom';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Profile from '@/pages/Profile';
import Confirm from '@/pages/Confirm';
import NewPass from '@/pages/NewPass';
import { ProtectedRoute } from '@/routes/protected-route';
import { AuthGuard } from '@/routes/auth-guard';
import NotFound from '@/pages/Not-Found';

export const AuthRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthGuard />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
      <Route element={<ProtectedRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/confirm" element={<Confirm />} />
        <Route path="/pass" element={<NewPass />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};