/**
 * Google Sheets → D1 Sync Script
 * Automatically updates articles & products in Cloudflare D1
 * Run manually: npm run sync
 * 
 * Prerequisites:
 * - credentials.json in /scripts/ directory
 * - Google Sheet shared with service account
 * - SHEET_ID configured below
 */

import { google } from "googleapis";
import * as sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";
import * as path from "path";

// Configuration
const SHEET_ID = process.env.GOOGLE_SHEET_ID || "YOUR_SHEET_ID_HERE";
const DB_PATH = "./swankyboyz.db";
const CREDENTIALS_PATH = "./scripts/credentials.json";
const ASSETS_PATH = "./public/assets";

// Ensure assets directory exists
if (!fs.existsSync(ASSETS_PATH)) {
  fs.mkdirSync(ASSETS_PATH, { recursive: true });
}

/**
 * Authorize Google Sheets API access
 */
async function authorize() {
  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `Credentials file not found at ${CREDENTIALS_PATH}. ` +
      `Please download your service account JSON from Google Cloud Console.`
    );
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: CREDENTIALS_PATH,
    scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
  });
  
  return await auth.getClient();
}

/**
 * Fetch data from a specific sheet
 */
async function fetchSheetData(sheetName: string): Promise<any[][]> {
  const auth = await authorize();
  const sheets = google.sheets({ version: "v4", auth: auth as any });
  
  try {
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${sheetName}!A2:Z`, // Skip header row
    });
    
    return res.data.values || [];
  } catch (error) {
    console.error(`Error fetching sheet "${sheetName}":`, error);
    throw error;
  }
}

/**
 * Validate image exists, create placeholder if missing
 */
function validateImage(filename: string, id: string, type: string): string {
  if (!filename) {
    return `/assets/placeholder-${type}-${id}.jpg`;
  }
  
  const imagePath = path.join(ASSETS_PATH, filename);
  if (!fs.existsSync(imagePath)) {
    console.warn(`⚠️  Image not found: ${filename} - using placeholder`);
    return `/assets/placeholder-${type}-${id}.jpg`;
  }
  
  return `/assets/${filename}`;
}

/**
 * Generate visuals array from comma-separated string
 */
function generateVisuals(visualsStr: string, title: string): any[] {
  if (!visualsStr) return [];
  
  return visualsStr.split(",").map((filename, index) => {
    const trimmed = filename.trim();
    const isVideo = trimmed.endsWith(".mp4") || trimmed.endsWith(".webm");
    
    return {
      type: isVideo ? "video" : "image",
      src: `/assets/${trimmed}`,
      alt: `${title} - Visual ${index + 1}`,
      caption: "",
    };
  });
}

/**
 * Generate SEO-friendly alt text
 */
function generateAltText(name: string, brand: string, type: string): string {
  return `Product photo of ${name} by ${brand} from SwankyBoyz.com`;
}

/**
 * Sync products from Google Sheets to D1
 */
async function syncProducts(db: any) {
  console.log("\n🧾 Syncing Products...");
  
  const products = await fetchSheetData("Products");
  
  if (products.length === 0) {
    console.log("⚠️  No products found in sheet");
    return;
  }
  
  // Clear existing products
  await db.exec("DELETE FROM products");
  console.log("🗑️  Cleared existing products");
  
  let successCount = 0;
  
  for (const row of products) {
    const [id, name, brand, description, image, affiliate_url, price, rating, category] = row;
    
    if (!id || !name || !brand) {
      console.warn(`⚠️  Skipping invalid product row:`, row.slice(0, 3));
      continue;
    }
    
    const validatedImage = validateImage(image, id, "product");
    
    try {
      await db.run(
        `INSERT INTO products (
          id, name, brand, description, 
          primary_image, amazon_url,
          price, rating, slug, is_active
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          name,
          brand,
          description,
          validatedImage,
          affiliate_url,
          price || null,
          rating || 0,
          name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
          1
        ]
      );
      successCount++;
    } catch (error) {
      console.error(`❌ Error inserting product ${id}:`, error);
    }
  }
  
  console.log(`✅ Synced ${successCount} products`);
}

/**
 * Sync articles from Google Sheets to D1
 */
async function syncArticles(db: any) {
  console.log("\n📰 Syncing Articles...");
  
  const articles = await fetchSheetData("Articles");
  
  if (articles.length === 0) {
    console.log("⚠️  No articles found in sheet");
    return;
  }
  
  // Clear existing articles
  await db.exec("DELETE FROM articles");
  console.log("🗑️  Cleared existing articles");
  
  let successCount = 0;
  
  for (const row of articles) {
    const [
      id, title, slug, excerpt, content, 
      cover_image, visuals, date, category, tags,
      meta_title, meta_description
    ] = row;
    
    if (!id || !title || !slug || !content) {
      console.warn(`⚠️  Skipping invalid article row:`, row.slice(0, 3));
      continue;
    }
    
    // Validate cover image
    const validatedCoverImage = validateImage(cover_image, id, "article");
    
    // Generate visuals JSON
    const visualsArray = generateVisuals(visuals, title);
    const visualsJSON = JSON.stringify(visualsArray);
    
    // Validate: Every article must have at least 3 visuals
    if (visualsArray.length < 3) {
      console.warn(`⚠️  Article ${id} has fewer than 3 visuals (${visualsArray.length})`);
    }
    
    try {
      // Note: Visuals are stored in semantic_keywords as JSON since there's no dedicated visuals column
      // In production, consider adding a visuals column or using a separate table
      await db.run(
        `INSERT INTO articles (
          id, title, slug, excerpt, content,
          featured_image, 
          published_at, status,
          meta_title, meta_description,
          read_time, semantic_keywords
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          title,
          slug,
          excerpt,
          content,
          validatedCoverImage,
          date || new Date().toISOString(),
          "published",
          meta_title || title,
          meta_description || excerpt,
          calculateReadTime(content),
          visualsJSON  // Store visuals in semantic_keywords for now
        ]
      );
      
      successCount++;
    } catch (error) {
      console.error(`❌ Error inserting article ${id}:`, error);
    }
  }
  
  console.log(`✅ Synced ${successCount} articles`);
}

/**
 * Calculate read time based on word count
 */
function calculateReadTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Main sync function
 */
async function syncToDB() {
  console.log("🚀 Starting Google Sheets → D1 Sync...\n");
  console.log(`📊 Sheet ID: ${SHEET_ID}`);
  console.log(`💾 Database: ${DB_PATH}`);
  
  try {
    // Open database connection
    const db = await open({
      filename: DB_PATH,
      driver: sqlite3.Database
    });
    
    // Sync products
    await syncProducts(db);
    
    // Sync articles
    await syncArticles(db);
    
    // Close database
    await db.close();
    
    console.log("\n✅ Google Sheets → D1 Sync Complete");
    console.log("💡 Run 'npm run build' to regenerate site with new content");
    
  } catch (error) {
    console.error("\n❌ Sync failed:", error);
    process.exit(1);
  }
}

// Run sync
syncToDB().catch(console.error);
