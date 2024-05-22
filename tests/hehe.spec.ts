import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
  await page.locator('[data-test="username"]').click();
  await page.locator('[data-test="username"]').fill("standard_user");
  await page.locator('[data-test="password"]').click();
  await page.locator('[data-test="password"]').fill("secret_sauce");
  await page.locator('[data-test="login-button"]').click();
  await expect(page.locator('[data-test="title"]')).toContainText("Products");
  await page.waitForTimeout(3000);
});

test("Add to cart & checkout", async ({ page }) => {
   await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
   await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toContainText('Remove');
   await expect(page.locator('[data-test="shopping-cart-badge"]')).toContainText('1');
   await page.locator('[data-test="shopping-cart-link"]').click();
   await page.locator('[data-test="checkout"]').click();
   await page.locator('[data-test="firstName"]').click();
   await page.locator('[data-test="firstName"]').fill('a');
   await page.locator('[data-test="firstName"]').press('Tab');
   await page.locator('[data-test="lastName"]').fill('b');
   await page.locator('[data-test="postalCode"]').click();
   await page.locator('[data-test="postalCode"]').fill('2222');
   await page.locator('[data-test="continue"]').click();
   await expect(page.locator('[data-test="inventory-item-name"]')).toContainText('Sauce Labs Backpack');
   await page.locator('[data-test="finish"]').click();
   await expect(page.locator('[data-test="complete-header"]')).toContainText('Thank you for your order!');
   await page.locator('[data-test="back-to-products"]').click();
});
