import { Session } from "@supabase/supabase-js";

export const BUCKET_PROFILE: string = import.meta.env.VITE_BUCKET_PROFILE ?? 'avatars';
export const BUCKET_NAME: string = import.meta.env.VITE_BUCKET_NAME ?? 'images';
export const BASE_API_URL: string = import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:3000';
export const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? 'http://localhost:54321';
export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'dummy-anon-key';
export const PROJECT_ID: string = import.meta.env.VITE_PROJECT_ID ?? '12345abcd';
export const EDGE_REST_URI: string = import.meta.env.VITE_EDGE_REST_URI ?? 'localhost';
export const BUCKET_IMAGES: string = import.meta.env.VITE_BUCKET_IMAGES ?? 'images';
export const IS_PRODUCTION = import.meta.env.MODE === 'production';

// App Info
export const APP_NAME: string = import.meta.env.VITE_APP_NAME ?? 'my-app';
export const APP_VERSION: string = import.meta.env.VITE_APP_VERSION ?? '0.0.0';
export const GIT_SHA: string | undefined = import.meta.env.VITE_GIT_SHA;

// Sentry
export const SENTRY_DSN: string = import.meta.env.VITE_SENTRY_DSN ?? '';
export const SENTRY_RELEASE: string = IS_PRODUCTION
  ? `${APP_NAME}@${APP_VERSION}-${GIT_SHA || 'unknown'}`
  : `${APP_NAME}@${APP_VERSION}-local`;

// Sentry User情報設定用ヘルパー
let lastSessionUserId: string | null = null;
export const setSentryUser = (user: { 
  id: string; 
  email?: string; 
  username?: string;
} | null) => {
  if (!IS_PRODUCTION || !SENTRY_DSN) return;

  // Sentryが初期化されているか確認
  if (typeof window === 'undefined' || !window.Sentry) return;

  // 同一ユーザーならスキップ
  const newId = user?.id ?? null;
  if (lastSessionUserId === newId) return;
  lastSessionUserId = newId;

  // userがある場合にのみ送信
  if (user) {
    window.Sentry.setUser({
      id: user.id,
      email: user.email,
      username: user.username,
    });
  } else {
    window.Sentry.setUser(null);
  }
};

// Supabaseのセッションから安全にSentryユーザーを設定
export const setSentryUserFromSession = (session: Session | null) => {
  if (session?.user) {
    setSentryUser({
      id: session.user.id,
      email: session.user.email,
      username: session.user.user_metadata?.username,
    });
  } else {
    setSentryUser(null);
  }
};