# 🔧 SwankyBoyz Production API Fix Guide

## Current Issues:
❌ API endpoints returning 500 errors
❌ D1 database not properly bound to Pages Functions
❌ Functions not deploying with the site build

## Root Cause:
The `/functions` directory with TypeScript API endpoints isn't being properly deployed or bound to the D1 database.

## 🚀 Solution Options:

### Option 1: Manual Dashboard Configuration (Recommended)

1. **Go to Cloudflare Pages Dashboard:**
   - Visit: https://dash.cloudflare.com/pages
   - Select your **swankyb** project

2. **Configure D1 Database Binding:**
   - Navigate to **Settings** → **Functions**
   - Scroll to **D1 database bindings**
   - Click **Add binding**:
     - **Variable name:** `DB`
     - **D1 database:** Select `swankyb_content`
   - Click **Save**

3. **Set Environment Variables:**
   - Go to **Settings** → **Environment variables**
   - Add these variables for **Production**:
     ```
     JWT_SECRET=your-secure-jwt-secret-here
     NODE_ENV=production
     ```

4. **Redeploy:**
   After configuration, trigger a new deployment from Git or redeploy manually.

### Option 2: Copy Functions to Dist (Quick Fix)

Run this to copy functions to the build output:

```bash
# Copy functions to dist for deployment
cp -r functions dist/
npm run build
npx wrangler pages deploy dist --project-name=swankyb
```

### Option 3: Verify Current Database Connection

Test if the database is accessible:

```bash
# Test database directly
curl -X POST "https://api.cloudflare.com/client/v4/accounts/43f14f26801fb2389382fa084e3442e6/d1/database/bfc16265-30bd-4bcf-8a72-f2a5a5baf61a/query" \
-H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
-H "Content-Type: application/json" \
-d '{"sql": "SELECT COUNT(*) FROM products;"}' | jq '.result[0].results[0]'
```

## 🧪 Testing After Fix:

Visit these URLs after applying the fix:
- https://swankyb.pages.dev/api/products-d1 (should return product list)
- https://swankyb.pages.dev/api/articles-d1 (should return articles)

## ⚡ Quick Manual Deploy with Functions:

```bash
# Ensure functions are included
mkdir -p dist/functions
cp -r functions/* dist/functions/
npx wrangler pages deploy dist --project-name=swankyb
```

## Expected Results After Fix:
✅ `/api/products-d1` returns product data
✅ `/api/articles-d1` returns article data  
✅ No more 500 errors in console
✅ Site loads data from D1 database

The quickest fix is **Option 1** - configure the D1 binding in the Cloudflare Pages dashboard.