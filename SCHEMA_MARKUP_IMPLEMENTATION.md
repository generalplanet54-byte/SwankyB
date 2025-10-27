# Schema Markup Implementation Guide

## Overview

Schema markup (structured data) tells search engines what your content is about. This guide shows you how to add schema to every page on SwankyBoyz for maximum SEO impact.

**SEO Impact:**
- 15-25% increase in click-through rate from search results
- Rich snippets (stars, pricing, availability) in SERPs
- Better ranking for featured snippets
- Voice search optimization

---

## 1. Organization Schema (Site-Wide, One-Time)

Add to your layout/root component (loads on every page).

### Location
`src/layouts/Layout.astro` or main app wrapper

### Implementation

```tsx
import { organizationSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

export default function RootLayout() {
  return (
    <>
      {/* Add this once in the document head */}
      <SchemaMarkup schema={organizationSchema()} />
      
      {/* Rest of layout */}
    </>
  );
}
```

### What It Does
- Tells Google who you are
- Creates knowledge panel eligibility
- Links to social media profiles
- Improves brand visibility

---

## 2. Product Schema (Product Pages & Cards)

Adds star ratings, prices, availability to search results.

### Location
Every product listing page and product detail page

### Implementation Example

```tsx
import { productSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';
import { launchProducts } from '@/data/launchProducts';

export default function ProductPage({ productId }) {
  const product = launchProducts.find(p => p.id === productId);

  const schema = productSchema({
    name: product.name,
    description: product.description,
    image: product.image,
    price: product.price.replace('$', ''),
    priceCurrency: 'USD',
    rating: product.rating,
    reviewCount: 150, // Estimate or actual from your data
    availability: product.stockCount ? 'InStock' : 'OutOfStock',
    url: `https://swankyboyz.com/products/${product.id}`
  });

  return (
    <>
      <SchemaMarkup schema={schema} />
      
      {/* Product content */}
      <h1>{product.name}</h1>
      <p className="rating">{product.rating}★ ({150} reviews)</p>
      <p className="price">{product.price}</p>
      {/* ... */}
    </>
  );
}
```

### What It Shows in Search Results
- Star rating (e.g., "⭐⭐⭐⭐⭐ 4.8")
- Price: "$299.99"
- Availability: "In Stock"
- Review count: "(2,341 reviews)"

---

## 3. Breadcrumb Schema (Navigation)

Helps search engines understand site hierarchy.

### Location
Every page (add to layout component)

### Implementation

```tsx
import { breadcrumbSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

const breadcrumbs = [
  { name: 'Home', url: 'https://swankyboyz.com' },
  { name: 'Grooming', url: 'https://swankyboyz.com/grooming' },
  { name: 'Electric Shavers', url: 'https://swankyboyz.com/grooming/shavers' }
];

<SchemaMarkup schema={breadcrumbSchema(breadcrumbs)} />
```

### What It Shows
Breadcrumb navigation in search results
```
> Home > Grooming > Electric Shavers
```

---

## 4. FAQ Schema (FAQ Sections)

Turns FAQs into Google "People also ask" snippets.

### Location
Any page with FAQ section

### Implementation

```tsx
import { faqSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

const faqs = [
  {
    question: 'What is the best electric shaver for sensitive skin?',
    answer: 'The Braun Series 8 is recommended for sensitive skin due to its gentle foil technology...'
  },
  {
    question: 'How long do electric shavers last?',
    answer: 'With proper maintenance, 4-6 years. Heads need replacement every 18-24 months...'
  }
];

export default function ProductGuide() {
  return (
    <>
      <SchemaMarkup schema={faqSchema(faqs)} />
      
      <section>
        {faqs.map((faq, i) => (
          <details key={i}>
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </section>
    </>
  );
}
```

### What It Shows
FAQs appear in "People Also Ask" box and featured snippets

---

## 5. Article Schema (Blog Posts & Guides)

Improves blog ranking and shows article metadata in search.

### Location
Every blog article/guide page

### Implementation

```tsx
import { articleSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

export default function BlogArticle() {
  const schema = articleSchema({
    headline: 'The Complete Guide to Premium Electric Shavers 2025',
    description: '2000+ word guide to choosing the best electric shaver...',
    image: 'https://swankyboyz.com/images/shavers-guide.jpg',
    datePublished: '2025-01-15',
    dateModified: '2025-01-20',
    author: 'SwankyBoyz Editorial',
    url: 'https://swankyboyz.com/guides/electric-shavers'
  });

  return (
    <>
      <SchemaMarkup schema={schema} />
      
      <article>
        <h1>The Complete Guide to Premium Electric Shavers 2025</h1>
        <time datetime="2025-01-15">January 15, 2025</time>
        {/* Article content */}
      </article>
    </>
  );
}
```

### What It Shows
- Article headline in search
- Publication date
- Author name
- Featured image thumbnail

---

## 6. How-To Schema (Tutorial Guides)

Perfect for step-by-step grooming guides.

### Location
Tutorial/how-to pages

### Implementation

```tsx
import { howToSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

export default function HowToShave() {
  const schema = howToSchema({
    name: 'How to Get the Perfect Close Shave',
    description: 'Step-by-step guide to a close, comfortable shave',
    image: 'https://swankyboyz.com/images/shaving-guide.jpg',
    steps: [
      {
        name: 'Prepare Your Skin',
        description: 'Wash face with warm water to open pores',
        image: 'https://swankyboyz.com/images/step1.jpg'
      },
      {
        name: 'Apply Shaving Cream',
        description: 'Apply quality shaving cream for lubrication',
        image: 'https://swankyboyz.com/images/step2.jpg'
      },
      {
        name: 'Shave With the Grain',
        description: 'Always shave in direction of hair growth',
        image: 'https://swankyboyz.com/images/step3.jpg'
      }
    ]
  });

  return (
    <>
      <SchemaMarkup schema={schema} />
      
      <article>
        <h1>How to Get the Perfect Close Shave</h1>
        {/* Steps */}
      </article>
    </>
  );
}
```

---

## 7. Review/Aggregate Rating Schema

Shows review ratings for products.

### Location
Product comparison pages, product reviews

### Implementation

```tsx
import { reviewSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

const productReview = {
  name: 'Braun Series 9 PRO+',
  aggregateRating: {
    ratingValue: '4.8',
    bestRating: '5',
    worstRating: '1',
    ratingCount: '2341'
  },
  reviews: [
    {
      author: 'John D.',
      datePublished: '2025-01-10',
      reviewRating: 5,
      reviewBody: 'Best electric shaver I\'ve ever owned. Highly recommend.'
    }
  ]
};

<SchemaMarkup schema={reviewSchema(productReview)} />
```

---

## Implementation Checklist

### Priority 1 (Do First - Highest Impact)
- [ ] Add Organization schema to main layout (1 time, all pages)
- [ ] Add Product schema to product listing page
- [ ] Add Article schema to 3 main blog posts
- [ ] Add FAQ schema to comparison pages (4 pages × FAQs)

**Expected Impact:** +20% CTR in 2-4 weeks

### Priority 2 (Do Next)
- [ ] Add Breadcrumb schema to all pages
- [ ] Add Article schema to all remaining blog posts
- [ ] Add How-To schema to tutorial pages
- [ ] Add Review schema to product comparison pages

**Expected Impact:** +35% CTR total, +15% featured snippet opportunities

### Priority 3 (Nice to Have)
- [ ] Video schema (if you add video content)
- [ ] Event schema (if running promotions/webinars)
- [ ] Local business schema (if brick & mortar location)

---

## Testing & Validation

### 1. Rich Results Test (Google)
- Go to: https://search.google.com/test/rich-results
- Paste your page URL
- Verify schema is recognized
- Check for errors/warnings

### 2. Schema.org Validator
- Go to: https://validator.schema.org/
- Paste HTML with schema
- Should show green checkmarks

### 3. Check Search Results
- Search your pages on Google
- After 2-4 weeks, rich results should appear
- Monitor CTR in Google Search Console

---

## Common Schema Mistakes to Avoid

❌ **Duplicate Organization schema on every page**
→ Add only once in main layout

❌ **Wrong schema types for content**
→ Use Article for blog posts, HowTo for tutorials, Product for products

❌ **Incorrect availability values**
→ Use: InStock, OutOfStock, PreOrder, Discontinued

❌ **Missing images in schema**
→ Always include high-quality image URLs

❌ **Hardcoded prices**
→ Keep prices in sync with actual product prices

❌ **Missing required fields**
→ Product schema requires: name, image, price, availability

---

## Real-World Examples

### Example 1: Product Listing Page

```tsx
// src/pages/products.tsx
import { productSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

export default function ProductsPage() {
  return (
    <>
      {/* Product 1 */}
      <SchemaMarkup schema={productSchema({
        name: 'Braun Series 9 PRO+',
        description: 'Flagship electric shaver with 60-minute battery',
        image: 'https://...',
        price: '299.99',
        priceCurrency: 'USD',
        rating: 4.8,
        reviewCount: 2341,
        availability: 'InStock',
        url: 'https://swankyboyz.com/products/braun-9-pro'
      })} />
      
      {/* Product 2 */}
      <SchemaMarkup schema={productSchema({
        name: 'Braun Series 8',
        description: 'High-performance electric shaver for dense beards',
        image: 'https://...',
        price: '199.99',
        priceCurrency: 'USD',
        rating: 4.6,
        reviewCount: 1850,
        availability: 'InStock',
        url: 'https://swankyboyz.com/products/braun-8'
      })} />
    </>
  );
}
```

### Example 2: Blog Post with FAQ

```tsx
// src/pages/guides/shaving-tips.tsx
import { articleSchema, faqSchema, SchemaMarkup } from '@/lib/seo/schemaMarkup';

export default function ShavingTipsGuide() {
  return (
    <>
      <SchemaMarkup schema={articleSchema({
        headline: '10 Professional Shaving Tips for the Perfect Close Shave',
        description: 'Expert tips for smoother, closer shaves with less irritation',
        image: 'https://swankyboyz.com/images/shaving-tips.jpg',
        datePublished: '2025-01-10',
        dateModified: '2025-01-20',
        author: 'SwankyBoyz Editorial',
        url: 'https://swankyboyz.com/guides/shaving-tips'
      })} />
      
      <SchemaMarkup schema={faqSchema([
        {
          question: 'Should I shave with or against the grain?',
          answer: 'Against the grain for closest shave, but with the grain if your skin is sensitive.'
        },
        {
          question: 'How often should I replace my razor blades?',
          answer: 'Every 7-10 shaves for safety razors, 18-24 months for electric shavers.'
        }
      ])} />
      
      <article>
        {/* Article content */}
      </article>
    </>
  );
}
```

---

## Monitoring & Optimization

### Google Search Console
1. Go to: https://search.google.com/search-console
2. Add property for swankyboyz.com
3. Check "Enhancements" > "Rich Results"
4. Monitor which schema types are recognized
5. Fix any issues/warnings

### Track Over Time
- Week 1-2: Schema implementation
- Week 2-4: Google crawls and recognizes schema
- Week 4-8: Rich results start appearing in SERP
- Month 2-3: Full impact visible in CTR metrics

### Expected Timeline
- Day 1: Add schema to pages
- Day 7: Google crawls pages
- Day 14: Schema recognized in console
- Week 4: +15% increase in CTR
- Month 3: +25% increase in CTR (with other optimizations)

---

## Component: SchemaMarkup Helper

The `SchemaMarkup` component renders schema as `<script type="application/ld+json">`:

```tsx
// Already exists in src/lib/seo/schemaMarkup.ts
interface SchemaMarkupProps {
  schema: Record<string, any>;
}

export const SchemaMarkup: React.FC<SchemaMarkupProps> = ({ schema }) => {
  return (
    <script type="application/ld+json">
      {JSON.stringify(schema)}
    </script>
  );
};
```

Simply import and use on any page.

---

## Next Steps

1. **This Week:** Add Organization schema to layout (5 min)
2. **Next Week:** Add schema to product listing (1 hour)
3. **Week 3:** Add schema to 4 comparison pages (2 hours)
4. **Week 4:** Add to blog posts as they're created
5. **Ongoing:** Test in Search Console, monitor CTR

---

## Resources

- Schema.org Documentation: https://schema.org
- Google Rich Results Test: https://search.google.com/test/rich-results
- Schema Validator: https://validator.schema.org/
- Google Search Central: https://developers.google.com/search
