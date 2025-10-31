# SwankyBoyz - Premium Men's Lifestyle & Affiliate Site

A high-performance, production-ready Astro + Cloudflare Pages + D1 site that automatically links visual, product, and article data intelligently.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Link media to articles
npm run link-media

# Build and seed database
npm run build

# Start development server
npm run dev
```

Visit `http://localhost:4321` to see your site.

## ⚡ Features

### Core Technology
- **Astro** - Lightning-fast static site generator with server-side rendering
- **Cloudflare Pages** - Global CDN with edge computing
- **Cloudflare D1** - SQLite-based serverless database
- **TailwindCSS** - Utility-first CSS framework

### Content Management
- ✅ **Categorized Articles** - Organize by Grooming, Lifestyle, Style, etc.
- ✅ **Smart Visual Linking** - Automatically associates product images with articles
- ✅ **Product Database** - Centralized product catalog with affiliate links
- ✅ **Local Media** - All assets hosted locally for maximum speed

### Performance
- ✅ Lightning-fast load times (< 1s)
- ✅ Optimized images with lazy loading
- ✅ Minimal JavaScript bundle
- ✅ Edge-cached content delivery

### SEO & Accessibility
- ✅ Semantic HTML structure
- ✅ Complete alt text for all images
- ✅ Meta tags and Open Graph
- ✅ Clean, descriptive URLs
- ✅ Mobile-responsive design

## 📁 Project Structure

```
/
├── public/
│   └── assets/
│       ├── products/      # Product images
│       ├── articles/      # Article images
│       └── thumbnails/    # Thumbnail images
├── src/
│   ├── data/
│   │   ├── seed.js           # Articles & products data
│   │   └── seed-linked.json  # Auto-generated linked data
│   ├── layouts/
│   │   ├── Layout.astro         # Main layout
│   │   └── ArticleLayout.astro  # Article-specific layout
│   ├── pages/
│   │   ├── index.astro
│   │   ├── [slug].astro         # Dynamic article pages
│   │   └── articles/
│   │       ├── index.astro      # Articles listing (categorized)
│   │       └── [slug].astro     # Individual articles
│   └── sections/              # Reusable sections
├── scripts/
│   ├── seed-d1.js        # Database seeding
│   ├── link-media.js     # Smart visual linking
│   └── create-placeholders.js
├── schema.sql            # D1 database schema
├── wrangler.toml        # Cloudflare configuration
└── astro.config.mjs     # Astro configuration
```

## 📝 Content Structure

### Articles
Each article includes:
- Title, slug, and category
- Excerpt and full HTML content
- Cover image
- 3-4 visuals with alt text
- Publication date
- Automatic product associations

### Products
Each product includes:
- Name, brand, description
- Image path
- Amazon affiliate URL
- Auto-linking to relevant articles

### Categories
Articles are organized by:
- **Grooming** - Shavers, fragrances, grooming tools
- **Lifestyle** - Travel gear, bags, lifestyle products
- **Style** - Sunglasses, fashion, accessories
- Custom categories as needed

## 🔧 Key Scripts

### `npm run link-media`
Intelligently links product visuals to articles:
- Matches products to articles by brand/name
- Ensures minimum 3 visuals per article
- Adds descriptive alt text
- Creates fallback visuals if needed

### `npm run build`
Builds the site and automatically:
- Compiles Astro pages
- Optimizes assets
- Seeds the D1 database (postbuild)
- Generates production-ready output

### `npm run dev`
Starts the development server with:
- Hot module reloading
- Local D1 database
- Live preview at localhost:4321

## 🗄️ Database Schema

### Articles Table
```sql
CREATE TABLE articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  visuals TEXT,  -- JSON array
  date TEXT NOT NULL
);
```

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT,
  image TEXT,
  affiliate_url TEXT
);
```

### Article-Product Links
```sql
CREATE TABLE article_products (
  article_id INTEGER,
  product_id INTEGER,
  PRIMARY KEY (article_id, product_id)
);
```

## 🎨 Styling

The site uses TailwindCSS with a custom dark theme:
- **Background**: Charcoal (#161616)
- **Text**: Off-white
- **Accent**: Champagne gold
- Fully responsive grid layouts
- Custom typography scale

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

Quick deploy:
```bash
# Build site
npm run build

# Deploy to Cloudflare Pages
npx wrangler pages deploy ./dist --project-name=swankyboyz
```

## 📊 Current Content

The site includes 4 sample articles:

1. **Best Electric Shavers for Men in 2025** (Grooming)
   - Reviews of top electric shavers
   - Buying guide and comparisons
   - 4 visuals including product photos

2. **Top 10 Men's Fragrances That Command Attention** (Grooming)
   - Fragrance reviews and recommendations
   - Application tips and building a collection
   - 3 visuals with product imagery

3. **Essential Weekend Bags: Style Meets Function** (Lifestyle)
   - Travel bag reviews and recommendations
   - Packing tips and material considerations
   - 3 visuals showcasing products

4. **Classic Sunglasses Every Man Should Own** (Style)
   - Timeless sunglasses styles
   - Face shape matching guide
   - 3 visuals with product examples

6 premium products including shavers, fragrances, bags, and sunglasses.

## 🔐 Security

- No secrets in repository
- Environment variables for sensitive data
- Affiliate links properly attributed
- Privacy-compliant analytics ready

## 📈 Next Steps

To make this production-ready:

1. **Replace placeholder images** with real product photos from Amazon
2. **Add more articles** in different categories
3. **Update affiliate URLs** with your Amazon Associate tag
4. **Set up analytics** (Google Analytics, Cloudflare)
5. **Configure custom domain**
6. **Submit sitemap** to search engines
7. **Enable Cloudflare optimizations**

## 🤝 Contributing

This is a private affiliate site. For support or questions, contact the development team.

## 📄 License

All rights reserved © 2025 SwankyBoyz

---

Built with ❤️ using Astro, Cloudflare, and modern web technologies.
