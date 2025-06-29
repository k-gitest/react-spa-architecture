import { expect, test } from '../mswTest';
import { screenshotStable } from '../utils/screenshot';
import { profileUpdateHandlers } from '../../src/mocks/handlers';

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

  test('プロフィールの更新', async ({ page, worker }) => {
    // avatarの画像が表示されていることを確認
    const avatarImg = page.locator('img[alt="avatar"]');
    const avatarFallback = page.getByText('avatar');
    // どちらかが表示されていればOK
    await expect(avatarImg.or(avatarFallback)).toBeVisible();

    // avatar画像の更新
    // テスト用画像ファイルのパス（プロジェクト内に test-avatar.png などを用意しておく）
    const filePath = './e2e/assets/test-avatar.png';

    // ファイル選択inputに画像をセット
    const fileInput = page.locator('input[type="file"]#avatar');
    await fileInput.setInputFiles(filePath);

    // 画像アップロード後のアバター更新確認のためハンドラーを変更
    worker.use(...profileUpdateHandlers);

    // 画像アップロード後、img要素のsrcが変わることを確認（アップロード処理が非同期の場合はwaitが必要）
    await page.waitForLoadState('networkidle');
    await expect(avatarImg).toHaveAttribute('src', /avatar/);

    // 名前の入力フィールドに値を入力
    const nameInput = page.getByLabel('ユーザー名');
    // 既存の値を確認
    await expect(nameInput).toHaveValue('Test User');
    // 新しい値を入力
    await nameInput.fill('テストユーザー');
    // 更新ボタンをクリック
    await page.getByRole('button', {name: '更新'}).click();
    // 更新後の名前の値を確認
    await expect(nameInput).toHaveValue('テストユーザー');
  });
});
