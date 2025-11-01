import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('SEO and Accessibility', () => {
  test('homepage should have proper SEO meta tags', async ({ page }) => {
    await page.goto('/');
    
    // Check title
    await expect(page).toHaveTitle(/SwankyBoyz/);
    
    // Check meta description
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /.+/);
    
    // Check Open Graph tags
    const ogTitle = page.locator('meta[property="og:title"]');
    const ogDescription = page.locator('meta[property="og:description"]');
    const ogImage = page.locator('meta[property="og:image"]');
    
    await expect(ogTitle).toHaveAttribute('content', /.+/);
    await expect(ogDescription).toHaveAttribute('content', /.+/);
    await expect(ogImage).toHaveAttribute('content', /.+/);
    
    // Check canonical URL
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute('href', /swankyboyz\.com/);
  });

  test('article pages should have structured data', async ({ page }) => {
    await page.goto('/article/ultimate-guide-wireless-earbuds-2025');
    
    // Check for JSON-LD structured data
    const structuredData = page.locator('script[type="application/ld+json"]');
    await expect(structuredData).toHaveCount(2); // Organization + Article
    
    // Verify article structured data contains required fields
    const articleData = await structuredData.nth(1).textContent();
    const parsed = JSON.parse(articleData || '{}');
    
    expect(parsed['@type']).toBe('Article');
    expect(parsed.headline).toBeTruthy();
    expect(parsed.author).toBeTruthy();
    expect(parsed.datePublished).toBeTruthy();
  });

  test('should pass accessibility audit', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    
    // Check H1 exists and is unique
    const h1Elements = page.locator('h1');
    await expect(h1Elements).toHaveCount(1);
    
    // Check heading hierarchy (H1 -> H2 -> H3, no skipping)
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
    
    let previousLevel = 0;
    for (const heading of headings) {
      const tagName = await heading.evaluate(el => el.tagName.toLowerCase());
      const currentLevel = parseInt(tagName.charAt(1));
      
      // Should not skip heading levels
      expect(currentLevel - previousLevel).toBeLessThanOrEqual(1);
      previousLevel = currentLevel;
    }
  });

  test('images should have alt text', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      
      // All images should have alt text (can be empty for decorative images)
      expect(alt).not.toBeNull();
    }
  });

  test('should have proper color contrast', async ({ page }) => {
    await page.goto('/');
    
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();
    
    const contrastViolations = accessibilityScanResults.violations.filter(
      violation => violation.id === 'color-contrast'
    );
    
    expect(contrastViolations).toHaveLength(0);
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/');
    
    // Test tab navigation
    await page.keyboard.press('Tab');
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
    
    // Test that focus is visible
    const focusedEl = page.locator(':focus');
    await expect(focusedEl).toBeVisible();
  });
});

test.describe('Performance', () => {
  test('should load quickly', async ({ page }) => {
    const startTime = Date.now();
    await page.goto('/');
    const loadTime = Date.now() - startTime;
    
    // Should load within 3 seconds
    expect(loadTime).toBeLessThan(3000);
  });

  test('should have optimized images', async ({ page }) => {
    await page.goto('/');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const src = await img.getAttribute('src');
      
      if (src) {
        // Check if images are using modern formats or optimization services
        const isOptimized = src.includes('webp') || 
                           src.includes('pexels.com') || 
                           src.includes('auto=compress');
        
        expect(isOptimized).toBeTruthy();
      }
    }
  });
});