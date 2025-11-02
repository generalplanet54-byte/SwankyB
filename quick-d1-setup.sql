-- Quick Production D1 Setup
-- Copy and paste this into Cloudflare D1 Console

-- Categories table
CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    display_order INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Products table  
CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    brand TEXT,
    description TEXT,
    primary_image TEXT,
    price REAL,
    original_price REAL,
    amazon_url TEXT,
    category_id INTEGER,
    rating REAL DEFAULT 0.0,
    review_count INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Articles table
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author TEXT DEFAULT 'SwankyBoyz Team',
    status TEXT DEFAULT 'published',
    published_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Add sample data
INSERT INTO categories (name, slug, description, display_order) VALUES
('Watches', 'watches', 'Premium timepieces and smartwatches', 1),
('Grooming', 'grooming', 'Essential grooming and skincare products', 2);

INSERT INTO products (name, slug, brand, description, price, amazon_url, category_id, is_active) VALUES
('Fossil Gen 6 Smartwatch', 'fossil-gen-6-smartwatch', 'Fossil', 'Premium hybrid smartwatch with heart rate monitoring', 299.99, 'https://amazon.com/dp/B098TVDVF9', 1, 1),
('The Art of Shaving Kit', 'art-of-shaving-starter-kit', 'The Art of Shaving', 'Complete wet shaving starter kit with premium ingredients', 89.99, 'https://amazon.com/dp/B000142TKO', 2, 1);

INSERT INTO articles (title, slug, excerpt, content, author, status) VALUES
('Best Smartwatches for Men 2024', 'best-smartwatches-men-2024', 'Discover the top smartwatches that combine style and functionality for the modern gentleman.', 'When it comes to choosing the perfect smartwatch, modern gentlemen need a device that seamlessly blends cutting-edge technology with timeless style...', 'SwankyBoyz Team', 'published');