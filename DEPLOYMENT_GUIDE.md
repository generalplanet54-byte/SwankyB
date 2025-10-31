# SwankyBoyz.com Deployment Guide

This guide explains how to deploy your Astro + Cloudflare Pages + D1 site to production.

## Prerequisites

- Node.js 18+ installed
- Cloudflare account
- Wrangler CLI installed: `npm install -g wrangler`

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Prepare Visual Assets

Run the link-media script to associate article visuals with products:

```bash
npm run link-media
```

This script:
- Automatically links product images to relevant articles
- Ensures each article has 3-4 visuals minimum
- Generates descriptive alt text for accessibility
- Outputs `src/data/seed-linked.json`

### 3. Seed the Database

Create and populate the local SQLite database:

```bash
npm run seed-db
```

This creates `swankyboyz.db` with:
- Products table (6 sample products)
- Articles table (3 sample articles with visuals)
- Article-product relationships
- Categories and tags

### 4. Build the Site

```bash
npm run build
```

The postbuild hook will automatically run `seed-db` after the build completes.

### 5. Preview Locally

```bash
npm run preview:pages
```

Visit `http://localhost:8788` to see your site.

## Cloudflare Pages Deployment

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Click **Pages** → **Create a project**
   - Select **Connect to Git** → Choose your repository

3. **Configure Build Settings**
   ```
   Framework preset: Astro
   Build command: npm run build
   Build output directory: dist
   Node version: 18 or higher
   ```

4. **Create D1 Database**
   ```bash
   wrangler d1 create swankyboyz_db
   ```
   
   Copy the database ID from the output.

5. **Update wrangler.toml**
   
   Replace `your-d1-database-id` with your actual database ID:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "swankyboyz_db"
   database_id = "your-actual-database-id-here"
   ```

6. **Initialize D1 Database**
   ```bash
   wrangler d1 execute swankyboyz_db --file=./schema.sql
   ```

7. **Seed Production Database** (Optional for initial data)
   
   You can export and import data or manually insert via Wrangler:
   ```bash
   wrangler d1 execute swankyboyz_db --command="INSERT INTO products ..."
   ```

8. **Bind D1 to Pages Project**
   - In Cloudflare Pages dashboard, go to **Settings** → **Functions**
   - Add **D1 database binding**:
     - Variable name: `DB`
     - D1 database: Select `swankyboyz_db`

9. **Deploy**
   - Click **Save and Deploy**
   - Cloudflare builds and deploys automatically

### Option 2: Manual CLI Deployment

1. **Login to Cloudflare**
   ```bash
   wrangler login
   ```

2. **Create D1 Database**
   ```bash
   wrangler d1 create swankyboyz_db
   ```

3. **Initialize Schema**
   ```bash
   wrangler d1 execute swankyboyz_db --file=./schema.sql
   ```

4. **Build Your Site**
   ```bash
   npm run build
   ```

5. **Deploy to Pages**
   ```bash
   wrangler pages deploy ./dist --project-name=swankyboyz
   ```

## Environment Variables

Set these in Cloudflare Pages dashboard under **Settings** → **Environment variables**:

- `SITE_URL`: Your production URL (e.g., `https://swankyboyz.com`)
- `JWT_SECRET`: Change from default for production security

## Custom Domain Setup

1. In Cloudflare Pages, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter your domain (e.g., `swankyboyz.com`)
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test article pages with visuals
- [ ] Verify affiliate links work
- [ ] Check image loading and optimization
- [ ] Test on mobile devices
- [ ] Verify SEO meta tags
- [ ] Check accessibility (alt text on images)
- [ ] Monitor Core Web Vitals
- [ ] Submit sitemap to Google Search Console

## Key Features Implemented

✅ **Lightning-fast load time** - Astro static generation with Cloudflare edge deployment
✅ **Smart image/product association** - Automated via `link-media.ts` script
✅ **Robust local media management** - All assets in `/public/assets/` structure
✅ **SEO & affiliate optimizations** - Meta tags, structured data, affiliate tracking
✅ **Data seeding + automation** - One-command database setup with `seed-db`
✅ **Visual content rules** - 3-4 visuals per article minimum with descriptive alt text

## Maintenance

### Adding New Products

1. Add product to `src/data/seed.js`
2. Add product image to `public/assets/products/`
3. Run `npm run link-media && npm run seed-db`

### Adding New Articles

1. Add article to `src/data/seed.js`
2. Add article images to `public/assets/articles/`
3. Run `npm run link-media && npm run seed-db`

### Updating Production Data

For production database updates, use Wrangler:

```bash
wrangler d1 execute swankyboyz_db --command="INSERT INTO ..."
```

Or export/import using:
```bash
# Export
wrangler d1 export swankyboyz_db --output=backup.sql

# Import
wrangler d1 execute swankyboyz_db --file=backup.sql
```

## Troubleshooting

### Build Fails

- Ensure Node.js version is 18+
- Run `npm install` to update dependencies
- Check `npm run build` output for specific errors

### D1 Database Issues

- Verify database ID in `wrangler.toml`
- Check D1 binding name is `DB`
- Ensure schema is initialized with `wrangler d1 execute`

### Missing Visuals

- Run `npm run link-media` before seeding
- Verify images exist in `public/assets/`
- Check `src/data/seed-linked.json` was generated

## Support

For issues:
1. Check build logs in Cloudflare Pages dashboard
2. Review Wrangler CLI output
3. Test locally with `npm run preview:pages`
4. Check Cloudflare D1 console for database queries

---

**Ready to launch!** Your SwankyBoyz affiliate site is production-ready with all features implemented.
