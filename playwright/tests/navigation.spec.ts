import { test, expect } from '@playwright/test';

test.describe('Portfolio Navigation', () => {
    test('should be responsive on mobile devices', async ({ page }) => {
        // Set mobile viewport
        await page.setViewportSize({ width: 375, height: 667 });
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check that mobile navigation elements are present
        await expect(page.locator('app-header')).toBeVisible();

        // Verify content is still accessible
        await expect(page.locator('app-landing')).toBeVisible();
        await expect(page.locator('app-footer')).toBeVisible();
    });
}); 