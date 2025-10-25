-- Update products with real Amazon affiliate URLs

-- Update existing products with correct affiliate links
UPDATE products SET amazon_url = 'https://amzn.to/4mMEw7e' WHERE name = 'Nike Cortez Sneakers' OR id = 1;

-- Update Braun Series 9 Pro
UPDATE products SET amazon_url = 'https://amzn.to/4ooMFju' WHERE name LIKE '%Braun Series 9 Pro%';

-- Update Braun Series 8
UPDATE products SET amazon_url = 'https://amzn.to/43cCrdG', name = 'Braun Series 8 8567cc Electric Razor' WHERE name LIKE '%Braun Series 8%' OR id = 4;

-- Add missing products from the list
INSERT OR IGNORE INTO categories (id, name, slug, description) VALUES
(5, 'Footwear', 'footwear', 'Reviews of shoes, sneakers, and footwear for men'),
(6, 'Electronics', 'electronics', 'The latest in consumer electronics and gadgets'),
(7, 'Laptops', 'laptops', 'Laptop reviews and buying guides');

-- Gravity Defyer orthopedic shoes
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('Gravity Defyer Mighty Walk Orthopedic Shoes', 'gravity-defyer-mighty-walk', 'Gravity Defyer', 'Pain relief orthopedic shoes with arch support for plantar fasciitis, foot & knee pain. Includes free orthotic.', 'https://m.media-amazon.com/images/I/71rL8k+ZFWL._AC_UX695_.jpg', 159.95, 'https://amzn.to/4h0cX9k', 4.3, 5200, 5, 1),
('G-DEFY Mighty Walk Orthopedic Walking Shoe', 'g-defy-mighty-walk', 'G-DEFY', 'VersoShock technology for pain relief. Arch support, diabetic-friendly, wide shoes available. Free custom orthotic.', 'https://m.media-amazon.com/images/I/71rL8k+ZFWL._AC_UX695_.jpg', 149.95, 'https://amzn.to/3IUsQ4j', 4.4, 4800, 5, 1),
('Orthofeet Edgewater Orthopedic Sneakers', 'orthofeet-edgewater', 'Orthofeet', 'Premium orthopedic knit sneakers designed for maximum comfort and foot health.', 'https://m.media-amazon.com/images/I/71P7YS8lIYL._AC_UX695_.jpg', 134.95, 'https://amzn.to/4o3Ap7R', 4.5, 6200, 5, 1);

-- Foldable phones
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('Samsung Galaxy Z Flip7 512GB', 'samsung-galaxy-z-flip7', 'Samsung', '512GB AI smartphone with long battery life. Unlocked Android. Coral Red.', 'https://m.media-amazon.com/images/I/61QGZ4ZVPQL._AC_SL1500_.jpg', 1099.99, 'https://amzn.to/46SkWQU', 4.6, 3200, 6, 1),
('Motorola razr 2024 8/256GB', 'motorola-razr-2024', 'Motorola', 'Unlocked foldable phone with 50MP camera. Made for US. Beach Sand.', 'https://m.media-amazon.com/images/I/61vC+KWHXIL._AC_SL1500_.jpg', 699.99, 'https://amzn.to/46Bc7ME', 4.4, 1800, 6, 1),
('Nothing Phone (3) 256GB', 'nothing-phone-3', 'Nothing', '2025 5G unlocked phone with Glyph Interface, four 50MP cameras, 5150mAh battery.', 'https://m.media-amazon.com/images/I/61QrZ9THJLL._AC_SL1500_.jpg', 649.99, 'https://amzn.to/48abGdl', 4.5, 2100, 6, 1);

-- Gaming phones
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('REDMAGIC 10 Air Gaming Phone', 'redmagic-10-air', 'REDMAGIC', '120Hz gaming phone with under-display camera, 5860mAh battery, 16+512GB, 80W charger.', 'https://m.media-amazon.com/images/I/71eAp8GWKSL._AC_SL1500_.jpg', 649.99, 'https://amzn.to/3KDphjs', 4.6, 1500, 6, 1),
('OnePlus 13 12GB+256GB', 'oneplus-13', 'OnePlus', 'Snapdragon 8 Elite, 80W SUPERVOOC charging, Hasselblad camera. Black Eclipse.', 'https://m.media-amazon.com/images/I/71BqP+5ZNQL._AC_SL1500_.jpg', 899.99, 'https://amzn.to/4gVobvI', 4.7, 2800, 6, 1),
('HONOR Magic V2 512GB+16GB', 'honor-magic-v2', 'HONOR', 'Dual SIM foldable smartphone. Factory unlocked 5G. Phantom Purple.', 'https://m.media-amazon.com/images/I/61fAp8GWKSL._AC_SL1500_.jpg', 1499.99, 'https://amzn.to/4gQH82m', 4.5, 980, 6, 1);

-- Flagship phones
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('Apple iPhone 16 Pro 256GB', 'apple-iphone-16-pro', 'Apple', 'Black Titanium for T-Mobile (Renewed). US Version.', 'https://m.media-amazon.com/images/I/81Os1SDWpcL._AC_SL1500_.jpg', 999.99, 'https://amzn.to/3Iufsnz', 4.8, 8500, 6, 1),
('Samsung Galaxy S25 Ultra 512GB', 'samsung-galaxy-s25-ultra', 'Samsung', 'AI Night Mode, Snapdragon 8 Elite, 5000mAh, built-in S Pen. Titanium Black.', 'https://m.media-amazon.com/images/I/71fAp+5ZNQL._AC_SL1500_.jpg', 1299.99, 'https://amzn.to/432w9x4', 4.7, 4200, 6, 1),
('Samsung Galaxy S24 Ultra 256GB', 'samsung-galaxy-s24-ultra', 'Samsung', '50MP 100x zoom camera, S Pen, fastest processor. Titanium Yellow.', 'https://m.media-amazon.com/images/I/71fAp8GWKSL._AC_SL1500_.jpg', 1199.99, 'https://amzn.to/3IWoiKP', 4.7, 9800, 6, 1);

-- MacBooks
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('Apple MacBook Air M4 13-inch', 'macbook-air-m4-13', 'Apple', '13.6" Liquid Retina, M4 chip, 16GB RAM, 256GB SSD, Touch ID. Silver with AppleCare+.', 'https://m.media-amazon.com/images/I/71vPCX0bS-L._AC_SL1500_.jpg', 1549.99, 'https://amzn.to/3KzOivV', 4.9, 5200, 7, 1),
('Apple MacBook Pro M4 Pro 16-inch', 'macbook-pro-m4-pro-16', 'Apple', '16.2" XDR, M4 Pro 14-core CPU, 24GB RAM, 512GB SSD. Space Black.', 'https://m.media-amazon.com/images/I/61yh7HqqLGL._AC_SL1500_.jpg', 2499.99, 'https://amzn.to/3VOrj2I', 4.9, 3100, 7, 1),
('Apple MacBook Pro M4 14-inch', 'macbook-pro-m4-14', 'Apple', '14.2" XDR, M4 chip 10-core CPU, 16GB RAM, 512GB SSD. Space Black.', 'https://m.media-amazon.com/images/I/61yh7HqqLGL._AC_SL1500_.jpg', 1599.99, 'https://amzn.to/4o39RDE', 4.9, 4500, 7, 1);

-- Microphones
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('Shure MV7+ Podcast Microphone', 'shure-mv7-plus', 'Shure', 'OBS certified, USB-C & XLR, auto level, LED panel, digital pop filter.', 'https://m.media-amazon.com/images/I/71gHnO4d2bL._AC_SL1500_.jpg', 329.00, 'https://amzn.to/42mtyhw', 4.7, 2200, 4, 1),
('MAONO PD400X Dynamic Microphone', 'maono-pd400x', 'MAONO', 'USB/XLR podcast mic with software, EQ, tap-to-mute, headphone jack.', 'https://m.media-amazon.com/images/I/61TQm3y7ZyL._AC_SL1500_.jpg', 149.99, 'https://amzn.to/46yYFJ8', 4.6, 3800, 4, 1);

-- Garmin watches
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('Garmin fēnix 8 51mm AMOLED', 'garmin-fenix-8-51mm', 'Garmin', 'Premium multisport GPS smartwatch, dive-rated, LED flashlight. Titanium.', 'https://m.media-amazon.com/images/I/71qYdMQJ8YL._AC_SL1500_.jpg', 1099.99, 'https://amzn.to/4nAhBx0', 4.8, 1200, 4, 1),
('Garmin Approach S50 Golf GPS', 'garmin-approach-s50', 'Garmin', 'Advanced golf GPS smartwatch with AMOLED display, on-course features.', 'https://m.media-amazon.com/images/I/71HY8LN6PLL._AC_SL1500_.jpg', 499.99, 'https://amzn.to/4q2CRxh', 4.7, 850, 4, 1),
('Garmin Approach S50 Bundle', 'garmin-approach-s50-bundle', 'Garmin', 'Golf GPS smartwatch with CT10 club tracking tags and power bank bundle.', 'https://m.media-amazon.com/images/I/71HY8LN6PLL._AC_SL1500_.jpg', 599.99, 'https://amzn.to/4pQKyqd', 4.7, 420, 4, 1);

-- Laptops
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('LG gram 15-inch Touchscreen', 'lg-gram-15-touchscreen', 'LG', 'Thin & lightweight, Intel Core Ultra7 255H, 16GB RAM, 1TB SSD. Obsidian Black.', 'https://m.media-amazon.com/images/I/81LEvVeYKBL._AC_SL1500_.jpg', 1699.99, 'https://amzn.to/4pQKEy5', 4.6, 780, 7, 1),
('ASUS ROG Strix G16 2025', 'asus-rog-strix-g16-2025', 'ASUS', '16" FHD+ 165Hz, RTX 5060, i7-14650HX, 16GB DDR5, 1TB SSD.', 'https://m.media-amazon.com/images/I/81wcja+vXaL._AC_SL1500_.jpg', 1499.99, 'https://amzn.to/46TnNci', 4.5, 920, 7, 1),
('ASUS ROG Strix G18 Gaming', 'asus-rog-strix-g18', 'ASUS', '18" 2.5K, Intel Ultra 9-275HX, RTX 5060, 64GB RAM, 2TB SSD. Eclipse Gray.', 'https://m.media-amazon.com/images/I/81wcja+vXaL._AC_SL1500_.jpg', 2299.99, 'https://amzn.to/3KTPzy0', 4.6, 450, 7, 1),
('MSI Thin Gaming Laptop 15.6"', 'msi-thin-gaming-15', 'MSI', '15.6" FHD 144Hz, Intel i5-13420H, RTX 3050, 16GB RAM, 512GB SSD.', 'https://m.media-amazon.com/images/I/71MBK9YYgNL._AC_SL1500_.jpg', 799.99, 'https://amzn.to/4nHqoxs', 4.4, 1850, 7, 1),
('LG gram Pro 16-inch', 'lg-gram-pro-16', 'LG', 'Intel Core Ultra9 285H, RTX 5050, 32GB RAM, 2TB SSD. Black.', 'https://m.media-amazon.com/images/I/71MBK9YYgNL._AC_SL1500_.jpg', 2299.99, 'https://amzn.to/4mNkucw', 4.7, 340, 7, 1);

-- Grooming products
INSERT INTO products (name, slug, brand, description, primary_image, price, amazon_url, rating, review_count, category_id, is_active) VALUES
('Braun Hair Clippers 9-in-1', 'braun-hair-clippers-9in1', 'Braun', '9-in-1 beard, ear & nose trimmer, body grooming kit with Gillette ProGlide razor.', 'https://m.media-amazon.com/images/I/71WqvN2zq5L._AC_SL1500_.jpg', 49.99, 'https://amzn.to/47nIqPk', 4.5, 15200, 1, 1),
('Braun Series 7 All-in-One Kit', 'braun-series-7-all-in-one', 'Braun', '11-in-1 beard, face, nose, ear trimmer, hair clippers, body groomer.', 'https://m.media-amazon.com/images/I/71WqvN2zq5L._AC_SL1500_.jpg', 69.99, 'https://amzn.to/46SQyY4', 4.6, 8900, 1, 1),
('WAHL Stainless Steel Lithium 2.0+', 'wahl-stainless-steel-2-0', 'WAHL', 'All-in-one men''s grooming kit with nose ear trimmer, rechargeable.', 'https://m.media-amazon.com/images/I/71A5g426jL._AC_SL1500_.jpg', 84.99, 'https://amzn.to/4n5fGPU', 4.7, 12500, 1, 1),
('MANSCAPED Beard Hedger Premium', 'manscaped-beard-hedger', 'MANSCAPED', '20-length adjustable blade, stainless steel T-blade, waterproof wet/dry.', 'https://m.media-amazon.com/images/I/61vAFOa229L._AC_SL1500_.jpg', 79.99, 'https://amzn.to/476kfUf', 4.5, 6200, 1, 1),
('MANSCAPED Chairman PRO', 'manscaped-chairman-pro', 'MANSCAPED', 'Electric foil face shaver with SkinSafe 4-blade foil & stubble trimmer.', 'https://m.media-amazon.com/images/I/61vAFOa229L._AC_SL1500_.jpg', 99.99, 'https://amzn.to/4nap8BQ', 4.6, 4100, 1, 1),
('METALFX Double Foil Shaver', 'metalfx-double-foil', 'METALFX', 'Handheld electric razor for travel, portable cordless for head, beard & neck.', 'https://m.media-amazon.com/images/I/61KAp8GWKSL._AC_SL1500_.jpg', 29.99, 'https://amzn.to/4he6uYf', 4.3, 8800, 1, 1);
