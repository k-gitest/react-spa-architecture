import { test, expect } from '../mswTest';
import { screenshotStable } from '../utils/screenshot';

const existingEmail = process.env.E2E_TEST_EMAIL!;

test.describe('共通ヘッダー･フッターの認証状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ホームページでヘッダー全体の表示確認', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await screenshotStable(header, 'layout-header-auth.png');
  });

  test('ホームページで正しいタイトル（H1）が表示されている', async ({ page }) => {
    const h1Element = page.getByRole('heading', { level: 1 });
    await expect(h1Element).toBeVisible();
    await expect(h1Element).toHaveText('React ⚛️ + Vite ⚡ + shadcn/ui');
    await screenshotStable(h1Element, 'header-h1-title-auth.png');
  });

  test('ホームページのヘッダーにダッシュボードリンクが表示され、クリックするとダッシュボードへ遷移する', async ({
    page,
  }) => {
    await expect(page.getByRole('navigation').getByRole('link', { name: 'ダッシュボード' })).toBeVisible();
    await page.getByRole('navigation').getByRole('link', { name: 'ダッシュボード' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/ダッシュボード/);
    await expect(page).toHaveURL(/.*\/dashboard/);
  });

  test('ダッシュボードでヘッダー全体の表示確認', async ({ page }) => {
    await page.goto('/dashboard');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await screenshotStable(header, 'layout-header-dashboard-auth.png');
  });

  test('セッティングページでヘッダー全体の表示確認', async ({ page }) => {
    await page.goto('/auth/setting');
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await screenshotStable(header, 'layout-header-settings-auth.png');
  });

  test('フッターの表示確認', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await screenshotStable(footer, 'layout-footer-auth.png');
  });

  test('ヘッダーのアバターボタンの表示確認', async ({ page }) => {
    await page.goto('/dashboard');
    // AvatarFallbackの"avatar"テキストはbutton要素の子孫ではなく、Avatarコンポーネント内にあるため、Avatar自体を取得
    const avatar = page.getByRole('button', { name: /avatar/i });
    await expect(avatar).toBeVisible();
    // スクリーンショットも取得
    await screenshotStable(avatar, 'layout-header-avatar-button-auth.png');
  });

  test('ヘッダーのアバターボタンをクリックするとドロップダウンが表示される', async ({ page }) => {
    await page.goto('/dashboard');
    const avatar = page.getByRole('button', { name: /avatar/i });
    await expect(avatar).toBeVisible();
    // ボタンをクリック
    await avatar.click();
    // ドロップダウンの「Setting」リンクが表示されることを確認
    await expect(page.getByRole('link', { name: 'Setting' })).toBeVisible();
    // ドロップダウンのユーザー名またはメールアドレスも確認
    const label = page.getByText(new RegExp(`${existingEmail}|Test User`, 'i'));
    await expect(label).toBeVisible();
    // ドロップダウンの「ログアウト」ボタンが表示されることを確認
    await expect(page.getByRole('button', { name: 'ログアウト' })).toBeVisible();
  });

  test('ヘッダーのアバターボタンのドロップダウンからログアウトをクリックするとログインページへ遷移する', async ({ page }) => {
    await page.goto('/dashboard');
    const avatar = page.getByRole('button', { name: /avatar/i });
    await expect(avatar).toBeVisible();
    await avatar.click();
    // 「ログアウト」ボタンが表示されていることを確認
    const logoutButton = page.getByRole('button', { name: 'ログアウト' });
    await expect(logoutButton).toBeVisible();
    // ログアウトボタンをクリック
    await logoutButton.click();
    // ログインページへ遷移したことを確認
    await expect(page).toHaveURL(/\/login/);
    await expect(page).toHaveTitle(/Loginページ/i);
    // ログインページのheader内にアバターボタンが存在しないことを確認
    const avatarAfterLogout = page.getByRole('button', { name: /avatar/i });
    await expect(avatarAfterLogout).toHaveCount(0);
  });
});
