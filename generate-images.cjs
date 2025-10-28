#!/usr/bin/env node

/**
 * Generate Masculine Luxury Themed SVG Images
 * This script creates high-quality SVG placeholders for all products and articles
 * with appropriate themes and colors for a masculine luxury brand.
 */

const fs = require('fs');
const path = require('path');

// Masculine luxury color palette
const colors = {
  charcoal: '#2C2C2C',
  steel: '#4A4A4A',
  gold: '#C5A572',
  burgundy: '#8B3A3A',
  navy: '#1A2332',
  silver: '#8A8D93',
  bronze: '#8C6239',
  black: '#000000',
  white: '#FFFFFF',
};

// Icon SVG paths for different categories
const icons = {
  grooming: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>
    <path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6zm0 10c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z"/>`,
  
  fashion: `<path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6h-6z"/>
    <circle cx="12" cy="8" r="2"/>`,
  
  tech: `<path d="M20 2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h14l4 4V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"/>`,
  
  lifestyle: `<path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 18l-8-4V8.5l8-4 8 4V16l-8 4z"/>`,
  
  skincare: `<path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/>`,
  
  accessories: `<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>`,
  
  article: `<path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"/>`,
  
  luxury: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>`,
};

function createSVG(width, height, bgColor, accentColor, iconPath, text) {
  return `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
      <stop offset="100%" style="stop-color:${accentColor};stop-opacity:0.9" />
    </linearGradient>
  </defs>
  <rect width="${width}" height="${height}" fill="url(#grad)"/>
  <g transform="translate(${width/2}, ${height/2 - 40})" fill="${colors.gold}" opacity="0.4">
    <g transform="translate(-40, -40) scale(3.5)">
      ${iconPath}
    </g>
  </g>
  <text x="${width/2}" y="${height - 50}" font-family="Arial, sans-serif" font-size="28" font-weight="bold" fill="${colors.white}" text-anchor="middle" opacity="0.9">
    ${text}
  </text>
</svg>`;
}

// Image definitions with masculine themes
const imageDefinitions = [
  // Articles
  { file: 'articles/skincare-luxury.svg', width: 1200, height: 675, bg: colors.navy, accent: colors.charcoal, icon: icons.skincare, text: 'Premium Skincare' },
  { file: 'articles/grooming-essentials.svg', width: 1200, height: 675, bg: colors.charcoal, accent: colors.steel, icon: icons.grooming, text: 'Grooming Essentials' },
  { file: 'articles/style-guide.svg', width: 1200, height: 675, bg: colors.steel, accent: colors.navy, icon: icons.fashion, text: 'Style & Fashion' },
  { file: 'articles/lifestyle-luxury.svg', width: 1200, height: 675, bg: colors.navy, accent: colors.burgundy, icon: icons.lifestyle, text: 'Luxury Lifestyle' },
  { file: 'articles/tech-gadgets.svg', width: 1200, height: 675, bg: colors.charcoal, accent: colors.navy, icon: icons.tech, text: 'Tech & Gadgets' },
  { file: 'articles/watches-accessories.svg', width: 1200, height: 675, bg: colors.steel, accent: colors.gold, icon: icons.accessories, text: 'Watches & Accessories' },
  { file: 'articles/fragrances.svg', width: 1200, height: 675, bg: colors.navy, accent: colors.charcoal, icon: icons.luxury, text: 'Premium Fragrances' },
  { file: 'articles/business-style.svg', width: 1200, height: 675, bg: colors.charcoal, accent: colors.steel, icon: icons.fashion, text: 'Business Style' },
  { file: 'articles/fitness-wellness.svg', width: 1200, height: 675, bg: colors.steel, accent: colors.navy, icon: icons.lifestyle, text: 'Fitness & Wellness' },
  
  // Products - Grooming
  { file: 'products/grooming/electric-shaver.svg', width: 800, height: 600, bg: colors.steel, accent: colors.navy, icon: icons.grooming, text: 'Electric Shaver' },
  { file: 'products/grooming/trimmer.svg', width: 800, height: 600, bg: colors.charcoal, accent: colors.steel, icon: icons.grooming, text: 'Beard Trimmer' },
  { file: 'products/grooming/hair-clipper.svg', width: 800, height: 600, bg: colors.navy, accent: colors.charcoal, icon: icons.grooming, text: 'Hair Clipper' },
  { file: 'products/grooming/nose-trimmer.svg', width: 800, height: 600, bg: colors.steel, accent: colors.navy, icon: icons.grooming, text: 'Precision Trimmer' },
  
  // Products - Fashion
  { file: 'products/fashion/sneakers.svg', width: 800, height: 600, bg: colors.charcoal, accent: colors.white, icon: icons.fashion, text: 'Premium Sneakers' },
  { file: 'products/fashion/watch.svg', width: 800, height: 600, bg: colors.navy, accent: colors.gold, icon: icons.accessories, text: 'Luxury Watch' },
  { file: 'products/fashion/sunglasses.svg', width: 800, height: 600, bg: colors.steel, accent: colors.charcoal, icon: icons.accessories, text: 'Designer Sunglasses' },
  { file: 'products/fashion/wallet.svg', width: 800, height: 600, bg: colors.charcoal, accent: colors.bronze, icon: icons.accessories, text: 'Leather Wallet' },
  { file: 'products/fashion/bag.svg', width: 800, height: 600, bg: colors.navy, accent: colors.steel, icon: icons.accessories, text: 'Designer Bag' },
  
  // Products - Tech
  { file: 'products/tech/laptop.svg', width: 800, height: 600, bg: colors.charcoal, accent: colors.steel, icon: icons.tech, text: 'Premium Laptop' },
  { file: 'products/tech/headphones.svg', width: 800, height: 600, bg: colors.navy, accent: colors.charcoal, icon: icons.tech, text: 'Luxury Headphones' },
  { file: 'products/tech/tablet.svg', width: 800, height: 600, bg: colors.steel, accent: colors.navy, icon: icons.tech, text: 'Premium Tablet' },
  
  // Products - Skincare
  { file: 'products/skincare/serum.svg', width: 800, height: 600, bg: colors.navy, accent: colors.charcoal, icon: icons.skincare, text: 'Anti-Aging Serum' },
  { file: 'products/skincare/moisturizer.svg', width: 800, height: 600, bg: colors.charcoal, accent: colors.navy, icon: icons.skincare, text: 'Premium Moisturizer' },
  { file: 'products/skincare/eye-cream.svg', width: 800, height: 600, bg: colors.steel, accent: colors.charcoal, icon: icons.skincare, text: 'Eye Care' },
  { file: 'products/skincare/cleanser.svg', width: 800, height: 600, bg: colors.navy, accent: colors.steel, icon: icons.skincare, text: 'Luxury Cleanser' },
  
  // Products - Lifestyle
  { file: 'products/lifestyle/cologne.svg', width: 800, height: 600, bg: colors.charcoal, accent: colors.gold, icon: icons.luxury, text: 'Premium Cologne' },
  { file: 'products/lifestyle/fitness.svg', width: 800, height: 600, bg: colors.steel, accent: colors.navy, icon: icons.lifestyle, text: 'Fitness Gear' },
  
  // Hero images
  { file: 'heroes/hero-main.svg', width: 1920, height: 1080, bg: colors.charcoal, accent: colors.gold, icon: icons.luxury, text: 'SwankyBoyz' },
];

// Generate all images
console.log('Generating masculine luxury themed images...\n');

imageDefinitions.forEach(({ file, width, height, bg, accent, icon, text }) => {
  const filePath = path.join(__dirname, 'public', 'images', file);
  const dir = path.dirname(filePath);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const svg = createSVG(width, height, bg, accent, icon, text);
  fs.writeFileSync(filePath, svg);
  console.log(`✓ Created: ${file}`);
});

console.log('\n✓ All images generated successfully!');
console.log('Images are stored in: public/images/');
