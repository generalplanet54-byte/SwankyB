/**
 * Smart Visual + Product Linking Script
 * Automatically links article visuals to relevant products.
 * Each article must have at least 3 visuals (image/video).
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Dynamic import for ESM modules
const seedModule = await import('../src/data/seed.js');
const { articles, products } = seedModule;

console.log('🔗 Starting Visual + Product Linking...');

for (let article of articles) {
  // Find products that match the article by brand or product name
  const matches = products.filter(p =>
    article.title.toLowerCase().includes(p.brand.toLowerCase()) ||
    article.content.toLowerCase().includes(p.name.toLowerCase()) ||
    article.content.toLowerCase().includes(p.brand.toLowerCase())
  );

  console.log(`📝 Article: "${article.title}"`);
  console.log(`   Found ${matches.length} matching products`);

  // Create visuals from matching products
  const visuals = matches.map(m => ({
    type: "image",
    src: m.image,
    alt: `${m.name} – ${m.brand} product photo showcasing premium quality and design`
  }));

  // Add cover image as first visual if it exists
  if (article.cover_image) {
    visuals.unshift({
      type: "image",
      src: article.cover_image,
      alt: `${article.title} - Featured hero image`
    });
  }

  // Fallback visuals if less than 3 exist
  let fallbackCount = 1;
  while (visuals.length < 3) {
    const fallbackImage = `/assets/articles/${article.slug}-${fallbackCount}.svg`;
    visuals.push({
      type: "image",
      src: fallbackImage,
      alt: `${article.title} related visual showcasing lifestyle and product context`
    });
    fallbackCount++;
  }

  article.visuals = visuals;
  console.log(`   ✅ Total visuals: ${visuals.length}`);
}

// Write linked data to a new file
const outputPath = path.join(__dirname, '../src/data/seed-linked.json');
fs.writeFileSync(outputPath, JSON.stringify({ articles, products }, null, 2));

console.log('\n✅ Visual + Product Linking Complete');
console.log(`📁 Output saved to: ${outputPath}`);
console.log(`\n📊 Summary:`);
console.log(`   - Articles processed: ${articles.length}`);
console.log(`   - Products available: ${products.length}`);
console.log(`   - All articles have 3+ visuals: ✓`);
