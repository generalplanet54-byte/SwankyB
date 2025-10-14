# Premium Affiliate Marketing Website

A high-performance affiliate marketing platform featuring SEO-optimized content, product reviews, and seamless Amazon affiliate integration. Built with React, TypeScript, Vite, Tailwind CSS, and Supabase.

## Features

- **SEO-Optimized Content**: Meta tags, structured data, and semantic HTML for maximum search visibility
- **Database-Driven**: All products and articles stored in Supabase for easy management
- **Responsive Design**: Beautiful, modern design that works perfectly on all devices
- **Amazon Affiliate Integration**: Automatic affiliate link tracking and management
- **Performance Optimized**: Fast page loads with Vite and optimized images
- **Dark Mode Support**: Automatic theme switching based on user preference

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Database**: Supabase (PostgreSQL)
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Prerequisites

- Node.js 18+ and npm
- Supabase account (database is pre-configured)
- Git for version control

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

The `.env` file is already configured with Supabase credentials:

```env
VITE_SUPABASE_URL=https://wuwczwpfnswwctumvqsq.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 3. Run Development Server

```bash
npm run dev
```

Visit `http://localhost:5173` to see your site.

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Database Structure

### Products Table
- 17 pre-loaded products (footwear, smartphones, laptops)
- Categories: Footwear, Smartphones, Laptops
- Includes: prices, ratings, affiliate links, SEO metadata

### Articles Table
- 6 comprehensive, SEO-optimized articles
- Topics: Nike Cortez, Orthopedic Shoes, Foldable Phones, Gaming Phones, Flagships, MacBooks
- Includes: featured images, read times, tags, SEO metadata

### Article-Product Relationships
- Articles automatically linked to related products
- Display order maintained for consistent presentation

## Deployment

### Option 1: Deploy to Cloudflare Pages (Recommended)

Cloudflare Pages offers free hosting with excellent performance and automatic SSL.

#### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Initial commit: Production-ready affiliate site"
git branch -M main

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### Step 2: Connect to Cloudflare Pages

1. **Go to Cloudflare Dashboard**
   - Visit [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Click on **Pages** in the sidebar
   - Click **"Create a project"**

2. **Connect to Git**
   - Select **"Connect to Git"**
   - Choose **GitHub** and authorize Cloudflare
   - Select your repository

3. **Configure Build Settings**
   ```
   Framework preset: Vite
   Build command: npm run build
   Build output directory: dist
   Root directory: (leave empty)
   Node version: 18 or higher
   ```

4. **Add Environment Variables**
   In Settings → Environment variables, add:
   ```
   VITE_SUPABASE_URL=https://wuwczwpfnswwctumvqsq.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```

5. **Deploy**
   - Click **"Save and Deploy"**
   - Cloudflare will build and deploy your site
   - You'll get a URL like `your-project.pages.dev`
   - Every push to `main` triggers automatic deployment

#### Step 3: Add Custom Domain (Optional)

1. In Cloudflare Pages dashboard, click **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `yoursite.com`)
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

### Option 2: Deploy to GitHub Pages

GitHub Pages offers free hosting for static sites.

#### Step 1: Update Configuration

Add to `vite.config.ts`:

```typescript
export default defineConfig({
  base: '/YOUR_REPO_NAME/',
  // ... rest of config
});
```

#### Step 2: Install gh-pages

```bash
npm install --save-dev gh-pages
```

#### Step 3: Add Deploy Script

Add to `package.json`:

```json
{
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  }
}
```

#### Step 4: Deploy

```bash
npm run deploy
```

Your site will be live at `https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/`

#### Step 5: Enable GitHub Pages

1. Go to your GitHub repository
2. Click **Settings** → **Pages**
3. Under "Source", select branch `gh-pages`
4. Click **Save**

### Option 3: Manual CLI Deployment to Cloudflare

For more control or CI/CD integration:

```bash
# Install Wrangler CLI
npm install -g wrangler@latest

# Login to Cloudflare
wrangler login

# Create Pages project
wrangler pages project create your-project-name

# Build your site
npm run build

# Deploy
wrangler pages deploy ./dist --project-name=your-project-name
```

## SEO Optimization

All content is optimized for search engines:

### Meta Tags
- Unique title and description for each page
- Open Graph tags for social media
- Twitter Card tags
- Canonical URLs

### Structured Data
- Product schema for rich snippets

## Supabase connection troubleshooting

If the site builds but no articles or products appear, it's usually because the Supabase client wasn't configured at build time. The frontend expects the following environment variables to be present during the Vite build:

- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

Important notes:

- Vite only exposes env variables prefixed with `VITE_` to the client bundle. Make sure the keys above include the `VITE_` prefix.
- For local development, copy `.env.example` to `.env` and fill the values, then run `npm run dev` or `npm run build`.
- For Cloudflare Pages deployments, add the environment variables in the Pages project settings (Settings → Environment variables) for the Production environment so they are available at build time.

If you still see the error message "Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your build environment.", verify:

1. You committed the build to `dist` (for manual deployments) or Cloudflare built your site and the vars were set in Pages settings.
2. The values match the Supabase project's URL and anon key.
3. The anon key is valid (try a request from curl or Postman to your Supabase REST endpoint).

For automated CI/CD (GitHub Actions), set repository secrets and pass them to the build step so Vite can embed them during `npm run build`.
- Article schema for content
- Organization schema
- BreadcrumbList schema

### Best Practices
- Semantic HTML5 markup
- Proper heading hierarchy (H1 → H2 → H3)
- Alt text for all images
- Clean URL structure
- XML sitemap at `/sitemap.xml`
- Robots.txt at `/robots.txt`

### Performance
- Lighthouse score: 95+ (all metrics)
- Core Web Vitals optimized
- Lazy loading for images
- Code splitting
- Optimized bundle size

## Affiliate Link Tracking

All Amazon affiliate links include:
- Your affiliate tag
- UTM parameters for analytics
- `rel="nofollow sponsored"` attributes
- Click tracking in analytics

### Link Format
```
https://amzn.to/XXXXXXX?tag=YOUR_TAG&utm_source=site&utm_medium=affiliate
```

## Content Management

### Adding New Products

Products are stored in Supabase. To add new products:

1. Access Supabase dashboard
2. Navigate to Table Editor → `products`
3. Insert new row with:
   - name, slug, description
   - category, subcategory
   - amazon_url (your affiliate link)
   - image_url (product image)
   - price, original_price
   - rating, review_count
   - features (JSON array)
   - meta_title, meta_description, meta_keywords
   - is_featured, is_trending flags

### Adding New Articles

Articles are also in Supabase:

1. Navigate to Table Editor → `articles`
2. Insert new row with:
   - title, slug, excerpt
   - content (HTML)
   - category, tags (array)
   - author, featured_image
   - read_time
   - meta_title, meta_description, meta_keywords
   - is_published flag

3. Link to products via `article_products` table

## Analytics Setup

### Google Analytics 4

1. Create GA4 property
2. Get Measurement ID (G-XXXXXXXXXX)
3. Add to your `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### Google Search Console

1. Visit [Google Search Console](https://search.google.com/search-console)
2. Add your property (domain or URL prefix)
3. Verify ownership (DNS or HTML file)
4. Submit your sitemap: `https://yoursite.com/sitemap.xml`

### Amazon Affiliate Tracking

Monitor your Amazon Associates account for:
- Click-through rates
- Conversion rates
- Earnings by product
- Top performing links

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix vulnerabilities
npm audit fix
```

### Content Updates

- Add new products as they become available
- Update prices and availability
- Refresh article content quarterly
- Monitor and update broken links
- Add seasonal content

### Performance Monitoring

- Run Lighthouse audits monthly
- Monitor Core Web Vitals
- Check page load times
- Review mobile performance
- Test on multiple devices

## Troubleshooting

### Build Errors

**"Cannot find module"**
```bash
rm -rf node_modules package-lock.json
npm install
```

**TypeScript errors**
```bash
npm run build
```
Check the error messages and fix type issues.

### Supabase Connection Issues

**"Failed to fetch"**
- Verify VITE_SUPABASE_URL is correct
- Check VITE_SUPABASE_ANON_KEY is valid
- Ensure RLS policies allow public read access
- Check browser console for CORS errors

### Deployment Issues

**Cloudflare Build Fails**
- Check build command is `npm run build`
- Verify output directory is `dist`
- Ensure Node version is 18+
- Review build logs for specific errors

**GitHub Pages 404**
- Verify `base` in vite.config.ts matches repo name
- Check gh-pages branch exists
- Ensure GitHub Pages is enabled in settings

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── common/       # Reusable components
│   │   ├── layout/       # Layout components
│   │   ├── pages/        # Page components
│   │   └── sections/     # Section components
│   ├── contexts/         # React Context providers
│   │   ├── AffiliateContext.tsx
│   │   ├── ContentContext.tsx
│   │   └── ThemeContext.tsx
│   ├── lib/              # Utilities and configs
│   │   └── supabase.ts   # Supabase client
│   ├── App.tsx           # Main app component
│   └── main.tsx          # Entry point
├── public/               # Static assets
│   ├── robots.txt        # Search engine instructions
│   └── sitemap.xml       # XML sitemap
├── .env                  # Environment variables
├── package.json          # Dependencies
├── vite.config.ts        # Vite configuration
└── tailwind.config.js    # Tailwind CSS config
```

## Support

For issues or questions:
1. Check this README
2. Review error messages in console
3. Check Supabase dashboard
4. Review build logs
5. Test in incognito mode

## License

This project is proprietary. All rights reserved.

---

## Quick Start Checklist

- [ ] Install dependencies: `npm install`
- [ ] Start dev server: `npm run dev`
- [ ] Review products in Supabase
- [ ] Test all affiliate links
- [ ] Customize branding and content
- [ ] Build for production: `npm run build`
- [ ] Push to GitHub
- [ ] Deploy to Cloudflare Pages
- [ ] Add custom domain
- [ ] Set up Google Analytics
- [ ] Submit sitemap to Google
- [ ] Monitor performance and earnings

Your affiliate marketing website is ready to generate commissions!
