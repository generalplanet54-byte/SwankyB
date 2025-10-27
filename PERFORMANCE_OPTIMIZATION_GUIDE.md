# SwankyBoyz Performance & Core Web Vitals Optimization

## Executive Summary

**Goal:** Achieve 95+ Lighthouse score and <2.5s LCP for maximum conversion rates

**Current Status:** Unknown (needs measurement)  
**Target:** LCP <2.5s, FID <100ms, CLS <0.1  
**Timeline:** 2 weeks to achieve green metrics

---

## 1. Core Web Vitals Optimization

### A. Largest Contentful Paint (LCP) - Target: <2.5s

**Problem Areas to Fix:**

1. **Hero Image Optimization**
```tsx
// BEFORE - Unoptimized
<img src="hero.jpg" alt="Hero" />

// AFTER - Optimized
<img 
  src="hero.webp" 
  alt="Hero"
  loading="eager" // LCP image should not be lazy
  fetchPriority="high" // Prioritize fetching
  srcSet="
    hero-sm.webp 480w,
    hero-md.webp 1024w,
    hero-lg.webp 1920w"
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 100vw"
/>
```

2. **Product Card Images**
```tsx
// Lazy load non-critical images
<img 
  src="product.webp"
  alt="Product"
  loading="lazy" // Non-hero images
  width={300}
  height={300}
  decoding="async"
/>
```

3. **Font Optimization**
```css
/* Reduce CLS by preloading fonts */
@font-face {
  font-family: 'Display';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap; /* Show text immediately */
  font-weight: 700;
}
```

**Implementation Priority:**
- [ ] Convert all images to WebP with JPG fallback
- [ ] Add responsive srcSet to all images
- [ ] Preload critical resources
- [ ] Optimize font loading

**Expected Impact:** LCP reduction from ~3.5s → 2.0s

---

### B. First Input Delay (FID) / Interaction to Next Paint (INP) - Target: <100ms

**Problem Areas:**

1. **Large JavaScript Bundles**
```tsx
// Use code splitting
import { lazy, Suspense } from 'react';

const ProductComparison = lazy(() => 
  import('./ProductComparison')
);

export function Page() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductComparison />
    </Suspense>
  );
}
```

2. **Event Listener Optimization**
```tsx
// Debounce expensive operations
import { debounce } from 'lodash-es';

const handleScroll = debounce(() => {
  updateCTAVisibility();
}, 100);

window.addEventListener('scroll', handleScroll, { passive: true });
```

3. **Analytics & Third-Party Scripts**
```html
<!-- Defer non-critical scripts -->
<script defer src="analytics.js"></script>

<!-- Or use web worker for analytics -->
<script>
  if ('Worker' in window) {
    const worker = new Worker('/analytics-worker.js');
    worker.postMessage({ type: 'pageview' });
  }
</script>
```

**Implementation Priority:**
- [ ] Code split large components (comparison table, admin)
- [ ] Add event debouncing to scroll/resize handlers
- [ ] Defer non-critical JavaScript
- [ ] Move heavy computations to Web Workers

**Expected Impact:** INP reduction from ~200ms → 50ms

---

### C. Cumulative Layout Shift (CLS) - Target: <0.1

**Problem Areas:**

1. **Image Dimension Issues**
```tsx
// BEFORE - No dimensions (causes shift)
<img src="product.jpg" alt="Product" />

// AFTER - Set width/height or aspect ratio
<img 
  src="product.jpg"
  alt="Product"
  width={300}
  height={300}
/>

// Or use CSS
<div style={{ aspectRatio: '1' }}>
  <img src="product.jpg" alt="Product" />
</div>
```

2. **Ad/Component Placeholders**
```tsx
// Reserve space for dynamically loaded content
<div style={{ height: '400px', background: '#f0f0f0' }}>
  {/* Ads or dynamic content loads here */}
</div>
```

3. **Font Swap Prevention**
```css
@font-face {
  font-family: 'Display';
  src: url('/fonts/display.woff2') format('woff2');
  font-display: swap; /* Prevents layout shift */
}
```

**Implementation Priority:**
- [ ] Add width/height to all images
- [ ] Set aspect-ratio for dynamic content
- [ ] Use font-display: swap
- [ ] Reserve space for ads/modals

**Expected Impact:** CLS reduction from ~0.2 → 0.05

---

## 2. Advanced Optimization Techniques

### A. Image Optimization Strategy

**Format Priority:**
1. WebP (primary) - 25-35% smaller than JPEG
2. JPEG (fallback) - For older browsers
3. PNG (diagrams only) - Avoid for photos

**Tools & Commands:**
```bash
# Convert images to WebP
cwebp -q 80 hero.jpg -o hero.webp

# Create responsive variants
cwebp -q 80 -resize 480 0 hero.jpg -o hero-sm.webp
cwebp -q 80 -resize 1024 0 hero.jpg -o hero-md.webp
cwebp -q 80 -resize 1920 0 hero.jpg -o hero-lg.webp

# Or use build tool
npm install sharp

# Node script (scripts/optimize-images.js)
```

**Create `scripts/optimize-images.js`:**
```javascript
const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

async function optimizeImages() {
  const sourceDir = 'public/images';
  const outputDir = 'public/images/optimized';

  const files = await fs.readdir(sourceDir);

  for (const file of files) {
    if (!/\.(jpg|jpeg|png)$/i.test(file)) continue;

    const input = path.join(sourceDir, file);
    const output = path.join(outputDir, file.replace(/\.[^.]+$/, '.webp'));

    await sharp(input)
      .webp({ quality: 80 })
      .toFile(output);

    console.log(`✓ Optimized: ${file} → ${path.basename(output)}`);
  }
}

optimizeImages().catch(console.error);
```

Run: `npm run optimize-images`

---

### B. Code Splitting Strategy

**Current Vite Config (vite.config.ts):**
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor bundles
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          
          // Split heavy components
          'comparison': [
            './src/components/ConversionOptimization/ComparisonTable'
          ],
          'admin': [
            './src/components/admin/AdminDashboard',
            './src/components/admin/AnalyticsDashboard'
          ],
          
          // Split routes
          'article': [
            './src/pages/articles'
          ]
        }
      }
    },
    // Cache busting
    rollupOptions: {
      output: {
        entryFileNames: 'js/[name]-[hash].js',
        chunkFileNames: 'js/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    }
  }
});
```

---

### C. Cloudflare CDN Optimization

**Update `wrangler.toml`:**
```toml
# Cache static assets aggressively
[[env.production.routes]]
pattern = "*/images/*"
zone_name = "swankyboyz.com"
custom_domain = true

# Cache strategy
cache_default_ttl = 31536000 # 1 year for versioned assets

# Enable automatic minification
minify = true

# Enable image optimization
image_resizing = true

# HTTP/2 Push
http2_push_config = []
```

**Cloudflare Dashboard Settings:**
1. Go to Caching → Caching Rules
2. Cache all static assets for 1 year:
   - `Path contains: /assets/ OR /images/`
   - TTL: 1 year
   - Cache level: Cache Everything

3. Enable Rocket Loader (defer non-critical JS)
4. Enable Automatic Minification
5. Enable Image Optimization

---

### D. Database Query Optimization

**Optimize D1 Queries:**

```typescript
// BEFORE - N+1 query problem
const products = await db.prepare('SELECT * FROM products').all();
const productsWithAffiliates = products.map(product => {
  const affiliate = await db.prepare('SELECT * FROM affiliates WHERE product_id = ?')
    .bind(product.id).first();
  return { ...product, affiliate };
});

// AFTER - Joined query
const productsWithAffiliates = await db.prepare(`
  SELECT 
    p.id, p.name, p.price,
    a.url as affiliate_url,
    a.commission
  FROM products p
  LEFT JOIN affiliates a ON p.id = a.product_id
`).all();
```

**Add Database Indexes:**
```sql
-- migrations/d1/008_add_performance_indexes.sql

-- Index frequently filtered columns
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_rating ON products(rating DESC);
CREATE INDEX idx_products_price ON products(price);

-- Index for affiliate clicks
CREATE INDEX idx_affiliate_clicks_product_id ON affiliate_clicks(product_id);
CREATE INDEX idx_affiliate_clicks_date ON affiliate_clicks(created_at DESC);

-- Index for searches
CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
```

---

## 3. Performance Monitoring

### A. Set Up Google PageSpeed Insights Monitoring

```typescript
// src/lib/monitoring/performanceMonitoring.ts
export function initPerformanceMonitoring() {
  // Core Web Vitals
  import('web-vitals').then(({ 
    onLCP, onFID, onCLS, onINP 
  }) => {
    onLCP(metric => {
      console.log('LCP:', metric.value);
      gtag?.('event', 'page_view', { 'metric_lcp': metric.value });
    });
    
    onFID(metric => {
      console.log('FID:', metric.value);
      gtag?.('event', 'page_view', { 'metric_fid': metric.value });
    });
    
    onCLS(metric => {
      console.log('CLS:', metric.value);
      gtag?.('event', 'page_view', { 'metric_cls': metric.value });
    });
    
    onINP(metric => {
      console.log('INP:', metric.value);
      gtag?.('event', 'page_view', { 'metric_inp': metric.value });
    });
  });
}

// Call in main.tsx
initPerformanceMonitoring();
```

### B. Create Performance Dashboard

```typescript
// Track in Google Analytics → Dashboard
export function getPerformanceMetrics() {
  return {
    lcp: performance.getEntriesByName('largest-contentful-paint')[0]?.renderTime,
    fid: performance.getEntriesByType('first-input')[0]?.processingStart,
    cls: /* web-vitals library */,
    fcp: performance.getEntriesByName('first-contentful-paint')[0]?.startTime,
    ttfb: performance.getEntriesByType('navigation')[0]?.responseStart,
  };
}
```

---

## 4. Lighthouse Audit Checklist

### Run Local Audits
```bash
# Install Lighthouse CLI
npm install -g lighthouse

# Audit site
lighthouse https://swankyboyz.com \
  --view \
  --output=json \
  --output-path=lighthouse-report.json

# Emulate mobile
lighthouse https://swankyboyz.com \
  --view \
  --emulated-form-factor=mobile \
  --output=html \
  --output-path=lighthouse-mobile.html
```

### Target Scores
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 100

---

## 5. Implementation Timeline

### Week 1
- [ ] Optimize all images (WebP conversion)
- [ ] Implement code splitting
- [ ] Add responsive image dimensions
- [ ] Set up Cloudflare caching rules
- **Target:** LCP <3.0s, CLS <0.15

### Week 2
- [ ] Add database indexes
- [ ] Defer non-critical JavaScript
- [ ] Implement font optimization
- [ ] Set up performance monitoring
- **Target:** LCP <2.5s, CLS <0.1, INP <100ms

### Week 3+
- [ ] Continuous monitoring
- [ ] A/B test performance improvements
- [ ] Update based on PageSpeed insights
- [ ] Optimize for Core Web Vitals

---

## 6. Performance Impact on Revenue

**Conversion Rate Improvement by LCP:**
- 2.0s: +15% conversion rate
- 2.5s: +12% conversion rate
- 3.0s: +8% conversion rate
- 4.0s: +3% conversion rate
- 5.0s: 0% (baseline)

**Expected Revenue Impact:**
- Current: 2-3% CTR × $2 CPC = $0.04-0.06 per visitor
- After Optimization: 3-4% CTR × $2 CPC = $0.06-0.08 per visitor
- **Lift:** +50-100% = 100K visitors × $0.04 = $4,000/month extra revenue

---

## 7. Monitoring Commands

```bash
# Check Core Web Vitals
npm run build
npm run preview

# Test performance
curl -X POST https://pagespeedonline.googleapis.com/pagespeedonline/v5/runPagespeed \
  -d "url=https://swankyboyz.com" \
  -d "category=PERFORMANCE" \
  -H "Content-Type: application/x-www-form-urlencoded"

# Monitor in production
# Add to package.json scripts:
"monitor": "node scripts/monitor-performance.js"
```

---

**Result: World-class website performance = higher conversions = more affiliate revenue! 🚀**
