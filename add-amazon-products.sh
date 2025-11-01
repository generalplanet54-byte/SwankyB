#!/bin/bash

# Amazon Product Setup Helper
# Quick guide to add real Amazon products to your Google Sheet

cat << 'EOF'
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   🛍️  AMAZON PRODUCT SETUP HELPER                           ║
║                                                              ║
╚══════════════════════════════════════════════════════════════╝

📋 STEP-BY-STEP GUIDE TO ADD REAL PRODUCTS

┌──────────────────────────────────────────────────────────────┐
│ STEP 1: Find Products on Amazon                              │
└──────────────────────────────────────────────────────────────┘

1. Go to Amazon.com
2. Search for products in your niche:
   - Men's leather wallets
   - Men's watches
   - Grooming products
   - Fashion accessories
   - Tech gadgets

┌──────────────────────────────────────────────────────────────┐
│ STEP 2: Get Affiliate Links                                  │
└──────────────────────────────────────────────────────────────┘

Option A: Amazon Associates Site Stripe
   1. Install Site Stripe bookmarklet
   2. Visit product page
   3. Click "Get Link" in Site Stripe
   4. Copy the affiliate link

Option B: Manual Affiliate Link
   1. Copy product URL: https://www.amazon.com/dp/B08XYZ123
   2. Add your affiliate tag: ?tag=youraffid-20
   3. Final: https://www.amazon.com/dp/B08XYZ123?tag=youraffid-20

┌──────────────────────────────────────────────────────────────┐
│ STEP 3: Update Google Sheet                                  │
└──────────────────────────────────────────────────────────────┘

Open your Google Sheet and update the Products sheet:

Example Products to Add:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ID: fossil-minimalist-watch
Name: Minimalist Carbon Fiber Watch
Brand: Fossil
Description: Sleek minimalist design with carbon fiber dial
Affiliate URL: https://www.amazon.com/dp/B01MXNXOD7?tag=youraffid-20
Image: (leave blank - auto-downloaded)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ID: timberland-wallet
Name: Men's RFID Leather Wallet
Brand: Timberland
Description: Genuine leather with RFID blocking technology
Affiliate URL: https://www.amazon.com/dp/B00QJDK9U0?tag=youraffid-20
Image: (leave blank - auto-downloaded)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ID: gillette-fusion-proglide
Name: Fusion ProGlide Men's Razor
Brand: Gillette
Description: 5-blade razor with precision trimmer
Affiliate URL: https://www.amazon.com/dp/B004EDZKQW?tag=youraffid-20
Image: (leave blank - auto-downloaded)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

┌──────────────────────────────────────────────────────────────┐
│ STEP 4: Sync & Download                                      │
└──────────────────────────────────────────────────────────────┘

Run these commands:

   npm run sync              # Pull from Google Sheets
   npm run download-imat

### Automated Product Image Downloader
A script that automatically fetches **REAL product images** from Amazon for your affiliate marketing site. No more generic stock photos - only actual product images that match exactly what you're promoting!

## Key Features

### ges   # Download product images
   npm run dev              # Preview your site

┌──────────────────────────────────────────────────────────────┐
│ POPULAR PRODUCT CATEGORIES                                   │
└──────────────────────────────────────────────────────────────┘

🎩 Fashion & Style
   - Leather wallets
   - Dress shoes
   - Sunglasses
   - Watches
   - Belts & accessories

💼 Business & Work
   - Leather briefcases
   - Laptop bags
   - Pens & writing instruments
   - Business card holders
   - Travel accessories

🧔 Grooming & Self-Care
   - Electric razors
   - Beard trimmers
   - Cologne & fragrances
   - Skincare products
   - Hair styling tools

⚡ Tech & Gadgets
   - Wireless earbuds
   - Smart watches
   - Phone accessories
   - Portable chargers
   - Tech organizers

🏋️ Fitness & Wellness
   - Gym bags
   - Water bottles
   - Fitness trackers
   - Workout gear
   - Protein shakers

┌──────────────────────────────────────────────────────────────┐
│ BEST PRACTICES                                                │
└──────────────────────────────────────────────────────────────┘

✅ Choose popular products (high ratings, many reviews)
✅ Pick items in different price ranges
✅ Focus on evergreen products (not seasonal)
✅ Select items you'd actually recommend
✅ Include variety across categories

❌ Don't add too many similar products
❌ Avoid products with poor reviews
❌ Skip overly expensive luxury items (low conversion)
❌ Don't use products from sketchy brands

┌──────────────────────────────────────────────────────────────┐
│ QUICK EXAMPLE WORKFLOW                                       │
└──────────────────────────────────────────────────────────────┘

1. Open Google Sheets (Products sheet)

2. Replace sample products with real ones:
   
   Row 2 (was: Premium Leather Wallet)
   → Change to: Fossil Minimalist Watch
   → Update affiliate_url with real Amazon link
   → Keep image column blank

3. Save the sheet (auto-saves)

4. Run in terminal:
   $ npm run sync
   $ npm run download-images

5. Check /public/assets/ folder:
   $ ls -l public/assets/

6. Preview:
   $ npm run dev

┌──────────────────────────────────────────────────────────────┐
│ TROUBLESHOOTING                                               │
└──────────────────────────────────────────────────────────────┘

Problem: "Could not extract ASIN from URL"
Solution: Use full Amazon URL with /dp/ASIN format

Problem: "Failed to download image"
Solution: Manually download from Amazon, save to /public/assets/

Problem: "No products found"
Solution: Run npm run sync first to pull from Google Sheets

┌──────────────────────────────────────────────────────────────┐
│ NEXT STEPS                                                    │
└──────────────────────────────────────────────────────────────┘

After adding products:

1. ✅ Sync from Google Sheets
2. ✅ Download product images  
3. ✅ Write product reviews (Articles sheet)
4. ✅ Test locally (npm run dev)
5. ✅ Deploy to Cloudflare Pages

Ready to add products? Open your Google Sheet:
https://docs.google.com/spreadsheets/d/1zP27ODUO6tB6x636DnHALUzhvhrqNjNLKND7fRz-zjk/edit

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📚 For more help, see:
   - AMAZON_IMAGE_DOWNLOADER_GUIDE.md
   - GOOGLE_SHEETS_INTEGRATION_GUIDE.md
   - .github/SETUP_GUIDE.md

EOF
