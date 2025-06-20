import { expect, Locator, Page, type PageScreenshotOptions } from '@playwright/test';

export const stableScreenshot = (
  locatorOrPage: Locator | Page,
  name: string,
  opts: Partial<PageScreenshotOptions> = {},
) =>
  expect(locatorOrPage).toHaveScreenshot(name, {
    animations: 'disabled',
    scale: 'css',
    ...opts,
  });
