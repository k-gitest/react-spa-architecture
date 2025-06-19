import { test, expect, Locator } from '@playwright/test';

test.describe('ホームページの未認証状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ホームページのtitleを確認する', async ({ page }) => {
    await expect(page).toHaveTitle(/トップページ: React ⚛️ \+ Vite ⚡ \+ shadcn\/ui/, { timeout: 5000 });
  });

  test('ホームページに正しいタイトル（H1）が表示されている', async ({ page }) => {
    const h1Element = page.getByRole('heading', { level: 1 });
    await expect(h1Element).toBeVisible();
    await expect(h1Element).toHaveText('React ⚛️ + Vite ⚡ + shadcn/ui');
    // H1の見た目をスクリーンショットVRTで確認
    await expect(h1Element).toHaveScreenshot('header-h1-title.png');
  });

  test('ホームページに正しいタイトル（H2）が表示されている', async ({ page }) => {
    const h2Element = page.getByRole('heading', { level: 2 });
    await expect(h2Element).toBeVisible();
    await expect(h2Element).toHaveText('MEMO APP');
  });

  test('ナビゲーションリンクのテスト（未認証状態）', async ({ page }) => {
    // Sessionがない状態を想定しているので、ログイン・新規登録リンクが表示されていることを確認
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'Fetch' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: 'ログイン' })).toBeVisible();
    await expect(page.getByRole('navigation').getByRole('link', { name: '新規登録' })).toBeVisible();

    // ダッシュボードリンクはDOMに表示されていないことを確認
    await expect(page.getByRole('navigation').getByRole('link', { name: 'ダッシュボード' })).not.toBeAttached();
  });

  test('ナビゲーションAboutボタンクリックでAboutページへの遷移', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'About' }).click();
    await expect(page).toHaveTitle(/About/);
    await expect(page).toHaveURL(/.*\/about/);
  });

  test('ナビゲーションFetchボタンクリックでFetchページへの遷移', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Fetch' }).click();
    await expect(page).toHaveTitle(/Fetch/);
    await expect(page).toHaveURL(/.*\/fetch/);
  });

  test('ナビゲーション新規登録ボタンクリックで新規登録ページへの遷移', async ({ page }) => {
    // navigation 内のリンクをクリックするようにセレクターを絞り込み
    await page.getByRole('navigation').getByRole('link', { name: '新規登録' }).click();
    await expect(page).toHaveTitle(/新規登録/);
    await expect(page).toHaveURL(/.*\/register/);
  });

  test('ナビゲーションログインボタンクリックでログインページへの遷移', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'ログイン' }).click();
    await expect(page).toHaveTitle(/Loginページ/);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('content-homeコンポーネントにある新規登録ボタンを押して新規登録ページに遷移しtitleを確認する', async ({
    page,
  }) => {
    await page.getByTestId('register-button-content-home').click();
    await expect(page).toHaveTitle(/新規登録ページ/);
  });

  test('content-homeコンポーネントにあるログインボタンを押してログインページに遷移しtitleを確認する', async ({
    page,
  }) => {
    await page.getByTestId('login-button-content-home').click();
    await expect(page).toHaveTitle(/Loginページ/);
  });

  test('VariantToggle のテスト', async ({ page }) => {
    const variantToggleButton = page.getByTestId('variant-toggle');
    const variantTextSpan = variantToggleButton.locator('span');

    await expect(variantToggleButton).toBeVisible();
    await expect(variantTextSpan).toBeVisible();

    // 可能なバリアント名のリストと期待される順序
    const possibleVariants = ['標準', 'TanStack', 'tRPC'];

    for (let i = 0; i < possibleVariants.length; i++) {
      const currentText = await variantTextSpan.textContent();
      expect(possibleVariants).toContain(currentText); // 現在のテキストがリストにあることを確認

      const currentIndex = possibleVariants.indexOf(currentText!);
      const nextExpectedText = possibleVariants[(currentIndex + 1) % possibleVariants.length];

      await variantToggleButton.click();
      await expect(variantTextSpan).toHaveText(nextExpectedText);
    }
  });

  test('テーマトグルのテスト', async ({ page }) => {
    // テーマトグルボタンが表示されていることを確認
    const modeToggleButton = page.getByTestId('theme-mode-toggle');
    await expect(modeToggleButton).toBeVisible();

    let currentIcon: Locator;

    // 初期状態のアイコンを確認
    currentIcon = modeToggleButton.locator('.lucide-sun');
    await expect(currentIcon).toBeVisible();
    await expect(page).toHaveScreenshot('theme-light-mode.png');

    await modeToggleButton.click();
    currentIcon = modeToggleButton.locator('.lucide-moon');
    await expect(currentIcon).toBeVisible();
    await expect(page).toHaveScreenshot('theme-dark-mode.png');

    await modeToggleButton.click();
    currentIcon = modeToggleButton.locator('.lucide-laptop');
    await expect(currentIcon).toBeVisible();
    await expect(page).toHaveScreenshot('theme-system-mode.png');

    // トグルがループして最初に戻る事を確認
    await modeToggleButton.click();
    currentIcon = modeToggleButton.locator('.lucide-sun');
    await expect(currentIcon).toBeVisible();
    await expect(page).toHaveScreenshot('theme-light-mode.png');
  });

});
