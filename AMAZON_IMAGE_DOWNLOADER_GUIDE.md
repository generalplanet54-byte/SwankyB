# Amazon Product Image Downloader Guide

## Overview

Automated tool to download ACTUAL product images from Amazon for your affiliate marketing site. Ensures all product images are specific to the exact items you're promoting (not generic stock photos).

## How It Works

1. **Reads products** from your database
2. **Extracts ASIN** (Amazon product ID) from affiliate URLs
3. **Downloads real product images** from Amazon
4. **Updates database** with image filenames
5. **Generates descriptive filenames** (brand-product-name.jpg)

## Quick Start

```bash
# Download all product images
npm run download-images
```

## Requirements

### Valid Amazon Affiliate URLs

Your products MUST have valid Amazon affiliate URLs in the `affiliate_url` column. The script extracts the ASIN (Amazon product ID) from these URLs.

**Supported URL formats:**
```
https://www.amazon.com/dp/B08N5WRWNW
https://www.amazon.com/gp/product/B08N5WRWNW
https://amzn.to/3xyz123 (shortened URL - will follow redirect)
```

### Example Product Setup in Google Sheets

| id | name | brand | affiliate_url | image |
|----|------|-------|---------------|-------|
| rolex-sub | Submariner Watch | Rolex | https://www.amazon.com/dp/B08XYZ1234 | *auto-filled* |

## What the Script Does

### 1. Automatic Filename Generation

Creates SEO-friendly filenames:
```
rolex-submariner-watch.jpg
timex-classic-weekender.jpg
gillette-fusion-proglide.jpg
```

### 2. ASIN Extraction

Extracts Amazon product identifier from URLs:
```
URL: https://www.amazon.com/dp/B08N5WRWNW
ASIN: B08N5WRWNW
```

### 3. Image Download

Tries multiple Amazon image servers:
- `images-na.ssl-images-amazon.com` (primary)
- `m.media-amazon.com` (backup)
- Amazon widget API (fallback)

### 4. Database Update

Automatically updates `products.image` column with downloaded filename.

### 5. Skip Existing Images

Won't re-download images that already exist (saves time and bandwidth).

## Output Example

```
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🖼️  AMAZON PRODUCT IMAGE DOWNLOADER                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

📦 Reading products from database...
   Found 3 products

🔍 Processing: Submariner Watch (Rolex)
   📋 ASIN: B08XYZ1234
   🔽 Trying: https://images-na.ssl-images-amazon.com/...
   ✅ Downloaded: rolex-submariner-watch.jpg
   ✅ Updated database

🔍 Processing: Classic Weekender (Timex)
   📋 ASIN: B000AYYIYU
   🔽 Trying: https://images-na.ssl-images-amazon.com/...
   ✅ Downloaded: timex-classic-weekender.jpg
   ✅ Updated database

╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   📊 DOWNLOAD SUMMARY                                        ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

✅ Successfully downloaded: 2 images
⏭️  Already existed: 0 images
❌ Failed: 1 images

🎉 Image download process complete!
```

## Troubleshooting

### Failed Downloads

If downloads fail, it's usually because:

1. **Invalid affiliate URL**: Doesn't contain valid ASIN
2. **Amazon image not publicly accessible**: Some products have restricted images
3. **Network issues**: Temporary connection problems

**Solution**: Manually download the image:

1. Visit the Amazon product page
2. Right-click the main product image
3. "Save Image As..." to `/public/assets/`
4. Use the filename shown in the error message

### Missing ASINs

If you see: `⚠️ Could not extract ASIN from URL`

**Fix in Google Sheets:**
1. Go to the Amazon product page
2. Copy the URL (should contain `/dp/ASIN` or similar)
3. Update the `affiliate_url` column
4. Run `npm run sync` to update database
5. Run `npm run download-images` again

### Rate Limiting

The script includes 1-second delays between downloads to be respectful to Amazon's servers. For large product catalogs:

- Downloads may take several minutes
- This is intentional and best practice
- Don't reduce the delay (could get IP blocked)

## Integration with Workflow

### 1. Add New Products to Google Sheets

```
Products Sheet:
| id | name | brand | affiliate_url | ... |
```

### 2. Sync to Database

```bash
npm run sync
```

### 3. Download Product Images

```bash
npm run download-images
```

### 4. Validate Images

```bash
npm run validate-images
```

### 5. Build & Deploy

```bash
npm run build
git add .
git commit -m "Added new products with images"
git push
```

## Manual Image Downloads

### When You Need Manual Downloads

- Amazon restricts automated image access
- Product is from a different retailer
- You want a specific lifestyle photo

### Where to Get Images

**1. Amazon Associates Site Stripe**
- Install the Site Stripe bookmarklet
- Visit product page
- Click "Image" in Site Stripe
- Right-click and save

**2. Manufacturer Press Kits**
- Google: "[brand name] press kit"
- Usually high-resolution product photos
- Check licensing terms

**3. Official Brand Websites**
- Navigate to product page
- Right-click main product image
- Inspect for high-res version
- Download and credit appropriately

### Image Requirements

- **Format**: JPG preferred (PNG for transparency)
- **Size**: Minimum 800x800px
- **Quality**: High-resolution, professional photos
- **Relevance**: EXACT product being promoted
- **Alt text**: Auto-generated as "Product photo of [name] by [brand] from SwankyBoyz.com"

## Advanced: Amazon Product Advertising API

For production sites with many products, consider the official API:

### Benefits

- Higher rate limits
- Access to multiple image sizes
- Official image URLs that won't change
- Additional product data (ratings, prices)

### Setup Steps

1. **Sign up**: [Amazon Associate's Program](https://affiliate-program.amazon.com/)
2. **Get API credentials**: PA-API access
3. **Install SDK**: `npm install paapi5-nodejs-sdk`
4. **Update script**: Replace image URL generation with API calls

### Migration Path

The current script is a **proof-of-concept** that:
- ✅ Works immediately without API setup
- ✅ Handles most common products
- ⚠️ May fail for some restricted images

For scaling beyond 50-100 products, upgrade to PA-API.

## Best Practices

### Image Compliance

- ✅ **Use official Amazon images** for Amazon products
- ✅ **Credit brands** when using manufacturer photos
- ✅ **Include affiliate disclosure** on pages with affiliate links
- ❌ **Don't use competitor's images** (copyright violation)
- ❌ **Don't use generic stock photos** (poor conversion)

### SEO Optimization

- ✅ **Descriptive filenames**: `brand-product-name.jpg`
- ✅ **Product-specific alt text**: Auto-generated correctly
- ✅ **Compressed images**: Use WebP or optimize JPGs
- ✅ **Lazy loading**: Implemented in Astro components

### Performance

- ✅ **Check file sizes**: Target <200KB per image
- ✅ **Use WebP format**: Better compression than JPG
- ✅ **Optimize before upload**: Use TinyPNG or Squoosh
- ✅ **Leverage CDN**: Cloudflare Pages handles this

## Quick Reference Commands

```bash
# Download all product images
npm run download-images

# Sync from Google Sheets first
npm run sync && npm run download-images

# Complete workflow (sync + download + validate)
npm run sync && npm run download-images && npm run validate-images

# Check what images exist
ls -lh public/assets/

# Count downloaded images
find public/assets/ -name "*.jpg" | wc -l
```

## File Locations

- **Script**: `/scripts/download-product-images.ts`
- **Downloaded images**: `/public/assets/`
- **Database**: `/swankyboyz.db`
- **Google Sheets**: Products sheet, `affiliate_url` column

## Support

If you encounter issues:

1. Check that `affiliate_url` contains valid Amazon URL
2. Verify `/public/assets/` directory exists
3. Run with verbose output to see which URLs failed
4. Manually download failed images as fallback
5. Consider upgrading to PA-API for production scale

---

**Remember**: Product-specific images are CRITICAL for affiliate marketing success. Generic stock photos won't convert. Real product images build trust and drive sales! 🚀
