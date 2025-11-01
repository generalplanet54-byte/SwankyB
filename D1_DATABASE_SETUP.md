# D1 Database Setup Guide

## Overview

This guide explains how to set up the Cloudflare D1 database for SwankyBoyz.com. The D1 database is **optional** - the site will deploy and function without it, using fallback data for database-driven features.

## Why D1 is Optional

The application is designed to work with or without D1:
- ✅ **With D1**: Full dynamic content, admin features, and database-driven functionality
- ✅ **Without D1**: Static content with fallback data, site still deploys and works

All API endpoints check for database availability and gracefully fallback when D1 is not configured.

## Common Deployment Error

**Error Message:**
```
Error: Failed to publish your Function. Got error: Error 8000022: Invalid database UUID (your-d1-database-id). Check your database UUID and try again.
```

**Cause:** The `wrangler.toml` file had a D1 database binding with a placeholder `database_id = "your-d1-database-id"`. Cloudflare validates this ID during deployment and rejects invalid values.

**Solution:** ✅ The D1 binding is now configured with a valid database_id (fb8ab815-af3a-4102-ab39-aeabcb829008).

## Current Status

The D1 database is **already configured** in `wrangler.toml`:
- Database name: `swankyboyz_d1_final`
- Database ID: `fb8ab815-af3a-4102-ab39-aeabcb829008`
- Binding: `DB`

**Next steps:**
1. Apply migrations to populate the database (see Step 3 below)
2. Add binding in Cloudflare Pages dashboard (see Step 4 below)

## Completing D1 Setup

The database is already configured in `wrangler.toml`. You just need to:

### Step 1: Install Wrangler CLI (if needed)

```bash
# Install Wrangler CLI if not already installed
npm install -g wrangler@latest

# Login to Cloudflare
wrangler login
```

### Step 2: Verify Database Exists

```bash
# List your D1 databases
wrangler d1 list

# You should see swankyboyz_d1_final with ID: fb8ab815-af3a-4102-ab39-aeabcb829008
```

### Step 3: Run Database Migrations

Apply all migration files in order:

```bash
# 1. Initial schema
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/001_initial_schema.sql

# 2. Seed articles
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/002_seed_first_articles.sql

# 3. Additional articles
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/003_seed_beard_trimmers_article.sql
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/004_seed_body_groomers_article.sql
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/005_seed_remaining_articles.sql

# 4. Update affiliate links
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/006_update_real_affiliate_links.sql

# 5. Fix images
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/007_fix_product_images.sql

# 6. Newsletter subscribers
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/008_create_newsletter_subscribers.sql

# 7. Product catalog
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/009_add_comprehensive_product_catalog.sql

# 8. Comprehensive articles
wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/010_add_comprehensive_articles.sql
```

**Verify migrations:**
```bash
wrangler d1 execute swankyboyz_d1_final --command="SELECT name FROM sqlite_master WHERE type='table';"
```

### Step 4: Configure Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → Your Project → **Settings**
3. Click **Functions** in the sidebar
4. Scroll to **D1 database bindings**
5. Click **Add binding**
6. Configure:
   - **Variable name**: `DB`
   - **D1 database**: Select `swankyboyz_d1_final`
7. Click **Save**

### Step 5: Deploy

```bash
# Build and deploy
npm run build
wrangler pages deploy ./dist --project-name=your-project-name
```

Or push to GitHub to trigger automatic deployment.

## Local Development with D1

### Option 1: Remote D1 (Recommended for testing)

```bash
# No additional setup needed
npm run dev
```

The dev server will connect to your remote D1 database.

### Option 2: Local D1 Database

```bash
# Create local D1 database
wrangler d1 execute swankyboyz_d1_final --local --file=./migrations/d1/001_initial_schema.sql

# Run additional migrations locally
wrangler d1 execute swankyboyz_d1_final --local --file=./migrations/d1/002_seed_first_articles.sql
# ... repeat for all migrations

# Start dev server with local D1
npm run dev:full
```

## Verifying D1 Setup

### Check Database Tables

```bash
wrangler d1 execute swankyboyz_d1_final --command="SELECT name FROM sqlite_master WHERE type='table';"
```

**Expected tables:**
- categories
- tags
- articles
- products
- content_clusters
- article_tags
- article_products
- article_clusters
- internal_links
- affiliate_clicks
- newsletter_subscribers

### Test API Endpoints

```bash
# Test articles endpoint
curl https://your-site.pages.dev/api/articles-d1

# Test products endpoint
curl https://your-site.pages.dev/api/products-d1
```

**With D1:** Returns data from database
**Without D1:** Returns `{"error": "Database not configured", "fallback": true}`

## Troubleshooting

### Error: "Invalid database UUID"

**Cause:** Placeholder database_id in wrangler.toml

**Solution:** Either:
1. Comment out the D1 section (default state)
2. Or create database and update with real database_id

### Error: "Database not found"

**Cause:** Database name mismatch or database not created

**Solution:**
```bash
# List your databases
wrangler d1 list

# Verify the name matches wrangler.toml
```

### Local development not connecting to D1

**Cause:** Local D1 database not initialized

**Solution:**
```bash
# Initialize local D1
wrangler d1 execute swankyboyz_d1_final --local --file=./migrations/d1/001_initial_schema.sql
```

### Migration fails

**Cause:** Previous migration not completed or SQL error

**Solution:**
```bash
# Check existing tables
wrangler d1 execute swankyboyz_d1_final --command="SELECT name FROM sqlite_master WHERE type='table';"

# Run migrations one by one and check for errors
```

## Best Practices

1. **Start without D1**: Deploy first without database to verify basic functionality
2. **Test locally**: Run migrations locally before applying to production
3. **Backup regularly**: Export database before major changes
4. **Version migrations**: Never modify existing migration files, create new ones
5. **Use prepared statements**: All queries use `.prepare()` to prevent SQL injection

## Database Backup & Restore

### Backup

```bash
# Export entire database
wrangler d1 export swankyboyz_d1_final --output=backup-$(date +%Y%m%d).sql

# Export specific table as JSON
wrangler d1 execute swankyboyz_d1_final --command="SELECT * FROM articles;" --json > articles-backup.json
```

### Restore

```bash
# Import from SQL dump
wrangler d1 execute swankyboyz_d1_final --file=backup-20231231.sql
```

## Migration Strategy

### Creating New Migrations

1. Create file: `migrations/d1/011_description.sql`
2. Write SQL (use IF NOT EXISTS for safety)
3. Test locally: `wrangler d1 execute swankyboyz_d1_final --local --file=./migrations/d1/011_description.sql`
4. Apply to production: `wrangler d1 execute swankyboyz_d1_final --file=./migrations/d1/011_description.sql`

### Rollback Strategy

D1 doesn't support automatic rollbacks. Always create paired migrations:
- `011_add_feature.sql` (forward)
- `011_rollback.sql` (reverse)

## Using Your Own D1 Database

If you want to create your own D1 database instead of using the configured one:

1. **Create new database:**
   ```bash
   wrangler d1 create your-database-name
   ```

2. **Update wrangler.toml:**
   Replace the existing database configuration with your new database details:
   ```toml
   [[d1_databases]]
   binding = "DB"
   database_name = "your-database-name"
   database_id = "your-new-database-id"
   ```

3. **Run migrations:**
   Apply all migrations to your new database following Step 3 above.

## Additional Resources

- [Cloudflare D1 Documentation](https://developers.cloudflare.com/d1/)
- [Wrangler CLI Reference](https://developers.cloudflare.com/workers/wrangler/)
- [D1 Migrations Guide](https://developers.cloudflare.com/d1/learning/using-migrations/)
- Project migrations: `./migrations/d1/README.md`
