# Premium Affiliate Marketing Website

A high-performance affiliate marketing platform featuring SEO-optimized content, product reviews, and seamless Amazon affiliate integration. Built with React, TypeScript, Vite, Tailwind CSS, and Cloudflare D1.

## Features

- **SEO-Optimized Content**: Meta tags, structured data, and semantic HTML for maximum search visibility
- **Database-Driven**: All products and articles stored in Cloudflare D1 for easy management
- **Responsive Design**: Beautiful, modern design that works perfectly on all devices
- **Amazon Affiliate Integration**: Automatic affiliate link tracking and management
- **Performance Optimized**: Fast page loads with Vite and optimized images
- **Dark Mode Support**: Automatic theme switching based on user preference

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Build Tool**: Vite
- **Database**: Cloudflare D1
- **Icons**: Lucide React
- **Routing**: React Router DOM

## Prerequisites

- Node.js 18+ and npm
- Cloudflare Account
- Git for version control

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

This project uses Cloudflare D1. The `wrangler.toml` file is configured to use a D1 database named `DB`.

### 3. Run Development Server

```bash
npm run dev
```

This will start the Vite development server and the Wrangler server for Cloudflare functions and D1 access. Visit `http://localhost:8788` to see your site.

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist` directory.

## Database Structure

### Products Table
- Pre-loaded products
- Categories: Footwear, Smartphones, Laptops
- Includes: prices, ratings, affiliate links, SEO metadata

### Articles Table
- Comprehensive, SEO-optimized articles
- Includes: featured images, read times, tags, SEO metadata

### Article-Product Relationships
- Articles automatically linked to related products
- Display order maintained for consistent presentation

## Deployment

### Deploy to Cloudflare Pages (Recommended)

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

4. **Add D1 Database Binding**
   In your Pages project settings, go to **Settings > Functions > D1 database bindings**.
   - Click **Add binding**.
   - **Variable name**: `DB`
   - **D1 database**: Select your D1 database.

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

### Manual CLI Deployment to Cloudflare

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

## Content Management

### Adding New Products

Products are stored in the D1 database. To add new products, you can either add them directly to the database or create a new migration file in `migrations/d1`.

### Adding New Articles

Articles are also in the D1 database. To add new articles, you can either add them directly to the database or create a new migration file in `migrations/d1`.

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

#### Understanding GA4 Tracking Responses

**Important:** Google Analytics 4 tracking requests return HTTP status code **204 No Content**. This is **NOT an error** - it's the expected and correct behavior:

- **Status 204** = Successful data collection
- The 204 response confirms that Google's servers have received and processed your tracking data
- No response body is needed for tracking beacons, hence "No Content"
- This applies to all GA4 requests to `/g/collect` endpoint

**What you'll see in browser DevTools:**
- Network tab will show requests to `https://www.google-analytics.com/g/collect`
- Status: `204 No Content` (this is SUCCESS, not an error)
- Request includes: page views, events, Core Web Vitals metrics (CLS, FID, LCP, INP)
- Timing: The request duration is normal and doesn't block page rendering

**Common misconception:** Some developers mistakenly treat 204 as an error because it's not 200 OK. However, for analytics beacons, 204 is the preferred response as it indicates successful processing without unnecessary response data.

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
# Updated Tue Oct 14 18:28:05 UTC 2025
