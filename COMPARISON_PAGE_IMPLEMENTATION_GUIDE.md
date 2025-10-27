# Comparison Page Implementation Guide

## Overview

This guide shows you how to build high-converting comparison pages using the `ComparisonTable` component. The sample page (`electric-shavers.tsx`) demonstrates the complete pattern.

## Why Comparison Pages?

**Conversion Impact:**
- 35-50% higher conversion rates than standard product pages
- Visitors comparing products are closer to purchase decision
- Reduces decision paralysis with clear scoring
- Builds trust through transparency and third-party validation

**SEO Benefits:**
- Long-tail keyword opportunity ("best X vs Y")
- High engagement signals (users spend 2-3 min per session)
- Lower bounce rate (comparison shoppers stay longer)
- Internal linking hub for site authority distribution

## File Structure

```
src/pages/comparisons/
├── electric-shavers.tsx          # Example: Premium Electric Shavers
├── orthopedic-shoes.tsx          # Example: Orthopedic Shoes for Heel Pain
├── best-beard-trimmers.tsx       # Example: Beard Trimming Clippers
├── luxury-cologne.tsx             # Example: High-End Fragrances
└── performance-sunscreen.tsx      # Example: Men's Performance Sunscreen
```

Each file follows the same structure with customized:
- Product data
- Feature comparison matrix
- Buying guide sections
- FAQ content

## Component Usage

### Basic Setup

```tsx
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';

// Define products to compare
const products: ComparisonProduct[] = [
  {
    id: 'unique-id-1',
    name: 'Product Name',
    image: 'https://...',
    price: '$299.99',
    rating: 4.8,
    affiliateUrl: 'https://amzn.to/...',
    recommended: true,  // Optional: highlights this product
    features: {
      'feature1': 'value1',
      'feature2': true,
      'feature3': 'value3'
    }
  }
];

// Define comparison features
const features: ComparisonFeature[] = [
  {
    key: 'feature1',
    label: 'Display Label',
    description: 'Helpful explanation for users',
    type: 'text',        // 'text', 'boolean', or 'number'
    weight: 1.5          // Optional: importance multiplier (1-2x)
  }
];

// Render the component
<ComparisonTable
  products={products}
  features={features}
  title="Your Comparison Title"
  description="Optional description text"
  allowSorting={true}  // Enable column sorting
/>
```

## Data Structure Details

### ComparisonProduct

```typescript
interface ComparisonProduct {
  id: string;                    // Unique identifier for tracking
  name: string;                  // Display name
  image: string;                 // URL to product image
  price: string;                 // Display as "$299.99" or "Starting at $49"
  rating: number;                // 0-5 star rating
  affiliateUrl: string;          // Amazon/affiliate link
  recommended?: boolean;         // Highlights with ribbon (typically your pick)
  features: Record<string, unknown>; // Feature values matching ComparisonFeature keys
}
```

### ComparisonFeature

```typescript
interface ComparisonFeature {
  key: string;                   // Matches product.features key
  label: string;                 // Column header
  description: string;           // Tooltip on hover
  type: 'text' | 'boolean' | 'number';
  weight?: number;               // 1-2x multiplier for scoring (default: 1)
}
```

## Best Practices

### 1. Product Selection (3-5 products)

**Too Few (1-2):** Not a real comparison
**Optimal (3-4):** Sweet spot for decision-making
**Too Many (6+):** Overwhelms users, splits attention

**Strategy:**
- Include your top recommendation (recommended: true)
- Include 1-2 alternatives to that tier
- Include 1 budget option
- Avoid including obviously poor products

**Example:**
```
1. Premium ($300+) - Your pick
2. Excellent mid-range ($150-200)
3. Best budget ($80-120)
```

### 2. Feature Selection (7-10 features)

**Rule:** Only include features that differ meaningfully between products

**Bad:** Including color options (likely same across all)
**Good:** Motor power (varies 10,000-15,000 CPM)

**Structure:**
- Put most important features first (higher weight)
- Group related features together (battery, warranty, durability)
- Include both specs AND usage benefits

**Weighting Example:**
```
- Battery Life: weight 1.5x  (Critical for daily use)
- Motor Power: weight 1.5x   (Directly impacts shave quality)
- Waterproof: weight 1.3x    (Important convenience)
- Warranty: weight 1.1x      (Nice to have)
- Color: weight 0 (don't include if identical)
```

### 3. Feature Values (Consistent Formatting)

**Numbers:**
```tsx
// Good - with units
'batteryLife': '50 minutes',
'motorPower': '13,000 CPM'

// Avoid - ambiguous
'batteryLife': 50,
'motorPower': '13k'
```

**Booleans:**
```tsx
// Good
'waterproof': true,
'cleaningStation': false

// Component auto-renders: ✓ / ✗
```

**Text:**
```tsx
// Good - consistent format
'bestFor': 'Dense beards',
'priceCategory': 'Premium',
'shavingType': 'Foil',

// Avoid - inconsistent
'bestFor': 'For people with dense beards',
'priceCategory': 'high-end',
'shavingType': 'FOIL'
```

### 4. Content Structure

Every comparison page should have:

**1. Header Section (150-200 words)**
```tsx
<div className="space-y-4">
  <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">
    Section Label
  </p>
  <h1 className="font-display text-5xl leading-tight text-off-white">
    Main Title: Your Category vs Features
  </h1>
  <p className="text-lg text-off-white/70 max-w-2xl">
    Brief explanation of what visitors will learn, why they should care,
    and how many products are compared (e.g., "50+ tested").
  </p>
</div>
```

**2. How We Test (100-150 words)**
```tsx
<section className="space-y-4">
  <h2 className="font-display text-2xl text-off-white font-bold">
    How We Test
  </h2>
  <p className="text-off-white/80">
    Explain your evaluation methodology.
  </p>
  <ul className="list-disc list-inside space-y-2">
    <li><strong>Category:</strong> Explanation</li>
    {/* 4-6 criteria */}
  </ul>
</section>
```

**3. Comparison Table**
```tsx
<ComparisonTable
  products={products}
  features={features}
  title="Your Comparison"
  allowSorting={true}
/>
```

**4. Buying Guide (3 sections, 50-100 words each)**
```tsx
<section className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div>
    <h3 className="font-bold text-champagne">Best Overall: [Product]</h3>
    <p className="text-sm text-off-white/80">[Why choose this]</p>
    <p className="text-xs text-champagne">Cost per use: $X</p>
  </div>
  {/* Repeat for Best Value, Best for [Category] */}
</section>
```

**5. FAQ Section (3-5 questions)**
```tsx
<details className="group bg-charcoal/50 rounded-lg p-6">
  <summary className="cursor-pointer font-bold text-champagne">
    <span>Question users ask?</span>
    <span className="group-open:rotate-180">▼</span>
  </summary>
  <p className="mt-4 text-off-white/80 text-sm">
    Answer with actionable advice.
  </p>
</details>
```

**6. Final CTA Section**
```tsx
<section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl p-12">
  <h2 className="font-display text-3xl text-off-white font-bold">
    Ready to Choose?
  </h2>
  <p className="text-lg text-off-white/80">
    Encourage decision-making. Add affiliate disclosure.
  </p>
</section>
```

## Creating New Comparison Pages

### Step 1: Identify the Topic
- High-intent keywords: "[Category] vs [Category]", "best [category]", "compare [category]"
- Low competition, high affiliate value
- Example: "Best Electric Shavers", "Orthopedic Shoes for Heel Pain"

### Step 2: Gather Product Data
```tsx
// Research 15-20 products
// Narrow to 3-5 for comparison
// Collect:
// - Name, image, price
// - Affiliate link (Amazon, Best Buy, etc.)
// - 3-star average rating
// - Key specifications for comparison
// - Unique selling points
```

### Step 3: Define Comparison Features
```tsx
// 7-10 features that:
// 1. Vary significantly between products
// 2. Matter to target buyer
// 3. Can be objectively measured
// 4. Are consistently available for all products
```

### Step 4: Write Content
- How We Test section (establish credibility)
- Key Features Explained (educate buyers)
- Quick Buying Guide (3 recommendations)
- FAQ (address objections)

### Step 5: Create the Component
Use the `electric-shavers.tsx` file as a template. Copy it and:
1. Replace product data
2. Replace features array
3. Update copy/titles
4. Test rendering

### Step 6: Add Page Routes

In Astro/Vite routing, comparison pages are automatically routed by file location:
- `/src/pages/comparisons/electric-shavers.tsx` → `/comparisons/electric-shavers`
- `/src/pages/comparisons/orthopedic-shoes.tsx` → `/comparisons/orthopedic-shoes`

### Step 7: Add Internal Linking

Link from:
- Product category pages
- Blog articles on related topics
- Main product listing
- Site navigation (if high-volume category)

## Conversion Optimization Strategies

### CTA Placement
The component automatically includes affiliate CTAs:
- **Primary CTA:** "View on Amazon" button in top section
- **Secondary CTA:** In product cards within table
- **Tertiary CTA:** Final recommendation section

Avoid adding MORE CTAs - the component is optimized.

### Social Proof Elements

Add these sections to increase conversion:

**Ratings & Reviews:**
```tsx
<div className="flex items-center space-x-4">
  <div className="text-lg font-bold text-champagne">4.8★</div>
  <p className="text-sm text-off-white/80">2,347 verified reviews</p>
</div>
```

**Buyer Testimonial:**
```tsx
<blockquote className="border-l-2 border-champagne pl-4">
  <p className="text-off-white/80">
    "This comparison saved me hours of research. 
    Bought the #1 pick and couldn't be happier."
  </p>
  <footer className="text-sm text-champagne mt-2">
    — John D., verified buyer
  </footer>
</blockquote>
```

### Speed Optimization

Comparison pages are heavy (multiple product images). Optimize:

```tsx
// Use WebP with JPEG fallback
<picture>
  <source srcSet="image.webp" type="image/webp" />
  <img src="image.jpg" alt="Product name" loading="lazy" />
</picture>

// Lazy load table on demand
import dynamic from 'next/dynamic';
const ComparisonTable = dynamic(() => 
  import('@/components/ConversionOptimization').then(m => m.ComparisonTable),
  { loading: () => <div>Loading comparison...</div> }
);
```

## SEO Best Practices

### Schema Markup

Every comparison page should include:

```tsx
import { SchemaMarkup } from '@/lib/seo/schemaMarkup';

const schemaData = {
  "@context": "https://schema.org",
  "@type": "ComparisonChart",
  "name": "Premium Electric Shavers Comparison",
  "url": "https://swankyboyz.com/comparisons/electric-shavers",
  "description": "...",
  "itemsCompared": products.map(p => ({
    "@type": "Product",
    "name": p.name,
    "price": p.price,
    "ratingValue": p.rating,
    "image": p.image,
    "url": p.affiliateUrl
  }))
};

// Add to page
<SchemaMarkup data={schemaData} />
```

### Meta Data

```tsx
export const metadata = {
  title: "Best Electric Shavers Comparison 2025 | SwankyBoyz",
  description: "Compare 50+ electric shavers. Side-by-side specs, ratings, and expert recommendations. Find your perfect premium shaver.",
  keywords: "electric shaver comparison, best foil shavers, rotary shavers, braun vs philips",
  openGraph: {
    title: "Best Electric Shavers Head-to-Head",
    description: "Expert comparison of premium electric shavers",
    image: "https://...product-image.jpg",
    url: "https://swankyboyz.com/comparisons/electric-shavers"
  }
};
```

### Internal Linking Strategy

Every comparison page should link to:
- **5-10 related blog articles** (related keywords)
- **3-5 product detail pages** (for featured products)
- **1-2 category landing pages** (for navigation)

Example in content:

```tsx
<p>
  For more details on beard maintenance, see our{' '}
  <a href="/articles/best-beard-oil-2025" className="text-champagne hover:underline">
    comprehensive beard oil guide
  </a>
  {' '}or check out our{' '}
  <a href="/products/beard-oils" className="text-champagne hover:underline">
    full beard oil collection
  </a>.
</p>
```

## Tracking & Analytics

### Goal: Affiliate Click-Through Rate

Add tracking to your affiliate links:

```tsx
const handleAffiliateClick = (productName: string) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'affiliate_click', {
      product_name: productName,
      page: 'comparison_page',
      timestamp: new Date().toISOString()
    });
  }
};

<a 
  href={product.affiliateUrl}
  onClick={() => handleAffiliateClick(product.name)}
  className="...button..."
>
  View on Amazon
</a>
```

### Key Metrics to Track

1. **Page Views** - How many visit comparisons
2. **Avg Time on Page** - Should be 2-4 minutes
3. **Affiliate Clicks** - Clicks to Amazon/affiliate
4. **Conversion Rate** - Clicks ÷ Views
5. **Return Visitors** - People coming back

Target benchmarks:
- CTR: 8-15% of visitors click affiliate link
- Avg time: 2-3 minutes
- Bounce rate: <40%

## Monetization Strategy

### Primary Revenue (Amazon Associates)
- 4-6% commission on click-through
- ~3% conversion rate Amazon-side
- Example: 1,000 visitors → 100 clicks → 3 sales × $300 avg → $45 revenue

### Secondary Revenue (Affiliate Networks)
- Direct partnerships with brands (10-20% commission)
- Influencer networks (CPA or % revenue share)
- Sponsored comparisons (direct payments)

### Email List Building
- Gate detailed comparison PDFs behind email signup
- Collect 5-10% of comparison visitors
- Email to list: "New comparison: [Product Category]"

## Roadmap for First 30 Days

**Week 1:**
- [ ] Create 2 comparison pages (electric shavers ✓, orthopedic shoes)
- [ ] Add internal linking from 5 blog posts
- [ ] Implement affiliate tracking on links
- [ ] Monitor traffic and CTR

**Week 2:**
- [ ] Create 2 more comparison pages (beard trimmers, colognes)
- [ ] Optimize loading speed (<3 second LCP)
- [ ] Add schema markup to all 4 pages
- [ ] Test mobile experience

**Week 3:**
- [ ] Create final comparison page (sunscreen)
- [ ] Add social proof elements to top 3 pages
- [ ] Set up email capture for PDF versions
- [ ] Run A/B test on CTA text

**Week 4:**
- [ ] Analyze traffic and conversion data
- [ ] Optimize underperforming pages
- [ ] Create "Master Comparison" landing page
- [ ] Plan next batch of 5 pages

## Common Mistakes to Avoid

❌ **Too many features** (15+)
→ Users get overwhelmed, average rating loses meaning

❌ **Inconsistent data formats**
→ "50 min" vs "50" vs "approximately an hour" confuse the scoring

❌ **Missing affiliate links**
→ Great comparison but no conversion opportunity

❌ **Comparing incompatible products**
→ "Best Razors vs Electric Shavers" - different categories

❌ **Weak "How We Test" section**
→ No credibility established

❌ **Biased towards one product**
→ Recommended=true should be your actual pick, not financially motivated

❌ **Outdated prices**
→ Prices update monthly - keep current

## Next Steps

1. **Customize the electric-shavers.tsx file** to your actual product data
2. **Create 4 more comparison pages** using the template
3. **Link from product category pages** and related articles
4. **Monitor performance** in Google Analytics
5. **Optimize** the top 3 by CTR and conversion rate

---

**File Reference:**
- Template: `/workspaces/SwankyB/src/pages/comparisons/electric-shavers.tsx`
- Component: `/workspaces/SwankyB/src/components/ConversionOptimization/ComparisonTable.tsx`
- Schema utilities: `/workspaces/SwankyB/src/lib/seo/schemaMarkup.ts`
