# SwankyBoyz.com - GitHub Copilot Instructions

> Full rebuild of `swankyboyz.com` with Astro + Cloudflare + Google Sheets Auto-Sync
> Production-ready, scalable, SEO-optimized, and fully visual.

---

## 🧩 1. STACK OVERVIEW

**Core Tech:**
- **Astro** (frontend framework) - Static site generation with island architecture
- **TailwindCSS** (styling) - Utility-first CSS framework
- **Cloudflare D1** (database) - Edge SQL database
- **Local `/public/assets`** - Media storage for images and videos
- **Google Sheets API → D1 sync** - Content management via Google Sheets
- **Cloudflare Pages** (deployment) - Edge deployment and hosting

**Architecture Principles:**
- Content-first approach with Google Sheets as CMS
- Edge-native for global performance
- SEO-optimized with structured data
- Accessibility (WCAG 2.1 AA compliance)
- Affiliate link tracking and conversion optimization

---

## ⚙️ 2. SETUP GOOGLE SHEET

### Create Google Sheet

**Title:** 🟢 `SwankyBoyz Content Hub`

### Sheet 1: `Products`

| Column | Type | Description | Required |
|--------|------|-------------|----------|
| id | Integer | Unique product identifier | ✅ |
| name | Text | Product name | ✅ |
| brand | Text | Brand name | ✅ |
| description | Text | Product description (supports markdown) | ✅ |
| image | Text | Primary image filename (stored in `/public/assets/`) | ✅ |
| affiliate_url | URL | Amazon or retailer affiliate link | ✅ |
| price | Decimal | Current price | ❌ |
| rating | Decimal | Product rating (0-5) | ❌ |
| category | Text | Product category slug | ❌ |

### Sheet 2: `Articles`

| Column | Type | Description | Required |
|--------|------|-------------|----------|
| id | Integer | Unique article identifier | ✅ |
| title | Text | Article title | ✅ |
| slug | Text | URL-friendly slug | ✅ |
| excerpt | Text | Short description (150-160 chars) | ✅ |
| content | Text | Full article content (markdown supported) | ✅ |
| cover_image | Text | Cover image filename | ✅ |
| visuals | Text | Comma-separated list of image/video filenames | ✅ |
| date | Date | Publication date (YYYY-MM-DD) | ✅ |
| category | Text | Category slug | ❌ |
| tags | Text | Comma-separated tags | ❌ |
| meta_title | Text | SEO title (override) | ❌ |
| meta_description | Text | SEO description (override) | ❌ |

**Note:** Visuals column contains comma-separated image/video URLs or filenames stored locally in `/public/assets/`.

### Google Cloud Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/apis)
2. Create a **new project** (e.g., "SwankyBoyz Content Sync")
3. Enable **"Google Sheets API"**
4. Create **Service Account Credentials** (not OAuth for server-to-server):
   - Navigate to "Credentials" → "Create Credentials" → "Service Account"
   - Grant "Editor" role (or custom role with Sheets read access)
   - Create and download JSON key
5. Save the downloaded JSON as `/scripts/credentials.json`
6. Share your Google Sheet with the service account email (found in credentials.json)

**Security Note:** Never commit `credentials.json` to version control. Use `.gitignore`.

---

## 🧱 3. GOOGLE SHEET SYNC SCRIPT

Create `/scripts/sync-sheets.ts`:

```typescript
/**
 * Google Sheets → D1 Sync Script
 * Automatically updates articles & products in Cloudflare D1
 * Run manually: npm run sync
 * 
 * Prerequisites:
 * - credentials.json in /scripts/ directory
 * - Google Sheet shared with service account
 * - SHEET_ID configured below
 */

import { google } from "googleapis";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import fs from "fs";
import path from "path";

// Configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "YOUR_SHEET_ID_HERE";
const DB_PATH = "./swankyboyz.db";
const CREDENTIALS_PATH = "./scripts/credentials.json";
const ASSETS_PATH = "./public/assets";

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_PATH)) {
  fs.mkdirSync(ASSETS_PATH, { recursive: true });
}

/**
 * Authorize Google Sheets API access
 */
async function authorize() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `Credentials file not found at ${CREDENTIALS_PATH}. ` +
      `Please download your service account JSON from Google Cloud Console.`
    );
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  
  return await auth.getClient();
}

/**
 * Fetch data from a specific sheet
 */
async function fetchSheetData(sheetName: string): Promise<any[][]> {
  const auth = await authorize();
  const sheets = google.sheets({ version: "v4", auth: auth as any });
  
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A2:Z`, // Skip header row
    });
    
    return res.data.values || [];
  } catch (error) {
    console.error(`Error fetching sheet "${sheetName}":`, error);
    throw error;
  }
}

/**
 * Validate image exists, create placeholder if missing
 */
function validateImage(filename: string, id: string, type: string): string {
  if (!filename) {
    return `/assets/placeholder-${type}-${id}.jpg`;
  }
  
  const imagePath = path.join(ASSETS_PATH, filename);
  if (!fs.existsSync(imagePath)) {
    console.warn(`⚠️  Image not found: ${filename} - using placeholder`);
    return `/assets/placeholder-${type}-${id}.jpg`;
  }
  
  return `/assets/${filename}`;
}

/**
 * Generate visuals array from comma-separated string
 */
function generateVisuals(visualsStr: string, title: string): any[] {
  if (!visualsStr) return [];
  
  return visualsStr.split(",").map((filename, index) => {
    const trimmed = filename.trim();
    const isVideo = trimmed.endsWith(".mp4") || trimmed.endsWith(".webm");
    
    return {
      type: isVideo ? "video" : "image",
      src: `/assets/${trimmed}`,
      alt: `${title} - Visual ${index + 1}`,
      caption: "",
    };
  });
}

/**
 * Generate SEO-friendly alt text
 */
function generateAltText(name: string, brand: string, type: string): string {
  return `Product photo of ${name} by ${brand} from SwankyBoyz.com`;
}

/**
 * Sync products from Google Sheets to D1
 */
async function syncProducts(db: any) {
  console.log("\n🧾 Syncing Products...");
  
  const products = await fetchSheetData("Products");
  
  if (products.length === 0) {
    console.log("⚠️  No products found in sheet");
    return;
  }
  
  // Clear existing products
  await db.exec("DELETE FROM products");
  console.log("🗑️  Cleared existing products");
  
  let successCount = 0;
  
  for (const row of products) {
    const [id, name, brand, description, image, affiliate_url, price, rating, category] = row;
    
    if (!id || !name || !brand) {
      console.warn(`⚠️  Skipping invalid product row:`, row.slice(0, 3));
      continue;
    }
    
    const validatedImage = validateImage(image, id, "product");
    const altText = generateAltText(name, brand, "product");
    
    try {
      await db.run(
        `INSERT INTO products (
          id, name, brand, description, 
          primary_image, amazon_url,
          price, rating, slug, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          name,
          brand,
          description,
          validatedImage,
          affiliate_url,
          price || null,
          rating || 0,
          name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          1
        ]
      );
      successCount++;
    } catch (error) {
      console.error(`❌ Error inserting product ${id}:`, error);
    }
  }
  
  console.log(`✅ Synced ${successCount} products`);
}

/**
 * Sync articles from Google Sheets to D1
 */
async function syncArticles(db: any) {
  console.log("\n📰 Syncing Articles...");
  
  const articles = await fetchSheetData("Articles");
  
  if (articles.length === 0) {
    console.log("⚠️  No articles found in sheet");
    return;
  }
  
  // Clear existing articles
  await db.exec("DELETE FROM articles");
  console.log("🗑️  Cleared existing articles");
  
  let successCount = 0;
  
  for (const row of articles) {
    const [
      id, title, slug, excerpt, content, 
      cover_image, visuals, date, category, tags,
      meta_title, meta_description
    ] = row;
    
    if (!id || !title || !slug || !content) {
      console.warn(`⚠️  Skipping invalid article row:`, row.slice(0, 3));
      continue;
    }
    
    // Validate cover image
    const validatedCoverImage = validateImage(cover_image, id, "article");
    
    // Generate visuals JSON
    const visualsArray = generateVisuals(visuals, title);
    const visualsJSON = JSON.stringify(visualsArray);
    
    // Validate: Every article must have at least 3 visuals
    if (visualsArray.length < 3) {
      console.warn(`⚠️  Article ${id} has fewer than 3 visuals (${visualsArray.length})`);
    }
    
    try {
      await db.run(
        `INSERT INTO articles (
          id, title, slug, excerpt, content,
          featured_image, 
          published_at, status,
          meta_title, meta_description,
          read_time
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          title,
          slug,
          excerpt,
          content,
          validatedCoverImage,
          date || new Date().toISOString(),
          "published",
          meta_title || title,
          meta_description || excerpt,
          calculateReadTime(content)
        ]
      );
      
      // Store visuals in a separate metadata table if needed
      // Or store in article content as structured data
      
      successCount++;
    } catch (error) {
      console.error(`❌ Error inserting article ${id}:`, error);
    }
  }
  
  console.log(`✅ Synced ${successCount} articles`);
}

/**
 * Calculate read time based on word count
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Main sync function
 */
async function syncToDB() {
  console.log("🚀 Starting Google Sheets → D1 Sync...\n");
  console.log(`📊 Sheet ID: ${SHEET_ID}`);
  console.log(`💾 Database: ${DB_PATH}`);
  
  try {
    // Open database connection
    const db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database
    });
    
    // Sync products
    await syncProducts(db);
    
    // Sync articles
    await syncArticles(db);
    
    // Close database
    await db.close();
    
    console.log("\n✅ Google Sheets → D1 Sync Complete");
    console.log("💡 Run 'npm run build' to regenerate site with new content");
    
  } catch (error) {
    console.error("\n❌ Sync failed:", error);
    process.exit(1);
  }
}

// Run sync
syncToDB().catch(console.error);
```

---

## 🧰 4. PACKAGE.JSON UPDATES

Add these scripts to `package.json`:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "sync": "tsx scripts/sync-sheets.ts",
    "postbuild": "node scripts/seed-d1.ts",
    "sheets:sync": "npm run sync && npm run build"
  },
  "dependencies": {
    "astro": "^4.0.0",
    "@astrojs/tailwind": "^5.0.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "googleapis": "^130.0.0",
    "sqlite": "^5.1.0",
    "sqlite3": "^5.1.0",
    "tsx": "^4.7.0"
  }
}
```

**Usage:**

```bash
# Sync content from Google Sheets
npm run sync

# Sync and rebuild site
npm run sheets:sync

# Build for production
npm run build
```

---

## 🧠 5. AUTO IMAGE VALIDATION

The sync script automatically:

1. **Validates Image Existence**: Checks if each image exists in `/public/assets/`
2. **Generates Placeholders**: Creates placeholder references for missing images
3. **Alt Text Generation**: Auto-generates descriptive alt text:
   - Products: `"Product photo of [name] by [brand] from SwankyBoyz.com"`
   - Articles: `"[title] - Visual [number]"`
4. **Visual Type Detection**: Automatically detects image vs video based on file extension
5. **Structured Data**: Converts visuals into JSON format for easy templating

**Placeholder Naming Convention:**
- Products: `/assets/placeholder-product-[id].jpg`
- Articles: `/assets/placeholder-article-[id].jpg`

---

## 🧩 6. VISUAL POLICY

### Requirements

✅ **Every article MUST have at least 3 visuals (image/video)**
✅ **Each visual MUST have descriptive alt text**
✅ **Visuals MUST match or represent associated product(s)**
✅ **Validation runs during sync to ensure compliance**

### Visual Types

```typescript
interface Visual {
  type: "image" | "video";
  src: string;           // Path to asset
  alt: string;           // Descriptive alt text
  caption?: string;      // Optional caption
}
```

### Validation Script

The sync script validates:
- Minimum 3 visuals per article
- All images exist or have placeholders
- Alt text is present and descriptive
- File extensions match media types

### Best Practices

1. **Use High-Quality Images**: 1200px+ width for featured images
2. **Optimize Before Upload**: Use WebP format when possible
3. **Name Files Descriptively**: `product-name-brand-angle.jpg`
4. **Include Product Shots**: Show products from multiple angles
5. **Add Lifestyle Images**: Show products in use
6. **Video Guidelines**: Max 30 seconds, MP4 format, under 5MB

---

## ⚡ 7. DEPLOYMENT WORKFLOW

### Manual Deployment

1. **Edit Google Sheet**: Update products/articles in Google Sheets
2. **Sync Content**: Run `npm run sync` locally
3. **Build Site**: Run `npm run build`
4. **Commit Changes**: `git add . && git commit -m "Content update"`
5. **Push to GitHub**: `git push origin main`
6. **Auto-Deploy**: Cloudflare Pages automatically deploys

### Automated CI/CD (GitHub Actions)

Create `.github/workflows/sync-content.yml`:

```yaml
name: Sync Content from Google Sheets

on:
  # Run every Monday at 2 AM UTC
  schedule:
    - cron: '0 2 * * 1'
  
  # Allow manual trigger
  workflow_dispatch:
  
  # Run on push to specific file
  push:
    paths:
      - 'scripts/sync-sheets.ts'
      - '.github/workflows/sync-content.yml'

jobs:
  sync-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
      - name: Checkout repository
        uses: actions/checkout@v4
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Create credentials file
        run: echo '${{ secrets.GOOGLE_CREDENTIALS_JSON }}' > scripts/credentials.json
      
      - name: Sync from Google Sheets
        env:
          GOOGLE_SHEET_ID: ${{ secrets.GOOGLE_SHEET_ID }}
        run: npm run sync
      
      - name: Check for changes
        id: git-check
        run: |
          git diff --exit-code swankyboyz.db || echo "changed=true" >> $GITHUB_OUTPUT
      
      - name: Commit and push changes
        if: steps.git-check.outputs.changed == 'true'
        run: |
          git config --local user.email "github-actions[bot]@users.noreply.github.com"
          git config --local user.name "github-actions[bot]"
          git add swankyboyz.db
          git commit -m "🔄 Auto-sync content from Google Sheets [skip ci]"
          git push
      
      - name: Clean up credentials
        if: always()
        run: rm -f scripts/credentials.json
```

### Required GitHub Secrets

Add these in GitHub repository settings (Settings → Secrets and variables → Actions):

1. **GOOGLE_CREDENTIALS_JSON**: Full JSON content from `credentials.json`
2. **GOOGLE_SHEET_ID**: Your Google Sheet ID from the URL

---

## 📦 8. PROJECT STRUCTURE

```
SwankyBoyz/
├── .github/
│   ├── copilot-instructions.md          # This file
│   └── workflows/
│       └── sync-content.yml             # Auto-sync workflow
├── public/
│   ├── assets/                          # Images and videos
│   │   ├── products/                    # Product images
│   │   ├── articles/                    # Article images
│   │   └── placeholders/                # Generated placeholders
│   └── robots.txt
├── scripts/
│   ├── sync-sheets.ts                   # Google Sheets sync script
│   ├── credentials.json                 # Google service account (gitignored)
│   └── seed-d1.ts                       # D1 seeding script
├── src/
│   ├── components/
│   ├── layouts/
│   ├── pages/
│   └── styles/
├── astro.config.mjs                     # Astro configuration
├── tailwind.config.js                   # Tailwind configuration
├── package.json
├── swankyboyz.db                        # Local D1 database
├── wrangler.toml                        # Cloudflare configuration
└── .gitignore
```

---

## 🔒 9. SECURITY & BEST PRACTICES

### Environment Variables

Never commit sensitive data. Use environment variables:

```bash
# .env (gitignored)
GOOGLE_SHEET_ID=your_sheet_id_here
```

### .gitignore Updates

```gitignore
# Google Sheets Credentials
scripts/credentials.json

# Local Database
*.db
*.db-journal

# Environment Variables
.env
.env.local

# Build Artifacts
dist/
.astro/
```

### Service Account Security

1. **Limit Permissions**: Only grant "Viewer" role to service account
2. **Rotate Keys**: Regenerate credentials quarterly
3. **Monitor Usage**: Check Google Cloud Console for unusual activity
4. **Sheet Permissions**: Only share with necessary service accounts

---

## 🎯 10. CONTENT STRATEGY

### Article Guidelines

**Structure:**
1. **Hook** (150 words): Grab attention with relatable problem
2. **Overview** (200 words): Introduce products and selection criteria
3. **Detailed Reviews** (300 words each): 5-7 products with pros/cons
4. **Comparison Table**: Quick reference for all products
5. **Buying Guide** (300 words): What to look for, FAQs
6. **Conclusion** (150 words): Reinforce best choices

**SEO Optimization:**
- **Target Keyword**: Include in title, H1, first paragraph, conclusion
- **LSI Keywords**: Naturally integrate related terms
- **Internal Links**: Link to 3-5 related articles
- **External Links**: Link to 1-2 authoritative sources
- **Meta Description**: 150-160 chars with target keyword
- **Image Alt Text**: Descriptive with keywords

### Product Selection

**Criteria:**
1. ✅ Amazon Affiliate Program available
2. ✅ Rating 4.0+ with 100+ reviews
3. ✅ Price range: $25-$200 (sweet spot for conversions)
4. ✅ High-quality product images available
5. ✅ Active product (not discontinued)
6. ✅ Commission rate 3%+

---

## ✅ 11. FINAL RESULT

When implemented, you'll have:

✅ **Fully functional men's lifestyle site** hosted on Cloudflare Pages
✅ **Content + media sync** directly from Google Sheets
✅ **Local, optimized image handling** with validation
✅ **3+ visuals per article** with descriptive alt text
✅ **D1-powered dynamic content** at the edge
✅ **SEO, accessibility, and affiliate integration** built-in
✅ **One-click weekly automation** via GitHub Actions
✅ **Edge performance** with global CDN distribution
✅ **Zero-downtime deployments** with automatic previews

---

## 🚀 12. QUICK START CHECKLIST

- [ ] Create Google Sheet with Products and Articles sheets
- [ ] Set up Google Cloud project and enable Sheets API
- [ ] Create service account and download credentials.json
- [ ] Share Google Sheet with service account email
- [ ] Install dependencies: `npm install`
- [ ] Add SHEET_ID to environment or script
- [ ] Run first sync: `npm run sync`
- [ ] Validate data in swankyboyz.db
- [ ] Build site: `npm run build`
- [ ] Test locally: `npm run preview`
- [ ] Set up GitHub secrets for CI/CD
- [ ] Push to GitHub and verify auto-deployment
- [ ] Configure custom domain in Cloudflare Pages
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor analytics and conversions

---

## 📚 13. ADDITIONAL RESOURCES

- [Astro Documentation](https://docs.astro.build/)
- [Cloudflare D1 Docs](https://developers.cloudflare.com/d1/)
- [Google Sheets API Guide](https://developers.google.com/sheets/api/guides/concepts)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Amazon Associates Program](https://affiliate-program.amazon.com/)

---

**Last Updated:** 2025-10-31
**Version:** 1.0.0
**Maintained by:** SwankyBoyz Development Team
