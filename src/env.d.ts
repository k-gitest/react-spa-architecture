/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 開発でも常に使う → string
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_SUPABASE_ANON_KEY: string;
  readonly VITE_BUCKET_PROFILE: string;
  readonly VITE_BUCKET_NAME: string;
  readonly VITE_BUCKET_IMAGES: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_BASE_API_URL: string;
  readonly VITE_EDGE_REST_URI: string;
  
  // 本番専用 → string | undefined
  readonly VITE_SENTRY_DSN: string | undefined;
  
  // ビルド時注入 → string
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;
  
  // CI/CD専用 → string | undefined
  readonly VITE_GIT_SHA: string | undefined;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
