# SwankyBoyz Deployment Quick Start Guide
**Last Updated:** November 2, 2025  
**Target:** Production deployment to Cloudflare Pages

---

## 🚀 Fast Track: Deploy in 3 Steps

### Prerequisites
✅ Cloudflare account with Pages access  
✅ GitHub repository connected  
✅ Node.js 18+ installed locally

### Step 1: Configure Secrets (5 minutes)

**GitHub Secrets** (Settings → Secrets and variables → Actions):
```
CF_API_TOKEN=your-cloudflare-api-token
CF_ACCOUNT_ID=your-cloudflare-account-id
JWT_SECRET=$(openssl rand -base64 32)
```

**Cloudflare Pages Environment Variables** (Pages → swankyb → Settings):
```
Production & Preview:
JWT_SECRET=same-value-as-github
D1_DATABASE_ID=bfc16265-30bd-4bcf-8a72-f2a5a5baf61a
```

### Step 2: Initialize Database (5 minutes)

```bash
# Install wrangler globally
npm install -g wrangler@latest

# Login to Cloudflare
wrangler login

# Run migrations in production
wrangler d1 execute swankyb_content --file=./migrations/d1/001_initial_schema.sql --remote
wrangler d1 execute swankyb_content --file=./migrations/d1/002_seed_first_articles.sql --remote
wrangler d1 execute swankyb_content --file=./migrations/d1/009_add_comprehensive_product_catalog.sql --remote
```

### Step 3: Deploy (2 minutes)

**Option A: Automated (Recommended)**
```bash
git push origin main
# GitHub Actions handles the rest!
# Monitor at: https://github.com/generalplanet54-byte/SwankyB/actions
```

**Option B: Automated Script**
```bash
./deploy-to-production.sh
# Follow the interactive prompts
```

**Option C: Manual via CLI**
```bash
npm run build
wrangler pages deploy ./dist --project-name=swankyb --branch=main
```

---

## 🎯 Your site will be live at:
**https://swankyb.pages.dev**

---

## 📋 Post-Deployment Checklist

### Immediate (First Hour)
- [ ] Visit https://swankyb.pages.dev and verify homepage loads
- [ ] Test products page: /products
- [ ] Test articles page: /articles
- [ ] Test admin login: /admin (netmin / P@ssW#rd)
- [ ] **Change default admin password immediately!**
- [ ] Verify API endpoints work (check browser console)

### First Day
- [ ] Set up custom domain (if you have one)
- [ ] Configure Google Analytics 4
- [ ] Submit sitemap to Google Search Console
- [ ] Test newsletter signup form
- [ ] Verify all images load correctly

### First Week
- [ ] Connect email service (ConvertKit/Klaviyo)
- [ ] Enable welcome email sequence
- [ ] Run Lighthouse audit: `node scripts/lighthouse-audit.js`
- [ ] Monitor Core Web Vitals in GA4
- [ ] Create first A/B test

---

## 🔧 Troubleshooting

### "500 Internal Server Error on API endpoints"
**Cause:** JWT_SECRET not set  
**Fix:** Add JWT_SECRET to Cloudflare Pages environment variables

### "Database not configured" errors
**Cause:** D1 database not initialized  
**Fix:** Run the migrations (see Step 2 above)

### "Admin login fails"
**Cause:** JWT_SECRET mismatch or not set  
**Fix:** Verify JWT_SECRET is identical in GitHub and Cloudflare Pages

### Build fails in GitHub Actions
**Cause:** Missing dependencies or configuration  
**Fix:** Check Actions logs, verify all secrets are set

### Images not loading
**Cause:** Missing assets or incorrect paths  
**Fix:** Check `/public/assets/` directory, verify image filenames

---

## 📊 Success Indicators

Your deployment is successful when:
✅ Homepage returns HTTP 200  
✅ API endpoints return data (not 500/404)  
✅ Admin login works  
✅ Images load without 404s  
✅ Lighthouse score >80  

---

## 🔐 Critical Security Steps

**DO THESE IMMEDIATELY AFTER DEPLOYMENT:**

1. **Change Admin Password**
   - Login at /admin
   - Use default credentials: netmin / P@ssW#rd
   - Change password immediately in admin panel

2. **Review Environment Variables**
   - Ensure JWT_SECRET is strong (32+ characters)
   - Never commit secrets to Git
   - Use different secrets for staging/production

3. **Enable Monitoring**
   - Set up Cloudflare alerts
   - Configure GA4 notifications
   - Monitor error rates daily

---

## 📚 Additional Resources

- **Full Assessment Report:** `DEPLOYMENT_ASSESSMENT_REPORT.md`
- **Production Checklist:** `PRODUCTION_READY_CHECKLIST.md`
- **Detailed Deployment Guide:** `PRODUCTION_DEPLOYMENT_GUIDE.md`
- **Performance Guide:** `PERFORMANCE_OPTIMIZATION_GUIDE.md`

---

## 🆘 Need Help?

**Check these first:**
1. GitHub Actions logs: Repository → Actions tab
2. Cloudflare Pages logs: Dashboard → Pages → swankyb → Functions
3. Browser console: F12 → Console tab
4. Network tab: F12 → Network (check failed requests)

**Common Commands:**
```bash
# Check build locally
npm run build

# Test database locally
sqlite3 swankyboyz.db "SELECT * FROM products LIMIT 3;"

# View deployment status
wrangler pages deployment list --project-name=swankyb

# Check wrangler authentication
wrangler whoami

# Re-authenticate
wrangler login
```

---

## ⚡ Quick Commands Reference

```bash
# Development
npm run dev              # Start dev server
npm run build            # Build for production
npm run lint             # Run linter

# Database
npm run sync             # Sync from Google Sheets
npm run validate-images  # Check image assets

# Deployment
./deploy-to-production.sh              # Interactive deployment
wrangler pages deploy ./dist           # Direct deployment
git push origin main                   # Trigger GitHub Actions

# Testing
node scripts/lighthouse-audit.js       # Performance audit
curl https://swankyb.pages.dev/       # Test homepage
curl https://swankyb.pages.dev/api/products-d1  # Test API
```

---

## 🎉 You're Ready to Launch!

Your SwankyBoyz platform is production-ready with:
- ✅ 9/10 feature tasks complete
- ✅ SEO-optimized comparison pages
- ✅ Email marketing system
- ✅ Performance monitoring
- ✅ A/B testing framework
- ✅ Comprehensive documentation

**Deployment Time:** ~15 minutes total  
**Risk Level:** Low  
**Status:** ✅ READY FOR PRODUCTION

---

**Generated:** November 2, 2025  
**Version:** 1.0  
**Next Review:** Post-deployment (7 days)
