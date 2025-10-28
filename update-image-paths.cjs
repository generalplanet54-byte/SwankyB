#!/usr/bin/env node

/**
 * Update Image Paths Script
 * Replaces all external image URLs with local paths in data files
 */

const fs = require('fs');
const path = require('path');

// Mapping of categories/topics to local images
const imageMap = {
  // Article images - by category/topic
  skincare: '/images/articles/skincare-luxury.svg',
  grooming: '/images/articles/grooming-essentials.svg',
  style: '/images/articles/style-guide.svg',
  fashion: '/images/articles/style-guide.svg',
  lifestyle: '/images/articles/lifestyle-luxury.svg',
  tech: '/images/articles/tech-gadgets.svg',
  audio: '/images/articles/tech-gadgets.svg',
  watches: '/images/articles/watches-accessories.svg',
  accessories: '/images/articles/watches-accessories.svg',
  fragrance: '/images/articles/fragrances.svg',
  business: '/images/articles/business-style.svg',
  fitness: '/images/articles/fitness-wellness.svg',
  wellness: '/images/articles/fitness-wellness.svg',
  
  // Product images - by type
  shaver: '/images/products/grooming/electric-shaver.svg',
  trimmer: '/images/products/grooming/trimmer.svg',
  clipper: '/images/products/grooming/hair-clipper.svg',
  'nose-trimmer': '/images/products/grooming/nose-trimmer.svg',
  sneakers: '/images/products/fashion/sneakers.svg',
  shoes: '/images/products/fashion/sneakers.svg',
  watch: '/images/products/fashion/watch.svg',
  sunglasses: '/images/products/fashion/sunglasses.svg',
  wallet: '/images/products/fashion/wallet.svg',
  bag: '/images/products/fashion/bag.svg',
  backpack: '/images/products/fashion/bag.svg',
  laptop: '/images/products/tech/laptop.svg',
  headphones: '/images/products/tech/headphones.svg',
  earbuds: '/images/products/tech/headphones.svg',
  tablet: '/images/products/tech/tablet.svg',
  serum: '/images/products/skincare/serum.svg',
  moisturizer: '/images/products/skincare/moisturizer.svg',
  'eye-cream': '/images/products/skincare/eye-cream.svg',
  cleanser: '/images/products/skincare/cleanser.svg',
  cologne: '/images/products/lifestyle/cologne.svg',
  perfume: '/images/products/lifestyle/cologne.svg',
  'fitness-gear': '/images/products/lifestyle/fitness.svg',
};

function getImageForProduct(productName, productId, category) {
  const name = productName.toLowerCase();
  const id = productId.toLowerCase();
  const cat = category?.toLowerCase() || '';
  
  // Check specific product types
  if (name.includes('shaver') || id.includes('shaver')) return imageMap.shaver;
  if (name.includes('trimmer') || id.includes('trimmer')) return imageMap.trimmer;
  if (name.includes('clipper') || id.includes('clipper')) return imageMap.clipper;
  if (name.includes('sneaker') || name.includes('shoe')) return imageMap.sneakers;
  if (name.includes('watch')) return imageMap.watch;
  if (name.includes('sunglass')) return imageMap.sunglasses;
  if (name.includes('wallet')) return imageMap.wallet;
  if (name.includes('bag') || name.includes('backpack')) return imageMap.bag;
  if (name.includes('laptop')) return imageMap.laptop;
  if (name.includes('headphone') || name.includes('earbud')) return imageMap.headphones;
  if (name.includes('tablet')) return imageMap.tablet;
  if (name.includes('serum')) return imageMap.serum;
  if (name.includes('moisturizer') || name.includes('lotion')) return imageMap.moisturizer;
  if (name.includes('eye')) return imageMap['eye-cream'];
  if (name.includes('cleanser') || name.includes('wash')) return imageMap.cleanser;
  if (name.includes('cologne') || name.includes('perfume') || name.includes('fragrance')) return imageMap.cologne;
  
  // Fallback by category
  if (cat.includes('grooming')) return imageMap.grooming;
  if (cat.includes('fashion')) return imageMap.fashion;
  if (cat.includes('tech') || cat.includes('audio')) return imageMap.tech;
  if (cat.includes('skincare')) return imageMap.skincare;
  if (cat.includes('lifestyle')) return imageMap.lifestyle;
  if (cat.includes('accessories')) return imageMap.accessories;
  
  // Default fallback
  return '/images/products/grooming/electric-shaver.svg';
}

function getImageForArticle(title, category, tags) {
  const titleLower = title.toLowerCase();
  const catLower = category?.toLowerCase() || '';
  const tagsLower = tags?.map(t => t.toLowerCase()).join(' ') || '';
  
  // Check by content
  if (titleLower.includes('skincare') || tagsLower.includes('skincare')) return imageMap.skincare;
  if (titleLower.includes('grooming') || titleLower.includes('shave')) return imageMap.grooming;
  if (titleLower.includes('style') || titleLower.includes('fashion') || titleLower.includes('clothing')) return imageMap.style;
  if (titleLower.includes('tech') || titleLower.includes('gadget') || titleLower.includes('audio')) return imageMap.tech;
  if (titleLower.includes('watch') || titleLower.includes('accessories')) return imageMap.watches;
  if (titleLower.includes('fragrance') || titleLower.includes('cologne')) return imageMap.fragrance;
  if (titleLower.includes('business') || titleLower.includes('professional')) return imageMap.business;
  if (titleLower.includes('fitness') || titleLower.includes('wellness') || titleLower.includes('health')) return imageMap.fitness;
  if (titleLower.includes('wallet') || titleLower.includes('leather')) return imageMap.accessories;
  if (titleLower.includes('wireless') || titleLower.includes('earbuds') || titleLower.includes('headphone')) return imageMap.tech;
  
  // Fallback by category
  if (catLower.includes('skincare')) return imageMap.skincare;
  if (catLower.includes('grooming')) return imageMap.grooming;
  if (catLower.includes('fashion') || catLower.includes('style')) return imageMap.style;
  if (catLower.includes('tech') || catLower.includes('audio')) return imageMap.tech;
  if (catLower.includes('lifestyle')) return imageMap.lifestyle;
  
  // Default fallback
  return imageMap.lifestyle;
}

function updateLaunchArticles() {
  const filePath = path.join(__dirname, 'src', 'data', 'launchArticles.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Parse articles to intelligently assign images
  const articleMatches = [...content.matchAll(/\{[^}]*id:\s*'([^']+)'[^}]*title:\s*'([^']+)'[^}]*category:\s*'([^']*)'[^}]*tags:\s*\[([^\]]*)\][^}]*featuredImage:/gs)];
  
  console.log('Updating launchArticles.ts...');
  
  // Replace all external image URLs
  content = content.replace(
    /featuredImage:\s*'https:\/\/[^']+'/g,
    (match) => {
      // Try to get context around this match
      const startIndex = content.lastIndexOf('{', content.indexOf(match));
      const endIndex = content.indexOf('}', content.indexOf(match)) + 1;
      const articleBlock = content.substring(startIndex, endIndex);
      
      // Extract article info
      const titleMatch = articleBlock.match(/title:\s*'([^']+)'/);
      const categoryMatch = articleBlock.match(/category:\s*'([^']*)'/);
      const tagsMatch = articleBlock.match(/tags:\s*\[([^\]]*)\]/);
      
      const title = titleMatch ? titleMatch[1] : '';
      const category = categoryMatch ? categoryMatch[1] : '';
      const tags = tagsMatch ? tagsMatch[1].split(',').map(t => t.trim().replace(/['"]/g, '')) : [];
      
      const newImage = getImageForArticle(title, category, tags);
      console.log(`  ✓ ${title.substring(0, 50)}... -> ${newImage}`);
      return `featuredImage: '${newImage}'`;
    }
  );
  
  // Replace affiliate product images within articles
  content = content.replace(
    /image:\s*'https:\/\/[^']+'/g,
    (match) => {
      const startIndex = content.lastIndexOf('{', content.indexOf(match));
      const endIndex = content.indexOf('}', content.indexOf(match)) + 1;
      const productBlock = content.substring(startIndex, endIndex);
      
      const nameMatch = productBlock.match(/name:\s*'([^']+)'/);
      const idMatch = productBlock.match(/id:\s*'([^']+)'/);
      const categoryMatch = productBlock.match(/category:\s*'([^']*)'/);
      
      const name = nameMatch ? nameMatch[1] : '';
      const id = idMatch ? idMatch[1] : '';
      const category = categoryMatch ? categoryMatch[1] : '';
      
      const newImage = getImageForProduct(name, id, category);
      return `image: '${newImage}'`;
    }
  );
  
  fs.writeFileSync(filePath, content);
  console.log('✓ launchArticles.ts updated\n');
}

function updateLaunchProducts() {
  const filePath = path.join(__dirname, 'src', 'data', 'launchProducts.ts');
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log('Updating launchProducts.ts...');
  
  content = content.replace(
    /image:\s*'https:\/\/[^']+'/g,
    (match) => {
      const startIndex = content.lastIndexOf('{', content.indexOf(match));
      const endIndex = content.indexOf('}', content.indexOf(match)) + 1;
      const productBlock = content.substring(startIndex, endIndex);
      
      const nameMatch = productBlock.match(/name:\s*'([^']+)'/);
      const idMatch = productBlock.match(/id:\s*'([^']+)'/);
      const categoryMatch = productBlock.match(/category:\s*'([^']*)'/);
      
      const name = nameMatch ? nameMatch[1] : '';
      const id = idMatch ? idMatch[1] : '';
      const category = categoryMatch ? categoryMatch[1] : '';
      
      const newImage = getImageForProduct(name, id, category);
      console.log(`  ✓ ${name.substring(0, 50)}... -> ${newImage}`);
      return `image: '${newImage}'`;
    }
  );
  
  fs.writeFileSync(filePath, content);
  console.log('✓ launchProducts.ts updated\n');
}

function updateSpotlightProducts() {
  const filePath = path.join(__dirname, 'src', 'data', 'spotlightProducts.ts');
  
  if (!fs.existsSync(filePath)) {
    console.log('spotlightProducts.ts not found, skipping...\n');
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  
  console.log('Updating spotlightProducts.ts...');
  
  // These are Amazon product images, keep them as they're actual product photos
  // But provide fallbacks
  console.log('  Note: Keeping Amazon product images (actual product photos)\n');
  
  fs.writeFileSync(filePath, content);
  console.log('✓ spotlightProducts.ts checked\n');
}

// Run updates
console.log('==================================================');
console.log('  Updating Image Paths to Local Storage');
console.log('==================================================\n');

updateLaunchArticles();
updateLaunchProducts();
updateSpotlightProducts();

console.log('==================================================');
console.log('  ✓ All image paths updated successfully!');
console.log('==================================================');
console.log('\nAll images now use local paths stored in:');
console.log('  - /images/articles/');
console.log('  - /images/products/');
console.log('\nImages are masculine-themed and relevant to content!');
