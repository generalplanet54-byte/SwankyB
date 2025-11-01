# SwankyB - GitHub Copilot Instructions

## Project Overview

SwankyB (swankyboyz.com) is a premium men's lifestyle affiliate marketing platform featuring product reviews, grooming guides, tech comparisons, and Amazon affiliate integration. The site is optimized for SEO, performance, and conversions.

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Build Tool**: Vite 5
- **Styling**: TailwindCSS 3 with custom configuration
- **Database**: Cloudflare D1 (SQLite-compatible) for server-side data + Supabase for client-side data
- **Deployment**: Cloudflare Pages
- **Routing**: React Router DOM
- **State Management**: React Context API
- **Icons**: Lucide React
- **Node Version**: 22.0.0+ (minimum)

## Project Structure

```
/home/runner/work/SwankyB/SwankyB/
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/            # Route pages
│   ├── contexts/         # React Context providers (Affiliate, Content, Theme)
│   ├── lib/              # Utilities (email, SEO, analytics, optimization)
│   ├── hooks/            # Custom React hooks
│   ├── layouts/          # Page layouts
│   └── sections/         # Page sections
├── public/               # Static assets
│   └── assets/           # Images, videos, media files
├── scripts/              # Build and utility scripts
├── migrations/d1/        # Database migrations
├── functions/            # Cloudflare Functions
└── tests/                # Playwright tests
```

## Development Workflow

### Initial Setup
```bash
npm install                    # Install dependencies
npm run dev                    # Start dev server (Vite on :5173)
npm run dev:full               # Start with Cloudflare Pages (:8788) + Vite (:5173)
```

### Build and Deploy
```bash
npm run build                  # Production build to /dist
npm run preview                # Preview production build
npm run preview:pages          # Preview with Cloudflare Pages
```

### Code Quality
```bash
npm run lint                   # Run ESLint
```

## Database (Cloudflare D1)

### Schema
The database contains three main tables:

1. **products**: Product catalog with SEO metadata
   - id, name, brand, category, price, description, image, affiliate_url
   - rating, review_count, meta_title, meta_description

2. **articles**: Blog posts and guides
   - id, title, slug, excerpt, content, cover_image, visuals (JSON array)
   - author, date, read_time, tags, meta_title, meta_description

3. **article_products**: Many-to-many relationship linking articles to products

### Database Commands
```bash
# Create D1 database (first time only)
wrangler d1 create swankyboyz_d1_final

# Run migrations
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/001_initial_schema.sql

# Query database locally
wrangler d1 execute swankyboyz_d1_final --command="SELECT * FROM products LIMIT 5"
```

## Google Sheets Content Sync (Planned Feature)

### Implementation Guide

The repository is designed to support content management via Google Sheets with automatic synchronization to Cloudflare D1. This enables non-technical team members to update products and articles.

#### 1. Google Sheet Structure

**Sheet 1: Products**
| id | name | brand | description | image | affiliate_url |

**Sheet 2: Articles**
| id | title | slug | excerpt | content | cover_image | visuals | date |

*Note: The `visuals` column contains comma-separated image/video filenames from `/public/assets`*

#### 2. Google Cloud Setup

1. Create a Google Cloud project at https://console.cloud.google.com
2. Enable "Google Sheets API"
3. Create OAuth Client Credentials or Service Account
4. Download `credentials.json` and store in `/scripts/credentials.json`
5. Add `credentials.json` to `.gitignore` (security critical)

#### 3. Sync Script Implementation

Create `/scripts/sync-sheets.ts`:

```typescript
/**
 * Google Sheets → D1 Sync Script
 * Syncs products and articles from Google Sheets to Cloudflare D1
 */

import { google } from "googleapis";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";

const SHEET_ID = process.env.GOOGLE_SHEET_ID;

if (!SHEET_ID) {
  throw new Error("GOOGLE_SHEET_ID environment variable is required");
}

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return await auth.getClient();
}

async function fetchSheetData(sheetName: string) {
  const auth = await authorize();
  const sheets = google.sheets({ version: "v4", auth: auth as any });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A2:Z`,
  });
  return res.data.values || [];
}

async function syncToDB() {
  const db = await open({ 
    filename: "./swankyboyz.db", 
    driver: sqlite3.Database 
  });

  try {
    // Start transaction for atomic updates
    await db.exec("BEGIN TRANSACTION");

    console.log("🧾 Syncing Products...");
    const products = await fetchSheetData("Products");
    await db.exec("DELETE FROM products");
    
    for (const [id, name, brand, description, image, affiliate_url] of products) {
      await db.run(
        `INSERT INTO products (id, name, brand, description, image, affiliate_url)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [id, name, brand, description, image, affiliate_url]
      );
    }

    console.log("📰 Syncing Articles...");
    const articles = await fetchSheetData("Articles");
    await db.exec("DELETE FROM articles");
    
    for (const [id, title, slug, excerpt, content, cover_image, visuals, date] of articles) {
      const visualsJSON = visuals
        ? JSON.stringify(
            visuals.split(",").map((v: string) => ({
              type: v.trim().endsWith(".mp4") ? "video" : "image",
              src: `/assets/${v.trim()}`,
              alt: `${title} visual ${v}`,
            }))
          )
        : "[]";
        
      await db.run(
        `INSERT INTO articles (id, title, slug, excerpt, content, cover_image, visuals, date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
        [id, title, slug, excerpt, content, cover_image, visualsJSON, date]
      );
    }

    // Commit transaction if all operations succeed
    await db.exec("COMMIT");
    console.log("✅ Google Sheets → D1 Sync Complete");
  } catch (error) {
    // Rollback transaction on error to prevent partial updates
    await db.exec("ROLLBACK");
    console.error("❌ Sync failed, changes rolled back:", error);
    throw error;
  } finally {
    await db.close();
  }
}

syncToDB().catch(console.error);
```

#### 4. Package.json Scripts

Add to `package.json`:
```json
{
  "scripts": {
    "sync": "tsx scripts/sync-sheets.ts"
  }
}
```

#### 5. Dependencies

Install required packages:
```bash
npm install googleapis sqlite3
npm install -D tsx @types/node @types/sqlite3
```

**Note**: The code uses two packages: `sqlite3` (database driver) and `sqlite` (promise-based wrapper for opening databases). If you prefer better performance and a simpler API, you can use `better-sqlite3` instead:
```bash
npm install googleapis better-sqlite3
npm install -D tsx @types/node @types/better-sqlite3
```

#### 6. Automated Sync (GitHub Actions)

Create `.github/workflows/sync-content.yml`:

```yaml
name: Sync Content from Google Sheets
on:
  schedule:
    - cron: '0 2 * * 1'  # Every Monday at 2 AM UTC
  workflow_dispatch:      # Manual trigger

jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - uses: actions/setup-node@v3
        with:
          node-version: '22'
          
      - run: npm ci
      
      - name: Create credentials file
        run: echo '${{ secrets.GOOGLE_CREDENTIALS }}' > scripts/credentials.json
        
      - name: Sync from Google Sheets
        env:
          GOOGLE_SHEET_ID: ${{ secrets.GOOGLE_SHEET_ID }}
        run: npm run sync
        
      - name: Commit changes
        run: |
          git config user.name "GitHub Actions"
          git config user.email "actions@github.com"
          git add .
          git commit -m "chore: weekly content sync from Google Sheets" || echo "No changes"
          git push
```

**Secrets to add in GitHub Settings:**
- `GOOGLE_CREDENTIALS`: Contents of `credentials.json`
- `GOOGLE_SHEET_ID`: The spreadsheet ID from the URL

#### 7. Visual Assets Policy

- Every article must have 3+ visuals (images/videos)
- All visuals require descriptive alt text for accessibility
- Store media files in `/public/assets/`
- Validate file existence during sync
- Generate placeholders for missing files: `/public/assets/missing-[id].jpg`

## Coding Standards

### TypeScript
- Use strict TypeScript configuration
- Define proper interfaces for all data structures
- Avoid `any` type - use proper typing
- Use functional components with TypeScript

### React
- Use functional components with hooks
- Prefer composition over inheritance
- Extract reusable logic into custom hooks
- Use React Context for global state
- Implement proper error boundaries

### Styling
- Use TailwindCSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing scale
- Use custom Tailwind config for brand colors
- Dark mode support via CSS classes

### Performance
- Lazy load images with proper loading states
- Code split routes and heavy components
- Optimize images (WebP format when possible)
- Minimize bundle size
- Use proper caching strategies

### SEO
- Every page needs unique meta title and description
- Implement structured data (JSON-LD) for products and articles
- Include Open Graph and Twitter Card tags
- Generate semantic HTML with proper heading hierarchy
- Maintain comprehensive sitemap.xml

### Accessibility
- Use semantic HTML elements
- Provide alt text for all images
- Ensure keyboard navigation works
- Maintain proper color contrast
- Add ARIA labels where necessary

## Content Management

### Adding Products
1. Products are stored in D1 database
2. Each product must have:
   - Unique ID and slug
   - SEO-optimized title and description
   - High-quality product image
   - Valid Amazon affiliate URL
   - Category assignment
3. Use database migrations for bulk updates
4. Or implement Google Sheets sync for dynamic updates

### Adding Articles
1. Articles are stored in D1 database with JSON-formatted visuals array
2. Each article requires:
   - Unique slug (URL-friendly)
   - SEO meta title and description
   - Cover image and 3+ content visuals
   - Relevant product associations
   - Author, date, and read time
3. Content should be markdown-compatible for flexibility
4. Link related products using article_products junction table

### Image Management
- Store all media in `/public/assets/`
- Use descriptive filenames: `product-name-feature.jpg`
- Optimize images before upload (compress, resize)
- Support WebP format for modern browsers
- Generate and maintain alt text for all images

## Deployment

### Cloudflare Pages
The site is deployed on Cloudflare Pages with D1 database binding.

**Build Configuration:**
- Framework: Vite
- Build command: `npm run build`
- Output directory: `dist`
- Node version: 22.x

**D1 Binding:**
- Variable name: `DB`
- Database: `swankyboyz_d1_final`

### Environment Variables
Store in `.env` (local) or Cloudflare Dashboard (production):
```
# Supabase (for client-side data fetching)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key

# Authentication (server-side)
JWT_SECRET=your-jwt-secret-minimum-32-characters

# AI Content Generation (optional)
ANTHROPIC_API_KEY=your-anthropic-api-key

# Google Sheets Sync (optional, for sync script)
GOOGLE_SHEET_ID=your_sheet_id
```

### Deployment Workflow
1. Push to `main` branch triggers automatic deployment
2. Cloudflare Pages builds and deploys
3. D1 database is automatically bound
4. Custom domain with SSL handled by Cloudflare

## Testing

### Playwright Tests
```bash
npx playwright test                    # Run all tests
npx playwright test --ui               # Interactive mode
npx playwright test affiliate-links    # Specific test file
```

**Test Coverage:**
- Affiliate link functionality
- SEO metadata presence
- Accessibility compliance
- Page load performance

### Manual Testing Checklist
- [ ] All affiliate links open in new tab with nofollow
- [ ] Images load correctly with proper alt text
- [ ] Navigation works on mobile and desktop
- [ ] Forms submit correctly (newsletter, contact)
- [ ] Dark mode toggles properly
- [ ] All pages have proper meta tags
- [ ] Sitemap is up to date

## Common Tasks

### Update Product Prices
```bash
# Via SQL
wrangler d1 execute swankyboyz_d1_final --command="UPDATE products SET price = 299.99 WHERE id = 1"

# Or edit Google Sheet and run: npm run sync
```

### Add New Category
1. Update database schema if needed
2. Add category filter in CategoryPage component
3. Update navigation in Header component
4. Add category to sitemap generation script

### Fix Broken Links
```bash
# Scan for broken links
npm run generate-sitemap  # Updates sitemap
# Then manually test affiliate links
```

### Regenerate Images
```bash
bash scripts/generate-product-images.sh
```

## Troubleshooting

### Build Failures
- Check Node version is 22+
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Verify all imports are correct
- Check for TypeScript errors

### Database Issues
- Verify D1 binding in wrangler.toml
- Check database exists: `wrangler d1 list`
- Re-run migrations if schema changed
- Test queries locally before deploying

### Cloudflare Deployment Issues
- Check build logs in Cloudflare dashboard
- Verify environment variables are set
- Ensure D1 binding is configured correctly
- Check functions syntax if using Cloudflare Functions

## Security Best Practices

- Never commit `credentials.json` or `.env` files
- Use environment variables for all sensitive data
- Validate and sanitize all user inputs
- Implement rate limiting on API endpoints
- Keep dependencies updated (run `npm audit`)
- Use HTTPS only (enforced by Cloudflare)

## Performance Optimization

- Lazy load non-critical components
- Optimize images (compress, resize, use WebP)
- Minimize JavaScript bundle size
- Use CDN for static assets (Cloudflare)
- Implement caching strategies
- Monitor Core Web Vitals

## SEO Checklist

- [ ] Unique meta titles and descriptions for all pages
- [ ] Structured data (JSON-LD) for products and articles
- [ ] Semantic HTML with proper heading hierarchy
- [ ] Alt text for all images
- [ ] Internal linking between related content
- [ ] XML sitemap submitted to Google Search Console
- [ ] Robots.txt configured correctly
- [ ] Mobile-friendly responsive design
- [ ] Fast page load times (< 3 seconds)
- [ ] HTTPS enabled

## Maintenance Schedule

**Weekly:**
- Check affiliate link validity
- Review analytics for top-performing content
- Update product prices if changed

**Monthly:**
- Run security audit: `npm audit`
- Update dependencies: `npm update`
- Review and optimize slow pages
- Add new seasonal content

**Quarterly:**
- Comprehensive SEO audit
- Review and update older articles
- Test all forms and interactive features
- Backup database

## Resources

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TailwindCSS Documentation](https://tailwindcss.com/)
- [Amazon Associates Guidelines](https://affiliate-program.amazon.com/)

## Contact & Support

For questions or issues with this codebase:
1. Check existing documentation files in the repository root
2. Review error messages and logs carefully
3. Test in a clean environment to reproduce issues
4. Document steps to reproduce when reporting problems

---

**Last Updated**: 2025-10-31
**Repository**: generalplanet54-byte/SwankyB
**Primary Contact**: Repository maintainers
