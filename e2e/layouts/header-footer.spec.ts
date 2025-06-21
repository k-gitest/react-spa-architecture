import { test, expect } from '@playwright/test';
import { screenshotStable } from '../utils/screenshot';

test.describe('共通ヘッダー･フッターの未認証状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ヘッダー全体の表示確認', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();
    await screenshotStable(header, 'layout-header-unauth.png');
  });

  test('正しいタイトル（H1）が表示されている', async ({ page }) => {
    const h1Element = page.getByRole('heading', { level: 1 });
    await expect(h1Element).toBeVisible();
    await expect(h1Element).toHaveText('React ⚛️ + Vite ⚡ + shadcn/ui');
    await screenshotStable(h1Element, 'header-h1-title.png');
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
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/About/);
    await expect(page).toHaveURL(/.*\/about/);
  });

  test('ナビゲーションFetchボタンクリックでFetchページへの遷移', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'Fetch' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Fetch/);
    await expect(page).toHaveURL(/.*\/fetch/);
  });

  test('ナビゲーション新規登録ボタンクリックで新規登録ページへの遷移', async ({ page }) => {
    // navigation 内のリンクをクリックするようにセレクターを絞り込み
    await page.getByRole('navigation').getByRole('link', { name: '新規登録' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/新規登録/);
    await expect(page).toHaveURL(/.*\/register/);
  });

  test('ナビゲーションログインボタンクリックでログインページへの遷移', async ({ page }) => {
    await page.getByRole('navigation').getByRole('link', { name: 'ログイン' }).click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Loginページ/);
    await expect(page).toHaveURL(/.*\/login/);
  });

  test('VariantToggle のテスト', async ({ page }) => {
    const variantToggleButton = page.getByTestId('variant-toggle');
    const variantTextSpan = variantToggleButton.locator('span');

    await expect(variantToggleButton).toBeVisible();
    await expect(variantTextSpan).toBeVisible();

    // 可能なバリアント名のリストと期待される順序
    const possibleVariants = ['標準', 'TanStack', 'tRPC'];

    // 最初の初期状態確認ステップを明示
    await test.step('初期状態の表示を確認する', async () => {
      const initialText = await variantTextSpan.textContent();
      expect(possibleVariants).toContain(initialText);
      await expect(variantTextSpan).toHaveText(initialText!);
    });

    // 残りは循環的にテスト（初期状態の確認はスキップしてクリックから）
    for (let i = 0; i < possibleVariants.length - 1; i++) {
      const currentText = await variantTextSpan.textContent(); // 現在のテキストがリストにあることを確認
      const currentIndex = possibleVariants.indexOf(currentText!);
      // modulo演算を使用して次のインデックスを計算、lengthでループする
      const nextExpected = possibleVariants[(currentIndex + 1) % possibleVariants.length];

      await test.step(`"${currentText}" から "${nextExpected}" へ切り替える`, async () => {
        await variantToggleButton.click();
        await expect(variantTextSpan).toHaveText(nextExpected);
      });
    }
  });

  test('テーマトグルのテスト', async ({ page }) => {
    // テーマトグルボタンが表示されていることを確認
    const toggle = page.getByTestId('theme-mode-toggle');
    await expect(toggle).toBeVisible();

    // 初期状態のアイコンを確認
    await test.step('ライトモードを確認', async () => {
      const sunIcon = toggle.locator('.lucide-sun');
      await expect(sunIcon).toBeVisible();
      await screenshotStable(page, 'theme-light-mode.png');
    });

    await test.step('クリックしてダークモードを確認', async () => {
      await toggle.click();
      const moonIcon = toggle.locator('.lucide-moon');
      await expect(moonIcon).toBeVisible();
      await screenshotStable(page, 'theme-dark-mode.png');
    });

    await test.step('クリックしてシステムモードを確認', async () => {
      await toggle.click();
      const laptopIcon = toggle.locator('.lucide-laptop');
      await expect(laptopIcon).toBeVisible();
      await screenshotStable(page, 'theme-system-mode.png');
    });

    // トグルがループして最初に戻る事を確認
    await test.step('クリックして最初のライトモードアイコンに戻る事を確認', async () => {
      await toggle.click();
      const sunIcon = toggle.locator('.lucide-sun');
      await expect(sunIcon).toBeVisible();
      await screenshotStable(page, 'theme-light-mode.png');
    });
  });

  test('フッターの表示確認', async ({ page }) => {
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
    await screenshotStable(footer, 'layout-footer-unauth.png');
  });

  test('ナビゲーションのVRT', async ({ page }) => {
    const nav = page.locator('nav');
    await expect(nav).toBeVisible();
    await screenshotStable(nav, 'layout-nav-unauth.png');
  });
});
