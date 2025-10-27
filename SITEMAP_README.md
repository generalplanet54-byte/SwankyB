# SwankyBoyz Sitemap Management

## 📍 Sitemap Location & URLs

### Production Sitemap URLs
- **Main Sitemap**: `https://swankyboyz.com/sitemap.xml`
- **Preview Sitemap**: `https://faa63d6f.swankyb.pages.dev/sitemap.xml`

### File Location
- **Local Path**: `/workspaces/SwankyB/public/sitemap.xml`
- **Deployed Path**: `/public/sitemap.xml` (served at root)

---

## 🔄 Generating the Sitemap

### Quick Generation
```bash
node scripts/generate-sitemap.js
```

### Full Build (includes sitemap generation)
```bash
npm run build
```

### What Gets Generated

The script automatically scans and includes:
- ✅ **Static Pages**: Homepage, Articles listing, Privacy Policy
- ✅ **Articles**: All articles from `src/data/launchArticles.ts`
- ✅ **Product Reviews**: All markdown files in `src/content/products/`
- ✅ **Categories**: Dynamically extracted from articles and products
- ✅ **Last Modified Dates**: Automatically tracked from file metadata

---

## 📊 Current Sitemap Statistics

**Last Generated**: October 26, 2025

### Total URLs: 31

**Breakdown by Type:**
- **Static Routes**: 3 (Homepage, Articles, Privacy Policy)
- **Article Routes**: 9 (Grooming guides, reviews, comparisons)
- **Product Routes**: 9 (New reviews + existing products)
- **Category Routes**: 10 (Grooming, Smartphones, Laptops, etc.)

### New Product Reviews Added (October 2025)
1. ✅ Samsung Galaxy S25 Ultra (`/products/samsung-galaxy-s25-ultra`)
2. ✅ MacBook Pro 16" M4 Pro (`/products/macbook-pro-16-m4-pro`)
3. ✅ Braun Series 9 PRO+ (`/products/braun-series-9-pro-plus`)
4. ✅ Garmin fēnix 8 AMOLED Sapphire (`/products/garmin-fenix-8-amoled-sapphire`)
5. ✅ ASUS ROG Strix G18 (`/products/asus-rog-strix-g18`)

### New Categories Added
- Smartphones (Samsung S25 Ultra)
- Laptops (MacBook Pro, ASUS ROG)
- Smartwatches (Garmin fēnix 8)

---

## 🚀 Submit to Search Engines

### 🟢 Google Search Console

**Submission URL for Google:**
```
https://search.google.com/search-console?resource_id=https://swankyboyz.com
```

**Steps:**
1. **Login**: [Google Search Console](https://search.google.com/search-console)
2. **Select Property**: Choose `swankyboyz.com`
3. **Navigate**: Sidebar → **Sitemaps**
4. **Add Sitemap**:
   - Enter: `sitemap.xml`
   - Click: **Submit**
5. **Verify**: Check status shows "Success"

**Expected Result:**
- Status: ✅ Success
- Discovered URLs: 31
- Last read: [Current date]

---

### 🔵 Bing Webmaster Tools

**Submission URL for Bing:**
```
https://www.bing.com/webmasters/sitemaps?siteUrl=https://swankyboyz.com
```

**Steps:**
1. **Login**: [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. **Select Site**: Choose `swankyboyz.com`
3. **Navigate**: **Sitemaps** → **Submit Sitemap**
4. **Add Sitemap**:
   - Full URL: `https://swankyboyz.com/sitemap.xml`
   - Click: **Submit**
5. **Verify**: Status shows "Submitted"

---

### 🟡 Yandex Webmaster

**Submission URL:**
```
https://webmaster.yandex.com/sites/https:swankyboyz.com:443/sitemap/
```

**Steps:**
1. Login to [Yandex Webmaster](https://webmaster.yandex.com)
2. Add sitemap URL: `https://swankyboyz.com/sitemap.xml`
3. Click "Add"

---

## ✅ Validation & Testing

### 1. Validate XML Structure
**Tool**: [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

**Steps:**
1. Visit validator
2. Enter: `https://swankyboyz.com/sitemap.xml`
3. Click "Validate"
4. Verify: No errors

### 2. Test Accessibility
```bash
# Test sitemap loads correctly
curl -I https://swankyboyz.com/sitemap.xml

# Expected: HTTP/1.1 200 OK
# Content-Type: application/xml
```

### 3. Google's Rich Results Test
**URL**: `https://search.google.com/test/rich-results`

**Steps:**
1. Enter any product URL (e.g., `https://swankyboyz.com/products/samsung-galaxy-s25-ultra`)
2. Test for valid structured data

---

## 📋 Complete URL List (31 Total)

### Static Pages (3)
1. `https://swankyboyz.com/` (Priority: 1.0)
2. `https://swankyboyz.com/articles` (Priority: 0.8)
3. `https://swankyboyz.com/privacy-policy` (Priority: 0.4)

### Article Pages (9)
4. `https://swankyboyz.com/article/best-all-in-one-mens-grooming-trimmer-kits-2024`
5. `https://swankyboyz.com/article/braun-series-9-pro-vs-series-8-electric-shaver-review`
6. `https://swankyboyz.com/article/complete-guide-premium-mens-grooming`
7. `https://swankyboyz.com/article/complete-modern-gentlemans-grooming-guide-essential-tools`
8. `https://swankyboyz.com/article/luxury-fragrances-modern-gentleman-guide`
9. `https://swankyboyz.com/article/premium-skincare-luxury-beauty-products-review`
10. `https://swankyboyz.com/article/premium-wireless-earbuds-2024-audio-guide`
11. `https://swankyboyz.com/article/travel-grooming-essentials-portable-shavers-guide`
12. `https://swankyboyz.com/article/ultimate-mens-wallet-guide-premium-leather`

### Product Pages (9)
13. `https://swankyboyz.com/products/asus-rog-strix-g18` ⭐ NEW
14. `https://swankyboyz.com/products/braun-series-9-pro-plus` ⭐ NEW
15. `https://swankyboyz.com/products/clinique-max-hydrator`
16. `https://swankyboyz.com/products/garmin-fenix-8-amoled-sapphire` ⭐ NEW
17. `https://swankyboyz.com/products/herman-miller-aeron`
18. `https://swankyboyz.com/products/jack-black-eye-rescue`
19. `https://swankyboyz.com/products/kiehls-age-defender`
20. `https://swankyboyz.com/products/macbook-pro-16-m4-pro` ⭐ NEW
21. `https://swankyboyz.com/products/samsung-galaxy-s25-ultra` ⭐ NEW

### Category Pages (10)
22. `https://swankyboyz.com/category/accessories`
23. `https://swankyboyz.com/category/audio`
24. `https://swankyboyz.com/category/fragrance`
25. `https://swankyboyz.com/category/grooming`
26. `https://swankyboyz.com/category/laptops` ⭐ NEW
27. `https://swankyboyz.com/category/men-s-skincare`
28. `https://swankyboyz.com/category/office-furniture`
29. `https://swankyboyz.com/category/skincare`
30. `https://swankyboyz.com/category/smartphones` ⭐ NEW
31. `https://swankyboyz.com/category/smartwatches` ⭐ NEW

---

## 🔧 Troubleshooting

### Issue: Sitemap generation fails

**Solution:**
```bash
# Install missing dependency
npm install gray-matter

# Regenerate sitemap
node scripts/generate-sitemap.js
```

### Issue: Product reviews not showing in sitemap

**Checklist:**
- ✅ File exists in `src/content/products/[slug].md`
- ✅ Frontmatter has `published: true` (or no `published` field)
- ✅ File has valid YAML frontmatter
- ✅ Regenerate sitemap after adding content

### Issue: Google reports sitemap errors

**Common Causes:**
1. **404 Error**: Ensure sitemap is deployed (`/public/sitemap.xml`)
2. **Invalid URLs**: Verify all routes actually exist
3. **XML Syntax**: Validate XML structure
4. **Robots.txt**: Ensure not blocking sitemap

**Check robots.txt:**
```bash
curl https://swankyboyz.com/robots.txt
```

Expected content:
```
User-agent: *
Allow: /

Sitemap: https://swankyboyz.com/sitemap.xml
```

---

## 🎯 Best Practices

### 1. Update Frequency
- **After adding new content**: Regenerate immediately
- **Regular schedule**: Weekly regeneration for date updates
- **Before deployment**: Always regenerate before pushing to production

### 2. Priority Guidelines
- **1.0**: Homepage only
- **0.8**: Important listings (articles page)
- **0.7**: Individual articles and product reviews
- **0.6**: Category pages
- **0.4**: Legal/policy pages

### 3. Change Frequency
- **daily**: Homepage, listings
- **weekly**: Articles, products, categories
- **monthly**: Policies, legal pages

### 4. Monitoring
- Check Google Search Console weekly for indexing status
- Monitor "Coverage" report for errors
- Track "Sitemaps" status for discovered URLs

---

## 🚀 Quick Action Checklist

**After Adding New Content:**
- [ ] Regenerate sitemap: `node scripts/generate-sitemap.js`
- [ ] Verify new URLs in `public/sitemap.xml`
- [ ] Deploy to production (Cloudflare Pages)
- [ ] Wait 5-10 minutes for deployment
- [ ] Test sitemap URL: `curl https://swankyboyz.com/sitemap.xml`
- [ ] Submit to Google Search Console (if not auto-detected)
- [ ] Submit to Bing Webmaster Tools
- [ ] Monitor indexing status in next 24-48 hours

---

## 📞 Search Console Direct Links

### Google Search Console
**Main Dashboard**: https://search.google.com/search-console?resource_id=https://swankyboyz.com

**Specific Tools:**
- **Sitemaps**: https://search.google.com/search-console/sitemaps?resource_id=https://swankyboyz.com
- **URL Inspection**: https://search.google.com/search-console/inspect?resource_id=https://swankyboyz.com
- **Performance**: https://search.google.com/search-console/performance/search-analytics?resource_id=https://swankyboyz.com
- **Coverage**: https://search.google.com/search-console/index?resource_id=https://swankyboyz.com

### Bing Webmaster Tools
**Main Dashboard**: https://www.bing.com/webmasters

**Specific Tools:**
- **Sitemaps**: https://www.bing.com/webmasters/sitemaps?siteUrl=https://swankyboyz.com
- **URL Inspection**: https://www.bing.com/webmasters/url-inspection?siteUrl=https://swankyboyz.com
- **SEO Reports**: https://www.bing.com/webmasters/seo?siteUrl=https://swankyboyz.com

---

## 📈 Expected Results

### Within 24 Hours
- ✅ Sitemap processed by Google Search Console
- ✅ New URLs discovered (31 total)
- ✅ Crawling begins for new product pages

### Within 1 Week
- ✅ New product pages indexed
- ✅ Appearing in search results for branded queries
- ✅ Category pages indexed

### Within 2-4 Weeks
- ✅ Ranking for product-specific keywords
- ✅ Organic traffic increases
- ✅ Rich results appearing (if structured data present)

---

**Last Updated**: October 26, 2025  
**Sitemap Version**: 2.0 (31 URLs)  
**Next Review**: Weekly after content additions

---

## 🎉 Ready to Submit!

Your sitemap is generated and ready for submission to search engines. Use the direct links above to submit to Google Search Console and Bing Webmaster Tools.

**Primary Submission URL**: `https://swankyboyz.com/sitemap.xml`