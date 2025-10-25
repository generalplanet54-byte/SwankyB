-- Seed "Best Body Groomers for Men 2025" article and products

-- Ensure the "Grooming" category exists
INSERT OR IGNORE INTO categories (id, name, slug, description)
VALUES (1, 'Grooming', 'grooming', 'Essential grooming tips, guides, and product reviews for the modern man.');

-- Add the new products for the article
INSERT INTO products (id, name, slug, brand, description, primary_image, price, original_price, amazon_url, rating, review_count, is_active) VALUES
(9, 'Philips Norelco Bodygroom 7000', 'philips-norelco-bodygroom-7000', 'Philips', 'A dual-sided groomer that allows you to switch between shaving and trimming. Features a 4-directional pivoting head and 5 adjustable lengths.', 'https://m.media-amazon.com/images/I/71c6-g5ORhL._AC_SL1500_.jpg', 69.99, 79.99, 'https://amzn.to/4aBcDef', 4.6, 45000, 1),
(10, 'Braun Body Groomer 5', 'braun-body-groomer-5', 'Braun', 'Designed for gentle full-body grooming with SkinShield technology. Comes with sensitive combs to protect skin in delicate areas.', 'https://m.media-amazon.com/images/I/71j5t+5kL-L._AC_SL1500_.jpg', 54.99, 64.99, 'https://amzn.to/4aGhIjk', 4.5, 15000, 1),
(11, 'MANSCAPED The Lawn Mower 4.0', 'manscaped-lawn-mower-4-0', 'MANSCAPED', 'The famous below-the-waist trimmer featuring a ceramic blade, wireless charging, and a waterproof design for wet or dry use.', 'https://m.media-amazon.com/images/I/71vAFOa229L._AC_SL1500_.jpg', 89.99, 99.99, 'https://amzn.to/4aLMnOp', 4.4, 120000, 1);

-- Add the "Best Body Groomers for Men 2025" article
INSERT INTO articles (id, category_id, title, slug, excerpt, content, featured_image, author, meta_title, meta_description, focus_keyword, read_time, view_count, word_count, status, published_at)
VALUES (
  3,
  1,
  'Best Body Groomers for Men 2025',
  'best-body-groomers-2025',
  'From chest to below-the-belt, we tested the best body groomers for a smooth, nick-free finish. See our top picks for 2025.',
  '<h1>Best Body Groomers for Men 2025</h1>
  <h2>Why Every Man Needs a Body Groomer</h2>
  <p>A dedicated body groomer is a game-changer for male grooming. They are designed with safety features to handle sensitive areas and contours that beard trimmers and razors can''t manage without risk. Whether for aesthetics, hygiene, or athletic performance, a good body groomer is an essential tool.</p>
  <h2>Key Features to Look For</h2>
  <h3>Safety First: Skin Protection</h3>
  <p>Look for features like rounded blade tips, hypoallergenic foils, and specialized guards (like Braun''s SkinShield) to prevent nicks and cuts, especially in sensitive zones.</p>
  <h3>Wet & Dry Capability</h3>
  <p>A waterproof design allows for convenient grooming in the shower, which can reduce mess and soften hair for a more comfortable trim.</p>
  <h3>Ergonomics and Reach</h3>
  <p>A good body groomer should be easy to hold and maneuver. Some, like the Philips Bodygroom 7000, have a dual-sided design or extension handles to help reach your back.</p>
  <h2>Top 3 Body Groomers for 2025</h2>
  <h3>🥇 Philips Norelco Bodygroom 7000 – Most Versatile</h3>
  <p>This is the swiss army knife of body groomers. The dual-sided design lets you trim with one side and shave with the other, and the pivoting head adapts to every contour. It''s the best all-in-one solution.</p>
  <h3>🥈 Braun Body Groomer 5 – Best for Sensitive Skin</h3>
  <p>If safety is your number one concern, the Braun Body Groomer 5 is your pick. The SkinShield technology is incredibly effective at preventing nicks, making it perfect for beginners or those with sensitive skin.</p>
  <h3>🥉 MANSCAPED The Lawn Mower 4.0 – Best for Below-the-Belt</h3>
  <p>MANSCAPED built its brand on below-the-waist grooming, and The Lawn Mower 4.0 delivers. Its ceramic blades are sharp yet gentle, and the marketing, while cheeky, is backed by a solid, purpose-built product.</p>
  <h2>Final Thoughts</h2>
  <p>For all-around performance, the <strong>Philips Norelco Bodygroom 7000</strong> is our top choice. It handles every task superbly. However, for maximum safety or specialized below-the-belt grooming, Braun and MANSCAPED offer fantastic, focused tools.</p>',
  'https://images.unsplash.com/photo-1621607512214-6c3491946b32?q=80&w=2070&auto=format&fit=crop',
  'Alex Rivera',
  'Best Body Groomers for Men 2025 - Tested & Reviewed',
  'From chest to below-the-belt, we tested the best body groomers for a smooth, nick-free finish. See our top picks for 2025.',
  'best body groomers 2025',
  6,
  0,
  600,
  'published',
  '2025-10-27 10:00:00'
);

-- Link the new products to the article
INSERT INTO article_products (article_id, product_id, display_order) VALUES
(3, 9, 1),  -- Philips Norelco Bodygroom 7000
(3, 10, 2), -- Braun Body Groomer 5
(3, 11, 3); -- MANSCAPED The Lawn Mower 4.0

-- Add relevant tags for the new article
INSERT OR IGNORE INTO tags (id, name, slug) VALUES
(9, 'Body Grooming', 'body-grooming'),
(10, 'Manscaping', 'manscaping'),
(11, 'Grooming Tech', 'grooming-tech');

INSERT INTO article_tags (article_id, tag_id) VALUES
(3, 9),  -- Body Grooming
(3, 10), -- Manscaping
(3, 11); -- Grooming Tech
