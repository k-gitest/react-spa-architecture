import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

