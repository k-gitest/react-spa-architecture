import { expect, test } from '../mswTest';
import { screenshotStable } from '../utils/screenshot';

test.describe('セッティングページの認証状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/auth/setting');
  });

  test('セッティングページの表示確認', async ({ page }) => {
    // タイトルが正しいこと
    await expect(page).toHaveTitle(/Settingページ: React ⚛️ \+ Vite ⚡ \+ shadcn\/ui/);

    // プロフィールボタンとアカウントボタンが表示されていること
    await expect(page.getByRole('button', { name: 'プロフィール' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'アカウント' })).toBeVisible();

    // デフォルトでプロフィールコンポーネントが表示されていること（h2見出しやラベルなど）
    await expect(page.getByRole('heading', { name: /プロフィール設定/i })).toBeVisible();

    // プロフィール部分スクリーンショット
    await screenshotStable(page, 'setting-profile-full-page-auth.png', { fullPage: true });

    // アカウントボタンをクリックするとアカウントコンポーネントが表示されること
    await page.getByRole('button', { name: 'アカウント' }).click();
    await expect(page.getByRole('heading', { name: /アカウント設定/i })).toBeVisible();

    // 動的な最終ログインの要素を非表示にする
    await page.evaluate(() => {
      const el = Array.from(document.querySelectorAll('p')).find((p) => p.textContent?.includes('最終ログイン'));
      if (el) el.style.visibility = 'hidden';
    });

    // アカウント部分スクリーンショット
    await screenshotStable(page, 'setting-account-full-page-auth.png', { fullPage: true });
  });
});
