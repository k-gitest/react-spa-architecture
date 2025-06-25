import { test as setup, expect } from '@playwright/test';

const authFile = './e2e/.auth/user.json';

const email = process.env.E2E_TEST_EMAIL!;
const password = process.env.E2E_TEST_PASSWORD!;

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('email').fill(email);
  await page.getByLabel('password').fill(password);
  await page.getByRole('button', { name: '送信' }).click();
  await page.waitForURL('/dashboard');
  await expect(page).toHaveURL('/dashboard');
  await page.context().storageState({ path: authFile });
});
