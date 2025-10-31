-- SwankyBoyz Content Management Database Schema
-- Cloudflare D1 Compatible SQL

-- =====================================================
-- CATEGORIES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    parent_id INTEGER,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    meta_title TEXT,
    meta_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_parent ON categories(parent_id);
CREATE INDEX idx_categories_active ON categories(is_active);

-- =====================================================
-- TAGS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS tags (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    usage_count INTEGER DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_tags_slug ON tags(slug);

-- =====================================================
-- ARTICLES TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    visuals TEXT, -- JSON array of images/videos with alt text
    author TEXT DEFAULT 'SwankyBoyz Team',
    word_count INTEGER,
    category_id INTEGER,
    
    -- SEO fields
    meta_title TEXT,
    meta_description TEXT,
    focus_keyword TEXT,
    semantic_keywords TEXT, -- JSON array stored as text
    
    -- Status & dates
    status TEXT DEFAULT 'draft', -- draft, published, scheduled
    published_at DATETIME,
    scheduled_for DATETIME,
    
    -- Engagement metrics
    read_time TEXT DEFAULT '5 min read',
    view_count INTEGER DEFAULT 0,
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category_id);
CREATE INDEX idx_articles_status ON articles(status);
CREATE INDEX idx_articles_published ON articles(published_at);
CREATE INDEX idx_articles_keyword ON articles(focus_keyword);

-- =====================================================
-- ARTICLE_TAGS (Many-to-Many)
-- =====================================================
CREATE TABLE IF NOT EXISTS article_tags (
    article_id INTEGER NOT NULL,
    tag_id INTEGER NOT NULL,
    PRIMARY KEY (article_id, tag_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
);

CREATE INDEX idx_article_tags_article ON article_tags(article_id);
CREATE INDEX idx_article_tags_tag ON article_tags(tag_id);

-- =====================================================
-- PRODUCTS TABLE
-- =====================================================
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand TEXT,
    model TEXT,
    description TEXT,
    
    -- Images
    primary_image TEXT,
    gallery_images TEXT, -- JSON array
    
    -- Pricing
    price REAL,
    original_price REAL,
    currency TEXT DEFAULT 'USD',
    
    -- Affiliate links
    amazon_url TEXT,
    direct_url TEXT,
    alternative_urls TEXT, -- JSON object with retailer names as keys
    
    -- Product details
    category_id INTEGER,
    rating REAL DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    is_featured BOOLEAN DEFAULT 0,
    
    -- Metadata
    specs TEXT, -- JSON object
    pros TEXT, -- JSON array
    cons TEXT, -- JSON array
    
    -- SEO
    meta_title TEXT,
    meta_description TEXT,
    
    -- Status
    is_active BOOLEAN DEFAULT 1,
    stock_status TEXT DEFAULT 'in_stock', -- in_stock, out_of_stock, discontinued
    
    -- Timestamps
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_category ON products(category_id);
CREATE INDEX idx_products_brand ON products(brand);
CREATE INDEX idx_products_featured ON products(is_featured);
CREATE INDEX idx_products_active ON products(is_active);
CREATE INDEX idx_products_rating ON products(rating);

-- =====================================================
-- ARTICLE_PRODUCTS (Many-to-Many with display order)
-- =====================================================
CREATE TABLE IF NOT EXISTS article_products (
    article_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    display_order INTEGER DEFAULT 0,
    affiliate_override_url TEXT, -- Optional per-article affiliate URL
    custom_note TEXT, -- Article-specific product note
    PRIMARY KEY (article_id, product_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
);

CREATE INDEX idx_article_products_article ON article_products(article_id);
CREATE INDEX idx_article_products_product ON article_products(product_id);

-- =====================================================
-- AFFILIATE_CLICKS (Analytics)
-- =====================================================
CREATE TABLE IF NOT EXISTS affiliate_clicks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    article_id INTEGER,
    clicked_url TEXT NOT NULL,
    source_page TEXT,
    user_agent TEXT,
    referrer TEXT,
    ip_address TEXT,
    country TEXT,
    clicked_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE,
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE SET NULL
);

CREATE INDEX idx_affiliate_clicks_product ON affiliate_clicks(product_id);
CREATE INDEX idx_affiliate_clicks_article ON affiliate_clicks(article_id);
CREATE INDEX idx_affiliate_clicks_date ON affiliate_clicks(clicked_at);

-- =====================================================
-- CONTENT_CLUSTERS (For SEO strategy tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS content_clusters (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    pillar_article_id INTEGER, -- The main "hub" article
    priority INTEGER DEFAULT 0, -- 1=High, 2=Medium, 3=Low
    target_keywords TEXT, -- JSON array
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (pillar_article_id) REFERENCES articles(id) ON DELETE SET NULL
);

CREATE INDEX idx_clusters_slug ON content_clusters(slug);
CREATE INDEX idx_clusters_priority ON content_clusters(priority);

-- =====================================================
-- ARTICLE_CLUSTERS (Many-to-Many)
-- =====================================================
CREATE TABLE IF NOT EXISTS article_clusters (
    article_id INTEGER NOT NULL,
    cluster_id INTEGER NOT NULL,
    is_pillar BOOLEAN DEFAULT 0,
    PRIMARY KEY (article_id, cluster_id),
    FOREIGN KEY (article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (cluster_id) REFERENCES content_clusters(id) ON DELETE CASCADE
);

-- =====================================================
-- INTERNAL_LINKS (For link tracking)
-- =====================================================
CREATE TABLE IF NOT EXISTS internal_links (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    from_article_id INTEGER NOT NULL,
    to_article_id INTEGER NOT NULL,
    anchor_text TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (from_article_id) REFERENCES articles(id) ON DELETE CASCADE,
    FOREIGN KEY (to_article_id) REFERENCES articles(id) ON DELETE CASCADE
);

CREATE INDEX idx_internal_links_from ON internal_links(from_article_id);
CREATE INDEX idx_internal_links_to ON internal_links(to_article_id);

-- =====================================================
-- SEED DATA: Categories
-- =====================================================
INSERT INTO categories (name, slug, description, display_order) VALUES
('Grooming Essentials', 'grooming-essentials', 'Electric shavers, trimmers, and grooming tools', 1),
('Skincare & Face Care', 'skincare', 'Face wash, moisturizers, and skincare products', 2),
('Style Essentials', 'style', 'Fashion, accessories, and wardrobe essentials', 3),
('Fitness & Wellness', 'fitness-wellness', 'Gym gear, supplements, and health products', 4),
('Tech & Gadgets', 'tech-gadgets', 'Wireless earbuds, smartwatches, and tech accessories', 5),
('Lifestyle & Culture', 'lifestyle', 'Books, hobbies, and lifestyle content', 6);

-- =====================================================
-- SEED DATA: Content Clusters
-- =====================================================
INSERT INTO content_clusters (name, slug, description, priority, target_keywords) VALUES
('Grooming Essentials', 'grooming-essentials', 'Complete grooming tools and techniques', 1, '["electric shavers", "beard trimmers", "grooming kits"]'),
('Skincare Basics', 'skincare-basics', 'Men''s skincare fundamentals', 1, '["mens face wash", "moisturizer men", "skincare routine"]'),
('Style Fundamentals', 'style-fundamentals', 'Wardrobe essentials and style guides', 2, '["white sneakers", "leather belts", "mens fashion"]'),
('Fitness Gear', 'fitness-gear', 'Gym equipment and supplements', 2, '["gym bags", "protein powder", "workout gear"]'),
('Tech Essentials', 'tech-essentials', 'Smart devices and audio gear', 3, '["wireless earbuds", "smartwatches", "tech gadgets"]');

-- =====================================================
-- SEED DATA: Common Tags
-- =====================================================
INSERT INTO tags (name, slug) VALUES
('Reviews', 'reviews'),
('Buying Guide', 'buying-guide'),
('Best Of 2025', 'best-of-2025'),
('Budget Picks', 'budget-picks'),
('Premium', 'premium'),
('Beginners', 'beginners'),
('Expert Tips', 'expert-tips'),
('Comparison', 'comparison'),
('How-To', 'how-to'),
('Maintenance', 'maintenance');
