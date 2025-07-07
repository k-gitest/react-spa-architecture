import { expect, test } from '../mswTest';
import { screenshotStable } from '../utils/screenshot';
import { profileUpdateHandlers } from '../../src/mocks/handlers';
import {
  getLatestMailtrapMail,
  getLatestMailSlurpMailForOldEmail,
  getLatestMailSlurpMailForNewEmail,
} from '../utils/verify-email';

const E2E_TEST_EMAIL = process.env.E2E_TEST_EMAIL! || '';
const E2E_TEST_NEW_EMAIL = process.env.E2E_TEST_NEW_EMAIL! || '';
const E2E_TEST_PASSWORD = process.env.E2E_TEST_PASSWORD! || '';
const E2E_TEST_NEW_PASSWORD = process.env.E2E_TEST_NEW_PASSWORD! || '';

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

    // アカウント部分のメールアドレスを非表示にする
    await page.evaluate(() => {
      const emailEl = Array.from(document.querySelectorAll('p, span, div')).find((el) => el.textContent?.includes('@'));
      if (emailEl) emailEl.textContent = '***@***.com';
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

    // 画像アップロード後、img要素のsrcが変わることを確認
    await page.waitForLoadState('networkidle');
    await expect(avatarImg).toHaveAttribute('src', /avatar/);

    // 名前の入力フィールドに値を入力
    const nameInput = page.getByLabel('ユーザー名');
    // 既存の値を確認
    await expect(nameInput).toHaveValue('Test User');
    // 新しい値を入力
    await nameInput.fill('テストユーザー');
    // 更新ボタンをクリック
    await page.getByRole('button', { name: '更新' }).click();
    // 更新後の名前の値を確認
    await expect(nameInput).toHaveValue('テストユーザー');
  });

  test('メールアドレスの変更', async ({ page }) => {
    await page.getByRole('button', { name: 'アカウント' }).click();
    await page.getByRole('button', { name: 'メールアドレス変更' }).click();
    await page.getByLabel('email').fill(E2E_TEST_NEW_EMAIL);
    await page.getByRole('button', { name: '送信' }).click();
    // 送信時にauth/v1/user putが保留されているので時間がかかる
    // ここで待たないと認証されずエラーとなる
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);

    // mailtrapでメール取得
    //const messageText = await getLatestMailtrapMail();
    //console.log('メール内容:', messageText);

    // mailslurpでメール取得
    const messageTextSlurp = await getLatestMailSlurpMailForOldEmail();
    console.log('メール内容:', messageTextSlurp);
    const fixedUrl = messageTextSlurp.replace(/&amp;/g, '&');
    console.log('修正後のURL:', fixedUrl);
    await page.goto(fixedUrl);
    await page.waitForLoadState('networkidle');

    await page.goto('/auth/setting');
    const avatar = page.getByRole('button', { name: 'アカウント' });
    await avatar.click();
    await expect(page.getByText(E2E_TEST_NEW_EMAIL)).toBeVisible();
  });

  test('変更したアドレスを元のアドレスに戻す', async ({ page }) => {
    // タイムアウトrate limitsのカスタム
    test.setTimeout(120000);
    // supabaseメール送信rate limitsで60秒待機
    await page.waitForTimeout(60000);

    await page.getByRole('button', { name: 'アカウント' }).click();
    await page.getByRole('button', { name: 'メールアドレス変更' }).click();
    await page.getByLabel('email').fill(E2E_TEST_EMAIL);
    await page.getByRole('button', { name: '送信' }).click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);

    // mailslurpでメール取得
    const messageTextSlurp = await getLatestMailSlurpMailForNewEmail();
    const fixedUrl = messageTextSlurp.replace(/&amp;/g, '&');
    await page.goto(fixedUrl);
    await page.waitForLoadState('networkidle');

    await page.goto('/auth/setting');
    await page.getByRole('button', { name: 'アカウント' }).click();
    await expect(page.getByText(E2E_TEST_EMAIL)).toBeVisible();
  });

  test('パスワードの変更', async ({ page }) => {
    await page.getByRole('button', { name: 'アカウント' }).click();
    await page.getByRole('button', { name: 'パスワード変更' }).click();
    await page.getByLabel('email').fill(E2E_TEST_EMAIL);
    await page.getByRole('button', { name: '送信' }).click();
    // 送信時にauth/v1/user putが保留されているので時間がかかる
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);

    // mailslurpでメール取得
    const messageTextSlurp = await getLatestMailSlurpMailForOldEmail();
    const fixedUrl = messageTextSlurp.replace(/&amp;/g, '&');
    await page.goto(fixedUrl);
    await page.waitForLoadState('networkidle');

    await page.goto('/auth/setting');
    await page.getByRole('button', { name: 'アカウント' }).click();
    // タイムアウトrate limitsのカスタム
    test.setTimeout(120000);
    // supabaseメール送信rate limitsで60秒待機
    await page.waitForTimeout(60000);

    await page.getByRole('button', { name: '新しいパスワードへ変更' }).click();
    await page.getByLabel('password').fill(E2E_TEST_NEW_PASSWORD);
    await page.getByRole('button', { name: '送信' }).click();
    // 送信時にauth/v1/user putが保留されているので時間がかかる
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);

    const avatar = page.getByRole('button', { name: /avatar/i });
    await avatar.click();
    const logoutButton = page.getByRole('button', { name: 'ログアウト' });
    await logoutButton.click();
    // ログインページへ遷移したことを確認
    await expect(page).toHaveURL(/\/login/);

    // ログインページで新しいパスワードでログイン
    await page.getByLabel('email').fill(E2E_TEST_EMAIL);
    await page.getByLabel('password').fill(E2E_TEST_NEW_PASSWORD);
    await page.getByRole('button', { name: '送信' }).click();

    // 登録成功後のリダイレクトを検証
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('新しいパスワードを元に戻す', async ({ page }) => {
    await page.getByRole('button', { name: 'アカウント' }).click();
    await page.getByRole('button', { name: 'パスワード変更' }).click();
    await page.getByLabel('email').fill(E2E_TEST_EMAIL);
    await page.getByRole('button', { name: '送信' }).click();
    // 送信時にauth/v1/user putが保留されているので時間がかかる
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);

    // mailslurpでメール取得
    const messageTextSlurp = await getLatestMailSlurpMailForOldEmail();
    const fixedUrl = messageTextSlurp.replace(/&amp;/g, '&');
    await page.goto(fixedUrl);
    await page.waitForLoadState('networkidle');

    await page.goto('/auth/setting');
    await page.getByRole('button', { name: 'アカウント' }).click();
    // タイムアウトrate limitsのカスタム
    test.setTimeout(120000);
    // supabaseメール送信rate limitsで60秒待機
    await page.waitForTimeout(60000);

    await page.getByRole('button', { name: '新しいパスワードへ変更' }).click();
    await page.getByLabel('password').fill(E2E_TEST_PASSWORD);
    await page.getByRole('button', { name: '送信' }).click();
    // 送信時にauth/v1/user putが保留されているので時間がかかる
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(10000);

    const avatar = page.getByRole('button', { name: /avatar/i });
    await avatar.click();
    const logoutButton = page.getByRole('button', { name: 'ログアウト' });
    await logoutButton.click();
    // ログインページへ遷移したことを確認
    await expect(page).toHaveURL(/\/login/);

    // ログインページで新しいパスワードでログイン
    await page.getByLabel('email').fill(E2E_TEST_EMAIL);
    await page.getByLabel('password').fill(E2E_TEST_PASSWORD);
    await page.getByRole('button', { name: '送信' }).click();

    // 登録成功後のリダイレクトを検証
    await page.waitForURL('/dashboard');
    await expect(page).toHaveURL('/dashboard');
  });

  test('アカウント削除', async ({ page }) => {
    await page.getByRole('button', { name: 'アカウント' }).click();
  });
});
