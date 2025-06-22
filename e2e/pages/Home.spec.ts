import { test, expect } from '@playwright/test';
import { screenshotStable } from '../utils/screenshot';

test.describe('ホームページの未認証状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ホームページのtitleタグの内容を確認する', async ({ page }) => {
    await expect(page).toHaveTitle(/トップページ: React ⚛️ \+ Vite ⚡ \+ shadcn\/ui/, { timeout: 5000 });
  });

  test('ホームページに正しいタイトル（H2）が表示されている', async ({ page }) => {
    const h2Element = page.getByRole('heading', { level: 2 });
    await expect(h2Element).toBeVisible();
    await expect(h2Element).toHaveText('MEMO APP');
    await screenshotStable(h2Element, 'header-h2-title.png');
  });

  test('content-homeコンポーネントにある新規登録ボタンを押して新規登録ページに遷移しtitleを確認する', async ({
    page,
  }) => {
    await page.getByTestId('register-button-content-home').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/新規登録ページ/);
  });

  test('content-homeコンポーネントにあるログインボタンを押してログインページに遷移しtitleを確認する', async ({
    page,
  }) => {
    await page.getByTestId('login-button-content-home').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Loginページ/);
  });

  test('ホームページ全体のスクリーンショットVRT', async ({ page }) => {
    // ページが完全にロードされ、安定するのを待つ
    await page.waitForLoadState('networkidle');
    await screenshotStable(page, 'homepage-full-page-unauthenticated.png', { fullPage: true });
  });
});
