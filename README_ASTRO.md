# SwankyBoyz - Astro + Cloudflare Pages + D1

A modern, production-ready men's lifestyle and grooming affiliate site built with Astro, deployed on Cloudflare Pages with D1 database.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Link media to articles (generates seed-linked.json)
npm run link-media

# Build and seed database
npm run build

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

## ⚡ Features

### Core Technology Stack
- **Astro 5.15.3** - Lightning-fast static site generator with SSR
- **Cloudflare Pages** - Global CDN with edge computing
- **Cloudflare D1** - SQLite-based serverless database
- **TailwindCSS** - Utility-first CSS framework
- **Node 20** - Required for Cloudflare Pages compatibility

### Content Management
- ✅ **4 Categorized Articles** (Grooming, Lifestyle, Style)
- ✅ **6 Premium Products** with affiliate links
- ✅ **Smart Visual Linking** - Automatically associates product images with articles
- ✅ **3+ Visuals Per Article** - Complete with descriptive alt text
- ✅ **Local Media Storage** - All assets in `/public/assets/`

### Performance & SEO
- ✅ Server-side rendering
- ✅ Edge-cached content delivery
- ✅ Semantic HTML structure
- ✅ Complete SEO meta tags
- ✅ Open Graph and Twitter Cards
- ✅ Mobile-responsive design

## 📁 Project Structure

```
/
├── public/assets/
│   ├── products/          # 6 product placeholder images (SVG)
│   └── articles/          # 13 article images (SVG)
├── src/
│   ├── data/
│   │   ├── seed.js            # Source data for articles & products
│   │   └── seed-linked.json   # Auto-generated with linked visuals
│   ├── layouts/
│   │   └── Layout.astro       # Main site layout
│   ├── pages/
│   │   ├── index.astro        # Homepage
│   │   └── articles/
│   │       ├── index.astro    # Articles listing (categorized)
│   │       └── [slug].astro   # Dynamic article pages
│   └── sections/              # Reusable page sections
├── scripts/
│   ├── link-media.js          # Links product visuals to articles
│   ├── seed-d1.js             # Seeds D1 database
│   └── create-placeholders.js # Generates placeholder images
├── schema.sql                 # D1 database schema
├── astro.config.mjs           # Astro configuration
├── wrangler.toml              # Cloudflare configuration
└── package.json               # Dependencies and scripts
```

## 🗄️ Database Schema

### Articles Table
```sql
- id: INTEGER PRIMARY KEY
- title: TEXT
- slug: TEXT UNIQUE
- category: TEXT (Grooming, Lifestyle, Style)
- excerpt: TEXT
- content: TEXT (HTML)
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
- affiliate_url: TEXT (Amazon affiliate links)
```

### Article-Product Relationships
```sql
- article_id: INTEGER
- product_id: INTEGER
- PRIMARY KEY (article_id, product_id)
```

## 🔧 Key Scripts

### `npm run link-media`
Intelligently links product visuals to articles:
- Matches products to articles by brand/name mentions
- Ensures minimum 3 visuals per article
- Generates descriptive alt text automatically
- Creates fallback visuals if needed
- Outputs to `src/data/seed-linked.json`

### `npm run build`
Builds the site and automatically:
- Compiles Astro pages to static/SSR output
- Optimizes assets for production
- Seeds the local D1 database (via postbuild)
- Generates production-ready `/dist` folder

### `npm run dev`
Starts development server with:
- Hot module reloading
- Local D1 database instance
- Live preview at `localhost:4321`

## 📝 Adding Content

### Adding Articles

1. Edit `/src/data/seed.js`
2. Add new article object with required fields
3. Run `npm run link-media` to auto-link visuals
4. Run `npm run build` to seed database

Example:
```javascript
{
  title: "Your Article Title",
  slug: "your-article-slug",
  category: "Grooming",
  excerpt: "Brief description...",
  content: `<article class="prose">...</article>`,
  cover_image: "/assets/articles/your-hero.svg",
  visuals: [], // Auto-populated by link-media script
  date: "2025-01-15"
}
```

### Adding Products

1. Edit `/src/data/seed.js`
2. Add product object with affiliate URL
3. Add product image to `/public/assets/products/`
4. Run `npm run link-media` and `npm run build`

Example:
```javascript
{
  name: "Product Name",
  brand: "Brand",
  description: "Product description...",
  image: "/assets/products/product-name.svg",
  affiliate_url: "https://amazon.com/dp/ASIN?tag=your-tag-20"
}
```

## �� Deployment to Cloudflare Pages

### Initial Setup

1. **Create D1 Database**
   ```bash
   npx wrangler d1 create swankyboyz_db
   ```
   Update `wrangler.toml` with the database ID.

2. **Initialize Schema**
   ```bash
   npx wrangler d1 execute swankyboyz_db --file=./schema.sql
   ```

3. **Seed Production Database**
   Build locally first, then manually insert seed data or use wrangler.

4. **Deploy**
   
   Via Cloudflare Dashboard:
   - Connect GitHub repository
   - Build command: `npm run build`
   - Build output: `dist`
   - Add D1 binding in settings
   
   Via CLI:
   ```bash
   npm run build
   npx wrangler pages deploy ./dist --project-name=swankyboyz
   ```

## 📊 Current Content

### Articles (4)
1. **Best Electric Shavers for Men in 2025** (Grooming) - 4 visuals
2. **Top 10 Men's Fragrances That Command Attention** (Grooming) - 3 visuals
3. **Essential Weekend Bags: Style Meets Function** (Lifestyle) - 3 visuals
4. **Classic Sunglasses Every Man Should Own** (Style) - 3 visuals

### Products (6)
- Braun Series 9 Pro Electric Shaver
- Philips Norelco 9000 Prestige
- Panasonic Arc5 Electric Razor
- Tom Ford Oud Wood Eau de Parfum
- Herschel Supply Co. Novel Duffel
- Ray-Ban Aviator Classic

All with SVG placeholder images ready for real product photos.

## 🎨 Design System

- **Charcoal Background**: #161616
- **Off-White Text**: #f5f5f5
- **Champagne Accent**: #d4af37
- **Font Display**: Playfair Display (serif)
- **Font Body**: Inter (sans-serif)

## 🔐 Security

- No secrets in repository
- Environment variables for sensitive data
- Parameterized database queries
- Input validation on dynamic routes
- Production-safe database seeding (skipped in CF_PAGES env)

## 📈 Next Steps

To make production-ready:

1. **Replace placeholder images** with real product photos
2. **Update affiliate URLs** with your Amazon Associate tag
3. **Add more articles** (aim for 15-25)
4. **Expand product catalog** (30-50 products)
5. **Set up analytics** (Google Analytics, Cloudflare)
6. **Configure custom domain**
7. **Submit sitemap** to search engines

## 🤝 Integration Points

### Google Sheets (from PR #21)
- Can be integrated for content management
- Auto-sync articles and products from Sheets
- Weekly automated content updates

### Cloudflare Pages Deployment (from PR #19)
- Node 20 compatibility ✅
- Integrated sitemap generation
- Fixed lastmod dates
- Optimized build process

## 📄 License

All rights reserved © 2025 SwankyBoyz

---

Built with ❤️ using Astro, Cloudflare Pages, and modern web technologies.
