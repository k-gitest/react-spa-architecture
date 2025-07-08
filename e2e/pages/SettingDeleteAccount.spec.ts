import { test, expect } from '@playwright/test';

// テストごとに一意のメールアドレスを生成するヘルパー関数
function generateUniqueEmail() {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `testuser_${timestamp}_${random}@example.com`;
}

test.describe('アカウント削除のテスト', () => {
  let userEmail: string;
  const userPassword = 'TestPassword123!';
  const expectedErrorMessage = 'ログイン資格情報または許可タイプが認識されません。';

  test.beforeEach(async ({ page }) => {
    userEmail = generateUniqueEmail();
    // ユーザー登録ページに移動
    await page.goto('/register');
    await page.getByLabel('email').fill(userEmail);
    await page.getByLabel('password').fill(userPassword);
    await page.getByRole('button', { name: '送信' }).click();
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('アカウント削除の確認', async ({ page }) => {
    // アカウント設定ページに移動
    await page.goto('/auth/setting');
    await page.getByRole('button', { name: 'アカウント' }).click();
    await page.getByRole('button', { name: 'アカウント削除' }).click();

    await page.waitForURL('/register');
    await expect(page).toHaveURL('/register');

    await page.goto('/login');
    await expect(page).toHaveURL('/login');

    await page.getByLabel('email').fill(userEmail);
    await page.getByLabel('password').fill(userPassword);
    await page.getByRole('button', { name: '送信' }).click();

    const errorMessageToast = page.getByText(expectedErrorMessage, { exact: true });
    await expect(errorMessageToast).toBeVisible();
  });
});
