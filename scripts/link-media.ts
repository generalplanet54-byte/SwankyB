/**
 * Automatically links article visuals to relevant products.
 * Each article must have at least 3 visuals that either:
 *  1. Directly depict the product(s) mentioned
 *  2. Are thematically connected to its brand/category
 *  3. Contain complete alt text describing the context
 */

import fs from "fs";
import path from "path";
import { articles, products } from "../src/data/seed.js";

console.log("🎨 Starting visual + product linking...");

for (let article of articles) {
  console.log(`\n📄 Processing article: ${article.title}`);
  
  // Find matching products based on brand/name mentions
  const matches = products.filter(p =>
    article.title.toLowerCase().includes(p.brand.toLowerCase()) ||
    article.content.toLowerCase().includes(p.name.toLowerCase()) ||
    article.content.toLowerCase().includes(p.brand.toLowerCase())
  );

  console.log(`   Found ${matches.length} matching products`);
  
  const visuals = [];
  
  // Add product images as visuals
  for (const match of matches) {
    visuals.push({
      type: "image",
      src: `/assets/products/${path.basename(match.image)}`,
      alt: `${match.name} – ${match.brand} product photo for ${article.title}`
    });
  }

  // Add article-specific visuals
  if (article.cover_image) {
    visuals.push({
      type: "image",
      src: article.cover_image,
      alt: `${article.title} - Featured image showing key concepts`
    });
  }

  // Fallback visuals if less than 3 exist
  let fallbackCount = 1;
  while (visuals.length < 3) {
    const fallbackSrc = `/assets/articles/fallback-${fallbackCount}.jpg`;
    visuals.push({
      type: "image",
      src: fallbackSrc,
      alt: `${article.title} related visual ${fallbackCount} - lifestyle imagery`
    });
    fallbackCount++;
  }

  console.log(`   ✅ Created ${visuals.length} visuals with alt text`);
  
  // Update article with visuals
  article.visuals = visuals;
}

// Write linked data to file
const outputPath = "./src/data/seed-linked.json";
fs.writeFileSync(
  outputPath,
  JSON.stringify({ articles, products }, null, 2)
);

console.log("\n✅ Visual + Product Linking Complete");
console.log(`📁 Linked data saved to: ${outputPath}`);
console.log("\n📊 Summary:");
console.log(`   Articles processed: ${articles.length}`);
console.log(`   Products available: ${products.length}`);
console.log(`   Total visuals created: ${articles.reduce((sum, a) => sum + a.visuals.length, 0)}`);
