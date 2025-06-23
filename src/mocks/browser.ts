import { setupWorker } from 'msw/browser';
import { handlers } from './handlers';

// setupWorker関数でサービスワーカーを生成
export const worker = setupWorker(...handlers);