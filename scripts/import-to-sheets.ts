/**
 * Import Database Data to Google Sheets
 * Uploads existing database content to Google Sheets
 */

import { google } from "googleapis";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";

const SHEET_ID = "1zP27ODUO6tB6x636DnHALUzhvhrqNjNLKND7fRz-zjk";

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "./scripts/credentials.json",
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  return await auth.getClient();
}

async function importToDB() {
  try {
    console.log("📤 Starting import from database to Google Sheets...");
    console.log(`📊 Sheet ID: ${SHEET_ID.substring(0, 10)}...`);
    
    // Open database
    const db = await open({ 
      filename: "./swankyboyz.db", 
      driver: sqlite3.Database 
    });

    // Read products from database
    console.log("\n📦 Reading products from database...");
    const products = await db.all("SELECT * FROM products");
    console.log(`   Found ${products.length} products`);

    // Read articles from database
    console.log("\n📰 Reading articles from database...");
    const articles = await db.all("SELECT * FROM articles");
    console.log(`   Found ${articles.length} articles`);

    await db.close();

    // Authenticate with Google
    const auth = await authorize();
    const sheets = google.sheets({ version: "v4", auth: auth as any });

    // Prepare Products sheet data
    console.log("\n📤 Uploading products to Google Sheets...");
    const productHeaders = ["id", "name", "brand", "description", "image", "affiliate_url"];
    const productRows = products.map(p => [
      p.id,
      p.name,
      p.brand || "",
      p.description || "",
      p.image || "",
      p.affiliate_url || ""
    ]);
    const productData = [productHeaders, ...productRows];

    // Write to Products sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: "Products!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: productData
      }
    });
    console.log(`   ✅ Uploaded ${products.length} products`);

    // Prepare Articles sheet data
    console.log("\n📤 Uploading articles to Google Sheets...");
    const articleHeaders = ["id", "title", "slug", "excerpt", "content", "cover_image", "visuals", "date"];
    const articleRows = articles.map(a => [
      a.id,
      a.title,
      a.slug,
      a.excerpt || "",
      a.content || "",
      a.cover_image || "",
      a.visuals || "",
      a.date || ""
    ]);
    const articleData = [articleHeaders, ...articleRows];

    // Write to Articles sheet
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: "Articles!A1",
      valueInputOption: "RAW",
      requestBody: {
        values: articleData
      }
    });
    console.log(`   ✅ Uploaded ${articles.length} articles`);

    console.log("\n🎉 Import to Google Sheets Complete!");
    console.log("📊 Summary:");
    console.log(`   • ${products.length} products uploaded to 'Products' sheet`);
    console.log(`   • ${articles.length} articles uploaded to 'Articles' sheet`);
    console.log("\n🔗 View your sheet:");
    console.log(`   https://docs.google.com/spreadsheets/d/${SHEET_ID}/edit`);
    console.log("\n✅ You can now manage content in Google Sheets!");
    console.log("   Run 'npm run sync' to pull updates back to database.");

  } catch (error: any) {
    console.error("\n❌ Import failed:", error.message);
    
    if (error.message?.includes("credentials")) {
      console.log("\n💡 Make sure scripts/credentials.json exists");
    } else if (error.message?.includes("permission")) {
      console.log("\n💡 Make sure you've shared the Google Sheet with the service account");
    } else if (error.message?.includes("not found")) {
      console.log("\n💡 Make sure your Google Sheet has 'Products' and 'Articles' tabs");
      console.log("   Create them if they don't exist!");
    }
    
    process.exit(1);
  }
}

importToDB().catch(console.error);
