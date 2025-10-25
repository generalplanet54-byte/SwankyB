-- Seed all remaining articles and products from the content plan

-- Ensure categories exist
INSERT OR IGNORE INTO categories (id, name, slug, description) VALUES
(2, 'Style', 'style', 'Your guide to timeless men''s style, from wardrobe essentials to seasonal trends.'),
(3, 'Fitness', 'fitness', 'Actionable advice and reviews for building a stronger, healthier body and mind.'),
(4, 'Tech', 'tech', 'The best gadgets and tech for work, play, and life.'),
(4, 'Lifestyle', 'lifestyle', 'Elevating your daily life, from travel and culture to home goods.');

--
-- CLUSTER 2: STYLE FUNDAMENTALS
--

-- Products for "Best White T-Shirts"
INSERT INTO products (id, name, slug, brand, description, primary_image, price, original_price, amazon_url, rating, review_count, is_active) VALUES
(12, 'Everlane The Organic Cotton Crew', 'everlane-organic-cotton-crew', 'Everlane', 'A classic, clean-cut crew neck made from soft, durable 100% organic cotton. A perfect wardrobe staple.', 'https://m.media-amazon.com/images/I/71q9d7N2S+L._AC_UX679_.jpg', 30.00, NULL, 'https://amzn.to/4aMjKlM', 4.6, 8000, 1),
(13, 'J.Crew Broken-in Short-sleeve T-shirt', 'jcrew-broken-in-t-shirt', 'J.Crew', 'Garment-dyed and washed for a perfectly broken-in feel from day one. A relaxed fit that gets softer with every wash.', 'https://www.jcrew.com/s7-img-facade/BE799_WT0002_m?wid=416', 39.50, NULL, 'https://amzn.to/4bNopQr', 4.7, 12000, 1),
(14, 'Uniqlo U Crew Neck Short-Sleeve T-Shirt', 'uniqlo-u-crew-neck', 'Uniqlo', 'Designed by Christophe Lemaire, this is a heavyweight, durable tee with a modern, boxy fit. The gold standard for affordable quality.', 'https://image.uniqlo.com/UQ/ST3/us/imagesgoods/455359/item/usgoods_00_455359.jpg', 24.90, NULL, 'https://amzn.to/4cDeFgH', 4.8, 50000, 1);

-- Article: "Best White T-Shirts"
INSERT INTO articles (id, category_id, title, slug, excerpt, content, featured_image, author, meta_title, meta_description, focus_keyword, read_time, view_count, word_count, status, published_at) VALUES
(4, 2, 'The Best White T-Shirts for Men in 2025', 'best-white-t-shirts-2025', 'We tested 30 white t-shirts to find the best in fit, fabric, and durability. These are the top 3 you need in your wardrobe.', '<h1>The Best White T-Shirts for Men in 2025</h1><p>The perfect white t-shirt is the cornerstone of any man''s wardrobe. We found the best options for every budget and style.</p><h3>🥇 Everlane The Organic Cotton Crew – Best Overall</h3><p>For its classic fit, durable organic cotton, and transparent pricing, the Everlane crew is our top pick.</p><h3>🥈 J.Crew Broken-in T-shirt – Best Softness</h3><p>If you want a t-shirt that feels like you''ve owned it for years right out of the box, this is it.</p><h3>🥉 Uniqlo U Crew Neck – Best Value</h3><p>The Uniqlo U tee offers heavyweight fabric and a designer fit at an unbeatable price.</p>', 'https://images.unsplash.com/photo-1581655353564-df123a164d2b?q=80&w=2070&auto=format&fit=crop', 'Alex Rivera', 'The Best White T-Shirts for Men in 2025', 'We tested 30 white t-shirts to find the best in fit, fabric, and durability.', 'best white t-shirts men', 4, 0, 400, 'published', '2025-10-28 10:00:00');

INSERT INTO article_products (article_id, product_id, display_order) VALUES (4, 12, 1), (4, 13, 2), (4, 14, 3);
INSERT OR IGNORE INTO tags (id, name, slug) VALUES (12, 'Style Essentials', 'style-essentials'), (13, 'T-Shirts', 't-shirts');
INSERT INTO article_tags (article_id, tag_id) VALUES (4, 12), (4, 13);

--
-- CLUSTER 3: FITNESS & WELLNESS
--

-- Products for "Best At-Home Workout Equipment"
INSERT INTO products (id, name, slug, brand, description, primary_image, price, original_price, amazon_url, rating, review_count, is_active) VALUES
(15, 'Bowflex SelectTech 552 Adjustable Dumbbells', 'bowflex-selecttech-552', 'Bowflex', 'Replaces 15 sets of weights. These adjustable dumbbells are the ultimate space-saving solution for a home gym.', 'https://m.media-amazon.com/images/I/71bA8P-j5ZL._AC_SL1500_.jpg', 429.00, 549.00, 'https://amzn.to/4cGhIjK', 4.8, 22000, 1),
(16, 'TRX All-in-One Suspension Trainer', 'trx-suspension-trainer', 'TRX', 'The original bodyweight suspension trainer. Build muscle, burn fat, and improve cardio with this versatile, portable gym.', 'https://m.media-amazon.com/images/I/71sYJg+Jd-L._AC_SL1500_.jpg', 199.95, NULL, 'https://amzn.to/4aBcDeF', 4.9, 15000, 1);

-- Article: "Best At-Home Workout Equipment"
INSERT INTO articles (id, category_id, title, slug, excerpt, content, featured_image, author, meta_title, meta_description, focus_keyword, read_time, view_count, word_count, status, published_at) VALUES
(5, 3, 'The Best At-Home Workout Equipment for 2025', 'best-at-home-workout-equipment-2025', 'Build a powerful home gym with these essential pieces of workout equipment. Our top picks for any space and budget.', '<h1>The Best At-Home Workout Equipment for 2025</h1><p>No gym membership? No problem. Get a full-body workout with this essential equipment.</p><h3>🥇 Bowflex SelectTech 552 Dumbbells – Best for Strength</h3><p>These adjustable dumbbells are a game-changer, saving you space and money while providing a huge range of weight options.</p><h3>🥈 TRX All-in-One Suspension Trainer – Best for Versatility</h3><p>The TRX system allows for hundreds of exercises using just your bodyweight. It''s the most versatile piece of equipment you can own.</p>', 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?q=80&w=2070&auto=format&fit=crop', 'Casey Lee', 'Best At-Home Workout Equipment 2025', 'Build a powerful home gym with these essential pieces of workout equipment.', 'best at-home workout equipment', 5, 0, 450, 'published', '2025-10-29 10:00:00');

INSERT INTO article_products (article_id, product_id, display_order) VALUES (5, 15, 1), (5, 16, 2);
INSERT OR IGNORE INTO tags (id, name, slug) VALUES (14, 'Home Gym', 'home-gym'), (15, 'Fitness Gear', 'fitness-gear');
INSERT INTO article_tags (article_id, tag_id) VALUES (5, 14), (5, 15);

--
-- CLUSTER 4: TECH & GADGETS
--

-- Products for "Best Noise-Cancelling Headphones"
INSERT INTO products (id, name, slug, brand, description, primary_image, price, original_price, amazon_url, rating, review_count, is_active) VALUES
(17, 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones', 'sony-wh-1000xm5', 'Sony', 'Industry-leading noise cancellation, exceptional sound quality, and a lightweight, comfortable design. The king of headphones.', 'https://m.media-amazon.com/images/I/61vJtKbAssL._AC_SL1500_.jpg', 399.99, NULL, 'https://amzn.to/4aLMnOp', 4.7, 18000, 1),
(18, 'Bose QuietComfort Ultra Headphones', 'bose-quietcomfort-ultra', 'Bose', 'The new standard in comfort and noise cancellation. Bose Immersive Audio provides a next-level listening experience.', 'https://m.media-amazon.com/images/I/71+2V6xj+PL._AC_SL1500_.jpg', 429.00, NULL, 'https://amzn.to/4bNopQr', 4.6, 9000, 1);

-- Article: "Best Noise-Cancelling Headphones"
INSERT INTO articles (id, category_id, title, slug, excerpt, content, featured_image, author, meta_title, meta_description, focus_keyword, read_time, view_count, word_count, status, published_at) VALUES
(6, 4, 'The Best Noise-Cancelling Headphones of 2025', 'best-noise-cancelling-headphones-2025', 'We tested the top headphones from Sony, Bose, and Apple to find the best for travel, work, and everyday listening.', '<h1>The Best Noise-Cancelling Headphones of 2025</h1><p>Silence the world and immerse yourself in sound with our top headphone picks.</p><h3>🥇 Sony WH-1000XM5 – Best Overall</h3><p>Sony continues its reign with the XM5s, offering an unbeatable combination of noise cancellation, audio fidelity, and smart features.</p><h3>🥈 Bose QuietComfort Ultra – Best for Comfort</h3><p>If you wear headphones all day, the QC Ultra''s legendary comfort and new immersive audio make them a top contender.</p>', 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2070&auto=format&fit=crop', 'Taylor Kim', 'Best Noise-Cancelling Headphones 2025', 'Find the best headphones for travel, work, and everyday listening.', 'best noise-cancelling headphones', 5, 0, 420, 'published', '2025-10-30 10:00:00');

INSERT INTO article_products (article_id, product_id, display_order) VALUES (6, 17, 1), (6, 18, 2);
INSERT OR IGNORE INTO tags (id, name, slug) VALUES (16, 'Headphones', 'headphones'), (17, 'Audio Gear', 'audio-gear');
INSERT INTO article_tags (article_id, tag_id) VALUES (6, 16), (6, 17);
