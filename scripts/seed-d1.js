/**
 * D1 Database Seeding Script
 * Seeds the SwankyBoyz D1 database with articles and products
 */

import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  // Skip seeding in production environment
  if (process.env.CF_PAGES === '1' || process.env.NODE_ENV === 'production') {
    console.log('⏭️  Skipping database seeding in production environment');
    return;
  }
  
  console.log('🌱 Starting D1 Database Seeding...\n');

  // Open database connection
  const dbPath = path.join(__dirname, '../.wrangler/state/v3/d1/miniflare-D1DatabaseObject/swankyboyz_db.sqlite');
  
  // Ensure directory exists
  const dbDir = path.dirname(dbPath);
  if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
  }

  const db = await open({ 
    filename: dbPath,
    driver: sqlite3.Database 
  });

  console.log('📂 Database connected');

  // Read and execute schema (skip if tables already exist)
  try {
    const schemaPath = path.join(__dirname, '../schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf-8');
    await db.exec(schema);
    console.log('✅ Schema initialized');
  } catch (error) {
    if (error.code === 'SQLITE_ERROR' && error.message.includes('already exists')) {
      console.log('✅ Schema already exists, skipping initialization');
    } else {
      throw error;
    }
  }

  // Import seed data
  const seedData = JSON.parse(
    fs.readFileSync(path.join(__dirname, '../src/data/seed-linked.json'), 'utf-8')
  );

  const { articles, products } = seedData;

  // Clear existing data
  await db.run('DELETE FROM article_products');
  await db.run('DELETE FROM articles');
  await db.run('DELETE FROM products');
  console.log('🗑️  Cleared existing data');

  // Insert products
  console.log('\n📦 Inserting products...');
  const productIdMap = new Map();
  
  for (const product of products) {
    const result = await db.run(
      `INSERT INTO products (name, brand, description, image, affiliate_url)
       VALUES (?, ?, ?, ?, ?)`,
      [product.name, product.brand, product.description, product.image, product.affiliate_url]
    );
    productIdMap.set(product.name, result.lastID);
    console.log(`   ✓ ${product.name}`);
  }

  // Insert articles
  console.log('\n📝 Inserting articles...');
  const articleIdMap = new Map();
  
  for (const article of articles) {
    const result = await db.run(
      `INSERT INTO articles (title, slug, category, excerpt, content, cover_image, visuals, date)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        article.title,
        article.slug,
        article.category || 'Uncategorized',
        article.excerpt,
        article.content,
        article.cover_image,
        JSON.stringify(article.visuals),
        article.date
      ]
    );
    articleIdMap.set(article.slug, result.lastID);
    console.log(`   ✓ ${article.title} [${article.category || 'Uncategorized'}]`);
  }

  // Link articles to products
  console.log('\n🔗 Linking articles to products...');
  
  for (const article of articles) {
    const articleId = articleIdMap.get(article.slug);
    
    // Find matching products for this article
    const matchingProducts = products.filter(p =>
      article.title.toLowerCase().includes(p.brand.toLowerCase()) ||
      article.content.toLowerCase().includes(p.name.toLowerCase()) ||
      article.content.toLowerCase().includes(p.brand.toLowerCase())
    );

    for (const product of matchingProducts) {
      const productId = productIdMap.get(product.name);
      if (productId) {
        await db.run(
          `INSERT INTO article_products (article_id, product_id) VALUES (?, ?)`,
          [articleId, productId]
        );
      }
    }
    
    console.log(`   ✓ ${article.title} → ${matchingProducts.length} products`);
  }

  await db.close();

  console.log('\n✅ D1 Seed Completed Successfully!');
  console.log('\n📊 Summary:');
  console.log(`   - Products inserted: ${products.length}`);
  console.log(`   - Articles inserted: ${articles.length}`);
  console.log(`   - Database location: ${dbPath}`);
}

// Run seeding
seedDatabase().catch(error => {
  console.error('❌ Seeding failed:', error);
  process.exit(1);
});
