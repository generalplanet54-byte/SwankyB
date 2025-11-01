# Copilot Instructions for SwankyBoyz

## Project Overview

SwankyBoyz is a men's lifestyle e-commerce and content platform built with modern web technologies. This is a production-ready, scalable, SEO-optimized site with automated content management.

### Core Technology Stack

- **Frontend Framework**: Astro
- **Styling**: TailwindCSS
- **Database**: Cloudflare D1 (SQLite-based)
- **Media Storage**: Local `/public/assets` directory
- **Content Management**: Google Sheets API → D1 sync
- **Deployment**: Cloudflare Pages
- **CI/CD**: GitHub Actions

## Architecture Principles

### Content Management Flow

1. **Content Source**: Google Sheets serves as the CMS
   - Sheet 1: Products (e-commerce items)
   - Sheet 2: Articles (blog/editorial content)
2. **Sync Process**: `npm run sync` pulls from Google Sheets → Local D1 database
3. **Build Process**: Astro generates static pages from D1 data
4. **Deployment**: Cloudflare Pages auto-deploys on push to main

### Visual Asset Requirements

- **Minimum Visuals**: Every article must have 3+ visuals (images/videos)
- **Alt Text**: Every visual requires descriptive alt text format:
  - Products: `"Product photo of [name] by [brand] from SwankyBoyz.com"`
  - Articles: `"[title] visual [description]"`
- **Missing Assets**: Auto-generate placeholders at `/public/assets/missing-[id].jpg`
- **Video Support**: `.mp4` files handled with video tags, others as images

## File Structure & Conventions

### Key Directories

```
/public/assets/          # All images, videos, media files
/src/pages/              # Astro page components
/src/components/         # Reusable UI components
/src/layouts/            # Page layout templates
/scripts/                # Build and sync scripts
  - sync-sheets.ts       # Google Sheets sync script
  - seed-d1.ts           # Database seeding script
  - credentials.json     # Google API credentials (gitignored)
/swankyboyz.db          # Local Cloudflare D1 database
```

### Database Schema

#### Products Table
```sql
CREATE TABLE products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  brand TEXT,
  description TEXT,
  image TEXT,
  affiliate_url TEXT
);
```

#### Articles Table
```sql
CREATE TABLE articles (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT,
  cover_image TEXT,
  visuals TEXT,  -- JSON array of visual objects
  date TEXT
);
```

### Visuals JSON Format

```json
[
  {
    "type": "image",
    "src": "/assets/product-hero-1.jpg",
    "alt": "Product photo of Luxury Watch by Rolex from SwankyBoyz.com"
  },
  {
    "type": "video",
    "src": "/assets/review-demo.mp4",
    "alt": "Video demonstration of luxury watch features"
  }
]
```

## Development Workflows

### Adding New Features

1. **Check existing patterns** in `/src/components/` and `/src/pages/`
2. **Follow Astro conventions**: Use `.astro` for pages, TypeScript for logic
3. **Maintain TailwindCSS** utility-first approach
4. **Test locally** with `npm run dev` before committing
5. **Validate visuals** using the validation script

### Content Updates

1. **Edit Google Sheets** (preferred method for non-technical updates)
2. **Run sync**: `npm run sync` to pull latest content
3. **Verify locally**: `npm run dev` and check changes
4. **Commit changes**: Git commit the updated database
5. **Deploy**: Push to main triggers Cloudflare Pages deployment

### Image Management

1. **Add files** to `/public/assets/`
2. **Use descriptive filenames**: `product-rolex-submariner.jpg`
3. **Reference in Sheets**: Use filename only (no path)
4. **Sync validates**: Missing images trigger placeholder generation
5. **Optimize**: Use appropriate formats (WebP preferred, JPEG fallback)

## Code Style Guidelines

### Astro Components

```astro
---
// TypeScript logic in frontmatter
import Layout from '../layouts/Layout.astro';
import { getProducts } from '../lib/database';

const products = await getProducts();
---

<Layout title="Products">
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    {products.map(product => (
      <article class="bg-white rounded-lg shadow-md p-4">
        <img 
          src={product.image} 
          alt={`Product photo of ${product.name} by ${product.brand}`}
          class="w-full h-64 object-cover rounded"
        />
        <h2 class="text-xl font-bold mt-4">{product.name}</h2>
        <p class="text-gray-600">{product.description}</p>
      </article>
    ))}
  </div>
</Layout>
```

### TailwindCSS Conventions

- Use responsive modifiers: `sm:`, `md:`, `lg:`, `xl:`
- Maintain spacing scale: `p-4`, `m-6`, `gap-8`
- Follow color scheme: Primary (blue), accent (gold), neutral (grays)
- Apply dark mode support where applicable: `dark:bg-gray-900`

### TypeScript Standards

- **Strict typing**: Enable in `tsconfig.json`
- **Interface definitions**: Create types for Products, Articles
- **Async/await**: Prefer over promises for readability
- **Error handling**: Always catch and log errors appropriately

## Google Sheets Integration

### Sheet Structure

**Sheet 1: Products**
| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| name | string | Yes | Product name |
| brand | string | No | Brand name |
| description | string | No | Product description |
| image | string | No | Filename in `/public/assets/` |
| affiliate_url | string | No | Affiliate link URL |

**Sheet 2: Articles**
| Column | Type | Required | Description |
|--------|------|----------|-------------|
| id | string | Yes | Unique identifier |
| title | string | Yes | Article title |
| slug | string | Yes | URL-friendly slug |
| excerpt | string | No | Short summary |
| content | string | No | Full article content (Markdown supported) |
| cover_image | string | No | Filename for hero image |
| visuals | string | No | Comma-separated filenames |
| date | string | No | Publication date (ISO format) |

### Sync Script Configuration

1. **Google Cloud Console**: Enable Google Sheets API
2. **Create credentials**: OAuth 2.0 Client ID
3. **Download JSON**: Save as `/scripts/credentials.json`
4. **Update SHEET_ID**: Set in `/scripts/sync-sheets.ts`
5. **Test sync**: Run `npm run sync` and verify output

## SEO & Performance Requirements

### SEO Checklist

- [ ] Every page has unique `<title>` tag (50-60 chars)
- [ ] Meta descriptions present (150-160 chars)
- [ ] Proper heading hierarchy (h1 → h2 → h3)
- [ ] All images have descriptive alt text
- [ ] Schema.org markup for Products and Articles
- [ ] Canonical URLs set correctly
- [ ] Sitemap.xml auto-generated
- [ ] robots.txt configured

### Performance Standards

- **Lighthouse Score**: Aim for 90+ across all metrics
- **Image Optimization**: Use WebP with JPEG fallback
- **Lazy Loading**: Implement for below-fold images
- **Code Splitting**: Leverage Astro's automatic optimization
- **CDN**: Cloudflare handles global distribution
- **Caching**: Set appropriate cache headers

## Testing Strategy

### Pre-Deployment Checks

1. **Build succeeds**: `npm run build` completes without errors
2. **Links validate**: No broken internal/external links
3. **Images load**: All visuals render correctly
4. **Mobile responsive**: Test on various viewport sizes
5. **Accessibility**: WCAG 2.1 AA compliance
6. **Performance**: Run Lighthouse audit

### Automated Testing

- **Playwright**: E2E tests for critical user flows
- **Lighthouse CI**: Performance regression testing
- **ESLint**: Code quality checks
- **Image validation**: Automated visual asset checks

## Deployment & CI/CD

### Manual Deployment

```bash
npm run sync        # Pull latest content
npm run build       # Build static site
git add .
git commit -m "Content update"
git push origin main  # Triggers Cloudflare Pages deploy
```

### Automated Weekly Sync

GitHub Action runs every Monday at 2 AM:
- Executes `npm run sync`
- Commits changes if content updated
- Pushes to main (triggers deployment)
- Notifies on failure

### Environment Variables

Set in Cloudflare Pages dashboard:
- `GOOGLE_SHEETS_API_KEY`: API credentials
- `SHEET_ID`: Target Google Sheet ID
- `D1_DATABASE_ID`: Cloudflare D1 database identifier

## Troubleshooting

### Common Issues

**Sync fails:**
- Verify `credentials.json` is valid
- Check Google Sheets API is enabled
- Confirm SHEET_ID matches your sheet

**Images missing:**
- Ensure files exist in `/public/assets/`
- Check filename matches exactly (case-sensitive)
- Verify sync script generated placeholders

**Build errors:**
- Clear `.astro` cache directory
- Delete `node_modules` and reinstall: `npm ci`
- Check for TypeScript type errors

**Deployment fails:**
- Review Cloudflare Pages build logs
- Verify environment variables are set
- Check build command matches `package.json`

## Brand & Content Guidelines

### Visual Identity

- **Color Palette**: Masculine luxury (blacks, grays, gold accents)
- **Typography**: Bold, modern sans-serif fonts
- **Photography**: High-quality product shots, lifestyle imagery
- **Tone**: Sophisticated, aspirational, authentic

### Content Standards

- **Voice**: Authoritative but approachable
- **Length**: Articles 800-1500 words optimal
- **Structure**: Clear headings, short paragraphs, bullet points
- **Product Links**: Natural integration of affiliate links
- **Visuals**: Minimum 3 per article, relevant and high-quality

## Support & Resources

### Documentation References

- [Astro Documentation](https://docs.astro.build)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Google Sheets API](https://developers.google.com/sheets/api)
- [TailwindCSS Docs](https://tailwindcss.com/docs)

### Project-Specific Docs

- `README.md`: Project overview and quick start
- `GOOGLE_SHEETS_INTEGRATION_GUIDE.md`: Detailed sync setup
- `IMAGE_SYSTEM_QUICK_REFERENCE.md`: Visual asset management
- `PERFORMANCE_OPTIMIZATION_GUIDE.md`: Speed and SEO tips
- `PRODUCTION_DEPLOYMENT_GUIDE.md`: Deployment procedures

## When Making Changes

### Before You Start

1. **Understand the context**: Read relevant documentation
2. **Check existing patterns**: Look for similar implementations
3. **Verify dependencies**: Ensure required packages are installed
4. **Test environment**: Run `npm run dev` to ensure baseline works

### During Development

1. **Follow conventions**: Match existing code style
2. **Write comments**: Explain complex logic
3. **Test incrementally**: Verify changes as you go
4. **Handle errors**: Add appropriate error handling
5. **Validate visuals**: Ensure alt text and proper format

### After Completion

1. **Test thoroughly**: Run all checks and tests
2. **Update docs**: Reflect changes in relevant documentation
3. **Commit atomically**: One logical change per commit
4. **Write clear messages**: Descriptive commit messages
5. **Verify deployment**: Check production after deploy

## Priority Principles

1. **User Experience First**: Fast, accessible, mobile-friendly
2. **SEO Optimization**: Follow best practices for discoverability
3. **Maintainability**: Clear code, good documentation
4. **Automation**: Reduce manual work wherever possible
5. **Visual Quality**: Professional, consistent imagery
6. **Content Integrity**: Accurate, up-to-date information
7. **Performance**: Optimize for speed and efficiency
8. **Scalability**: Design for growth and expansion
