# D1 Database Setup Instructions

## Prerequisites
You need a Cloudflare API token with D1 permissions. Get it from:
https://dash.cloudflare.com/profile/api-tokens

**Required Permissions:**
- Account → D1 → Edit
- Account → Cloudflare Pages → Edit

## Step 1: Create the D1 Database

```bash
# Set your Cloudflare API token
export CLOUDFLARE_API_TOKEN="your_token_here"

# Create the database
wrangler d1 create swankyb_content
```

**Expected Output:**
```
✅ Successfully created DB 'swankyb_content'!

[[d1_databases]]
binding = "DB"
database_name = "swankyb_content"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
```

## Step 2: Update wrangler.toml

Copy the `database_id` from the output above and update `wrangler.toml`:

```toml
[[d1_databases]]
binding = "DB"
database_name = "swankyb_content"
database_id = "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"  # ← Paste your ID here
```

## Step 3: Run Initial Schema Migration

```bash
# Apply schema to remote D1 database (production)
wrangler d1 execute swankyb_content --file=./migrations/d1/001_initial_schema.sql

# Apply schema to local D1 database (development)
wrangler d1 execute swankyb_content --local --file=./migrations/d1/001_initial_schema.sql
```

**Expected Output:**
```
🌀 Executing on remote database swankyb_content (xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx):
🌀 To execute on your local development database, remove the --remote flag from your wrangler command.
🚣 Executed 11 queries in 0.23ms
```

## Step 4: Seed First Article & Products

```bash
# First, update the full article content in the migration file
# Edit migrations/d1/002_seed_first_articles.sql and replace the truncated content placeholder

# Then apply the seed data
wrangler d1 execute swankyb_content --file=./migrations/d1/002_seed_first_articles.sql

# For local development
wrangler d1 execute swankyb_content --local --file=./migrations/d1/002_seed_first_articles.sql
```

## Step 5: Verify the Setup

```bash
# Check tables were created
wrangler d1 execute swankyb_content --command="SELECT name FROM sqlite_master WHERE type='table';"

# Check categories were seeded
wrangler d1 execute swankyb_content --command="SELECT * FROM categories;"

# Check article was created
wrangler d1 execute swankyb_content --command="SELECT title, slug, status FROM articles;"

# Check products were created
wrangler d1 execute swankyb_content --command="SELECT name, brand, price FROM products LIMIT 5;"
```

## Step 6: Test the API Endpoint

```bash
# Deploy to Cloudflare Pages (this will include the D1 binding)
git add .
git commit -m "Add D1 database with first article content"
git push origin main

# Wait for deployment (check GitHub Actions)
# Then test the API:
curl "https://swankyboyz.com/api/articles-d1?slug=best-electric-shavers-men-2025" | jq
```

**Expected Response:**
```json
{
  "article": {
    "id": 1,
    "title": "Best Electric Shavers for Men in 2025 – Expert Tested Reviews",
    "slug": "best-electric-shavers-men-2025",
    "meta_title": "Best Electric Shavers 2025 – Top 10 Tested for Close Shaves",
    "content": "...",
    "category_name": "Grooming Essentials",
    "products": [...],
    "tags": [...]
  }
}
```

## Step 7: Update Frontend to Use D1

Modify `src/contexts/ContentContext.tsx` to fetch from `/api/articles-d1` instead of Supabase:

```typescript
// Replace Supabase calls with:
const response = await fetch('/api/articles-d1?limit=20&offset=0');
const data = await response.json();
```

## Troubleshooting

### "database not found" Error
- Verify `database_id` is correct in `wrangler.toml`
- Check database exists: `wrangler d1 list`

### "binding not found" Error
- Ensure D1 binding is in `wrangler.toml`
- Redeploy after updating wrangler.toml
- Check Cloudflare Pages settings for D1 bindings

### Migration Fails
- Check SQL syntax
- Run migrations one statement at a time for debugging
- Use `--local` flag to test locally first

### Empty Results from API
- Verify migration ran successfully
- Check article status is 'published'
- Query directly: `wrangler d1 execute swankyb_content --command="SELECT * FROM articles;"`

## Local Development Workflow

```bash
# 1. Create local D1 database
wrangler d1 execute swankyb_content --local --file=./migrations/d1/001_initial_schema.sql

# 2. Seed local data
wrangler d1 execute swankyb_content --local --file=./migrations/d1/002_seed_first_articles.sql

# 3. Run dev server with D1 binding
wrangler pages dev dist --d1 DB=swankyb_content

# 4. Test locally
curl "http://localhost:8788/api/articles-d1" | jq
```

## Next Steps

1. ✅ Database created and schema applied
2. ✅ First article seeded with products
3. ⬜ Add remaining products (6-10 from article)
4. ⬜ Write Article #2: Best Beard Trimmers 2025
5. ⬜ Write Article #3: Best Body Groomers 2025
6. ⬜ Update admin panel to use D1 CRUD endpoints
7. ⬜ Set up Amazon Associates affiliate links
8. ⬜ Implement affiliate click tracking

## Useful Commands Cheat Sheet

```bash
# List all databases
wrangler d1 list

# Query database
wrangler d1 execute DB_NAME --command="SELECT * FROM table_name;"

# Export database backup
wrangler d1 export DB_NAME --output=backup.sql

# Delete database (careful!)
wrangler d1 delete DB_NAME

# Show database info
wrangler d1 info DB_NAME

# Local development query
wrangler d1 execute DB_NAME --local --command="SELECT * FROM articles;"
```

## Important Notes

- **Local vs Remote**: Always use `--local` for development. Omit it for production.
- **Migrations**: D1 doesn't have built-in migration tracking. Keep numbered SQL files and track manually.
- **Performance**: D1 is fast but has limits (see D1 docs for quotas)
- **Backups**: Export regularly, especially before schema changes
- **Cost**: D1 is free tier friendly (10GB storage, 5M reads/day)

---

**Status**: Schema ready, awaiting database creation
**Last Updated**: 2025-01-24
