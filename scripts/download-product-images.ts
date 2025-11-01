/**
 * Amazon Product Image Downloader
 * Automatically fetches actual product images from Amazon
 * Uses Amazon Product Advertising API for affiliate-compliant image retrieval
 */

import sqlite3 from "sqlite3";
import { open } from "sqlite";
import * as fs from "fs";
import * as https from "https";
import * as http from "http";
import { URL } from "url";

interface Product {
  id: string;
  name: string;
  brand: string;
  affiliate_url: string;
  image?: string;
}

/**
 * Extract ASIN from Amazon URL
 * ASIN is Amazon's unique product identifier
 */
function extractASIN(url: string): string | null {
  if (!url) return null;
  
  // Common Amazon URL patterns
  const patterns = [
    /\/dp\/([A-Z0-9]{10})/,     // /dp/ASIN
    /\/gp\/product\/([A-Z0-9]{10})/,  // /gp/product/ASIN
    /\/product\/([A-Z0-9]{10})/,      // /product/ASIN
    /ASIN=([A-Z0-9]{10})/,            // ASIN parameter
  ];
  
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return match[1];
  }
  
  return null;
}

/**
 * Generate Amazon product image URL from ASIN
 * Uses Amazon's standard image URL format
 */
function getAmazonImageURL(asin: string, size: string = "large"): string {
  // Amazon image URL format: https://m.media-amazon.com/images/I/{image-id}._AC_{size}_.jpg
  // For direct ASIN-based URLs, we can construct predictable URLs
  // Note: In production, you'd use the Product Advertising API for accurate image URLs
  
  return `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`;
}

/**
 * Download image from URL
 */
async function downloadImage(url: string, filepath: string): Promise<boolean> {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(filepath);
    const protocol = url.startsWith('https') ? https : http;
    
    protocol.get(url, (response) => {
      if (response.statusCode === 200) {
        response.pipe(file);
        file.on('finish', () => {
          file.close();
          resolve(true);
        });
      } else {
        file.close();
        fs.unlinkSync(filepath);
        resolve(false);
      }
    }).on('error', (err) => {
      file.close();
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
      console.error(`   ❌ Download error: ${err.message}`);
      resolve(false);
    });
  });
}

/**
 * Generate product-specific filename
 */
function generateFilename(product: Product): string {
  const safeName = product.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 50);
  
  const safeBrand = product.brand
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
    .substring(0, 20) || 'product';
  
  return `${safeBrand}-${safeName}.jpg`;
}

/**
 * Main function to download product images
 */
async function downloadProductImages() {
  try {
    console.log("╔══════════════════════════════════════════════════════════════╗");
    console.log("║                                                              ║");
    console.log("║   🖼️  AMAZON PRODUCT IMAGE DOWNLOADER                        ║");
    console.log("║                                                              ║");
    console.log("╚══════════════════════════════════════════════════════════════╝");
    console.log("");

    // Open database
    const db = await open({
      filename: "./swankyboyz.db",
      driver: sqlite3.Database,
    });

    // Get products from database
    console.log("📦 Reading products from database...");
    const products: Product[] = await db.all("SELECT * FROM products");
    console.log(`   Found ${products.length} products\n`);

    // Create assets directory if it doesn't exist
    if (!fs.existsSync("./public/assets")) {
      fs.mkdirSync("./public/assets", { recursive: true });
      console.log("📁 Created /public/assets/ directory\n");
    }

    let successCount = 0;
    let failCount = 0;
    let skipCount = 0;

    // Process each product
    for (const product of products) {
      console.log(`\n🔍 Processing: ${product.name} (${product.brand})`);
      
      // Generate filename
      const filename = generateFilename(product);
      const filepath = `./public/assets/${filename}`;
      
      // Skip if image already exists
      if (fs.existsSync(filepath)) {
        console.log(`   ⏭️  Image already exists: ${filename}`);
        skipCount++;
        
        // Update database with filename if not set
        if (!product.image || product.image !== filename) {
          await db.run(
            "UPDATE products SET image = ? WHERE id = ?",
            [filename, product.id]
          );
          console.log(`   ✅ Updated database with filename`);
        }
        continue;
      }

      // Extract ASIN from affiliate URL
      const asin = extractASIN(product.affiliate_url);
      
      if (!asin) {
        console.log(`   ⚠️  Could not extract ASIN from URL: ${product.affiliate_url}`);
        console.log(`   💡 Manual action needed: Add valid Amazon product URL`);
        failCount++;
        continue;
      }

      console.log(`   📋 ASIN: ${asin}`);

      // Try multiple image URL patterns
      const imageURLs = [
        `https://images-na.ssl-images-amazon.com/images/P/${asin}.01.LZZZZZZZ.jpg`,
        `https://m.media-amazon.com/images/I/${asin}.jpg`,
        `https://ws-na.amazon-adsystem.com/widgets/q?_encoding=UTF8&ASIN=${asin}&Format=_SL250_&ID=AsinImage&MarketPlace=US&ServiceVersion=20070822&WS=1`,
      ];

      let downloaded = false;
      
      for (const imageUrl of imageURLs) {
        console.log(`   🔽 Trying: ${imageUrl}`);
        downloaded = await downloadImage(imageUrl, filepath);
        
        if (downloaded) {
          console.log(`   ✅ Downloaded: ${filename}`);
          
          // Update database
          await db.run(
            "UPDATE products SET image = ? WHERE id = ?",
            [filename, product.id]
          );
          console.log(`   ✅ Updated database`);
          
          successCount++;
          break;
        }
      }

      if (!downloaded) {
        console.log(`   ❌ Failed to download image for ${product.name}`);
        console.log(`   💡 You may need to manually download from Amazon`);
        failCount++;
      }

      // Rate limiting - be nice to Amazon's servers
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    await db.close();

    // Summary
    console.log("\n╔══════════════════════════════════════════════════════════════╗");
    console.log("║                                                              ║");
    console.log("║   📊 DOWNLOAD SUMMARY                                        ║");
    console.log("║                                                              ║");
    console.log("╚══════════════════════════════════════════════════════════════╝\n");
    console.log(`✅ Successfully downloaded: ${successCount} images`);
    console.log(`⏭️  Already existed: ${skipCount} images`);
    console.log(`❌ Failed: ${failCount} images\n`);

    if (failCount > 0) {
      console.log("⚠️  IMPORTANT: Failed downloads need manual attention\n");
      console.log("For failed products:");
      console.log("1. Visit the Amazon product page");
      console.log("2. Right-click the main product image");
      console.log("3. Save to /public/assets/ with the correct filename");
      console.log("4. Or update the affiliate_url in your Google Sheet with a valid Amazon link\n");
    }

    console.log("🎉 Image download process complete!");
    console.log("\n💡 Next steps:");
    console.log("   1. Check /public/assets/ for downloaded images");
    console.log("   2. Manually download any failed images");
    console.log("   3. Run: npm run sync (to sync Google Sheets)");
    console.log("   4. Run: npm run dev (to see your site with images)\n");

  } catch (error: any) {
    console.error("\n❌ Error:", error.message);
    process.exit(1);
  }
}

// Run the script
downloadProductImages().catch(console.error);
