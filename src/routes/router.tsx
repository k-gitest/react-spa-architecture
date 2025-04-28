import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route, Outlet } from 'react-router-dom';
import { Layout } from '@/components/layout/layout';
import { AuthLayout } from '@/components/layout/auth/auth-layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Fetch from '@/pages/Fetch';
import Register from '@/pages/Register';
import Login from '@/pages/Login';
import Auth from '@/pages/Auth';
import Setting from '@/pages/Setting';
import Confirm from '@/pages/Confirm';
import Dashboard from '@/pages/Dashboard';
import NotFound from '@/pages/Not-Found';
import { AuthGuard } from '@/routes/auth-guard';
import { GuestGuard } from '@/routes/guest-guard';

const LayoutWrapper = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
};

const AuthLayoutWrapper = () => {
  return (
    <AuthLayout>
      <Outlet />
    </AuthLayout>
  );
};

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<LayoutWrapper />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/fetch" element={<Fetch />} />

        {/* new password redirect routes */}
        <Route path="/pass" element={<Auth />} />

        {/* Guest routes with GuestGuard */}
        <Route element={<GuestGuard />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Not found route */}
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route element={<AuthLayoutWrapper />}>
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Protected routes */}
        <Route element={<AuthGuard />}>
          <Route path="/auth/setting" element={<Setting />} />
          <Route path="/auth/confirm" element={<Confirm />} />
        </Route>
      </Route>
    </>,
  ),
);

export const Router = () => {
  return <RouterProvider router={router} />;
};
