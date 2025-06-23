import { setupServer } from 'msw/node';
import { handlers } from './handlers';

// setupServer関数でNode.js用のモックサーバーを生成
export const server = setupServer(...handlers);