# Sitemap Generation

This project includes automatic sitemap generation for SEO optimization and Google Search Console submission.

## 🗂️ Files Created

### Core Files
- **`/public/sitemap.xml`** - The main sitemap file for search engines
- **`/public/robots.txt`** - Updated to reference the sitemap location
- **`/scripts/generate-sitemap.js`** - Automated sitemap generation script
- **`/src/utils/sitemapGenerator.ts`** - TypeScript utilities for sitemap generation

### Configuration
- **`/package.json`** - Added `generate-sitemap` npm script

## 🚀 Quick Start

### Generate Sitemap
```bash
npm run generate-sitemap
```

### Current Sitemap Content
The sitemap includes:
- **Homepage** (Priority: 1.0, Daily updates)
- **Articles List Page** (Priority: 0.8, Daily updates)  
- **Category Pages** (Priority: 0.6, Weekly updates)
- **Individual Article Pages** (Priority: 0.7, Weekly updates)

## 📊 Current Statistics
- **Total URLs**: 12
- **Static Routes**: 2 (Homepage, Articles List)
- **Category Routes**: 5 (Skincare, Audio, Accessories, Fragrance, Grooming)
- **Article Routes**: 5 (Individual articles)

## 🔧 Sitemap Management

### Automatic Updates
Run `npm run generate-sitemap` whenever you:
- Add new articles
- Create new categories
- Update existing content

### Google Search Console Submission
1. Visit [Google Search Console](https://search.google.com/search-console/)
2. Add your property (domain)
3. Go to **Sitemaps** in the sidebar
4. Submit: `https://swankyb.com/sitemap.xml`

## 📋 Sample URLs Generated
```
https://swankyb.com/
https://swankyb.com/articles
https://swankyb.com/category/skincare
https://swankyb.com/category/audio
https://swankyb.com/article/premium-skincare-luxury-beauty-products-review
https://swankyb.com/article/premium-wireless-earbuds-2024-audio-guide
... and more
```

## 🛠️ Technical Details

### Sitemap Format
- **XML Format**: Standard sitemap.xml protocol
- **Change Frequency**: Optimized for content type (daily/weekly)
- **Priority**: SEO-optimized priority levels (0.6-1.0)
- **Last Modified**: Automatic date stamping

### Integration
- Works with your existing article data structure
- Automatically extracts categories and slugs
- Updates robots.txt to reference sitemap location
- Compatible with both development and production builds

### Customization
To change the domain, update the `DOMAIN` constant in `/scripts/generate-sitemap.js`

```javascript
const DOMAIN = 'https://your-domain.com'; // Update this
```