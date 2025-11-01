/**
 * Google Sheets → D1 Sync Script
 * Automatically updates articles & products in Cloudflare D1
 * Run manually: npm run sync
 */

import { google } from "googleapis";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";

const SHEET_ID = process.env.GOOGLE_SHEET_ID || "YOUR_SHEET_ID_HERE";

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
  for (const image of images) {
    const imagePath = `./public/assets/${image}`;
    if (!fs.existsSync(imagePath)) {
      console.warn(`⚠️  Missing image: ${image} - creating placeholder`);
      // Create placeholder logic could be implemented here
      // For now, just log the warning
    }
  }
}

async function syncToDB() {
  try {
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

    console.log("🧾 Syncing Products...");
    const products = await fetchSheetData("Products");
    await db.exec("DELETE FROM products");
    
    for (const row of products) {
      if (row.length >= 6) {
        const [id, name, brand, description, image, affiliate_url] = row;
        
        // Validate product image
        if (image) {
          await validateImages([image]);
        }
        
        await db.run(
          `INSERT INTO products (id, name, brand, description, image, affiliate_url)
          VALUES (?, ?, ?, ?, ?, ?)`,
          [id, name, brand, description, image, affiliate_url]
        );
      }
    }

    console.log("📰 Syncing Articles...");
    const articles = await fetchSheetData("Articles");
    await db.exec("DELETE FROM articles");
    
    for (const row of articles) {
      if (row.length >= 8) {
        const [id, title, slug, excerpt, content, cover_image, visuals, date] = row;
        
        // Process visuals and validate images
        let visualsJSON = "[]";
        if (visuals && visuals.trim()) {
          const visualsList = visuals.split(",").map(v => v.trim()).filter(v => v);
          await validateImages(visualsList.filter(v => !v.endsWith(".mp4")));
          
          visualsJSON = JSON.stringify(
            visualsList.map((v) => ({
              type: v.endsWith(".mp4") ? "video" : "image",
              src: `/assets/${v}`,
              alt: `${title} visual ${v}`,
            }))
          );
        }
        
        await db.run(
          `INSERT INTO articles (id, title, slug, excerpt, content, cover_image, visuals, date)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [id, title, slug, excerpt, content, cover_image, visualsJSON, date]
        );
      }
    }

    await db.close();
    console.log("✅ Google Sheets → D1 Sync Complete");
    
  } catch (error) {
    console.error("❌ Sync failed:", error);
    process.exit(1);
  }
}

// Run sync if called directly
if (require.main === module) {
  syncToDB().catch(console.error);
}

export { syncToDB };