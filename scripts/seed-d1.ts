/**
 * D1 Database Seeding Script
 * Initializes the database with sample data for development
 * Run automatically after build: npm run postbuild
 */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";

async function seedDatabase() {
  try {
    const db = await open({ 
      filename: "./swankyboyz.db", 
      driver: sqlite3.Database 
    });

    // Create tables if they don't exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        brand TEXT,
        description TEXT,
        image TEXT,
        affiliate_url TEXT
      );
      
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT,
        slug TEXT,
        excerpt TEXT,
        content TEXT,
        cover_image TEXT,
        visuals TEXT,
        date TEXT
      );
    `);

    // Check if tables are empty and seed with sample data
    const productCount = await db.get("SELECT COUNT(*) as count FROM products");
    const articleCount = await db.get("SELECT COUNT(*) as count FROM articles");

    if (productCount.count === 0) {
      console.log("🌱 Seeding sample products...");
      await db.run(`
        INSERT INTO products (id, name, brand, description, image, affiliate_url) VALUES
        ('sample-1', 'Premium Leather Wallet', 'SwankyBoyz', 'Handcrafted genuine leather wallet for the modern gentleman', 'wallet-sample.jpg', '#'),
        ('sample-2', 'Classic Watch', 'TimeCore', 'Elegant timepiece that complements any outfit', 'watch-sample.jpg', '#'),
        ('sample-3', 'Grooming Kit', 'BarberPro', 'Complete grooming essentials for daily care', 'grooming-sample.jpg', '#')
      `);
    }

    if (articleCount.count === 0) {
      console.log("📝 Seeding sample articles...");
      const sampleVisuals = JSON.stringify([
        { type: "image", src: "/assets/article-1-hero.jpg", alt: "Style guide hero image" },
        { type: "image", src: "/assets/article-1-gallery-1.jpg", alt: "Modern gentleman style" },
        { type: "image", src: "/assets/article-1-gallery-2.jpg", alt: "Accessory showcase" }
      ]);

      await db.run(`
        INSERT INTO articles (id, title, slug, excerpt, content, cover_image, visuals, date) VALUES
        ('article-1', 'The Modern Gentleman''s Style Guide', 'modern-gentleman-style-guide', 'Discover the essentials of contemporary masculine style', 'A comprehensive guide to building a timeless wardrobe that speaks confidence...', 'article-hero-1.jpg', ?, '2024-01-15'),
        ('article-2', 'Top 10 Grooming Essentials', 'top-10-grooming-essentials', 'Every man needs these grooming products in his arsenal', 'From beard care to skincare, here are the must-have products...', 'grooming-hero.jpg', ?, '2024-01-10')
      `, [sampleVisuals, sampleVisuals]);
    }

    await db.close();
    console.log("✅ Database seeding complete");
    
  } catch (error) {
    console.error("❌ Database seeding failed:", error);
    process.exit(1);
  }
}

// Run seed if called directly
if (process.argv[1] && process.argv[1].includes('seed-d1.ts')) {
  seedDatabase().catch(console.error);
}

export { seedDatabase };