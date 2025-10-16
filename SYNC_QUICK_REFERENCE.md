# Bolt AI Content Sync - Quick Reference

## TL;DR

```bash
# Sync content from Bolt AI database to local files
npm run sync-bolt-content

# Then test locally
npm run dev

# Build and deploy
npm run build
```

## When to Sync

| Scenario | Action | Command |
|----------|--------|---------|
| New article published | Sync content | `npm run sync-bolt-content` |
| Article updated | Sync content | `npm run sync-bolt-content` |
| Product added/updated | Sync content | `npm run sync-bolt-content` |
| Before deployment | Sync for latest data | `npm run sync-bolt-content` |
| Working offline | Use existing sync | _(no action needed)_ |

## Command Reference

```bash
# Development
npm run dev                    # Start dev server
npm run build                  # Build for production
npm run preview               # Preview production build
npm run lint                  # Run linter

# Content Management
npm run sync-bolt-content     # Sync from Bolt AI database
npm run generate-sitemap      # Generate sitemap.xml
```

## File Locations

| File | Purpose |
|------|---------|
| `src/data/launchArticles.ts` | Synced article content (fallback) |
| `scripts/sync-bolt-content.mjs` | Sync script |
| `wrangler.toml` | Database credentials |
| `.env` | Local environment variables |

## Environment Variables

```bash
# Primary (Bolt AI Database)
VITE_BOLT_DATABASE_URL=https://wuwczwpfnswwctumvqsq.supabase.co
VITE_BOLT_DATABASE_ANON_KEY=your-bolt-key

# Fallback (Standard Supabase)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-supabase-key
```

## Database Access

**Supabase Dashboard:** https://supabase.com/dashboard  
**Project ID:** `wuwczwpfnswwctumvqsq`

### Quick SQL Queries

```sql
-- View all published articles
SELECT title, slug, updated_at FROM articles 
WHERE is_published = true 
ORDER BY published_at DESC;

-- Count articles by category
SELECT category, COUNT(*) FROM articles 
WHERE is_published = true 
GROUP BY category;

-- View article with products
SELECT a.title, p.name, p.price 
FROM articles a
JOIN article_products ap ON a.id = ap.article_id
JOIN products p ON ap.product_id = p.id
WHERE a.slug = 'your-article-slug';
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Sync fails with network error | Check internet connection |
| No articles found | Verify `is_published = true` in database |
| TypeScript errors | Run `npm run sync-bolt-content` again |
| Build fails | Check `npx tsc --noEmit` for errors |

## Architecture Flow

```
Bolt AI Database (Supabase)
    ↓
sync-bolt-content script
    ↓
launchArticles.ts (updated)
    ↓
React App (uses synced data as fallback)
```

## Best Practices

1. ✅ Sync before deploying
2. ✅ Test locally after sync
3. ✅ Review changes with `git diff`
4. ✅ Commit synced content
5. ✅ Keep database credentials secure

## Links

- [Full Documentation](BOLT_SYNC_README.md)
- [Testing Guide](TESTING_SYNC.md)
- [Main README](README.md)

---

**Quick Start:**
1. `npm install`
2. `npm run sync-bolt-content`
3. `npm run dev`
4. Open http://localhost:5173

**Questions?** See [BOLT_SYNC_README.md](BOLT_SYNC_README.md) for detailed documentation.
