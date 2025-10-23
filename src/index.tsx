import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalAsyncBoundary } from '@/components/async-boundary';
import * as Sentry from "@sentry/react";
import { SENTRY_DSN, SENTRY_RELEASE, IS_PRODUCTION } from "@/lib/constants";

// mswをブラウザで使用する場合
// 開発環境でのみMSWを有効にする関数
/*
async function enableMocking() {
  // Viteの環境変数で開発モードをチェック
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    // 開発環境でのみサービスワーカーを起動
    return worker.start();
  }
}
*/

// MSWの起動が完了してからReactアプリケーションをレンダリング
/*
enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
});
*/

// Sentryの初期化
if (IS_PRODUCTION && SENTRY_DSN) {
  Sentry.init({
    dsn: SENTRY_DSN,
    sendDefaultPii: true,
    environment: import.meta.env.MODE,
    release: SENTRY_RELEASE,
    tracesSampleRate: 0.1,
  });

  // グローバルに公開（setSentryUserで使用するため）
  window.Sentry = Sentry;
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalAsyncBoundary>
      <App />
    </GlobalAsyncBoundary>
  </React.StrictMode>,
);

