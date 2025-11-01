# Cloudflare Pages Deployment Setup Guide

## Overview
This guide explains how to properly configure Cloudflare Pages for the SwankyB project after the recent fixes.

## What Was Fixed

### 1. Node Version Compatibility
- **Problem**: Package.json required Node >= 22.0.0, which is not widely supported
- **Solution**: Updated to Node >= 18.0.0 for broader compatibility
- **Files Updated**:
  - `package.json`: Changed engines.node from ">=22.0.0" to ">=18.0.0"
  - `.node-version`: Changed from "22.16.0" to "20"
  - Added `.nvmrc` with value "20" for additional compatibility

### 2. Sitemap Generation
- **Problem**: Sitemap was generated in a separate CI step, not during build
- **Solution**: Integrated sitemap generation into the build script
- **Files Updated**:
  - `package.json`: Build script now runs `node scripts/generate-sitemap.js && vite build`

### 3. D1 Database Configuration
- **Problem**: Incomplete D1 database binding in wrangler.toml (missing database_id)
- **Solution**: Commented out D1 binding since the project uses Supabase
- **Files Updated**:
  - `wrangler.toml`: Commented out the D1 database binding section

### 4. CI Workflow Improvements
- **Problem**: Hardcoded Node versions in CI workflows
- **Solution**: Use node-version-file parameter to read from .node-version
- **Files Updated**:
  - `.github/workflows/ci.yml`
  - `.github/workflows/deploy-pages.yml`

## Cloudflare Pages Configuration

### Build Settings
When setting up your Cloudflare Pages project, use these settings:

```
Framework preset: Vite
Build command: npm run build
Build output directory: dist
Root directory: (leave empty)
Node version: 20 (will be auto-detected from .node-version)
```

### Environment Variables
You need to set these environment variables in Cloudflare Pages dashboard:

**Required for Build:**
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

**Optional Runtime Variables (for API functions):**
- `JWT_SECRET`: Secret for JWT token generation (if using authentication)
- `OPENAI_API_KEY`: OpenAI API key (if using AI features)

### How to Set Environment Variables

1. Go to your Cloudflare Pages project dashboard
2. Navigate to **Settings** > **Environment variables**
3. Click **Add variable**
4. For each variable:
   - Select the environment (Production, Preview, or both)
   - Enter the variable name
   - Enter the variable value
   - Click **Save**

### Deployment Methods

#### Method 1: Automatic Git Deployment (Recommended)
1. Connect your GitHub repository to Cloudflare Pages
2. Cloudflare will automatically deploy on every push to main branch
3. The build settings will be picked up from your configuration

#### Method 2: Manual CLI Deployment
```bash
# Install Wrangler CLI globally
npm install -g wrangler@latest

# Login to Cloudflare
wrangler login

# Build the project locally
npm run build

# Deploy to Cloudflare Pages
wrangler pages deploy ./dist --project-name=swankyb
```

#### Method 3: GitHub Actions Deployment
The repository includes a GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) that can deploy automatically. To use it:

1. Add these secrets to your GitHub repository:
   - `CF_API_TOKEN`: Your Cloudflare API token
   - `CF_ACCOUNT_ID`: Your Cloudflare account ID
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

2. The workflow will automatically deploy on pushes to the main branch

## Verifying the Deployment

After deployment, verify that:

1. **Homepage loads**: Visit your pages.dev URL
2. **Sitemap is accessible**: Visit `https://your-project.pages.dev/sitemap.xml`
3. **Articles load**: Visit any article page
4. **Products load**: Visit any product page
5. **Images display**: Check that product and article images load correctly

## Troubleshooting

### Build Fails with "Unsupported engine"
- Ensure `.node-version` file contains "20"
- Check that `.nvmrc` file exists and contains "20"
- Verify package.json has `"engines": { "node": ">=18.0.0" }`

### Build Fails with "Cannot find module"
- Run `npm ci` to clean install dependencies
- Check that package-lock.json is committed

### Runtime Errors About Missing Environment Variables
- Verify environment variables are set in Cloudflare Pages dashboard
- Check that variable names match exactly (case-sensitive)
- Ensure variables are set for the correct environment (Production/Preview)

### Sitemap Not Generated
- The sitemap is now automatically generated during build
- Check the build logs to confirm sitemap generation succeeded
- Verify `public/sitemap.xml` exists in your repository

### D1 Database Errors
- The D1 binding is currently disabled (commented out in wrangler.toml)
- If you need D1 in the future, uncomment the binding and add the database_id
- For now, the project uses Supabase for data storage

## Next Steps

1. **Deploy to Cloudflare Pages** using one of the methods above
2. **Configure environment variables** in the Cloudflare dashboard
3. **Test the deployment** thoroughly
4. **Set up a custom domain** (optional) in Cloudflare Pages settings
5. **Monitor performance** using Cloudflare Analytics

## Support

If you encounter issues:
1. Check Cloudflare Pages build logs in the dashboard
2. Review this guide for common solutions
3. Check the Cloudflare Pages documentation: https://developers.cloudflare.com/pages/
4. Verify all environment variables are correctly set

## Summary of Changes

This deployment fix ensures:
- ✅ Compatible Node version (20) for Cloudflare Pages
- ✅ Automatic sitemap generation during build
- ✅ Clean wrangler.toml without conflicting configurations
- ✅ Consistent Node version across all environments
- ✅ Proper build output to the `dist` directory

The project is now ready for successful deployment on Cloudflare Pages!
