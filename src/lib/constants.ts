export const BUCKET_PROFILE: string = import.meta.env.VITE_BUCKET_PROFILE ?? 'avatars';
export const BUCKET_NAME: string = import.meta.env.VITE_BUCKET_NAME ?? 'images';
export const BASE_API_URL: string = import.meta.env.VITE_BASE_API_URL ?? 'http://localhost:3000';
export const SUPABASE_URL: string = import.meta.env.VITE_SUPABASE_URL ?? 'http://localhost:54321';
export const SUPABASE_ANON_KEY: string = import.meta.env.VITE_SUPABASE_ANON_KEY ?? 'dummy-anon-key';
export const PROJECT_ID: string = import.meta.env.VITE_PROJECT_ID ?? '12345abcd';
export const EDGE_REST_URI: string = import.meta.env.VITE_EDGE_REST_URI ?? 'localhost';
export const BUCKET_IMAGES: string = import.meta.env.VITE_BUCKET_IMAGES ?? 'images';

// App Info
export const APP_NAME: string = import.meta.env.VITE_APP_NAME ?? 'my-app';
export const APP_VERSION: string = import.meta.env.VITE_APP_VERSION ?? '0.0.0';
export const GIT_SHA: string | undefined = import.meta.env.VITE_GIT_SHA;

// Sentry
export const SENTRY_DSN: string = import.meta.env.VITE_SENTRY_DSN ?? '';
export const SENTRY_RELEASE: string = import.meta.env.MODE === 'production'
  ? `${APP_NAME}@${APP_VERSION}-${GIT_SHA || 'unknown'}`
  : `${APP_NAME}@${APP_VERSION}-local`;