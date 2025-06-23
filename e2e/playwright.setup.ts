import { test as base } from '@playwright/test';
import { server } from '../src/mocks/server';

type MyWorkerFixtures = {
  mockServer: void; // mockServerフィクスチャは何か値を返さず、サイドエフェクト（MSWの起動/停止）だけを行うためvoid
};
type MyTestFixtures = {
  resetMockHandlers: void; // 各テスト後にMSWハンドラーをリセットするフィクスチャ
};

//第1パラメータ (TestFixtures): test-level fixtures の型
//第2パラメータ (WorkerFixtures): worker-level fixtures の型
/*
test スコープ (scope: 'test' または省略時のデフォルト)
各テストごとに実行される
第1型パラメータで定義
*/
/*
worker スコープ (scope: 'worker')
ワーカープロセスごとに1回実行される
第2型パラメータで定義
*/

// PlaywrightのテストフックでMSWサーバーのライフサイクルを管理
export const test = base.extend<MyTestFixtures, MyWorkerFixtures>({
  // `beforeAll` に相当するセットアップ
  // Worker-level: MSWサーバーの起動/停止
  mockServer: [
    async ({}, use) => {
      // MSWサーバーを開始
      server.listen({ onUnhandledRequest: 'error' }); // 未定義のリクエストはエラーにする設定

      // テストの実行
      await use();

      // ワーカー終了時: サーバーをクローズ
      server.close();
    },
    { scope: 'worker', auto: true },
  ], // 'worker' スコープでテストワーカーごとに1回実行

  // Test-level: 各テスト後にハンドラーをリセット
  resetMockHandlers: [
    async ({}, use) => {
      // テスト実行
      await use();

      // 各テスト実行後: ハンドラーをリセット
      server.resetHandlers();
    },
    { auto: true },
  ], // test スコープ（デフォルト）で各テスト後に実行
});

// Option: 全テストスイートで1回だけ実行したい場合 (通常はあまり推奨されないが、状況による)
// beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
// afterEach(() => server.resetHandlers());
// afterAll(() => server.close());
