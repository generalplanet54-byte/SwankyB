import { test, expect } from '@playwright/test';

test.describe('Affiliate Links', () => {
  test('should have affiliate disclosure on product pages', async ({ page }) => {
    await page.goto('/article/ultimate-guide-wireless-earbuds-2025');
    
    // Check for affiliate disclosure
    const disclosure = page.locator('text*=affiliate');
    await expect(disclosure).toBeVisible();
    
    // Should mention commission
    const commission = page.locator('text*=commission');
    await expect(commission).toBeVisible();
  });

  test('affiliate links should have proper attributes', async ({ page }) => {
    await page.goto('/article/ultimate-guide-wireless-earbuds-2025');
    
    // Find Amazon affiliate links
    const affiliateLinks = page.locator('a[href*="amazon.com"][href*="tag="]');
    const linkCount = await affiliateLinks.count();
    
    expect(linkCount).toBeGreaterThan(0);
    
    for (let i = 0; i < linkCount; i++) {
      const link = affiliateLinks.nth(i);
      
      // Should have proper rel attributes
      const rel = await link.getAttribute('rel');
      expect(rel).toContain('nofollow');
      expect(rel).toContain('sponsored');
      
      // Should open in new tab
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
      
      // Should have affiliate tag
      const href = await link.getAttribute('href');
      expect(href).toContain('tag=swankyboyz-20');
    }
  });

  test('should track affiliate clicks', async ({ page }) => {
    await page.goto('/article/ultimate-guide-wireless-earbuds-2025');
    
    // Mock console to capture tracking events
    const consoleLogs: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'log') {
        consoleLogs.push(msg.text());
      }
    });
    
    // Click an affiliate link
    const affiliateLink = page.locator('a[href*="amazon.com"][href*="tag="]').first();
    await affiliateLink.click();
    
    // Should log tracking event
    expect(consoleLogs.some(log => log.includes('Tracking affiliate click'))).toBeTruthy();
  });

  test('product cards should display correctly', async ({ page }) => {
    await page.goto('/');
    
    const productCards = page.locator('[data-testid="product-card"]');
    const cardCount = await productCards.count();
    
    if (cardCount > 0) {
      const firstCard = productCards.first();
      
      // Should have product image
      await expect(firstCard.locator('img')).toBeVisible();
      
      // Should have product title
      await expect(firstCard.locator('h3')).toBeVisible();
      
      // Should have price
      await expect(firstCard.locator('text*=$')).toBeVisible();
      
      // Should have affiliate link button
      await expect(firstCard.locator('button, a')).toBeVisible();
    }
  });

  test('should handle broken affiliate links gracefully', async ({ page }) => {
    await page.goto('/article/ultimate-guide-wireless-earbuds-2025');
    
    // Check that all affiliate links are valid URLs
    const affiliateLinks = page.locator('a[href*="amazon.com"]');
    const linkCount = await affiliateLinks.count();
    
    for (let i = 0; i < linkCount; i++) {
      const link = affiliateLinks.nth(i);
      const href = await link.getAttribute('href');
      
      if (href) {
        // Should be a valid URL
        expect(() => new URL(href)).not.toThrow();
        
        // Should have required parameters
        const url = new URL(href);
        expect(url.searchParams.get('tag')).toBeTruthy();
      }
    }
  });

  test('should display FTC compliance notice', async ({ page }) => {
    await page.goto('/');
    
    // Check footer for FTC compliance
    const footer = page.locator('footer');
    const ftcNotice = footer.locator('text*=affiliate');
    
    await expect(ftcNotice).toBeVisible();
  });
});

test.describe('Product Integration', () => {
  test('should load product data correctly', async ({ page }) => {
    await page.goto('/category/tech-gadgets');
    
    // Should show products in category
    const products = page.locator('[data-testid="product-card"]');
    await expect(products).toHaveCount(3); // Based on our test data
  });

  test('should handle product price updates', async ({ page }) => {
    await page.goto('/');
    
    // Check that prices are displayed
    const prices = page.locator('text*=$');
    const priceCount = await prices.count();
    
    expect(priceCount).toBeGreaterThan(0);
    
    // Prices should be in valid format
    for (let i = 0; i < Math.min(priceCount, 5); i++) {
      const priceText = await prices.nth(i).textContent();
      expect(priceText).toMatch(/\$[\d,]+\.?\d*/);
    }
  });

  test('should show product ratings', async ({ page }) => {
    await page.goto('/');
    
    const ratingElements = page.locator('[data-testid="product-rating"]');
    const ratingCount = await ratingElements.count();
    
    if (ratingCount > 0) {
      // Should show star ratings
      const stars = page.locator('svg[data-testid="star"]');
      await expect(stars.first()).toBeVisible();
    }
  });
});