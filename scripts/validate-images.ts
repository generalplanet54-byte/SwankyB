/**
 * Image Validation and Placeholder Generation
 * Ensures all referenced images exist, creates placeholders if missing
 */

import * as fs from "fs";
import { promises as fsPromises } from "fs";
import * as path from "path";

const ASSETS_DIR = "./public/assets";

interface ImageValidationResult {
  total: number;
  existing: number;
  missing: string[];
  placeholdersCreated: number;
}

async function ensureAssetsDirectory(): Promise<void> {
  try {
    await fsPromises.access(ASSETS_DIR);
  } catch {
    await fsPromises.mkdir(ASSETS_DIR, { recursive: true });
    console.log(`📁 Created assets directory: ${ASSETS_DIR}`);
  }
}

async function createPlaceholder(filename: string): Promise<void> {
  const placeholderPath = path.join(ASSETS_DIR, filename);
  
  try {
    await fsPromises.access(placeholderPath);
    return; // Placeholder already exists
  } catch {
    // File doesn't exist, create it
  }

  // Create a simple SVG placeholder
  const svgContent = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#f3f4f6"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="16" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
    ${filename}
  </text>
  <text x="50%" y="65%" font-family="Arial, sans-serif" font-size="12" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
    Placeholder Image
  </text>
</svg>`;

  // Convert SVG filename to appropriate extension
  const finalPath = filename.endsWith('.svg') 
    ? placeholderPath 
    : placeholderPath.replace(/\.[^.]+$/, '.svg');

  await fsPromises.writeFile(finalPath, svgContent);
  console.log(`🖼️  Created placeholder: ${path.basename(finalPath)}`);
}

async function validateImages(imageList: string[]): Promise<ImageValidationResult> {
  await ensureAssetsDirectory();
  
  const result: ImageValidationResult = {
    total: imageList.length,
    existing: 0,
    missing: [],
    placeholdersCreated: 0
  };

  // Check all images in parallel for better performance
  const validationPromises = imageList
    .filter(image => image && image.trim() !== '')
    .map(async (image) => {
      const imagePath = path.join(ASSETS_DIR, image);
      
      try {
        await fsPromises.access(imagePath);
        return { image, exists: true };
      } catch {
        return { image, exists: false };
      }
    });

  const validationResults = await Promise.all(validationPromises);
  
  // Process results and create placeholders for missing images in parallel
  const placeholderResults = await Promise.all(
    validationResults.map(async ({ image, exists }) => {
      if (exists) {
        return { image, created: false };
      } else {
        await createPlaceholder(image);
        return { image, created: true };
      }
    })
  );

  // Update counters sequentially to avoid race conditions
  for (const validation of validationResults) {
    if (validation.exists) {
      result.existing++;
    }
  }

  for (const placeholder of placeholderResults) {
    if (placeholder.created) {
      result.missing.push(placeholder.image);
      result.placeholdersCreated++;
    }
  }

  return result;
}

async function scanDatabaseForImages(): Promise<string[]> {
  // This would typically scan the database for all image references
  // For now, return common image patterns that might be referenced
  const commonImages = [
    'hero-banner.jpg',
    'logo.png',
    'about-hero.jpg',
    'contact-bg.jpg',
    'newsletter-bg.jpg'
  ];

  return commonImages;
}

async function validateAllImages(): Promise<void> {
  console.log("🔍 Scanning for image references...");
  
  const images = await scanDatabaseForImages();
  const result = await validateImages(images);
  
  console.log("\n📊 Image Validation Results:");
  console.log(`   Total images: ${result.total}`);
  console.log(`   Existing: ${result.existing}`);
  console.log(`   Missing: ${result.missing.length}`);
  console.log(`   Placeholders created: ${result.placeholdersCreated}`);
  
  if (result.missing.length > 0) {
    console.log("\n⚠️  Missing images (placeholders created):");
    result.missing.forEach(img => console.log(`   - ${img}`));
  }
  
  console.log("\n✅ Image validation complete");
}

// Run validation if called directly
if (process.argv[1] && process.argv[1].includes('validate-images.ts')) {
  validateAllImages().catch(console.error);
}

export { validateImages, validateAllImages };