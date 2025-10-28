# QUICK FIXES CHECKLIST

## Issue 1: Article Links Not Working ✗

**Root Cause**: Route mismatch (singular vs plural)
- App.tsx uses: `/article/:articleSlug`
- Links use: `/articles/:articleSlug`

**FIX (Choose ONE - Recommended: Option A)**

### Option A: Change Router (1 file, 1 line)
File: `src/App.tsx` line 74

```tsx
// BEFORE:
<Route path="/article/:articleSlug" element={<ArticlePage />} />

// AFTER:
<Route path="/articles/:articleSlug" element={<ArticlePage />} />
```

### Option B: Change All Links (6+ files, 11+ locations)
- `src/components/common/ArticleCard.tsx` - 2 links
- `src/components/sections/FeaturedArticles.tsx` - 4 links  
- `src/components/pages/ArticlesListPage.tsx` - 2 links
- `src/components/pages/ArticlePage.tsx` - 3 schema references
- `src/components/admin/ArticleManager.tsx` - 1 link

---

## Issue 2: Comparison Links Not Working ✗

**Root Cause**: Pages exist but aren't routed

**Files to Add Routes For:**
- `src/pages/comparisons/wireless-earbuds.tsx`
- `src/pages/comparisons/electric-shavers.tsx`
- `src/pages/comparisons/grooming-kits.tsx`
- `src/pages/comparisons/skincare-products.tsx`

**FIX: Update `src/App.tsx`**

Add imports (after line 23):
```tsx
const WirelessEarbudsComparison = lazy(() => import('../pages/comparisons/wireless-earbuds'));
const ElectricShaversComparison = lazy(() => import('../pages/comparisons/electric-shavers'));
const GroomingKitsComparison = lazy(() => import('../pages/comparisons/grooming-kits'));
const SkinCareComparison = lazy(() => import('../pages/comparisons/skincare-products'));
```

Add routes (in the `<Routes>` section, before closing tag):
```tsx
<Route path="/comparisons/wireless-earbuds" element={<WirelessEarbudsComparison />} />
<Route path="/comparisons/electric-shavers" element={<ElectricShaversComparison />} />
<Route path="/comparisons/grooming-kits" element={<GroomingKitsComparison />} />
<Route path="/comparisons/skincare-products" element={<SkinCareComparison />} />
```

---

## Issue 3: Grooming Guide PDF Corrupt ✗

**Root Cause**: PDF file doesn't exist

**Check What Exists:**
- ✗ No `/public/guides/` directory
- ✗ No `.pdf` files anywhere in project
- ✓ Reference page: `/src/pages/guides/ultimate-mens-grooming.tsx` (exists but not routed)

**FIX (Choose ONE):**

### Option A: Remove the Broken Reference (Quick)
File: `src/App.tsx` lines 50-54

Remove the `ExitIntentPopup` component or remove `pdfUrl` prop:
```tsx
// REMOVE THIS (currently broken):
<ExitIntentPopup
  title="Wait! Get Our Free Buying Guide"
  description="Expert recommendations for premium grooming products + exclusive discount codes"
  ctaText="Download Free PDF"
  pdfUrl="/guides/ultimate-grooming-guide.pdf"
/>

// OR change to:
<ExitIntentPopup
  title="Wait! Get Our Free Buying Guide"
  description="Expert recommendations for premium grooming products + exclusive discount codes"
  ctaText="Open Guide"
  onCTA={() => window.location.href = '/guides'}  // Route to guide page instead
/>
```

### Option B: Create the PDF (Longer)
1. Create `/public/guides/` directory
2. Generate or provide `ultimate-grooming-guide.pdf`
3. Update ExitIntentPopup to point to correct location

---

## Issue 4: Pictures Not Displaying ✓ (Already Fixed)

**Status**: Image error handlers already implemented in commit f0cc631

**What's In Place:**
- ✓ Placeholder file: `/public/assets/product-placeholder.png`
- ✓ Error handlers added to 6 components
- ✓ Fallback script: `/public/assets/swanky-fixes.js`

**If Still Broken, Debug With:**
```javascript
// Check in browser console:
1. Are Unsplash URLs responding? 
   → Open DevTools Network tab, filter for *.unsplash.com
   
2. Is placeholder accessible?
   → Go to https://swankyboyz.com/assets/product-placeholder.png
   
3. Is swanky-fixes.js loaded?
   → Network tab, search for swanky-fixes.js

4. Are handlers firing?
   → Add console.log to onError handler:
      onError={(e) => {
        console.log('Image failed:', e.target.src);
        (e.target as HTMLImageElement).src = '/assets/product-placeholder.png';
      }}
```

---

## DEPLOYMENT STEPS

### After Making Fixes:

```bash
# 1. Build
npm run build

# 2. Test locally
npm run preview

# 3. Test each fix:
# - Click article links (check page loads)
# - Click comparison links (check page loads)
# - Check PDF download or guide page
# - Verify fallback images show if external fails

# 4. Commit
git add -A
git commit -m "Fix routing issues: articles, comparisons, PDF"

# 5. Push
git push origin main
```

---

## DETAILED LOCATIONS FOR Expert Implementation

### File: `src/App.tsx`

**Line 74 - Article Route (SINGULAR):**
```tsx
<Route path="/article/:articleSlug" element={<ArticlePage />} />
```
💡 Change `/article/` → `/articles/` OR update all links

**Line 50-54 - Missing PDF Reference:**
```tsx
<ExitIntentPopup
  ...
  pdfUrl="/guides/ultimate-grooming-guide.pdf"
/>
```
⚠️ Remove, comment out, or provide PDF file

**Missing - No Comparison Routes:**
- No imports for comparison pages
- No route definitions for `/comparisons/*`
- Need to add 4 lazy imports + 4 routes

---

## Test Links After Fixing

| Link | Should Go To |
|------|-------------|
| /articles/premium-skincare-luxury-beauty-products-review | Article page about skincare |
| /articles/best-electric-razors-precision-shaving | Article page about razors |
| /comparisons/electric-shavers | Shavers comparison table |
| /comparisons/grooming-kits | Kits comparison table |
| /comparisons/skincare-products | Skincare comparison table |
| /comparisons/wireless-earbuds | Earbuds comparison table |

---

*Generated: October 28, 2025*
*All root causes identified - Ready for implementation*
