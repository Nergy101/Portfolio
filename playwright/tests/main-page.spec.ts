import { test, expect } from '@playwright/test';

test.describe('Portfolio Main Page', () => {
    test('should load the main page and display header, landing, and footer', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check for header
        await expect(page.locator('app-header')).toBeVisible();
        // Check for landing section
        await expect(page.locator('app-landing')).toBeVisible();
        // Check for footer
        await expect(page.locator('app-footer')).toBeVisible();
    });

    test('should have a valid page title', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        await expect(page).toHaveTitle(/Nergy.space/i);
    });
}); 