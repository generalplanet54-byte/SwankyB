PRAGMA foreign_keys=OFF;
BEGIN TRANSACTION;
CREATE TABLE products (
        id TEXT PRIMARY KEY,
        name TEXT,
        brand TEXT,
        description TEXT,
        image TEXT,
        affiliate_url TEXT
      );
INSERT INTO products VALUES('sample-1','Premium Leather Wallet','SwankyBoyz','Handcrafted genuine leather wallet for the modern gentleman','wallet-sample.jpg','#');
INSERT INTO products VALUES('sample-2','Classic Watch','TimeCore','Elegant timepiece that complements any outfit','watch-sample.jpg','#');
INSERT INTO products VALUES('sample-3','Grooming Kit','BarberPro','Complete grooming essentials for daily care','grooming-sample.jpg','#');
CREATE TABLE articles (
        id TEXT PRIMARY KEY,
        title TEXT,
        slug TEXT,
        excerpt TEXT,
        content TEXT,
        cover_image TEXT,
        visuals TEXT,
        date TEXT
      );
INSERT INTO articles VALUES('article-1','The Modern Gentleman''s Style Guide','modern-gentleman-style-guide','Discover the essentials of contemporary masculine style','A comprehensive guide to building a timeless wardrobe that speaks confidence...','article-hero-1.jpg','[{"type":"image","src":"/assets/article-1-hero.jpg","alt":"Style guide hero image"},{"type":"image","src":"/assets/article-1-gallery-1.jpg","alt":"Modern gentleman style"},{"type":"image","src":"/assets/article-1-gallery-2.jpg","alt":"Accessory showcase"}]','2024-01-15');
INSERT INTO articles VALUES('article-2','Top 10 Grooming Essentials','top-10-grooming-essentials','Every man needs these grooming products in his arsenal','From beard care to skincare, here are the must-have products...','grooming-hero.jpg','[{"type":"image","src":"/assets/article-1-hero.jpg","alt":"Style guide hero image"},{"type":"image","src":"/assets/article-1-gallery-1.jpg","alt":"Modern gentleman style"},{"type":"image","src":"/assets/article-1-gallery-2.jpg","alt":"Accessory showcase"}]','2024-01-10');
COMMIT;
