import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.csm-testcenter.org/test?do=show&subdo=common&test=file_upload');
  await page.locator('tbody').filter({ hasText: 'File to upload Enable re-download (requires cookies) Start HTTPS upload' }).getByRole('textbox').click();
  await page.locator('tbody').filter({ hasText: 'File to upload Enable re-download (requires cookies) Start HTTPS upload' }).getByRole('textbox').setInputFiles('fixtures/TransactionController.php');
  await page.getByRole('button', { name: 'Start HTTPS upload' }).click();
});
