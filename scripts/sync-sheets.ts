/**
 * Google Sheets → D1 Sync Script
 * Automatically updates articles & products in Cloudflare D1
 * Run manually: npm run sync
 */

import { google } from "googleapis";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "1zP27ODUO6tB6x636DnHALUzhvhrqNjNLKND7fRz-zjk";

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  return await auth.getClient();
}

async function fetchSheetData(sheetName: string) {
  const auth = await authorize();
  const sheets = google.sheets({ version: "v4", auth: auth as any });
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: `${sheetName}!A2:Z`,
  });
  return res.data.values || [];
}

async function validateImages(images: string[]): Promise<void> {
  // Batch check all images at once instead of one-by-one
  const missingImages = images.filter(image => {
    const imagePath = `./public/assets/${image}`;
    return !fs.existsSync(imagePath);
  });
  
  if (missingImages.length > 0) {
    console.warn(`⚠️  Missing ${missingImages.length} image(s):`, missingImages.join(', '));
  }
}

async function syncToDB() {
  try {
    // Validation checks before starting sync
    if (SHEET_ID === "YOUR_SHEET_ID_HERE") {
      throw new Error("Please set your GOOGLE_SHEET_ID environment variable");
    }

    if (!fs.existsSync("./scripts/credentials.json")) {
      throw new Error("Google Sheets credentials not found at ./scripts/credentials.json");
    }

    console.log("🔄 Starting Google Sheets sync...");
    console.log(`📊 Sheet ID: ${SHEET_ID.substring(0, 10)}...`);
    
    const db = await open({ 
      filename: "./swankyboyz.db", 
      driver: sqlite3.Database 
    });

    // Ensure tables exist
    await db.exec(`
      CREATE TABLE IF NOT EXISTS products (
        id TEXT PRIMARY KEY,
        name TEXT,
        brand TEXT,
        description TEXT,
        image TEXT,
        affiliate_url TEXT,
        synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
      
      CREATE TABLE IF NOT EXISTS articles (
        id TEXT PRIMARY KEY,
        title TEXT,
        slug TEXT,
        excerpt TEXT,
        content TEXT,
        cover_image TEXT,
        visuals TEXT,
        date TEXT,
        synced_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);

    console.log("🧾 Syncing Products...");
    const products = await fetchSheetData("Products");
    
    if (products.length === 0) {
      console.warn("⚠️  No products found in sheet. Check sheet name is 'Products' and has data.");
    } else {
      // Batch validate all product images upfront
      const allProductImages = products
        .filter(row => row.length >= 6 && row[0] && row[4] && row[4].trim())
        .map(row => row[4].trim());
      
      if (allProductImages.length > 0) {
        await validateImages(allProductImages);
      }
      
      await db.exec("DELETE FROM products");
      
      // Use transaction for batch inserts - much faster than individual inserts
      await db.exec("BEGIN TRANSACTION");
      
      let productCount = 0;
      const stmt = await db.prepare(
        `INSERT INTO products (id, name, brand, description, image, affiliate_url)
         VALUES (?, ?, ?, ?, ?, ?)`
      );
      
      for (const row of products) {
        if (row.length >= 6 && row[0]) { // Ensure row has data and ID
          const [id, name, brand, description, image, affiliate_url] = row;
          
          await stmt.run([
            id, 
            name || '', 
            brand || '', 
            description || '', 
            image || '', 
            affiliate_url || ''
          ]);
          productCount++;
        } else if (row[0]) { // Skip empty rows but warn about incomplete ones
          console.warn(`⚠️  Skipping incomplete product row: ${row[0]}`);
        }
      }
      
      await stmt.finalize();
      await db.exec("COMMIT");
      
      console.log(`✅ Synced ${productCount} products`);
    }

    console.log("📰 Syncing Articles...");
    const articles = await fetchSheetData("Articles");
    
    if (articles.length === 0) {
      console.warn("⚠️  No articles found in sheet. Check sheet name is 'Articles' and has data.");
    } else {
      // Batch validate all article images upfront
      const allArticleImages: string[] = [];
      for (const row of articles) {
        if (row.length >= 8 && row[0]) {
          const visuals = row[6];
          if (visuals && visuals.trim()) {
            const visualsList = visuals.split(",").map((v: string) => v.trim()).filter((v: string) => v);
            const imageFiles = visualsList.filter((v: string) => !v.endsWith(".mp4"));
            allArticleImages.push(...imageFiles);
          }
          
          // Also add cover image if present
          const cover_image = row[5];
          if (cover_image && cover_image.trim()) {
            allArticleImages.push(cover_image.trim());
          }
        }
      }
      
      if (allArticleImages.length > 0) {
        await validateImages(allArticleImages);
      }
      
      await db.exec("DELETE FROM articles");
      
      // Use transaction for batch inserts
      await db.exec("BEGIN TRANSACTION");
      
      let articleCount = 0;
      const stmt = await db.prepare(
        `INSERT INTO articles (id, title, slug, excerpt, content, cover_image, visuals, date)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
      );
      
      for (const row of articles) {
        if (row.length >= 8 && row[0]) { // Ensure row has data and ID
          const [id, title, slug, excerpt, content, cover_image, visuals, date] = row;
          
          // Process visuals
          let visualsJSON = "[]";
          if (visuals && visuals.trim()) {
            const visualsList = visuals.split(",").map((v: string) => v.trim()).filter((v: string) => v);
            
            // Ensure minimum 3 visuals requirement
            if (visualsList.length < 3) {
              console.warn(`⚠️  Article "${title}" has ${visualsList.length} visuals (minimum 3 recommended)`);
            }
            
            visualsJSON = JSON.stringify(
              visualsList.map((v: string) => ({
                type: v.endsWith(".mp4") ? "video" : "image",
                src: `/assets/${v}`,
                alt: `${title} - ${v.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')}`,
              }))
            );
          } else {
            console.warn(`⚠️  Article "${title}" has no visuals (minimum 3 recommended)`);
          }
          
          await stmt.run([
            id, 
            title || '', 
            slug || '', 
            excerpt || '', 
            content || '', 
            cover_image || '', 
            visualsJSON, 
            date || new Date().toISOString().split('T')[0]
          ]);
          articleCount++;
        } else if (row[0]) { // Skip empty rows but warn about incomplete ones
          console.warn(`⚠️  Skipping incomplete article row: ${row[0]}`);
        }
      }
      
      await stmt.finalize();
      await db.exec("COMMIT");
      
      console.log(`✅ Synced ${articleCount} articles`);
    }

    await db.close();
    
    const timestamp = new Date().toLocaleString();
    console.log(`\n🎉 Google Sheets → D1 Sync Complete!`);
    console.log(`⏰ Completed at: ${timestamp}`);
    console.log(`📊 Total synced: ${products.filter(p => p[0]).length} products, ${articles.filter(a => a[0]).length} articles`);
    
  } catch (error) {
    console.error("❌ Sync failed:", error);
    
    const errorMessage = error instanceof Error ? error.message : String(error);
    
    if (errorMessage.includes("credentials")) {
      console.error("\n💡 Try these steps:");
      console.error("1. Ensure credentials.json exists in scripts/ folder");
      console.error("2. Check credentials.json is valid JSON");
      console.error("3. Verify service account has access to the sheet");
    }
    
    if (errorMessage.includes("SHEET_ID")) {
      console.error("\n💡 Set your sheet ID:");
      console.error("export GOOGLE_SHEET_ID=\"your_sheet_id_here\"");
    }
    
    process.exit(1);
  }
}

// Run sync if called directly
if (process.argv[1] && process.argv[1].includes('sync-sheets.ts')) {
  syncToDB().catch(console.error);
}

export { syncToDB };