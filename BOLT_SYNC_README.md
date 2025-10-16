# Bolt AI Database Content Sync

This document explains how the Bolt AI database integration works and how to sync content updates.

## Overview

The application uses a Bolt AI Supabase database as the primary data source for articles and products. The content can be accessed in two ways:

1. **Direct Database Queries** (Runtime) - The application queries the Bolt AI database directly when running
2. **Local Fallback File** (Build Time) - If the database is unavailable, the app falls back to `src/data/launchArticles.ts`

## Architecture

```
┌─────────────────────┐
│  Bolt AI Database   │
│    (Supabase)       │
└──────────┬──────────┘
           │
           ├──────────────────────────┐
           │                          │
           ▼                          ▼
   ┌───────────────┐         ┌──────────────┐
   │  ContentAPI   │         │  Sync Script │
   │  (Runtime)    │         │  (CLI Tool)  │
   └───────┬───────┘         └──────┬───────┘
           │                        │
           ▼                        ▼
   ┌────────────────┐      ┌──────────────────┐
   │  React App     │      │ launchArticles.ts│
   │  (Live Data)   │      │ (Static Fallback)│
   └────────────────┘      └──────────────────┘
```

## Database Configuration

### Environment Variables

The Bolt AI database credentials are configured in multiple places:

1. **wrangler.toml** - For Cloudflare Pages deployment
   ```toml
   [vars]
   VITE_BOLT_DATABASE_URL = "https://wuwczwpfnswwctumvqsq.supabase.co"
   VITE_BOLT_DATABASE_ANON_KEY = "your-key-here"
   BOLT_DATABASE_URL = "https://wuwczwpfnswwctumvqsq.supabase.co"
   BOLT_DATABASE_ANON_KEY = "your-key-here"
   ```

2. **.env** (local development) - Create from `.env.example`
   ```env
   VITE_BOLT_DATABASE_URL=https://wuwczwpfnswwctumvqsq.supabase.co
   VITE_BOLT_DATABASE_ANON_KEY=your-key-here
   ```

### Priority Order

The application checks for credentials in this order:
1. `VITE_BOLT_DATABASE_URL` and `VITE_BOLT_DATABASE_ANON_KEY` (Primary)
2. `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` (Fallback)

## Syncing Content from Bolt AI Database

When the Bolt AI database is updated with new articles or products, you should sync the changes to the local fallback file.

### Running the Sync

```bash
npm run sync-bolt-content
```

This command will:
1. Connect to the Bolt AI database
2. Fetch all published articles and their related products
3. Transform the data to match the local format
4. Update `src/data/launchArticles.ts` with the latest content
5. Add a timestamp comment indicating when the sync occurred

### What Gets Synced

- ✅ Published articles (`is_published = true`)
- ✅ Article metadata (title, excerpt, content, etc.)
- ✅ Related products through `article_products` junction table
- ✅ Product details (name, price, image, affiliate links)
- ✅ SEO metadata (meta title, description, keywords)

### Sync Output

The script provides detailed progress information:

```
🚀 Starting Bolt AI Database Content Sync

═══════════════════════════════════════════
🔄 Fetching data from Bolt AI database...
   Database: https://wuwczwpfnswwctumvqsq.supabase.co
✅ Found 6 published articles
✅ Found 12 article-product relationships
🔄 Transforming articles to local format...
🔄 Generating TypeScript content...
🔄 Writing to src/data/launchArticles.ts...
✅ Successfully updated launchArticles.ts

═══════════════════════════════════════════
✨ Sync completed successfully!
   Updated 6 articles

💡 Next steps:
   1. Review the changes in src/data/launchArticles.ts
   2. Test the application: npm run dev
   3. Commit the changes if everything looks good
```

## When to Sync

You should run the sync script when:

- ✏️ New articles are published in the Bolt AI database
- 🔄 Existing articles are updated
- ➕ New products are added
- 💰 Product prices or details change
- 🎨 Content or metadata is modified

## Troubleshooting

### Sync Fails with Network Error

**Problem:** Cannot connect to Bolt AI database

**Solution:**
1. Check your internet connection
2. Verify the database URL is correct
3. Ensure the anon key is valid

### No Articles Found

**Problem:** Sync completes but reports 0 articles

**Solution:**
1. Check that articles in the database have `is_published = true`
2. Verify RLS (Row Level Security) policies allow public read access
3. Use Supabase dashboard to manually check the `articles` table

### TypeScript Errors After Sync

**Problem:** Application won't build after syncing

**Solution:**
1. Ensure the generated file has proper TypeScript syntax
2. Check that all required fields are present in the database
3. Run `npm run lint` to identify specific issues

## Manual Database Access

You can access the Bolt AI database directly using Supabase tools:

### Using Supabase Studio

1. Go to https://supabase.com/dashboard
2. Select project: `wuwczwpfnswwctumvqsq`
3. Navigate to Table Editor
4. View/edit `articles`, `products`, and `article_products` tables

### Using SQL

```sql
-- View all published articles
SELECT * FROM articles WHERE is_published = true ORDER BY published_at DESC;

-- View articles with product count
SELECT 
  a.title,
  COUNT(ap.product_id) as product_count
FROM articles a
LEFT JOIN article_products ap ON a.id = ap.article_id
WHERE a.is_published = true
GROUP BY a.id, a.title;

-- View products for a specific article
SELECT 
  a.title as article,
  p.name as product,
  p.price,
  ap.display_order
FROM articles a
JOIN article_products ap ON a.id = ap.article_id
JOIN products p ON ap.product_id = p.id
WHERE a.slug = 'your-article-slug'
ORDER BY ap.display_order;
```

## Development Workflow

### Recommended Workflow

1. **Make changes in Bolt AI database** (Supabase dashboard)
2. **Run sync script** (`npm run sync-bolt-content`)
3. **Review changes** (check `git diff src/data/launchArticles.ts`)
4. **Test locally** (`npm run dev`)
5. **Commit and deploy** (`git add . && git commit -m "Sync content from Bolt AI"`)

### Alternative: Direct Database Queries

If you prefer to always use live data from the database, you can skip the sync step. The application will automatically fetch data at runtime if:

- Environment variables are properly configured
- The database is accessible
- RLS policies allow public read access

## Continuous Integration

For automated syncing in CI/CD:

```yaml
# Example GitHub Actions workflow
- name: Sync Bolt AI Content
  run: npm run sync-bolt-content
  env:
    VITE_BOLT_DATABASE_URL: ${{ secrets.BOLT_DATABASE_URL }}
    VITE_BOLT_DATABASE_ANON_KEY: ${{ secrets.BOLT_DATABASE_ANON_KEY }}

- name: Commit Changes
  run: |
    git config --global user.name "GitHub Actions"
    git config --global user.email "actions@github.com"
    git add src/data/launchArticles.ts
    git commit -m "chore: sync content from Bolt AI [skip ci]" || true
    git push
```

## Security Notes

⚠️ **Important Security Considerations:**

- ✅ The anon key is safe to expose in client-side code (it's public)
- ✅ Row Level Security (RLS) policies control data access
- ❌ Never commit the `.env` file to version control
- ✅ The anon key in `wrangler.toml` is OK (it's required for Cloudflare Pages)
- ✅ RLS policies ensure only authorized users can modify data
- ✅ All write operations require authentication

## Support

For issues or questions:
1. Check the [main README](README.md)
2. Review error messages from the sync script
3. Verify database credentials
4. Check Supabase dashboard for database status
5. Review RLS policies in the database

---

Last updated: 2025-10-16
