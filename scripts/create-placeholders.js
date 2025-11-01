/**
 * Create placeholder images for products and articles
 * This creates simple placeholder files to satisfy the visual requirements
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const placeholders = [
  // Product images
  'public/assets/products/braun-series-9-pro.jpg',
  'public/assets/products/philips-norelco-9000.jpg',
  'public/assets/products/panasonic-arc5.jpg',
  'public/assets/products/tom-ford-oud-wood.jpg',
  'public/assets/products/herschel-novel-duffel.jpg',
  'public/assets/products/rayban-aviator.jpg',
  
  // Article hero images
  'public/assets/articles/electric-shavers-hero.jpg',
  'public/assets/articles/fragrances-hero.jpg',
  'public/assets/articles/weekend-bags-hero.jpg',
  'public/assets/articles/sunglasses-hero.jpg',
  
  // Article fallback images
  'public/assets/articles/best-electric-shavers-men-2025-1.jpg',
  'public/assets/articles/best-electric-shavers-men-2025-2.jpg',
  'public/assets/articles/best-mens-fragrances-2025-1.jpg',
  'public/assets/articles/best-mens-fragrances-2025-2.jpg',
  'public/assets/articles/best-weekend-bags-men-2025-1.jpg',
  'public/assets/articles/best-weekend-bags-men-2025-2.jpg',
  'public/assets/articles/essential-sunglasses-men-guide-1.jpg',
  'public/assets/articles/essential-sunglasses-men-guide-2.jpg',
];

console.log('🖼️  Creating placeholder images...\n');

const svgPlaceholder = (name) => `<?xml version="1.0" encoding="UTF-8"?>
<svg width="800" height="600" xmlns="http://www.w3.org/2000/svg">
  <rect width="800" height="600" fill="#1a1a1a"/>
  <text x="400" y="300" font-family="Arial, sans-serif" font-size="24" fill="#ffffff" text-anchor="middle">
    ${name}
  </text>
  <text x="400" y="340" font-family="Arial, sans-serif" font-size="16" fill="#888888" text-anchor="middle">
    Placeholder Image
  </text>
</svg>`;

for (const placeholder of placeholders) {
  const fullPath = path.join(__dirname, '..', placeholder);
  const dirPath = path.dirname(fullPath);
  
  // Ensure directory exists
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  
  // Create SVG placeholder
  const filename = path.basename(placeholder, '.jpg');
  const svgContent = svgPlaceholder(filename);
  
  // Save as SVG (we'll use .jpg extension but it's actually SVG for simplicity)
  fs.writeFileSync(fullPath.replace('.jpg', '.svg'), svgContent);
  
  console.log(`✓ Created: ${placeholder.replace('.jpg', '.svg')}`);
}

console.log('\n✅ All placeholder images created!');
console.log('📝 Note: Replace these with actual product photos for production');
