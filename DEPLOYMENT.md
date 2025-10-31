# SwankyBoyz Deployment Guide

## Astro + Cloudflare Pages + D1 Setup

This site is built with Astro and designed to deploy on Cloudflare Pages with D1 database integration.

## Local Development

### Prerequisites
- Node.js 20+
- npm or yarn
- Cloudflare account (for deployment)

### Setup Steps

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Link Media and Build**
   ```bash
   npm run link-media  # Links product visuals to articles
   npm run build       # Builds site and seeds local D1 database
   ```

3. **Start Development Server**
   ```bash
   npm run dev
   ```
   
   The site will be available at `http://localhost:4321`

### Important Notes for Development

- The build process automatically runs `postbuild` which seeds the local D1 database
- Articles are stored in `/src/data/seed.js`
- The `link-media` script automatically associates product images with articles
- All visuals are in `/public/assets/` (currently SVG placeholders)

## Database Structure

### Articles Table
```sql
- id: INTEGER PRIMARY KEY
- title: TEXT
- slug: TEXT UNIQUE
- category: TEXT (Grooming, Lifestyle, Style, etc.)
- excerpt: TEXT
- content: TEXT
- cover_image: TEXT
- visuals: TEXT (JSON array)
- date: TEXT
```

### Products Table
```sql
- id: INTEGER PRIMARY KEY
- name: TEXT
- brand: TEXT
- description: TEXT
- image: TEXT
- affiliate_url: TEXT
```

### Article-Product Relationships
```sql
- article_id: INTEGER
- product_id: INTEGER
```

## Adding New Content

### Adding Articles

1. Edit `/src/data/seed.js`
2. Add new article object with:
   - title, slug, category
   - excerpt, content (HTML)
   - cover_image path
   - date
3. Run `npm run link-media` to auto-link visuals
4. Run `npm run build` to seed database

### Adding Products

1. Edit `/src/data/seed.js`
2. Add new product object with:
   - name, brand, description
   - image path (in /public/assets/products/)
   - affiliate_url (Amazon affiliate link)
3. Add product image to `/public/assets/products/`
4. Run `npm run link-media` and `npm run build`

## Visual Content Requirements

Each article MUST have:
- ✅ Minimum 3 visuals (images or videos)
- ✅ Complete alt text for accessibility
- ✅ Descriptive captions

The `link-media` script automatically:
- Links product images to relevant articles
- Adds the article's cover image
- Creates fallback visuals if needed
- Ensures all alt text is descriptive

## Deployment to Cloudflare Pages

### Initial Setup

1. **Create D1 Database**
   ```bash
   npx wrangler d1 create swankyboyz_db
   ```
   
   Copy the database ID and update `wrangler.toml`:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "swankyboyz_db"
   database_id = "YOUR_DATABASE_ID_HERE"
   ```

2. **Initialize Schema**
   ```bash
   npx wrangler d1 execute swankyboyz_db --file=./schema.sql
   ```

3. **Seed Production Database**
   
   Build locally first:
   ```bash
   npm run build
   ```
   
   Then upload the database or manually seed via wrangler

4. **Deploy to Cloudflare Pages**
   
   Via Dashboard:
   - Go to Cloudflare Pages
   - Connect your GitHub repository
   - Set build command: `npm run build`
   - Set build output directory: `dist`
   - Add D1 binding in settings

   Via CLI:
   ```bash
   npm run build
   npx wrangler pages deploy ./dist --project-name=swankyboyz
   ```

### Environment Variables

Set in Cloudflare Pages dashboard:
- `SITE_URL`: Your production domain
- `JWT_SECRET`: For admin endpoints (if applicable)

## Production Checklist

Before deploying to production:

- [ ] Replace SVG placeholder images with real product photos
- [ ] Update affiliate URLs with actual Amazon affiliate tags
- [ ] Test all article pages load correctly
- [ ] Verify images are optimized for web
- [ ] Check mobile responsiveness
- [ ] Test affiliate link tracking
- [ ] Set up custom domain in Cloudflare
- [ ] Configure SSL/TLS settings
- [ ] Add analytics tracking (Google Analytics, Cloudflare Analytics)
- [ ] Submit sitemap to Google Search Console

## Performance Optimization

The site is pre-optimized for performance:
- ✅ Server-side rendering with Astro
- ✅ Cloudflare CDN distribution
- ✅ Local asset hosting (no external CDN delays)
- ✅ Lazy loading for images
- ✅ Minimal JavaScript bundle
- ✅ TailwindCSS for styling

## SEO Features

Implemented SEO optimizations:
- ✅ Meta tags for title and description
- ✅ Open Graph tags for social sharing
- ✅ Twitter Card support
- ✅ Semantic HTML structure
- ✅ Image alt text for accessibility
- ✅ Clean, descriptive URLs
- ✅ Structured data support (ready for implementation)

## Monitoring & Analytics

Recommended tools:
- Cloudflare Web Analytics (privacy-friendly)
- Google Analytics 4
- Cloudflare Logs for debugging
- D1 query metrics via Wrangler

## Troubleshooting

### Articles not showing in dev mode
The development server uses a separate D1 instance. After building, copy the database:
```bash
npm run build
# The database is at .wrangler/state/v3/d1/miniflare-D1DatabaseObject/swankyboyz_db.sqlite
```

### Images not loading
- Check paths start with `/assets/`
- Verify files exist in `/public/assets/`
- Ensure build process includes assets

### D1 errors in production
- Verify database ID in wrangler.toml
- Check binding name is "DB"
- Ensure schema is initialized
- Confirm database is seeded

## Support

For issues or questions:
- Check Astro documentation: https://docs.astro.build
- Cloudflare D1 docs: https://developers.cloudflare.com/d1/
- Open an issue in the repository

## License

All rights reserved © 2025 SwankyBoyz
