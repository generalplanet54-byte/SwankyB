import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Extract article data by reading and parsing the TypeScript file
const extractArticlesFromFile = () => {
  try {
    // Read the launchArticles.ts file
    const filePath = path.join(__dirname, '../src/data/launchArticles.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');
    
    // Extract article objects using regex patterns to find key information
    // This finds all slug, category, and updatedAt values
    const slugMatches = [...fileContent.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)];
    const categoryMatches = [...fileContent.matchAll(/category:\s*['"`]([^'"`]+)['"`]/g)];
    const updatedAtMatches = [...fileContent.matchAll(/updatedAt:\s*['"`]([^'"`]+)['"`]/g)];
    
    const articles = [];
    
    // Create article objects from extracted data
    for (let i = 0; i < slugMatches.length; i++) {
      const slug = slugMatches[i]?.[1];
      const category = categoryMatches[i]?.[1] || 'General';
      const updatedAt = updatedAtMatches[i]?.[1] || '2025-10-14';
      
      if (slug) {
        articles.push({
          id: (i + 1).toString(),
          slug,
          category,
          updatedAt
        });
      }
    }
    
    // If no articles found with regex, use our known articles
    if (articles.length === 0) {
      return [
        {
          id: '1',
          slug: 'premium-skincare-luxury-beauty-products-review',
          category: 'Beauty & Skincare',
          updatedAt: '2025-10-14'
        },
        {
          id: '2',
          slug: 'ultimate-guide-productivity-tools-modern-professionals',
          category: 'Productivity',
          updatedAt: '2025-10-14'
        },
        {
          id: '3',
          slug: 'smart-home-security-ring-vs-simplisafe-review',
          category: 'Technology',
          updatedAt: '2025-10-14'
        },
        {
          id: '4',
          slug: 'best-ergonomic-office-chairs-herman-miller-review',
          category: 'Furniture',
          updatedAt: '2025-10-14'
        },
        {
          id: '5',
          slug: 'mens-grooming-essentials-premium-products-review',
          category: 'Beauty & Skincare',
          updatedAt: '2025-10-14'
        }
      ];
    }
    
    return articles;
  } catch (error) {
    console.warn('Could not extract articles from file, using fallback data:', error.message);
    // Fallback articles if extraction fails
    return [
      {
        id: '1',
        slug: 'premium-skincare-luxury-beauty-products-review',
        category: 'Beauty & Skincare',
        updatedAt: '2025-10-14'
      },
      {
        id: '2',
        slug: 'ultimate-guide-productivity-tools-modern-professionals',
        category: 'Productivity',
        updatedAt: '2025-10-14'
      }
    ];
  }
};

const DOMAIN = 'https://swankyb.com'; // Replace with your actual domain
const LAST_MOD = new Date().toISOString().split('T')[0];

// Get articles data
const articles = extractArticlesFromFile();

// Define your static routes
const staticRoutes = [
  {
    url: '/',
    changefreq: 'daily',
    priority: '1.0'
  },
  {
    url: '/articles',
    changefreq: 'daily',
    priority: '0.8'
  }
];

// Extract unique categories from articles
const categories = [...new Set(articles.map(article => article.category))];

// Generate category routes
const categoryRoutes = categories.map(category => ({
  url: `/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
  changefreq: 'weekly',
  priority: '0.6'
}));

// Generate article routes
const articleRoutes = articles.map(article => ({
  url: `/article/${article.slug}`,
  changefreq: 'weekly',
  priority: '0.7',
  lastmod: article.updatedAt ? new Date(article.updatedAt).toISOString().split('T')[0] : LAST_MOD
}));

// Combine all routes
const allRoutes = [...staticRoutes, ...categoryRoutes, ...articleRoutes];

// Generate XML sitemap
const generateSitemap = () => {
  const urlElements = allRoutes.map(route => `
  <url>
    <loc>${DOMAIN}${route.url}</loc>
    <lastmod>${route.lastmod || LAST_MOD}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;

  return sitemap;
};

// Write sitemap to public directory
const sitemapContent = generateSitemap();
const sitemapPath = path.join(__dirname, '../public/sitemap.xml');

// Ensure public directory exists
const publicDir = path.dirname(sitemapPath);
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(sitemapPath, sitemapContent);

console.log(`✅ Sitemap generated successfully at: ${sitemapPath}`);
console.log(`📊 Total URLs: ${allRoutes.length}`);
console.log(`   - Static routes: ${staticRoutes.length}`);
console.log(`   - Category routes: ${categoryRoutes.length}`);
console.log(`   - Article routes: ${articleRoutes.length}`);
console.log(`🌐 Domain: ${DOMAIN}`);
console.log(`📅 Last modified: ${LAST_MOD}`);

// Optional: Display all URLs for verification
console.log(`\n📋 Generated URLs:`);
allRoutes.forEach(route => {
  console.log(`   ${DOMAIN}${route.url}`);
});