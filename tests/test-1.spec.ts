import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.csm-testcenter.org/test?do=show&subdo=common&test=file_upload');
});
