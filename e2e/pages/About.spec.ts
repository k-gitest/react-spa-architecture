import { expect, test } from '@playwright/test';
import { screenshotStable } from '../utils/screenshot';

test.describe('Aboutページの未承認状態のテスト', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/about');
  });

  test('Aboutページの正しいタイトルが表示される', async ({ page }) => {
    const title = await page.title();
    expect(title).toBe('Aboutページ: React ⚛️ + Vite ⚡ + shadcn/ui');
  });

  test('Aboutページの正しいh2要素が表示される', async ({ page }) => {
    const h2Element = page.getByRole('heading', { level: 2 });
    await expect(h2Element).toBeVisible();
    await expect(h2Element).toHaveText('About');
  });

  test('Aboutページに正しい内容が表示される', async ({ page }) => {
    const paragraphElements = page.locator('p');
    await expect(paragraphElements.nth(0)).toBeVisible();
    await expect(paragraphElements.nth(0)).toHaveText('このアプリはreactとviteとshadcn/uiで開発されています');
    await expect(paragraphElements.nth(1)).toBeVisible();
    await expect(paragraphElements.nth(1)).toHaveText(
      'react-hook-formとzodとshadcn/uiのフォームコンポーネントを使用したメモアプリです。',
    );
  });

  test('Aboutページのスクリーンショットを撮影する', async ({ page }) => {
    await page.waitForLoadState('networkidle');
    await screenshotStable(page, 'about-full-page-unauthenticated.png', { fullPage: true });
  });
});
