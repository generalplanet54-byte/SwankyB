-- Minimal products table migration
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand TEXT,
    model TEXT,
    description TEXT,
    primary_image TEXT,
    gallery_images TEXT,
    price REAL,
    original_price REAL,
    currency TEXT DEFAULT 'USD',
    amazon_url TEXT,
    direct_url TEXT,
    alternative_urls TEXT,
    asin TEXT,
    category_id INTEGER,
    rating REAL DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    availability TEXT DEFAULT 'in_stock',
    affiliate_commission REAL,
    is_active BOOLEAN DEFAULT 1,
    featured BOOLEAN DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_products_slug ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category_id);
CREATE INDEX IF NOT EXISTS idx_products_active ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured);
CREATE INDEX IF NOT EXISTS idx_products_asin ON products(asin);