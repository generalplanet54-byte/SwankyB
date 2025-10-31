import Database from "better-sqlite3";
import fs from "fs";

(async () => {
  console.log("🌱 Starting D1 database seeding...");
  
  // Check if linked data exists, otherwise use original seed data
  let articles, products;
  const linkedDataPath = "./src/data/seed-linked.json";
  
  if (fs.existsSync(linkedDataPath)) {
    console.log("📎 Using linked data from seed-linked.json");
    const linkedData = JSON.parse(fs.readFileSync(linkedDataPath, "utf-8"));
    articles = linkedData.articles;
    products = linkedData.products;
  } else {
    console.log("📦 Using original seed data");
    const seedModule = await import("../src/data/seed.js");
    articles = seedModule.articles;
    products = seedModule.products;
  }
  
  const db = new Database("./swankyboyz.db");

  console.log("📋 Creating database schema...");
  db.exec(fs.readFileSync("./schema.sql", "utf-8"));
  
  console.log("📦 Inserting products...");
  const insertProduct = db.prepare(
    `INSERT INTO products (name, slug, brand, description, primary_image, amazon_url)
     VALUES (?, ?, ?, ?, ?, ?)`
  );
  
  // Map to store product slug -> database ID mapping
  const productIdMap = new Map();
  
  for (const product of products) {
    const result = insertProduct.run(
      product.name,
      product.slug,
      product.brand,
      product.description,
      product.image,
      product.affiliate_url
    );
    productIdMap.set(product.slug, result.lastInsertRowid);
  }
  console.log(`✅ Inserted ${products.length} products`);

  console.log("📝 Inserting articles...");
  const insertArticle = db.prepare(
    `INSERT INTO articles (title, slug, excerpt, content, featured_image, visuals, published_at, status)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  );
  
  const insertArticleProduct = db.prepare(
    `INSERT INTO article_products (article_id, product_id, display_order)
     VALUES (?, ?, ?)`
  );
  
  for (const article of articles) {
    const result = insertArticle.run(
      article.title,
      article.slug,
      article.excerpt,
      article.content,
      article.cover_image,
      JSON.stringify(article.visuals),
      article.date,
      'published'
    );
    
    // Link articles to products based on content
    const articleId = result.lastInsertRowid;
    const relatedProducts = products.filter(p =>
      article.content.toLowerCase().includes(p.brand.toLowerCase()) ||
      article.content.toLowerCase().includes(p.name.toLowerCase())
    );
    
    for (let i = 0; i < relatedProducts.length; i++) {
      const productId = productIdMap.get(relatedProducts[i].slug);
      if (productId) {
        insertArticleProduct.run(articleId, productId, i);
      }
    }
  }
  console.log(`✅ Inserted ${articles.length} articles`);

  db.close();
  console.log("✅ D1 Seed Completed Successfully");
})();
