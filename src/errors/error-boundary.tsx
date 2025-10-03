import React, { Component, ErrorInfo, ReactNode } from "react";
import { errorHandler } from "@/errors/error-handler";

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
  level?: 'global' | 'page' | 'component';
}

interface State {
  hasError: boolean;
  error?: Error;
}

// 汎用的なエラーバウンダリー
class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { 
      hasError: true,
      error 
    };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    const level = this.props.level || 'component';
    
    // レベルに応じたログ出力
    console.error(`[${level.toUpperCase()}] Error Boundary caught an error:`, {
      error,
      errorInfo,
      componentStack: errorInfo.componentStack
    });

    // エラーハンドラーにapiエラー内容を渡す->トースト表示などを実行
    errorHandler(error)

    // カスタムエラーハンドラーがあれば実行
    this.props.onError?.(error, errorInfo);

    // 本番環境では外部サービスにエラーを送信
    if (process.env.NODE_ENV === 'production') {
      // TODO: エラー監視サービス（Sentry等）への送信
      // sendErrorToMonitoringService(error, errorInfo, level);
    }
  }

  // エラーリセット機能
  public resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // デフォルトのフォールバックUI
      return (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          border: '1px solid #ff6b6b',
          borderRadius: '8px',
          backgroundColor: '#fff5f5',
          margin: '20px'
        }}>
          <h2>エラーが発生しました</h2>
          <p>申し訳ございません。予期しないエラーが発生しました。</p>
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details style={{ marginTop: '16px', textAlign: 'left' }}>
              <summary>エラー詳細（開発環境のみ）</summary>
              <pre style={{ 
                backgroundColor: '#f5f5f5', 
                padding: '12px', 
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px'
              }}>
                {this.state.error.stack}
              </pre>
            </details>
          )}
          <button 
            onClick={this.resetError}
            style={{
              marginTop: '16px',
              padding: '8px 16px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            再試行
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// グローバル用エラーバウンダリー（アプリ全体を包む）
export const GlobalErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary 
    level="global"
    fallback={
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h1>アプリケーションエラー</h1>
        <p>アプリケーションで予期しないエラーが発生しました。</p>
        <p>ページを再読み込みしてください。</p>
        <button 
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            padding: '12px 24px',
            backgroundColor: '#dc3545',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          ページを再読み込み
        </button>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

// ページ用エラーバウンダリー
export const PageErrorBoundary = ({ children }: { children: ReactNode }) => (
  <ErrorBoundary 
    level="page"
    fallback={
      <div style={{ 
        padding: '40px 20px', 
        textAlign: 'center',
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <h2>ページの表示中にエラーが発生しました</h2>
        <p>このページを表示する際に問題が発生しました。</p>
        <p>画面を再読み込みするか、別のページに移動してください。</p>
        <div style={{ marginTop: '24px', display: 'flex', gap: '12px' }}>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            再読み込み
          </button>
          <button 
            onClick={() => window.history.back()}
            style={{
              padding: '10px 20px',
              backgroundColor: '#6c757d',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            前のページに戻る
          </button>
        </div>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

// コンポーネント用エラーバウンダリー（小さなUIパーツ用）
export const ComponentErrorBoundary = ({ 
  children, 
  componentName 
}: { 
  children: ReactNode;
  componentName?: string;
}) => (
  <ErrorBoundary 
    level="component"
    fallback={
      <div style={{ 
        padding: '12px', 
        border: '1px dashed #ffc107',
        borderRadius: '4px',
        backgroundColor: '#fff9c4',
        fontSize: '14px',
        textAlign: 'center'
      }}>
        <p>⚠️ {componentName || 'コンポーネント'}でエラーが発生しました</p>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export default ErrorBoundary;