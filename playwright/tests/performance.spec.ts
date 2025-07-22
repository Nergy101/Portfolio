import { test, expect } from '@playwright/test';

test.describe('Portfolio Performance & Accessibility', () => {
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