# Task 10 — Performance Optimization & Core Web Vitals

## Executive Summary

This document outlines a comprehensive performance optimization strategy to achieve and maintain Lighthouse scores of 90+ and meet Core Web Vitals thresholds:
- **LCP (Largest Contentful Paint)**: < 2.5s (Good)
- **INP (Interaction to Next Paint)**: < 100ms (Good)
- **CLS (Cumulative Layout Shift)**: < 0.1 (Good)
- **FCP (First Contentful Paint)**: < 1.8s (Good)

---

## Current Status & Baseline

### Build Characteristics
- **Build tool**: Vite 5.4.21 (React 18)
- **Bundle size**: ~144 KB (gzipped ~40 KB) main chunk
- **Total modules**: 1,523
- **Last build**: 8.15s
- **CSS**: 84.89 KB (gzipped 12.20 KB, from Tailwind)
- **Vendor bundle**: 171.52 KB React + dependencies (gzipped 56.14 KB)

### Known Issues
1. **Large vendor bundle** (171 KB gzipped) — React + router + context providers
2. **Monolithic CSS** (84.89 KB gzipped) — Full Tailwind compiled
3. **No dynamic imports** for routes — all pages loaded upfront
4. **No resource hints** (preload/prefetch) — images load on demand
5. **No compression tuning** — default Vite config

### Expected Performance Impact
- Current LCP estimate: 2-3s (depending on network/device)
- Current FCP estimate: 1.5-2s
- Current CLS estimate: 0.05-0.15 (low risk, good practice)
- Current Lighthouse estimate: 70-80 (good foundation, can improve to 90+)

---

## Optimization Strategy (4 Phases)

### Phase 1: Low-Hanging Fruit (Days 1-2)
**Goal**: Quick wins with minimal code changes, target +10-15 Lighthouse points.

#### 1.1 Resource Hints & Critical Resources
**Files to update**: `index.html`, `src/App.tsx`

- Add `<link rel="preconnect">` for external APIs (GA, gtag, CDN)
- Add `<link rel="dns-prefetch">` for third-party domains
- Add `<link rel="preload">` for hero images and critical fonts

**Impact**: -0.3-0.5s on LCP

```html
<!-- In index.html <head> -->
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="dns-prefetch" href="https://www.google-analytics.com">
<link rel="preload" href="/assets/hero-image.jpg" as="image">
```

#### 1.2 Defer Non-Critical JavaScript
**Files to update**: `index.html`

- Move analytics script to defer or async
- Defer ad-related scripts
- Prioritize core app interactivity

**Impact**: -0.2-0.4s on FCP

#### 1.3 Critical CSS Extraction
**Files to update**: `src/index.css`, `tailwind.config.js`

- Extract critical (above-fold) CSS
- Inline critical CSS in `<head>`
- Defer non-critical styles

**Impact**: -0.2-0.3s on FCP

#### 1.4 Image Optimization Verification
**Files to check**: All hero/featured images

- Verify WebP format with JPEG fallback (already implemented in Task 7)
- Add `fetchpriority="high"` to hero images
- Add explicit width/height to prevent CLS

**Impact**: -0.3-0.5s on LCP, CLS improvement

### Phase 2: Code Splitting (Days 2-3)
**Goal**: Reduce initial bundle, improve LCP, target +15-20 Lighthouse points.

#### 2.1 Route-Level Code Splitting
**Files to update**: `src/App.tsx`

Currently, all route components are lazy-loaded with Suspense. Already implemented:
```tsx
const ArticlePage = lazy(() => import('./components/pages/ArticlePage'));
```

**Action**: Verify all heavy components are lazy-loaded, especially:
- AdminDashboard (36.86 KB)
- Homepage (17.44 KB)
- All comparison/hub pages

**Impact**: -0.2-0.3s on LCP (faster initial route parse)

#### 2.2 Component-Level Code Splitting
**Files to create**: Lazy-load expensive components

Examples:
- ConversionOptimization components (StickyCTA, FAB, ExitIntent) — not needed on all pages
- Admin components — only for authenticated users
- Chart/visualization components — only on dashboard

```tsx
// src/components/ConversionOptimization/index.tsx
export const StickyCTA = lazy(() => import('./StickyCTA'));
export const FloatingActionButton = lazy(() => import('./FloatingActionButton'));
export const ExitIntentPopup = lazy(() => import('./ExitIntentPopup'));
```

**Impact**: -0.1-0.2s on LCP

#### 2.3 Vendor Bundle Optimization
**Files to update**: `vite.config.ts`

- Split React vendor from other deps
- Separate Lucide icons into own chunk
- Configure chunk size thresholds

```ts
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        'icons': ['lucide-react'],
        'ui-libs': ['@supabase/supabase-js'],
      }
    }
  }
}
```

**Impact**: -0.1-0.2s on LCP (better caching, parallel downloads)

### Phase 3: Rendering Optimization (Days 3-4)
**Goal**: Optimize runtime performance, improve INP/CLS, target +10-15 Lighthouse points.

#### 3.1 React Performance Optimization
**Files to update**: Heavy components (Homepage, CategoryPage, ArticlePage)

- Use `useMemo()` for expensive computations
- Use `useCallback()` for event handlers
- Implement React.memo() for PureComponents
- Avoid inline object/function definitions

**Impact**: -0.1-0.3s on INP

#### 3.2 Layout Shift Prevention
**Files to update**: All components with dynamic content

- Add explicit width/height to images
- Use aspect-ratio CSS for responsive containers
- Reserve space for ads/dynamic content
- Test with CLS Chrome DevTools

```tsx
// Image with reserved space
<div className="aspect-video bg-gray-200">
  <img src="..." alt="..." width={400} height={300} className="w-full h-full" />
</div>
```

**Impact**: CLS improvement (maintain <0.1)

#### 3.3 Font Loading Optimization
**Files to check**: `index.html`, `src/index.css`

- Use `font-display: swap` (already in Tailwind)
- Preload critical fonts
- Minimize font variants

**Impact**: -0.1-0.2s on FCP

### Phase 4: Build & Deployment Config (Days 4-5)
**Goal**: Minimize delivered code size, improve caching, target +5-10 Lighthouse points.

#### 4.1 Compression & Minification
**Files to update**: `vite.config.ts`

- Enable gzip compression (8+ KB files)
- Enable Brotli compression (if server supports)
- Minify CSS/JS (Vite already does this by default)

```ts
// vite.config.ts - already optimized by Vite defaults
```

#### 4.2 Server Headers (Cloudflare Workers)
**Files to create/update**: `functions/_middleware.ts` or `wrangler.toml`

Configure cache headers:
```
Cache-Control: public, max-age=31536000  # 1 year for assets with hash
Cache-Control: public, max-age=3600      # 1 hour for HTML
Cache-Control: private, max-age=0        # No cache for dynamic content
```

#### 4.3 CDN Optimization
**Files to verify**: Image serving, static assets

- Verify Unsplash/Pexels CDN auto-optimization enabled
- Use Cloudflare Image Resizing for dynamic size variants
- Set up geo-distributed cache

#### 4.4 Service Worker (Optional)
**Files to create**: `public/service-worker.js`

- Cache API responses
- Serve stale content when offline
- Pre-cache critical routes

**Impact**: Negligible LCP but improved perceived performance

---

## Implementation Roadmap

| Phase | Timeline | Key Files | Expected LCP | Expected Lighthouse |
|-------|----------|-----------|--------------|---------------------|
| Baseline | — | — | 2.5-3s | 70-75 |
| Phase 1 (Resource Hints) | Day 1 | index.html, src/App.tsx | 2.0-2.3s | 78-82 |
| Phase 2 (Code Splitting) | Days 2-3 | vite.config.ts, src/** | 1.8-2.1s | 84-88 |
| Phase 3 (Rendering) | Days 3-4 | React components | 1.5-1.8s | 87-92 |
| Phase 4 (Build Config) | Days 4-5 | vite.config.ts, wrangler.toml | 1.3-1.5s | 90-96 |

---

## Files to Create/Modify

### New Files
1. `/src/lib/performanceMonitoring.ts` — Web Vitals tracking
2. `/src/utils/performanceMetrics.ts` — CLS, LCP, FCP measurement
3. `/public/service-worker.js` — Optional service worker
4. `/scripts/lighthouse-audit.js` — Automated Lighthouse testing

### Modified Files
1. `/src/App.tsx` — Lazy-load conversion optimization components
2. `/src/index.html` — Add resource hints, preload critical assets
3. `/vite.config.ts` — Code-splitting, minification tuning
4. `/tailwind.config.js` — CSS tree-shaking (PurgeCSS)
5. `/wrangler.toml` — Cache headers
6. Various component files — React optimization (useMemo, useCallback)

---

## Performance Metrics & Monitoring

### Core Web Vitals to Track
```typescript
// Web Vitals events (send to gtag)
web_vitals: {
  event_category: 'core_web_vitals',
  metric: 'LCP|FCP|CLS|INP',
  value: <milliseconds>,
  delta: <change_from_baseline>,
  rating: 'good|needs_improvement|poor',
}
```

### Lighthouse Scoring
- Performance: 90+
- Accessibility: 95+
- Best Practices: 90+
- SEO: 95+
- PWA: 85+ (optional)

### Real User Monitoring (RUM)
- Track page load times by route
- Monitor API response times
- Track third-party script impact
- Monitor Core Web Vitals percentile distribution

---

## Quick Wins Checklist

- [ ] Add preconnect/dns-prefetch for external APIs
- [ ] Defer analytics script to async
- [ ] Add fetchpriority="high" to hero images
- [ ] Verify all routes are lazy-loaded
- [ ] Add width/height to all <img> tags
- [ ] Use font-display: swap for custom fonts
- [ ] Run Lighthouse audit and document baseline
- [ ] Implement performanceMonitoring.ts
- [ ] Configure cache headers in wrangler.toml
- [ ] Set up automated Lighthouse CI/CD

---

## Testing & Validation

### Lighthouse Audit
```bash
npm run lighthouse  # Run audit (requires custom script)
```

### WebPageTest
- URL: https://www.webpagetest.org
- Test: Mobile (Moto G4), Desktop
- Location: US East Coast (closest to target audience)

### Chrome DevTools
- Performance tab: Record page load, analyze bottlenecks
- Coverage tab: Check unused CSS/JS
- Network tab: Verify compression, resource hints work
- Rendering tab: Monitor CLS, paint timing

### Synthetic Monitoring
- Monitor daily Lighthouse scores
- Track Core Web Vitals over time
- Alert on regressions > 5% change

---

## Success Criteria

✅ **LCP < 2.5s** (Good rating)  
✅ **FCP < 1.8s** (Good rating)  
✅ **INP < 100ms** (Good rating)  
✅ **CLS < 0.1** (Good rating)  
✅ **Lighthouse Performance ≥ 90**  
✅ **All critical pages audited and passing**  
✅ **Web Vitals dashboard showing 75th+ percentile metrics**

---

## Continuous Improvement

### Monthly Reviews
1. Analyze Core Web Vitals distribution (75th, 50th, 25th percentiles)
2. Compare against industry benchmarks (grooming/e-commerce)
3. Identify regressions or opportunities
4. Prioritize next optimizations

### Regression Prevention
- Add Lighthouse CI/CD checks (target: score > 85)
- Monitor bundle size on each build (alert on +10% growth)
- Track Core Web Vitals in production weekly

### Future Enhancements
- Implement edge caching (Cloudflare Cache Rules)
- Add HTTP/2 Server Push for critical resources
- Experiment with Astro SSR for faster FCP
- Implement prefetching for likely next routes
- Add Service Worker for offline capability

---

## Links & Resources

- [Web.dev Core Web Vitals Guide](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developers.google.com/web/tools/lighthouse)
- [Vite Performance Guide](https://vitejs.dev/guide/features.html)
- [React Performance Optimization](https://react.dev/reference/react/memo)
- [Cloudflare Performance](https://developers.cloudflare.com/performance/)

---

## Status
**Task 10 Start**: October 27, 2025  
**Current Phase**: Phase 1 (Quick Wins)  
**Next**: Implement resource hints and verify with Lighthouse audit

