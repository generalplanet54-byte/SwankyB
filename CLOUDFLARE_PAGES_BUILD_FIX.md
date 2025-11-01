# Cloudflare Pages Build Configuration Fix

## Problem
The deployment fails with: `Error: Output directory "dist" not found.`

This happens because Cloudflare Pages is running `npm ci` as the build command instead of `npm run build`.

## Solution

You need to update the build settings in your Cloudflare Pages dashboard:

### Step 1: Go to Cloudflare Pages Dashboard

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Go to **Workers & Pages**
3. Select your **SwankyB** project
4. Click **Settings** tab
5. Scroll to **Build & deployments** section

### Step 2: Update Build Configuration

Update the following settings:

**Build command:**
```
npm run build
```

**Build output directory:**
```
dist
```

**Root directory (advanced):**
```
/
```

**Environment variables:**
- If you have any environment variables needed for build, add them here
- For D1 database, the binding should already be configured

### Step 3: Save and Retry Deployment

1. Click **Save** at the bottom
2. Go to the **Deployments** tab
3. Click **Retry deployment** on the failed deployment

OR

Simply push a new commit to trigger a fresh deployment:

```bash
git commit --allow-empty -m "Trigger deployment with correct build settings"
git push origin main
```

## Why This Happens

Cloudflare Pages reads build configuration in this order:
1. Custom build command from dashboard (if set)
2. Auto-detection from framework (Vite, Next.js, etc.)
3. Default: `npm run build`

If you previously set `npm ci` as a custom command, it overrides the auto-detection and only runs that command without building.

## Verification

After updating the settings, your deployment logs should show:

```
✓ Installing project dependencies: npm clean-install
✓ Executing user command: npm run build
✓ vite v5.4.21 building for production...
✓ built in 15s
✓ Validating asset output directory
✓ Success!
```

## Alternative: Remove Custom Build Command

If you want Cloudflare Pages to auto-detect:

1. In Settings > Build & deployments
2. **Clear** the "Build command" field (leave it empty)
3. Keep "Build output directory" as `dist`
4. Save and retry deployment

Cloudflare will automatically detect it's a Vite project and run `npm run build`.

## Current wrangler.toml Configuration

Your `wrangler.toml` is correctly configured:

```toml
name = "swankyb"
compatibility_date = "2025-10-13"
pages_build_output_dir = "dist"

[[d1_databases]]
binding = "DB"
database_name = "swankyboyz_d1_final"
database_id = "fb8ab815-af3a-4102-ab39-aeabcb829008"
```

The `[build]` section is **NOT** supported for Pages projects (only for Workers).

## Next Steps

1. ✅ Update Cloudflare Pages dashboard settings
2. ✅ Retry deployment
3. ✅ Verify deployment succeeds
4. ✅ Test your live site

---

**Quick Fix:** Go to your Cloudflare Pages project settings and change the build command from `npm ci` to `npm run build`.
