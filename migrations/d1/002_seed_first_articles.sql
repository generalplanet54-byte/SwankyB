-- Seed First Priority Articles from Content Strategy
-- Article 1: Best Electric Shavers 2025

INSERT INTO articles (
  title,
  slug,
  meta_title,
  meta_description,
  content,
  excerpt,
  category_id,
  author,
  status,
  published_at,
  focus_keyword,
  semantic_keywords,
  featured_image,
  read_time,
  word_count,
  created_at,
  updated_at
) VALUES (
  'Best Electric Shavers for Men in 2025 – Expert Tested Reviews',
  'best-electric-shavers-men-2025',
  'Best Electric Shavers 2025 – Top 10 Tested for Close Shaves',
  'Our experts tested 50+ electric shavers. Find the best rotary & foil shavers for sensitive skin, thick beards & budget picks in 2025.',
  -- Full HTML content (truncated in this example for readability)
  '<article class="article-content">... [FULL ARTICLE CONTENT] ...</article>',
  'Finding the perfect electric shaver can transform your grooming routine from a daily chore into a quick, comfortable experience. After testing over 50 models in 2025, we''ve identified the absolute best electric shavers that deliver salon-quality results at home.',
  (SELECT id FROM categories WHERE slug = 'grooming-essentials'),
  'SwankyBoyz Team',
  'published',
  '2025-01-15 10:00:00',
  'best electric shavers for men 2025',
  '["electric razor reviews", "rotary vs foil shaver", "close shave electric", "braun series 9", "philips norelco", "best shaver sensitive skin", "budget electric shaver", "head shaving electric"]',
  '/images/articles/electric-shavers-2025-hero.jpg',
  '12 min read',
  2847,
  datetime('now'),
  datetime('now')
);

-- Get the article ID for relationship inserts
-- (In actual migration, you'd use LAST_INSERT_ROWID() or run this as a transaction)

-- Tag associations for Article 1
INSERT INTO article_tags (article_id, tag_id, created_at)
SELECT 
  (SELECT id FROM articles WHERE slug = 'best-electric-shavers-men-2025'),
  id,
  datetime('now')
FROM tags
WHERE name IN ('Reviews', 'Best Of 2025', 'Buying Guide', 'Expert Tips');

-- Link to Grooming Essentials content cluster
INSERT INTO article_clusters (article_id, cluster_id, created_at)
VALUES (
  (SELECT id FROM articles WHERE slug = 'best-electric-shavers-men-2025'),
  (SELECT id FROM content_clusters WHERE name = 'Grooming Essentials'),
  datetime('now')
);

-- Sample Products for Article 1 (Top 10 Electric Shavers)
-- Product 1: Braun Series 9 Pro
INSERT INTO products (
  name,
  slug,
  description,
  brand,
  category_id,
  price,
  currency,
  amazon_url,
  image_url,
  rating,
  total_reviews,
  specs,
  pros,
  cons,
  status,
  created_at,
  updated_at
) VALUES (
  'Braun Series 9 Pro Electric Shaver',
  'braun-series-9-pro',
  'The pinnacle of electric shaving technology with five synchronized shaving elements and AutoSense technology that adjusts power 13 times per second.',
  'Braun',
  (SELECT id FROM categories WHERE slug = 'grooming-essentials'),
  329.99,
  'USD',
  'https://amazon.com/dp/B08EXAMPLE1',
  '/images/products/braun-series-9-pro.jpg',
  9.7,
  2847,
  '{"motor_speed": "40000 CPM", "blades": "5 synchronized elements", "battery": "60 minutes", "waterproof": true, "cleaning_station": true, "warranty": "2 years"}',
  '["Closest shave tested", "AutoSense technology", "Premium build quality", "Quick charge feature", "100% waterproof"]',
  '["Premium price point", "Loud motor", "Bulky design"]',
  'active',
  datetime('now'),
  datetime('now')
);

-- Product 2: Philips Norelco 9000 Prestige
INSERT INTO products (
  name,
  slug,
  description,
  brand,
  category_id,
  price,
  currency,
  amazon_url,
  image_url,
  rating,
  total_reviews,
  specs,
  pros,
  cons,
  status,
  created_at,
  updated_at
) VALUES (
  'Philips Norelco 9000 Prestige Rotary Shaver',
  'philips-norelco-9000-prestige',
  'Luxury rotary shaver with NanoTech precision blades and BeardAdapt sensors. Features 8-direction flex heads and Qi wireless charging.',
  'Philips Norelco',
  (SELECT id FROM categories WHERE slug = 'grooming-essentials'),
  299.99,
  'USD',
  'https://amazon.com/dp/B08EXAMPLE2',
  '/images/products/philips-norelco-9000.jpg',
  9.5,
  1923,
  '{"motor_speed": "35000 CPM", "heads": "3 rotary with 8-direction flex", "battery": "60 minutes", "waterproof": true, "wireless_charging": true, "warranty": "2 years"}',
  '["Smoothest rotary shave", "Quiet operation", "Qi wireless charging", "Premium travel case", "Great for head shaving"]',
  '["Expensive", "Rotary learning curve", "Replacement heads costly"]',
  'active',
  datetime('now'),
  datetime('now')
);

-- Product 3: Panasonic Arc5
INSERT INTO products (
  name,
  slug,
  description,
  brand,
  category_id,
  price,
  currency,
  amazon_url,
  image_url,
  rating,
  total_reviews,
  specs,
  pros,
  cons,
  status,
  created_at,
  updated_at
) VALUES (
  'Panasonic Arc5 Electric Razor',
  'panasonic-arc5',
  '5-blade foil shaver with 14,000 CPM motor and ultra-sharp Japanese stainless steel blades. Best value in premium shavers.',
  'Panasonic',
  (SELECT id FROM categories WHERE slug = 'grooming-essentials'),
  169.99,
  'USD',
  'https://amazon.com/dp/B08EXAMPLE3',
  '/images/products/panasonic-arc5.jpg',
  9.3,
  3456,
  '{"motor_speed": "14000 CPM", "blades": "5 ultra-sharp Japanese steel", "battery": "45 minutes", "waterproof": true, "cleaning_station": true, "warranty": "1 year"}',
  '["Best value premium shaver", "Powerful motor", "Affordable replacement heads", "Japanese blade quality", "Includes cleaning station"]',
  '["Shorter battery life", "Less premium feel", "Louder than competitors"]',
  'active',
  datetime('now'),
  datetime('now')
);

-- Product 4: Braun Series 7
INSERT INTO products (
  name,
  slug,
  description,
  brand,
  category_id,
  price,
  currency,
  amazon_url,
  image_url,
  rating,
  total_reviews,
  specs,
  pros,
  cons,
  status,
  created_at,
  updated_at
) VALUES (
  'Braun Series 7 7085cc Electric Shaver',
  'braun-series-7',
  'Gentlest premium foil shaver for sensitive skin. AutoSense technology with waterproof design and cleaning station.',
  'Braun',
  (SELECT id FROM categories WHERE slug = 'grooming-essentials'),
  229.99,
  'USD',
  'https://amazon.com/dp/B08EXAMPLE4',
  '/images/products/braun-series-7.jpg',
  9.2,
  5634,
  '{"motor_speed": "10000 CPM", "blades": "4 synchronized elements", "battery": "50 minutes", "waterproof": true, "cleaning_station": true, "warranty": "2 years"}',
  '["Best for sensitive skin", "Minimal irritation", "Solid build quality", "Good battery life", "Quiet operation"]',
  '["Not as close as Series 9", "Mid-range motor power", "Premium price"]',
  'active',
  datetime('now'),
  datetime('now')
);

-- Product 5: Remington F5-5800
INSERT INTO products (
  name,
  slug,
  description,
  brand,
  category_id,
  price,
  currency,
  amazon_url,
  image_url,
  rating,
  total_reviews,
  specs,
  pros,
  cons,
  status,
  created_at,
  updated_at
) VALUES (
  'Remington F5-5800 Foil Shaver',
  'remington-f5-5800',
  'Budget-friendly foil shaver that punches above its weight. Intercept shaving technology and pivot & flex design.',
  'Remington',
  (SELECT id FROM categories WHERE slug = 'grooming-essentials'),
  59.99,
  'USD',
  'https://amazon.com/dp/B08EXAMPLE5',
  '/images/products/remington-f5.jpg',
  8.4,
  8923,
  '{"motor_speed": "8000 CPM", "blades": "3 flex foils", "battery": "60 minutes cordless", "waterproof": true, "pop-up_trimmer": true, "warranty": "2 years"}',
  '["Incredible value", "Long battery life", "Surprisingly effective", "Washable", "2-year warranty"]',
  '["Basic features", "Plastic feel", "Not as close as premium", "Louder motor"]',
  'active',
  datetime('now'),
  datetime('now')
);

-- Link products to article
INSERT INTO article_products (article_id, product_id, display_order, created_at)
VALUES
  ((SELECT id FROM articles WHERE slug = 'best-electric-shavers-men-2025'),
   (SELECT id FROM products WHERE slug = 'braun-series-9-pro'),
   1,
   datetime('now')),
   
  ((SELECT id FROM articles WHERE slug = 'best-electric-shavers-men-2025'),
   (SELECT id FROM products WHERE slug = 'philips-norelco-9000-prestige'),
   2,
   datetime('now')),
   
  ((SELECT id FROM articles WHERE slug = 'best-electric-shavers-men-2025'),
   (SELECT id FROM products WHERE slug = 'panasonic-arc5'),
   3,
   datetime('now')),
   
  ((SELECT id FROM articles WHERE slug = 'best-electric-shavers-men-2025'),
   (SELECT id FROM products WHERE slug = 'braun-series-7'),
   4,
   datetime('now')),
   
  ((SELECT id FROM articles WHERE slug = 'best-electric-shavers-men-2025'),
   (SELECT id FROM products WHERE slug = 'remington-f5-5800'),
   5,
   datetime('now'));

-- Add note about remaining products (6-10)
-- These would be added similarly following the pattern above
-- Products to add: Philips OneBlade, Wahl Lifeproof, Andis ProFoil, 
-- Panasonic ES-LT3N, Skull Shaver Pitbull
