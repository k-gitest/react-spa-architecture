import { lazy } from 'react';

// pages内コンポーネントをlazyで非同期読み込みとする場合の設定
export const LazyPages = {
  Home: lazy(() => import('@/pages/Home')),
  About: lazy(() => import('@/pages/About')),
  Fetch: lazy(() => import('@/pages/Fetch')),
  Login: lazy(() => import('@/pages/Login')),
  Register: lazy(() => import('@/pages/Register')),
  Auth: lazy(() => import('@/pages/Auth')),
  Dashboard: lazy(() => import('@/pages/Dashboard')),
  Setting: lazy(() => import('@/pages/Setting')),
  Confirm: lazy(() => import('@/pages/Confirm')),
} as const;