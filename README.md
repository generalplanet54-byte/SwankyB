# SwankyBoyz - Premium Men's Grooming & Lifestyle Platform

A high-performance men's lifestyle website featuring expert grooming advice, product reviews, and curated recommendations. Built with modern web technologies and optimized for search engines.

## 🎯 Project Overview

SwankyBoyz is a premium content platform designed for modern gentlemen seeking expert guidance on grooming, style, and lifestyle. The site features:

- Expert-written articles and reviews
- Hands-on product testing and recommendations
- Amazon affiliate integration for seamless purchasing
- SEO-optimized content for maximum discoverability
- Professional editorial voice and brand consistency

## ✨ Features

- **SEO-Optimized Content**: Comprehensive meta tags, structured data (JSON-LD), and semantic HTML
- **Astro Pages**: Fast, server-rendered pages with optimal performance
- **React Components**: Interactive admin dashboard and dynamic UI elements
- **Responsive Design**: Beautiful dark theme that works perfectly on all devices
- **Amazon Affiliate Integration**: Compliant affiliate link tracking with FTC disclosure
- **Legal Compliance**: Complete privacy policy, terms of service, cookie policy, and affiliate disclosure
- **Performance Optimized**: Lightning-fast page loads with optimized assets
- **Accessibility**: WCAG-compliant markup and keyboard navigation

## 🛠 Tech Stack

- **Frontend**: React 18, TypeScript, Astro, Tailwind CSS
- **Build Tool**: Vite
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Deployment**: Cloudflare Pages (recommended)
- **Analytics**: Cloudflare Analytics

## 📋 Prerequisites

- Node.js 18+ and npm
- Git for version control
- (Optional) Supabase account for database features

## 🚀 Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory (if using database features):

```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
PUBLIC_CF_ANALYTICS_TOKEN=your-cloudflare-analytics-token
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

### 5. Lint Code

```bash
npm run lint
```

## 📁 Project Structure

```
SwankyBoyz/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── admin/          # Admin dashboard components
│   ├── layouts/            # Page layout templates
│   │   └── Layout.astro
│   ├── pages/              # Astro pages (file-based routing)
│   │   ├── index.astro     # Homepage
│   │   ├── articles/       # Article pages
│   │   ├── reviews/        # Product review pages
│   │   ├── contact.astro
│   │   ├── privacy-policy.astro
│   │   ├── terms.astro
│   │   ├── cookie-policy.astro
│   │   └── affiliate-disclosure.astro
│   ├── sections/           # Page sections/blocks
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   └── ProductSpotlights.astro
│   ├── content/           # Markdown content files
│   │   └── products/      # Product reviews in Markdown
│   ├── lib/               # Utilities and helpers
│   │   └── seo/          # SEO utilities
│   └── data/              # Static data files
├── content-strategy/      # Content planning documents
├── public/               # Static assets
├── functions/            # Serverless functions
└── package.json

```

## 📝 Content Management

### Product Reviews

Product reviews are stored as Markdown files in `src/content/products/`. Each file includes:

- Frontmatter with metadata (price, rating, ASIN, SEO data)
- Detailed review content
- Affiliate links
- Product specifications

### Articles

Articles can be managed through:
1. Static data in `src/data/launchArticles.ts`
2. Markdown/MDX files (future implementation)
3. Database integration with Supabase (optional)

### Adding New Content

1. **New Product Review**: Create a new `.md` file in `src/content/products/`
2. **New Article**: Add to the launchArticles array or create a new Astro page
3. **Update Legal Pages**: Edit files in `src/pages/` (privacy-policy.astro, etc.)

## 🚢 Deployment

### Cloudflare Pages (Recommended)

Cloudflare Pages offers free hosting with excellent performance and automatic SSL.

#### Step 1: Push to GitHub

```bash
# Initialize git repository (if not already done)
git init
git add .
git commit -m "Production-ready SwankyBoyz site"
git branch -M main

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

#### Step 2: Connect to Cloudflare Pages

1. Visit [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Click on **Pages** in the sidebar
3. Click **"Create a project"**
4. Select **"Connect to Git"**
5. Choose **GitHub** and authorize Cloudflare
6. Select your repository

#### Step 3: Configure Build Settings

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: (leave empty)
Node version: 18 or higher
```

#### Step 4: Add Environment Variables

In Settings → Environment variables, add:
```
PUBLIC_CF_ANALYTICS_TOKEN=your-token (optional)
```

#### Step 5: Deploy

Click **"Save and Deploy"**. Every push to `main` triggers automatic deployment.

### Custom Domain (Optional)

1. In Cloudflare Pages dashboard, click **"Custom domains"**
2. Click **"Set up a custom domain"**
3. Enter your domain (e.g., `swankyboyz.com`)
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

## 📊 SEO Features

- **Meta Tags**: Comprehensive title, description, and Open Graph tags on all pages
- **Structured Data**: JSON-LD schema markup for articles, products, and organization
- **Sitemap**: Automatically generated sitemap for search engines
- **Semantic HTML**: Proper heading hierarchy and semantic elements
- **Alt Text**: Descriptive alt text for all images
- **Canonical URLs**: Proper canonical tags to prevent duplicate content
- **Social Sharing**: Open Graph and Twitter Card meta tags

## 🔒 Legal Compliance

SwankyBoyz includes comprehensive legal pages:

- **Privacy Policy**: GDPR and CCPA compliant privacy notice
- **Terms of Service**: Complete terms governing site usage
- **Cookie Policy**: Detailed cookie usage and management information
- **Affiliate Disclosure**: FTC-compliant affiliate relationship disclosure

All legal pages are:
- ✅ Written in clear, accessible language
- ✅ Styled to match the brand
- ✅ Regularly updated with current dates
- ✅ Linked in the footer for easy access

## 🎨 Brand Guidelines

### Colors

- **Charcoal** (`#0a0a0a`): Primary background
- **Champagne** (`#f7e7ce`): Accent color for CTAs and highlights
- **Off-White** (`#fafaf9`): Primary text color

### Typography

- **Display Font**: Used for headings and hero text (`.font-display`)
- **Body Font**: Clean, readable font for content
- **Tracking**: Extended letter-spacing for luxury feel

### Voice & Tone

- Professional yet approachable
- Confident without being arrogant
- Educational and helpful
- Refined and sophisticated

## 🤝 Contributing

When contributing to SwankyBoyz:

1. Maintain the established brand voice
2. Follow SEO best practices
3. Ensure all affiliate links include proper disclosures
4. Test responsiveness across devices
5. Run linting before committing: `npm run lint`
6. Build locally to check for errors: `npm run build`

## 📞 Contact

- **Website**: [SwankyBoyz.com](https://swankyboyz.com)
- **Email**: hello@swankyboyz.com
- **Partnerships**: partnerships@swankyboyz.com

## 📄 License

This project is proprietary. All rights reserved.

---

**Last Updated**: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}

Built with ❤️ for modern gentlemen who refuse to settle.
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
# Updated Tue Oct 14 18:28:05 UTC 2025
