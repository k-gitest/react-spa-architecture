import { test, expect } from '../mswTest';
import { screenshotStable } from '../utils/screenshot';

test.describe('ログインページの未認証状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/login');
  });

  test('ログインページのtitleタグの内容を確認する', async ({ page }) => {
    await expect(page).toHaveTitle(/Loginページ/);
  });

  test('新規登録ページボタンをクリックすると新規登録ページに遷移すること', async ({ page }) => {
    await page.getByRole('button', { name: '新規登録ページ' }).click();
    await expect(page).toHaveURL('/register');
    await expect(page).toHaveTitle(/新規登録ページ: React ⚛️ \+ Vite ⚡ \+ shadcn\/ui/);
  });

  test('ログインフォームが表示されていること', async ({ page }) => {
    await expect(page.getByLabel('email')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: '送信' })).toBeVisible();
  });

  test('有効な情報でログインができること', async ({ page }) => {
    const email = `testuser_1750581112830@example.com`;
    const password = 'Password123!';

    await page.getByLabel('email').fill(email);
    await page.getByLabel('password').fill(password);
    await page.getByRole('button', { name: '送信' }).click();

    // 登録成功後のリダイレクトを検証
    await page.waitForURL('/dashboard'); // 成功後にリダイレクトされるURL
    await expect(page).toHaveURL('/dashboard');
  });

  test('無効なメールアドレスで登録しようとするとエラーメッセージが表示されること', async ({ page }) => {
    await page.getByLabel('email').fill('invalid-email'); // 無効なメール形式
    await page.getByLabel('password').fill('Password123!');
    await page.getByRole('button', { name: '送信' }).click();

    // エラーメッセージが表示されることを確認
    await expect(page.getByText('emailアドレスは有効なアドレスを入力してください')).toBeVisible();
  });

  test('ログインページ全体のスクリーンショットVRT', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await screenshotStable(page, 'login-full-page-unauthenticated.png', { fullPage: true });
  });
});
