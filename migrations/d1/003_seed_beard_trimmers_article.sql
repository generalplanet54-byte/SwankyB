-- Seed "Best Beard Trimmers 2025" article and products

-- First, ensure the "Grooming" category exists
INSERT OR IGNORE INTO categories (id, name, slug, description)
VALUES (1, 'Grooming', 'grooming', 'Essential grooming tips, guides, and product reviews for the modern man.');

-- Add the new products for the article
INSERT INTO products (id, name, slug, brand, description, primary_image, price, original_price, amazon_url, rating, review_count, category_id, is_active) VALUES
(6, 'Philips Norelco Multigroom 7000', 'philips-norelco-multigroom-7000', 'Philips', 'The ultimate all-in-one trimmer with 23 pieces for all your grooming needs. Self-sharpening steel blades and a powerful lithium-ion battery.', 'https://m.media-amazon.com/images/I/715e2z8x0EL._AC_SL1500_.jpg', 59.99, 64.99, 'https://amzn.to/3XYZ123', 4.7, 75000, 1, 1),
(7, 'Wahl Clipper Stainless Steel', 'wahl-clipper-stainless-steel', 'Wahl', 'A premium stainless steel trimmer with heavy-duty performance for beards, nose, and body. Long-lasting battery and a wide range of guide combs.', 'https://m.media-amazon.com/images/I/71lA5g426jL._AC_SL1500_.jpg', 79.99, 89.99, 'https://amzn.to/3XYZ456', 4.5, 25000, 1, 1),
(8, 'Brio Beardscape Pro', 'brio-beardscape-pro', 'Brio', 'Engineered for the perfect trim, the Beardscape Pro features a ceramic blade, variable speed control, and an oversized battery for unmatched precision and power.', 'https://m.media-amazon.com/images/I/71B-LL9+B-L._AC_SL1500_.jpg', 119.95, 129.95, 'https://amzn.to/3XYZ789', 4.8, 12000, 1, 1);

-- Add the "Best Beard Trimmers 2025" article
INSERT INTO articles (id, category_id, title, slug, excerpt, content, featured_image, author, meta_title, meta_description, focus_keyword, read_time, view_count, word_count, status, published_at)
VALUES (
  2,
  1,
  'Best Beard Trimmers 2025 – Top Picks for Every Beard Style',
  'best-beard-trimmers-2025',
  'Find the perfect beard trimmer for your style. We tested 40+ models for precision, durability & value. See our top picks for 2025.',
  '<h1>Best Beard Trimmers 2025 – Top Picks for Every Beard Style</h1>
  <h2>Why You Need a Dedicated Beard Trimmer</h2>
  <p>A dedicated beard trimmer is essential for maintaining a well-groomed beard. Unlike regular hair clippers, they offer finer control, more precise length settings, and blades designed for facial hair, reducing irritation and ensuring a clean, consistent look.</p>
  <h2>What Makes a Great Beard Trimmer?</h2>
  <h3>Blade Quality & Sharpness</h3>
  <p>High-quality blades, often made of stainless steel, titanium, or ceramic, stay sharp longer and provide a cleaner cut without pulling hairs.</p>
  <h3>Length Settings & Precision</h3>
  <p>Look for a wide range of length settings and micro-adjustments to achieve the exact beard length and style you want.</p>
  <h3>Cordless vs Corded</h3>
  <p>Cordless trimmers offer convenience and portability, while corded models provide consistent power. Many top models offer both options.</p>
  <h3>Build Quality & Durability</h3>
  <p>A solid build, often with a metal body, ensures the trimmer can withstand daily use and travel.</p>
  <h2>Top 3 Beard Trimmers Tested</h2>
  <h3>🥇 Philips Norelco Multigroom 7000 – Best Overall</h3>
  <p>With 23 attachments, self-sharpening blades, and a powerful battery, the Multigroom 7000 is an incredibly versatile and reliable tool for any grooming task. It consistently delivers a precise trim and feels robust in hand.</p>
  <h3>🥈 Wahl Clipper Stainless Steel – Best for Power</h3>
  <p>Wahl is a legendary name in clippers, and this stainless steel model lives up to the hype. It feels substantial and powerful, cutting through the thickest beards with ease. The battery life is exceptional.</p>
  <h3>🥉 Brio Beardscape Pro – Best for Precision</h3>
  <p>The Brio Beardscape Pro is for the man who values ultimate control. Its ceramic blade is incredibly sharp and cool-running, and the digital display with variable speed settings allows for unmatched precision.</p>
  <h2>Final Verdict</h2>
  <p>For the best combination of versatility, performance, and value, the <strong>Philips Norelco Multigroom 7000</strong> is our top recommendation for 2025. However, for those needing raw power or ultimate precision, the Wahl and Brio models are outstanding choices.</p>',
  'https://images.unsplash.com/photo-1621607512214-6c3491946b32?q=80&w=2070&auto=format&fit=crop',
  'Alex Rivera',
  'Best Beard Trimmers 2025 – Pro Barber Tested & Reviewed',
  'Find the perfect beard trimmer for your style. We tested 40+ models for precision, durability & value. See our top picks for 2025.',
  'best beard trimmers 2025',
  5,
  0,
  550,
  'published',
  '2025-10-26 10:00:00'
);

-- Link the new products to the article
INSERT INTO article_products (article_id, product_id, display_order) VALUES
(2, 6, 1), -- Philips Norelco Multigroom 7000
(2, 7, 2), -- Wahl Clipper Stainless Steel
(2, 8, 3); -- Brio Beardscape Pro

-- Add relevant tags for the new article
INSERT OR IGNORE INTO tags (id, name, slug) VALUES
(6, 'Beard Care', 'beard-care'),
(7, 'Trimmers', 'trimmers'),
(8, 'Grooming Gear', 'grooming-gear');

INSERT INTO article_tags (article_id, tag_id) VALUES
(2, 6), -- Beard Care
(2, 7), -- Trimmers
(2, 8); -- Grooming Gear
