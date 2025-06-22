import { expect, test } from '@playwright/test';
import { screenshotStable } from '../utils/screenshot';

test.describe('新規登録ページの未認証状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/register');
  });

  test('新規登録ページのtitleタグの内容を確認する', async ({ page }) => {
    await expect(page).toHaveTitle(/新規登録ページ: React ⚛️ \+ Vite ⚡ \+ shadcn\/ui/);
  });

  test('ログインページボタンをクリックするとログインページに遷移すること', async ({ page }) => {
    await page.getByRole('button', { name: 'ログインページ' }).click();
    await expect(page).toHaveURL('/login');
    await expect(page).toHaveTitle(/Loginページ: React ⚛️ \+ Vite ⚡ \+ shadcn\/ui/);
  });

  test('アカウント登録フォームが表示されていること', async ({ page }) => {
    await expect(page.getByLabel('email')).toBeVisible();
    await expect(page.getByLabel('password')).toBeVisible();
    await expect(page.getByRole('button', { name: '送信' })).toBeVisible();
  });

  test('有効な情報で新規登録ができること', async ({ page }) => {
    const email = `testuser_${Date.now()}@example.com`;
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

  test('既に登録済みのメールアドレスで登録しようとするとエラーメッセージが表示されること', async ({ page }) => {
    const existingEmail = 'testuser_1750581112830@example.com'; // 既にDBに存在するメールアドレスと仮定
    const password = 'Password123!';

    /*
    await page.route('**\/auth/v1/signup', async (route) => {
      await route.fulfill({
        status: 422,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          code: 'user_already_exists',
          message: 'User already registered',
        }),
      });
    });
    */

    await page.getByLabel('email').fill(existingEmail);
    await page.getByLabel('password').fill(password);
    await page.getByRole('button', { name: '送信' }).click();

    // エラーメッセージが表示されることを確認
    const notificationsRegion = page.getByRole('region', { name: 'Notifications (F8)' });
    const toastList = notificationsRegion.locator('ol');

    // リスト内の、role="status" を持つリストアイテム (li) を取得し、hasTextでフィルタリング
    const toastItem = toastList.getByRole('status').filter({
      hasText: 'この情報（メールアドレス、電話番号）を持つユーザーはすでに存在するため、再度作成することはできません。',
    });

    // Toastアイテム（li）のスコープ内で、エラーメッセージのテキストを直接持つ要素を探す
    const errorMessageElement = toastItem.getByText(
      'この情報（メールアドレス、電話番号）を持つユーザーはすでに存在するため、再度作成することはできません。',
      { exact: true },
    );
    await expect(errorMessageElement).toBeVisible();
  });

  test('新規登録ページ全体のスクリーンショットVRT', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await screenshotStable(page, 'register-full-page-unauthenticated.png', { fullPage: true });
  });
});
