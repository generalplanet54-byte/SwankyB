import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

const placeholders = [
  'public/assets/products/braun-series-9-pro.svg',
  'public/assets/products/philips-norelco-9000.svg',
  'public/assets/products/panasonic-arc5.svg',
  'public/assets/products/tom-ford-oud-wood.svg',
  'public/assets/products/herschel-novel-duffel.svg',
  'public/assets/products/rayban-aviator.svg',
  'public/assets/articles/electric-shavers-hero.svg',
  'public/assets/articles/fragrances-hero.svg',
  'public/assets/articles/weekend-bags-hero.svg',
  'public/assets/articles/sunglasses-hero.svg',
  'public/assets/articles/best-electric-shavers-men-2025-1.svg',
  'public/assets/articles/best-mens-fragrances-2025-1.svg',
  'public/assets/articles/best-weekend-bags-men-2025-1.svg',
  'public/assets/articles/essential-sunglasses-men-guide-1.svg'
];

console.log('🖼️  Creating placeholder images...\n');

for (const placeholder of placeholders) {
  const fullPath = path.join(__dirname, '..', placeholder);
  const filename = path.basename(placeholder, '.svg');
  const svgContent = svgPlaceholder(filename);
  fs.writeFileSync(fullPath, svgContent);
  console.log(`✓ Created: ${placeholder}`);
}

console.log('\n✅ All placeholder images created!');
