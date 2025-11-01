-- SwankyBoyz D1 Database Schema
-- Simplified schema for Astro + Cloudflare Pages + D1

CREATE TABLE IF NOT EXISTS articles (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  visuals TEXT, -- JSON array of images/videos
  date TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_date ON articles(date);

CREATE TABLE IF NOT EXISTS products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  description TEXT,
  image TEXT,
  affiliate_url TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS article_products (
  article_id INTEGER NOT NULL,
  product_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, product_id),
  FOREIGN KEY(article_id) REFERENCES articles(id) ON DELETE CASCADE,
  FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_article_products_article ON article_products(article_id);
CREATE INDEX idx_article_products_product ON article_products(product_id);
