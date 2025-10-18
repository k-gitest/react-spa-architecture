import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { GlobalAsyncBoundary } from '@/components/async-boundary';
import * as Sentry from "@sentry/react";

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
if (import.meta.env.MODE === "production") {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    // Setting this option to true will send default PII data to Sentry.
    // For example, automatic IP address collection on events
    sendDefaultPii: true,
    environment: import.meta.env.MODE,
  });
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalAsyncBoundary>
      <App />
    </GlobalAsyncBoundary>
  </React.StrictMode>,
);

