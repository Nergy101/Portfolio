import { test, expect } from '@playwright/test';

test.describe('Portfolio Performance & Accessibility', () => {
    test('should load within acceptable time limits', async ({ page }) => {
        const startTime = Date.now();
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        const loadTime = Date.now() - startTime;

        // Page should load within 5 seconds
        expect(loadTime).toBeLessThan(5000);

        // Verify page is fully loaded
        await expect(page.locator('app-header')).toBeVisible();
        await expect(page.locator('app-landing')).toBeVisible();
    });

    test('should have proper accessibility attributes', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check for proper heading structure
        const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
        expect(headings.length).toBeGreaterThan(0);

        // Check for alt text on images
        const images = await page.locator('img').all();
        for (const img of images) {
            const alt = await img.getAttribute('alt');
            expect(alt).toBeTruthy();
        }

        // Check for proper ARIA labels
        const interactiveElements = await page.locator('[role], [aria-label], [aria-labelledby]').all();
        expect(interactiveElements.length).toBeGreaterThan(0);
    });

    test('should handle JavaScript errors gracefully', async ({ page }) => {
        // Listen for console errors
        const errors: string[] = [];
        page.on('console', msg => {
            if (msg.type() === 'error') {
                errors.push(msg.text());
            }
        });

        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Wait for page to fully load
        await page.waitForLoadState('networkidle');

        // Check that there are no JavaScript errors
        expect(errors.length).toBe(0);
    });

    test('should have proper meta tags', async ({ page }) => {
        await page.goto('/');
        await page.waitForLoadState('networkidle');

        // Check for viewport meta tag
        const viewport = await page.locator('meta[name="viewport"]').count();
        expect(viewport).toBeGreaterThan(0);

        // Check for charset meta tag
        const charset = await page.locator('meta[charset]').count();
        expect(charset).toBeGreaterThan(0);
    });
}); 