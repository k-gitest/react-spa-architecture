import { test, expect } from '../mswTest';
import { memoEmptyHandlers, memoCreateHandlers } from '../../src/mocks/handlers';

test.describe('ダッシュボードページのテスト', () => {
  test('ダッシュボードページのtitleタグの内容を確認する', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveTitle(/ダッシュボード/);
  });

  test('メモ一覧タブが表示されていること', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('tab', { name: 'メモ一覧' })).toBeVisible();
  });

  test('「メモ追加」タブをクリックするとフォームが表示されること', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('tab', { name: 'メモ追加' }).click();
    await expect(page.getByLabel('タイトル')).toBeVisible();
    await expect(page.getByLabel('内容')).toBeVisible();
  });

  test('メモが1件もない場合「メモはまだありません」と表示されること', async ({ page, worker }) => {
    await worker.use(...memoEmptyHandlers);
    await page.goto('/dashboard');
    await page.waitForLoadState('networkidle');
    await expect(page.getByText('メモはまだありません')).toBeVisible();
  });

  test('カテゴリ設定・タグ設定タブが表示されていること', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page.getByRole('tab', { name: 'カテゴリ設定' })).toBeVisible();
    await expect(page.getByRole('tab', { name: 'タグ設定' })).toBeVisible();
  });

  test('「メモ追加」タブでメモを新規作成できること', async ({ page, worker }) => {
    await worker.use(...memoCreateHandlers);
    await page.goto('/dashboard');
    await page.getByRole('tab', { name: 'メモ追加' }).click();
    await page.getByLabel('タイトル').fill('テストメモ');
    await page.getByLabel('カテゴリー').click();
    // 2. 表示されたオプションの中から 'テストカテゴリー' をクリックして選択
    await page.getByRole('option', { name: 'テストカテゴリー' }).click();
    await page.getByLabel('メモの内容').fill('これはテスト用のメモです');
    await page.getByRole('radio', { name: '小' }).click();
    await page.getByRole('checkbox', { name: 'テストタグ' }).check();

    // ファイル選択inputに画像をセット
    const filePath = './e2e/assets/test-avatar.png';
    const fileInput = page.locator('input[type="file"]');
    await fileInput.setInputFiles(filePath);

    await page.getByRole('button', { name: '送信' }).click();
    // 保存後に「メモ一覧」タブに戻る想定
    await expect(page.getByRole('tab', { name: 'メモ一覧' })).toBeVisible();
  });

  test('「カテゴリ設定」タブでカテゴリ追加フォームが表示されること', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('tab', { name: 'カテゴリ設定' }).click();
    await page.getByRole('button', { name: 'カテゴリー追加' }).click();
    // ダイアログ内のフォーム要素が表示されることを確認
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByLabel('カテゴリ')).toBeVisible();
    await expect(page.getByRole('button', { name: '送信' })).toBeVisible();
  });

  test('「タグ設定」タブでタグ追加フォームが表示されること', async ({ page }) => {
    await page.goto('/dashboard');
    await page.getByRole('tab', { name: 'タグ設定' }).click();
    await page.getByRole('button', { name: 'タグ追加' }).click();
    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByLabel('タグ')).toBeVisible();
    await expect(page.getByRole('button', { name: '送信' })).toBeVisible();
  });
});
