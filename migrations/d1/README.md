# Cloudflare D1 Database Setup

## Initial Setup

### 1. Create D1 Database
```bash
# Create the database
wrangler d1 create swankyb_content

# Copy the database_id from output and update wrangler.toml
```

### 2. Run Migrations
```bash
# Apply the initial schema
wrangler d1 execute swankyb_content --file=./migrations/d1/001_initial_schema.sql

# Verify tables were created
wrangler d1 execute swankyb_content --command="SELECT name FROM sqlite_master WHERE type='table';"
```

### 3. Local Development
```bash
# Create local D1 database for development
wrangler d1 execute swankyb_content --local --file=./migrations/d1/001_initial_schema.sql

# Query local database
wrangler d1 execute swankyb_content --local --command="SELECT * FROM categories;"
```

## Database Schema Overview

### Core Tables
- **categories** - Content categories (Grooming, Style, etc.)
- **tags** - Article tags for filtering
- **articles** - Main content with SEO fields
- **products** - Affiliate products with pricing & links
- **content_clusters** - SEO topic clusters

### Relationship Tables
- **article_tags** - Many-to-many: articles ↔ tags
- **article_products** - Many-to-many: articles ↔ products (with affiliate overrides)
- **article_clusters** - Many-to-many: articles ↔ clusters
- **internal_links** - Track internal link structure

### Analytics
- **affiliate_clicks** - Track all affiliate link clicks

## Using D1 in Functions

### Example: Get All Published Articles
```typescript
// functions/api/articles.ts
export async function onRequestGet(context: any) {
  const db = context.env.DB;
  
  const { results } = await db.prepare(`
    SELECT 
      a.*,
      c.name as category_name,
      c.slug as category_slug
    FROM articles a
    LEFT JOIN categories c ON a.category_id = c.id
    WHERE a.status = 'published'
    ORDER BY a.published_at DESC
    LIMIT 20
  `).all();
  
  return new Response(JSON.stringify(results), {
    headers: { 'Content-Type': 'application/json' }
  });
}
```

### Example: Create New Article
```typescript
export async function onRequestPost(context: any) {
  const db = context.env.DB;
  const article = await context.request.json();
  
  const result = await db.prepare(`
    INSERT INTO articles (title, slug, content, excerpt, category_id, status)
    VALUES (?, ?, ?, ?, ?, 'draft')
  `).bind(
    article.title,
    article.slug,
    article.content,
    article.excerpt,
    article.categoryId
  ).run();
  
  return new Response(JSON.stringify({ 
    id: result.meta.last_row_id 
  }), {
    status: 201,
    headers: { 'Content-Type': 'application/json' }
  });
}
```

## Common Queries

### Get Article with Products
```sql
SELECT 
  a.*,
  GROUP_CONCAT(p.name) as products
FROM articles a
LEFT JOIN article_products ap ON a.id = ap.article_id
LEFT JOIN products p ON ap.product_id = p.id
WHERE a.slug = ?
GROUP BY a.id;
```

### Get Popular Products
```sql
SELECT 
  p.*,
  COUNT(ac.id) as click_count
FROM products p
LEFT JOIN affiliate_clicks ac ON p.id = ac.product_id
WHERE ac.clicked_at >= datetime('now', '-30 days')
GROUP BY p.id
ORDER BY click_count DESC
LIMIT 10;
```

### Content Cluster Analytics
```sql
SELECT 
  cc.name as cluster,
  COUNT(DISTINCT ac2.article_id) as article_count,
  SUM(a.view_count) as total_views
FROM content_clusters cc
LEFT JOIN article_clusters ac2 ON cc.id = ac2.cluster_id
LEFT JOIN articles a ON ac2.article_id = a.id
GROUP BY cc.id;
```

## Migration Strategy

### Creating New Migrations
1. Create new file: `migrations/d1/002_description.sql`
2. Apply: `wrangler d1 execute swankyb_content --file=./migrations/d1/002_description.sql`
3. Apply locally: `wrangler d1 execute swankyb_content --local --file=./migrations/d1/002_description.sql`

### Rollback Strategy
D1 doesn't support automatic rollbacks. Create reverse migration files:
- `002_add_feature.sql` (forward)
- `002_rollback.sql` (reverse)

## Backup & Export

```bash
# Export entire database
wrangler d1 export swankyb_content --output=backup.sql

# Export specific table
wrangler d1 execute swankyb_content --command="SELECT * FROM articles;" --json > articles_backup.json
```

## Performance Tips

1. **Use Indexes** - Already created for common queries
2. **Limit Results** - Always use LIMIT in queries
3. **Prepared Statements** - Use `.prepare()` to avoid SQL injection
4. **Batch Operations** - Use transactions for multiple inserts
5. **Cache Results** - Cache frequently accessed data in KV or R2

## Connecting to Pages

The D1 binding is automatically available in Pages Functions via `context.env.DB`.

Update `wrangler.toml` after creating the database to include the `database_id`.

## Next Steps

1. ✅ Create D1 database via Wrangler
2. ✅ Run initial migration
3. ⬜ Create API endpoints for CRUD operations
4. ⬜ Update admin UI to use D1 instead of Supabase
5. ⬜ Import content from master plan
