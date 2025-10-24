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

**Last Updated**: October 2025

Built with ❤️ for modern gentlemen who refuse to settle.
