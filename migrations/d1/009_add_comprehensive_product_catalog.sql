-- SwankyBoyz Comprehensive Product Catalog
-- Adding all requested products with proper affiliate links, images, and categories

-- =====================================================
-- LUXURY CATEGORY
-- =====================================================
INSERT INTO categories (name, slug, description, display_order) VALUES
('Luxury', 'luxury', 'Premium luxury accessories and timepieces for the discerning gentleman', 7);

-- =====================================================
-- FOOTWEAR CATEGORY  
-- =====================================================
INSERT INTO categories (name, slug, description, display_order) VALUES
('Footwear', 'footwear', 'Premium sneakers and comfortable shoes for active lifestyles', 8);

-- =====================================================
-- SMARTPHONES & LAPTOPS CATEGORY
-- =====================================================
INSERT INTO categories (name, slug, description, display_order) VALUES
('Smartphones', 'smartphones', 'Latest flagship phones and mobile devices', 9),
('Laptops', 'laptops', 'High-performance laptops for professionals and creators', 10),
('Audio Equipment', 'audio-equipment', 'Professional microphones and audio gear', 11),
('Watches', 'watches', 'Premium smartwatches and fitness trackers', 12);

-- =====================================================
-- PREMIUM LUXURY PRODUCTS
-- =====================================================
INSERT INTO products (
  name, slug, brand, description, price, original_price, amazon_url,
  primary_image, category_id, rating, is_featured, is_active, 
  meta_title, meta_description, created_at, updated_at
) VALUES 
(
  'Premium Men''s Automatic Skeleton Watch with Gold Dial',
  'premium-skeleton-watch-gold-dial',
  'Luxury Watch Co.',
  'Standout luxury timepiece featuring automatic movement, skeleton dial design with gold or rose-gold accents. Premium mechanical craftsmanship for the discerning gentleman.',
  299.99,
  499.99,
  'https://amzn.to/496SE8j',
  '/images/products/luxury/skeleton-watch.svg',
  (SELECT id FROM categories WHERE slug = 'luxury'),
  4.6,
  1,
  1,
  'Premium Men''s Automatic Skeleton Watch - Gold Dial Luxury Timepiece',
  'Discover the ultimate luxury timepiece with automatic movement and skeleton dial. Premium gold accents and mechanical craftsmanship.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'High-End Men''s Leather Briefcase in Premium Full-Grain Leather',
  'premium-leather-briefcase-full-grain',
  'Executive Leather',
  'Executive briefcase/backpack in premium full-grain leather (black or dark brown). Professional design with multiple compartments for modern business needs.',
  249.99,
  329.99,
  'https://amzn.to/4huaDHR',
  '/images/products/luxury/leather-briefcase.svg',
  (SELECT id FROM categories WHERE slug = 'luxury'),
  4.7,
  1,
  1,
  'Premium Full-Grain Leather Briefcase - Executive Business Bag',
  'High-end men''s briefcase in premium full-grain leather. Perfect for modern professionals with multiple compartments.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Top-Tier Designer Cologne with Woody/Spicy Notes',
  'designer-cologne-woody-spicy-notes',
  'Designer Fragrances',
  'Signature scent item - designer or niche cologne for men featuring sophisticated woody and spicy notes. Long-lasting fragrance for the modern gentleman.',
  89.99,
  129.99,
  'https://amzn.to/3JwTC30',
  '/images/products/grooming/cologne-bottle.svg',
  (SELECT id FROM categories WHERE slug = 'grooming-essentials'),
  4.5,
  1,
  1,
  'Designer Men''s Cologne - Woody Spicy Signature Scent',
  'Top-tier designer cologne with woody and spicy notes. The perfect signature scent for the sophisticated modern gentleman.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Exotic Leather Wallet - Crocodile Embossed Premium Cardholder',
  'exotic-leather-wallet-crocodile-embossed',
  'Unique Leather Goods',
  'Slim, elegant cardholder crafted from crocodile or alligator embossed leather. Luxury wallet with RFID protection and premium construction.',
  79.99,
  99.99,
  'https://www.amazon.com/Unique-Genuine-Crocodile-Alligator-Leather/dp/B07P3KVGG1?crid=2MWSFBSHQJMPI&dib=eyJ2IjoiMSJ9.xrJbNIakprYohY76yQ9p_7wDBf5x-x3u_6qWIDGU81G8I8kBi__2hmZLqcd3R1RaXM8HSuks6hoBpHtYEHsuOAKq0TW4WLFIA3DIhDNVaV4.239gcbxToRsd8go5RtvVEUTCvMOnXJMflUiajq0czPw&dib_tag=se&keywords=exotic+leather+wallet%2Fcardholder+%28slim%2C+elegant%2C+crafted+from+crocodile+or+alligator+embossed+leather%29&qid=1761575150&refinements=p_36%3A8600-&rnid=2661611011&sprefix=exotic+leather+wallet%2Fcardholder+slim%2C+elegant%2C+crafted+from+crocodile+or+alligator+embossed+leather+%2Caps%2C321&sr=8-6&linkCode=ll1&tag=swankyboyz-20&linkId=ccaff97f2ec528ccdb1ccfb3714542c9&language=en_US&ref_=as_li_ss_tl',
  '/images/products/luxury/crocodile-wallet.svg',
  (SELECT id FROM categories WHERE slug = 'luxury'),
  4.4,
  1,
  1,
  'Exotic Crocodile Leather Wallet - Premium RFID Cardholder',
  'Slim, elegant wallet crafted from crocodile embossed leather. Luxury cardholder with RFID protection and premium construction.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- =====================================================
-- FOOTWEAR PRODUCTS
-- =====================================================
INSERT INTO products (
  name, slug, brand, description, price, original_price, amazon_url,
  primary_image, category_id, rating, is_featured, is_active,
  meta_title, meta_description, created_at, updated_at
) VALUES 
(
  'Nike Men''s Cortez Sneakers - Classic Leather Design',
  'nike-mens-cortez-sneakers-classic',
  'Nike',
  'Iconic Nike Cortez sneakers featuring classic leather design and comfortable cushioning. Timeless style meets modern comfort.',
  89.99,
  110.00,
  'https://amzn.to/4mMEw7e',
  '/images/products/footwear/nike-cortez.svg',
  (SELECT id FROM categories WHERE slug = 'footwear'),
  4.5,
  1,
  1,
  'Nike Men''s Cortez Sneakers - Classic Leather Athletic Shoes',
  'Shop iconic Nike Cortez sneakers with classic leather design. Timeless style and comfortable cushioning for everyday wear.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Gravity Defyer Pain Relief Orthopedic Walking Shoes',
  'gravity-defyer-pain-relief-orthopedic-shoes',
  'Gravity Defyer',
  'Advanced orthopedic walking shoes with arch support, plantar fasciitis relief, and VersoShock technology. Perfect for foot and knee pain relief.',
  149.99,
  199.99,
  'https://amzn.to/4h0cX9k',
  '/images/products/footwear/orthopedic-shoes.svg',
  (SELECT id FROM categories WHERE slug = 'footwear'),
  4.3,
  1,
  1,
  'Gravity Defyer Orthopedic Shoes - Pain Relief Walking Shoes',
  'Advanced orthopedic walking shoes with plantar fasciitis relief and arch support. VersoShock technology for foot and knee pain.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'G-DEFY Mighty Walk Orthopedic Walking Shoe with VersoShock',
  'g-defy-mighty-walk-orthopedic-shoes',
  'G-DEFY',
  'Professional orthopedic walking shoes with VersoShock technology for pain relief. Advanced arch support and diabetic-friendly design.',
  159.99,
  219.99,
  'https://amzn.to/3IUsQ4j',
  '/images/products/footwear/g-defy-shoes.svg',
  (SELECT id FROM categories WHERE slug = 'footwear'),
  4.4,
  1,
  1,
  'G-DEFY Mighty Walk Orthopedic Shoes - VersoShock Technology',
  'Advanced orthopedic walking shoes with VersoShock technology. Professional pain relief with arch support and diabetic-friendly design.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Orthofeet Men''s Orthopedic Knit Edgewater Sneakers',
  'orthofeet-mens-knit-edgewater-sneakers',
  'Orthofeet',
  'Premium orthopedic sneakers with advanced arch support and cushioning. Knit upper design for comfort and breathability.',
  119.99,
  149.99,
  'https://amzn.to/4o3Ap7R',
  '/images/products/footwear/orthofeet-sneakers.svg',
  (SELECT id FROM categories WHERE slug = 'footwear'),
  4.2,
  1,
  1,
  'Orthofeet Men''s Knit Edgewater Sneakers - Orthopedic Comfort',
  'Premium orthopedic sneakers with advanced arch support. Knit upper design for superior comfort and breathability.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- =====================================================
-- SMARTPHONE PRODUCTS
-- =====================================================
INSERT INTO products (
  name, slug, brand, description, price, original_price, amazon_url,
  primary_image, category_id, rating, is_featured, is_active,
  meta_title, meta_description, created_at, updated_at
) VALUES 
(
  'Samsung Galaxy Z Flip7 Cell Phone - 512GB AI Smartphone',
  'samsung-galaxy-z-flip7-512gb-smartphone',
  'Samsung',
  'Revolutionary foldable smartphone with 512GB storage, advanced AI features, and long battery life. Premium Android experience with innovative design.',
  1199.99,
  1399.99,
  'https://amzn.to/46SkWQU',
  '/images/products/tech/samsung-flip7.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.6,
  1,
  1,
  'Samsung Galaxy Z Flip7 - 512GB Foldable AI Smartphone',
  'Revolutionary Samsung Galaxy Z Flip7 with 512GB storage and advanced AI features. Premium foldable smartphone with long battery life.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Motorola razr 2024 - Unlocked 8/256GB Foldable Phone',
  'motorola-razr-2024-unlocked-foldable',
  'Motorola',
  'Premium foldable smartphone with 8GB RAM and 256GB storage. Advanced 50MP camera and sleek Beach Sand design.',
  699.99,
  899.99,
  'https://amzn.to/46Bc7ME',
  '/images/products/tech/motorola-razr.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.4,
  1,
  1,
  'Motorola razr 2024 - Unlocked Foldable Smartphone',
  'Premium Motorola razr 2024 foldable phone with 8GB RAM, 256GB storage, and advanced 50MP camera system.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Nothing Phone (3) - 2025 New 5G Unlocked 256GB Android 15',
  'nothing-phone-3-2025-5g-unlocked',
  'Nothing',
  'Revolutionary 2025 smartphone with Snapdragon 8s Gen4, four 50MP cameras, AMOLED display, and unique Glyph Interface.',
  799.99,
  999.99,
  'https://amzn.to/48abGdl',
  '/images/products/tech/nothing-phone3.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.5,
  1,
  1,
  'Nothing Phone (3) 2025 - 5G Unlocked Android 15 Smartphone',
  'Revolutionary Nothing Phone (3) with Snapdragon 8s Gen4, four 50MP cameras, and unique Glyph Interface design.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'REDMAGIC 10 Air Gaming Smartphone - 16GB+512GB Black',
  'redmagic-10-air-gaming-smartphone',
  'REDMAGIC',
  'Ultimate gaming smartphone with 16GB RAM, 512GB storage, 120Hz display, under-display camera, and 5860mAh battery.',
  899.99,
  1199.99,
  'https://amzn.to/3KDphjs',
  '/images/products/tech/redmagic-10-air.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.7,
  1,
  1,
  'REDMAGIC 10 Air Gaming Smartphone - 16GB RAM 512GB Storage',
  'Ultimate gaming smartphone with 16GB RAM, 512GB storage, 120Hz display, and under-display camera technology.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'OnePlus 13 - 12GB RAM + 256GB Dual-SIM Unlocked',
  'oneplus-13-12gb-256gb-dual-sim',
  'OnePlus',
  'Flagship OnePlus 13 with Snapdragon 8 Elite, 80W SUPERVOOC charging, 50W AIRVOOC wireless charging, and advanced Hasselblad camera.',
  899.99,
  1099.99,
  'https://amzn.to/4gVobvI',
  '/images/products/tech/oneplus-13.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.8,
  1,
  1,
  'OnePlus 13 - 12GB RAM Snapdragon 8 Elite Smartphone',
  'Flagship OnePlus 13 with Snapdragon 8 Elite, 80W fast charging, and advanced Hasselblad camera system.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'HONOR Magic V2 Dual SIM 512GB + 16GB RAM Foldable Phone',
  'honor-magic-v2-512gb-16gb-foldable',
  'HONOR',
  'Premium foldable smartphone with 512GB storage, 16GB RAM, factory unlocked 5G capability in elegant Phantom Purple design.',
  1299.99,
  1599.99,
  'https://amzn.to/4gQH82m',
  '/images/products/tech/honor-magic-v2.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.5,
  1,
  1,
  'HONOR Magic V2 - 512GB Foldable Smartphone Phantom Purple',
  'Premium HONOR Magic V2 foldable phone with 512GB storage, 16GB RAM, and factory unlocked 5G in Phantom Purple.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Apple iPhone 16 Pro - 256GB Black Titanium (Renewed)',
  'apple-iphone-16-pro-256gb-black-titanium',
  'Apple',
  'Premium iPhone 16 Pro with 256GB storage in elegant Black Titanium. Advanced camera system and A18 Pro chip performance.',
  999.99,
  1199.99,
  'https://amzn.to/3Iufsnz',
  '/images/products/tech/iphone-16-pro.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.7,
  1,
  1,
  'Apple iPhone 16 Pro - 256GB Black Titanium Premium Smartphone',
  'Premium iPhone 16 Pro with 256GB storage, Black Titanium design, and advanced camera system with A18 Pro chip.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Samsung Galaxy S25 Ultra - 512GB Snapdragon 8 Elite',
  'samsung-galaxy-s25-ultra-512gb-snapdragon',
  'Samsung',
  'Ultimate Samsung flagship with 512GB storage, Snapdragon 8 Elite processor, AI Night Mode camera, and built-in S Pen.',
  1399.99,
  1599.99,
  'https://amzn.to/432w9x4',
  '/images/products/tech/galaxy-s25-ultra.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.9,
  1,
  1,
  'Samsung Galaxy S25 Ultra - 512GB Snapdragon 8 Elite Smartphone',
  'Ultimate Samsung Galaxy S25 Ultra with 512GB storage, Snapdragon 8 Elite, AI camera, and built-in S Pen.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Samsung Galaxy S24 Ultra - 256GB AI Smartphone Titanium Yellow',
  'samsung-galaxy-s24-ultra-256gb-titanium-yellow',
  'Samsung',
  'Premium Galaxy S24 Ultra with 256GB storage, 50MP 100x zoom camera, Note Assist features, and rugged Titanium Yellow design.',
  1199.99,
  1399.99,
  'https://amzn.to/3IWoiKP',
  '/images/products/tech/galaxy-s24-ultra.svg',
  (SELECT id FROM categories WHERE slug = 'smartphones'),
  4.8,
  1,
  1,
  'Samsung Galaxy S24 Ultra - 256GB AI Smartphone Titanium Yellow',
  'Premium Galaxy S24 Ultra with 256GB storage, 50MP 100x zoom camera, and rugged Titanium Yellow design.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- =====================================================
-- LAPTOP PRODUCTS
-- =====================================================
INSERT INTO products (
  name, slug, brand, description, price, original_price, amazon_url,
  primary_image, category_id, rating, is_featured, is_active,
  meta_title, meta_description, created_at, updated_at
) VALUES 
(
  'Apple 2025 MacBook Air 13-inch with M4 Chip - 16GB/256GB Silver',
  'apple-macbook-air-13-m4-16gb-256gb',
  'Apple',
  'Revolutionary MacBook Air with M4 chip built for Apple Intelligence. 13.6-inch Liquid Retina Display, 16GB unified memory, 256GB SSD.',
  1299.99,
  1499.99,
  'https://amzn.to/3KzOivV',
  '/images/products/tech/macbook-air-m4.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.9,
  1,
  1,
  'Apple MacBook Air 13-inch M4 - 16GB RAM 256GB SSD Silver',
  'Revolutionary MacBook Air with M4 chip, Apple Intelligence, 16GB memory, and 256GB SSD in elegant Silver.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Apple 2024 MacBook Pro 16-inch M4 Pro - 24GB/512GB Space Black',
  'apple-macbook-pro-16-m4-pro-24gb-512gb',
  'Apple',
  'Professional MacBook Pro with M4 Pro chip, 14-core CPU, 20-core GPU. Built for Apple Intelligence with 24GB unified memory.',
  2499.99,
  2899.99,
  'https://amzn.to/3VOrj2I',
  '/images/products/tech/macbook-pro-16-m4.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.9,
  1,
  1,
  'Apple MacBook Pro 16-inch M4 Pro - 24GB RAM 512GB SSD',
  'Professional MacBook Pro with M4 Pro chip, 14-core CPU, 20-core GPU, and 24GB unified memory for demanding workflows.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Apple 2024 MacBook Pro 14-inch M4 - 16GB/512GB Space Black',
  'apple-macbook-pro-14-m4-16gb-512gb',
  'Apple',
  'Compact MacBook Pro with M4 chip featuring 10-core CPU and GPU. Built for Apple Intelligence with 16GB memory and 512GB SSD.',
  1799.99,
  1999.99,
  'https://amzn.to/4o39RDE',
  '/images/products/tech/macbook-pro-14-m4.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.8,
  1,
  1,
  'Apple MacBook Pro 14-inch M4 - 16GB RAM 512GB SSD Space Black',
  'Compact MacBook Pro with M4 chip, 10-core CPU/GPU, Apple Intelligence, and 16GB memory in Space Black.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'LG gram 15-inch Touchscreen Laptop - Intel Core Ultra7 16GB/1TB',
  'lg-gram-15-touchscreen-intel-ultra7',
  'LG',
  'Ultra-lightweight touchscreen laptop with AI-enabled Intel Evo Edition Core Ultra7 processor, 16GB RAM, and 1TB SSD.',
  1199.99,
  1399.99,
  'https://amzn.to/4pQKEy5',
  '/images/products/tech/lg-gram-15.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.6,
  1,
  1,
  'LG gram 15-inch Touchscreen Laptop - Intel Core Ultra7 16GB',
  'Ultra-lightweight LG gram with Intel Core Ultra7, 16GB RAM, 1TB SSD, and AI-enabled features for productivity.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'ASUS ROG Strix G16 Gaming Laptop - RTX 5060 i7-14650HX 16GB/1TB',
  'asus-rog-strix-g16-rtx5060-i7-16gb',
  'ASUS',
  'High-performance gaming laptop with RTX 5060 GPU, Intel Core i7-14650HX, 16GB DDR5, and 165Hz FHD+ display.',
  1499.99,
  1799.99,
  'https://amzn.to/46TnNci',
  '/images/products/tech/asus-rog-g16.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.7,
  1,
  1,
  'ASUS ROG Strix G16 Gaming Laptop - RTX 5060 Intel i7',
  'High-performance gaming laptop with RTX 5060, Intel i7-14650HX, 16GB DDR5, and 165Hz display for gaming excellence.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'ASUS ROG Strix G18 Gaming Laptop - Intel Ultra 9 64GB/2TB RTX 5060',
  'asus-rog-strix-g18-ultra9-64gb-2tb',
  'ASUS',
  'Ultimate gaming laptop with Intel Ultra 9-275HX, 64GB DDR5 RAM, 2TB PCIe SSD, and 18-inch 2.5K display.',
  2799.99,
  3299.99,
  'https://amzn.to/3KTPzy0',
  '/images/products/tech/asus-rog-g18.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.8,
  1,
  1,
  'ASUS ROG Strix G18 - Intel Ultra 9 64GB RAM 2TB SSD Gaming',
  'Ultimate gaming laptop with Intel Ultra 9-275HX, 64GB RAM, 2TB SSD, and 18-inch 2.5K display for professionals.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'MSI Thin Gaming Laptop - 15.6" FHD 144Hz i5-13420H RTX 3050',
  'msi-thin-gaming-laptop-i5-rtx3050',
  'MSI',
  'Affordable gaming laptop with Intel i5-13420H processor, RTX 3050 graphics, 16GB RAM, and 144Hz FHD display.',
  899.99,
  1199.99,
  'https://amzn.to/4nHqoxs',
  '/images/products/tech/msi-thin-gaming.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.4,
  1,
  1,
  'MSI Thin Gaming Laptop - 144Hz i5-13420H RTX 3050 16GB',
  'Affordable MSI gaming laptop with i5-13420H, RTX 3050, 16GB RAM, and 144Hz display for competitive gaming.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'LG gram Pro 16-inch Laptop - Intel Ultra9 RTX5050 32GB/2TB',
  'lg-gram-pro-16-intel-ultra9-rtx5050',
  'LG',
  'Professional lightweight laptop with Intel Ultra9 285H, RTX5050 graphics, 32GB RAM, and 2TB SSD for creators.',
  2299.99,
  2699.99,
  'https://amzn.to/4mNkucw',
  '/images/products/tech/lg-gram-pro-16.svg',
  (SELECT id FROM categories WHERE slug = 'laptops'),
  4.7,
  1,
  1,
  'LG gram Pro 16-inch - Intel Ultra9 RTX5050 32GB RAM Creator',
  'Professional LG gram Pro with Intel Ultra9 285H, RTX5050, 32GB RAM, and 2TB SSD for creative professionals.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- =====================================================
-- AUDIO EQUIPMENT PRODUCTS
-- =====================================================
INSERT INTO products (
  name, slug, brand, description, price, original_price, amazon_url,
  primary_image, category_id, rating, is_featured, is_active,
  meta_title, meta_description, created_at, updated_at
) VALUES 
(
  'Shure MV7+ Podcast Dynamic Microphone - OBS Certified USB-C/XLR',
  'shure-mv7-plus-podcast-microphone',
  'Shure',
  'Professional podcast microphone with enhanced audio, LED panel, USB-C & XLR outputs, auto level mode, and digital pop filter.',
  399.99,
  479.99,
  'https://amzn.to/42mtyhw',
  '/images/products/tech/shure-mv7-plus.svg',
  (SELECT id FROM categories WHERE slug = 'audio-equipment'),
  4.8,
  1,
  1,
  'Shure MV7+ Podcast Microphone - OBS Certified USB-C XLR',
  'Professional Shure MV7+ podcast microphone with enhanced audio, LED panel, and dual USB-C/XLR connectivity.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'MAONO Dynamic Microphone PD400X - USB/XLR Podcast PC Mic',
  'maono-dynamic-microphone-pd400x',
  'MAONO',
  'Professional USB/XLR podcast microphone with software, EQ, tap-to-mute, headphone jack, and gain control for broadcasting.',
  149.99,
  199.99,
  'https://amzn.to/46yYFJ8',
  '/images/products/tech/maono-pd400x.svg',
  (SELECT id FROM categories WHERE slug = 'audio-equipment'),
  4.6,
  1,
  1,
  'MAONO PD400X Dynamic Microphone - USB XLR Podcast Studio',
  'Professional MAONO PD400X with USB/XLR connectivity, built-in software, EQ, and tap-to-mute for podcasting.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- =====================================================
-- PREMIUM WATCHES
-- =====================================================
INSERT INTO products (
  name, slug, brand, description, price, original_price, amazon_url,
  primary_image, category_id, rating, is_featured, is_active,
  meta_title, meta_description, created_at, updated_at
) VALUES 
(
  'Garmin fēnix 8 Premium Multisport GPS Smartwatch - 51mm AMOLED',
  'garmin-fenix-8-multisport-gps-smartwatch',
  'Garmin',
  'Premium multisport GPS smartwatch with 51mm AMOLED sapphire display, long battery life, dive-rated, and built-in LED flashlight.',
  999.99,
  1199.99,
  'https://amzn.to/4nAhBx0',
  '/images/products/watches/garmin-fenix-8.svg',
  (SELECT id FROM categories WHERE slug = 'watches'),
  4.8,
  1,
  1,
  'Garmin fēnix 8 - Premium 51mm AMOLED Multisport GPS Watch',
  'Premium Garmin fēnix 8 with 51mm AMOLED display, multisport GPS, dive rating, and built-in LED flashlight.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Garmin Approach S50 Advanced Golf GPS Smartwatch - Cream Gold',
  'garmin-approach-s50-golf-gps-smartwatch',
  'Garmin',
  'Advanced golf GPS smartwatch with AMOLED display, on-course features, and wrist-based heart rate monitoring.',
  449.99,
  549.99,
  'https://amzn.to/4q2CRxh',
  '/images/products/watches/garmin-approach-s50.svg',
  (SELECT id FROM categories WHERE slug = 'watches'),
  4.7,
  1,
  1,
  'Garmin Approach S50 - Advanced Golf GPS Smartwatch AMOLED',
  'Advanced Garmin Approach S50 golf GPS smartwatch with AMOLED display and comprehensive on-course features.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
),
(
  'Garmin Approach S50 Golf Bundle with CT1 Club Tracking Tags',
  'garmin-approach-s50-golf-bundle-ct1',
  'Garmin',
  'Complete golf GPS bundle with Approach S50 smartwatch, CT1 club tracking tags, and Wearable4U power bank.',
  599.99,
  749.99,
  'https://amzn.to/4pQKyqd',
  '/images/products/watches/garmin-s50-bundle.svg',
  (SELECT id FROM categories WHERE slug = 'watches'),
  4.6,
  1,
  1,
  'Garmin Approach S50 Golf Bundle - CT1 Club Tracking Complete Kit',
  'Complete golf bundle with Garmin Approach S50, CT1 club tracking tags, and power bank for serious golfers.',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
);

-- =====================================================
-- UPDATE EXISTING PRODUCTS WITH NEW AFFILIATE LINKS
-- =====================================================
UPDATE products SET 
  amazon_url = 'https://www.amazon.com/GSKY-Clippers-Professional-Trimming-Trimmers/dp/B0CGRCG4ZP?crid=16DDXGA6G2VIZ&dib=eyJ2IjoiMSJ9.b1w1nrpB8tNdcYGk9EUZqu2ohKSgmozNWUyiYBjvPiSiauW4j8fTbKz9vKhaXdMNeMxJzhQAfDosxHsDFMh2ZpeIfErZL79fCd2_SVo48nu2zp7REjm6kyWPOvJhcHA7AkSa_9qVm4V6i1eqm-Y5lOSO9H1In9iJcgqRZ_bIcJf30c-A9uFZyCAOJEPffcHbNvNWVnqy76vv3f3cC1I1uYK2POS5tN8cVyhSNGJr2sJH1gAMlB59DBlIbbsrfVXASDCG6O6TF7Qa_IH_kACf-RDA68FmBQbdxNTqXrlgNfo.f1yiczE48ArLiZBKfck_hqimWkxFy-snpvht3W4d254&dib_tag=se&keywords=4%2BLuxury%2Bmen%E2%80%99s%2Bgrooming%2Bkit%3A%2Bprecision%2Belectric%2Bshaver%2B%2B%2Btrimmer%2B%2B%2Bhigh-quality%2Bskincare%2Bfor%2Bmen&qid=1761574799&sprefix=4%2Bluxury%2Bmen%2Bs%2Bgrooming%2Bkit%2Bprecision%2Belectric%2Bshaver%2B%2B%2Btrimmer%2B%2B%2Bhigh-quality%2Bskincare%2Bfor%2Bmen%2Caps%2C343&sr=8-5-spons&sp_csd=d2lkZ2V0TmFtZT1zcF9hdGY&th=1&linkCode=ll1&tag=swankyboyz-20&linkId=6350fed222252e70155ea06de64ad411&language=en_US&ref_=as_li_ss_tl',
  name = 'Luxury Men''s Grooming Kit - Precision Electric Shaver & Premium Skincare'
WHERE slug = 'prod-gsky-luxury-grooming-kit';