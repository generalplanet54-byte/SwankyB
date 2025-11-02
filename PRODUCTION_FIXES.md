# Cloudflare Pages Production Configuration Guide

## Database Connection Issues Fix

The 500 errors on `/api/articles-d1` and `/api/products-d1` indicate that the D1 database binding is not properly configured in production.

### Step 1: Configure D1 Binding in Cloudflare Pages Dashboard

1. Go to [Cloudflare Pages Dashboard](https://dash.cloudflare.com/pages)
2. Select your **swankyb** project
3. Go to **Settings** > **Functions**
4. Scroll to **D1 database bindings**
5. Add a new binding:
   - **Variable name:** `DB`
   - **D1 database:** `swankyb_content`

### Step 2: Alternative - Deploy with Binding via CLI

Run this command to deploy with explicit D1 binding:

```bash
npx wrangler pages deploy dist --project-name=swankyb --d1=DB:swankyb_content
```

### Step 3: Verify Database Binding

After configuring, test the API endpoints:
- https://swankyb.pages.dev/api/products-d1
- https://swankyb.pages.dev/api/articles-d1

### Step 4: Environment Variables (if needed)

You may also need to set these environment variables in Pages dashboard:
- `JWT_SECRET`: A secure random string for authentication
- `CLOUDFLARE_API_TOKEN`: Your API token (if needed by functions)

### Current Status:
✅ Database created and populated (11 products)
✅ Site deployed successfully  
❌ Database binding missing in production
❌ API endpoints returning 500 errors

### Quick Fix Command:
```bash
# Deploy with D1 binding
npx wrangler pages deploy dist --project-name=swankyb --binding DB:d1:swankyb_content
```