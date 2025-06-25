import { test, expect } from '../mswTest';

test.describe('ログインページの未認証状態のテスト', () => {
  test('ダッシュボードページのtitleタグの内容を確認する', async ({ page }) => {
    await page.goto("/dashboard");
    await expect(page).toHaveTitle(/ダッシュボード/);
  });

});
