-- Performance Optimization: Add composite indexes and optimize query patterns
-- This migration improves query performance for common access patterns

-- Add composite index for articles by status and published date (common query pattern)
CREATE INDEX IF NOT EXISTS idx_articles_status_published ON articles(status, published_at DESC);

-- Add composite index for products by category and featured status
CREATE INDEX IF NOT EXISTS idx_products_category_featured ON products(category_id, is_featured DESC);

-- Add composite index for products by active status and rating (for filtering active, high-rated products)
CREATE INDEX IF NOT EXISTS idx_products_active_rating ON products(is_active, rating DESC);

-- Add index on articles created_at for efficient pagination
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- Add index on products created_at for efficient pagination
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at DESC);

-- Add composite index for affiliate clicks analytics (common query pattern)
CREATE INDEX IF NOT EXISTS idx_affiliate_clicks_product_date ON affiliate_clicks(product_id, clicked_at DESC);

-- Add index for article view count (for popular articles queries)
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(view_count DESC);
