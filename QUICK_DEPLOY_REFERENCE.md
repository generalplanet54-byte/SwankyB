# Quick Deploy Reference for Cloudflare Pages

## ⚡ Quick Start

### 1. Cloudflare Pages Dashboard Settings
```
Framework preset:       Vite
Build command:          npm run build
Build output directory: dist
Node version:           20 (auto-detected from .node-version)
```

### 2. Required Environment Variables
```
VITE_SUPABASE_URL       = your-supabase-url
VITE_SUPABASE_ANON_KEY  = your-supabase-anon-key
```

### 3. Deploy
Push to main branch → Automatic deployment ✅

---

## 🔧 Manual Deploy Commands

```bash
# Install dependencies
npm ci

# Build project (includes sitemap generation)
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy ./dist --project-name=swankyb
```

---

## ✅ Verify Deployment

After deployment, check:
- [ ] Homepage loads: `https://your-project.pages.dev/`
- [ ] Sitemap accessible: `https://your-project.pages.dev/sitemap.xml`
- [ ] No 'undefined' values in sitemap
- [ ] Articles load correctly
- [ ] Products load correctly
- [ ] Images display properly

---

## 🐛 Troubleshooting

**Build fails with "Unsupported engine"**
→ Verify `.node-version` contains `20`

**Sitemap has undefined values**
→ Run `npm run build` locally and check `dist/sitemap.xml`

**Missing environment variables**
→ Add them in Cloudflare Pages dashboard under Settings > Environment variables

**D1 database errors**
→ D1 is disabled in wrangler.toml (project uses Supabase)

---

## 📝 What Changed

✅ Node version: 22 → 20 (broader compatibility)
✅ Build script: Now includes sitemap generation
✅ Sitemap: Fixed undefined dates
✅ D1 binding: Commented out (not used)
✅ CI workflows: Use .node-version file

---

## 📚 Full Documentation

- Detailed setup: `CLOUDFLARE_PAGES_SETUP.md`
- Complete solution: `DEPLOYMENT_SOLUTION_SUMMARY.md`
- Main README: `README.md`
