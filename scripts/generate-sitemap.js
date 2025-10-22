import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SITE_URL = process.env.SITE_URL || 'https://swankyboyz.com';
const TODAY = new Date();

const slugify = (value) => {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
};

const normaliseDate = (value) => {
  if (!value) {
    return TODAY.toISOString().split('T')[0];
  }

  const candidate = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(candidate.getTime())) {
    return TODAY.toISOString().split('T')[0];
  }

  return candidate.toISOString().split('T')[0];
};

const toAbsoluteUrl = (url) => {
  try {
    return new URL(url, SITE_URL).toString();
  } catch (error) {
    return `${SITE_URL}${url.startsWith('/') ? '' : '/'}${url}`;
  }
};

const extractArticles = () => {
  try {
    const filePath = path.join(__dirname, '../src/data/launchArticles.ts');
    const fileContent = fs.readFileSync(filePath, 'utf8');

    const slugMatches = [...fileContent.matchAll(/slug:\s*['"`]([^'"`]+)['"`]/g)];
    const categoryMatches = [...fileContent.matchAll(/category:\s*['"` ]?([^'"`\n]+)['"`]?/g)];
    const updatedAtMatches = [...fileContent.matchAll(/updatedAt:\s*['"` ]?([^'"`\n]+)['"`]?/g)];
    const publishedAtMatches = [...fileContent.matchAll(/publishedAt:\s*['"` ]?([^'"`\n]+)['"`]?/g)];

    const articles = [];

    for (let i = 0; i < slugMatches.length; i += 1) {
      const slug = slugMatches[i]?.[1];
      if (!slug) continue;

      articles.push({
        slug,
        category: categoryMatches[i]?.[1] || 'General',
        updatedAt: updatedAtMatches[i]?.[1] || publishedAtMatches[i]?.[1] || TODAY,
        publishedAt: publishedAtMatches[i]?.[1] || TODAY
      });
    }

    if (!articles.length) {
      throw new Error('No articles extracted');
    }

    return articles;
  } catch (error) {
    console.warn('⚠️  Falling back to default article list:', error.message);
    return [
      {
        slug: 'premium-skincare-luxury-beauty-products-review',
        category: 'Beauty & Skincare',
        updatedAt: TODAY,
        publishedAt: TODAY
      }
    ];
  }
};

const extractProducts = () => {
  const productsDir = path.join(__dirname, '../src/content/products');
  if (!fs.existsSync(productsDir)) {
    return [];
  }

  const entries = [];

  const traverse = (dir) => {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        traverse(entryPath);
        return;
      }

      if (!entry.name.endsWith('.md')) {
        return;
      }

      const fileContent = fs.readFileSync(entryPath, 'utf8');
      const { data } = matter(fileContent);

      if (!data || data.published === false) {
        return;
      }

      const relativePath = path.relative(productsDir, entryPath).replace(/\\/g, '/');
      const slug = relativePath.replace(/\.md$/, '');

      entries.push({
        slug,
        category: data.category || 'Products',
        updatedAt: data.updatedAt || data.modifiedAt || data.publishedAt || TODAY,
        publishedAt: data.publishedAt || TODAY
      });
    });
  };

  traverse(productsDir);
  return entries;
};

const articles = extractArticles();
const products = extractProducts();

// Ensure articles have affiliate slugs that exist in launchArticles
const ensureArticleSlugs = (list) => list.map(a => ({ ...a, slug: a.slug }));

const normalizedArticles = ensureArticleSlugs(articles);

const staticRoutes = [
  { url: '/', changefreq: 'daily', priority: '1.0', lastmod: normaliseDate(TODAY) },
  { url: '/articles', changefreq: 'daily', priority: '0.8', lastmod: normaliseDate(TODAY) },
  { url: '/privacy-policy', changefreq: 'monthly', priority: '0.4', lastmod: normaliseDate(TODAY) }
];

const categoryMap = new Map();

const trackCategory = (category, date) => {
  if (!category) return;
  const slug = slugify(category);
  const lastmod = normaliseDate(date);
  const existing = categoryMap.get(slug);

  if (!existing || new Date(lastmod) > new Date(existing.lastmod)) {
    categoryMap.set(slug, { name: category, lastmod });
  }
};

articles.forEach((article) => trackCategory(article.category, article.updatedAt));
products.forEach((product) => trackCategory(product.category, product.updatedAt));

const categoryRoutes = Array.from(categoryMap.entries()).map(([slug, info]) => ({
  url: `/category/${slug}`,
  changefreq: 'weekly',
  priority: '0.6',
  lastmod: info.lastmod
}));

const articleRoutes = articles.map((article) => ({
  url: `/article/${article.slug}`,
  changefreq: 'weekly',
  priority: '0.7',
  lastmod: normaliseDate(article.updatedAt)
}));

const productRoutes = products.map((product) => ({
  url: `/products/${product.slug}`,
  changefreq: 'weekly',
  priority: '0.7',
  lastmod: normaliseDate(product.updatedAt)
}));

const allRoutes = [...staticRoutes, ...categoryRoutes, ...articleRoutes, ...productRoutes]
  .sort((a, b) => a.url.localeCompare(b.url));

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes.map((route) => `  <url>
    <loc>${toAbsoluteUrl(route.url)}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>
`;

const sitemapPath = path.join(__dirname, '../public/sitemap.xml');
const publicDir = path.dirname(sitemapPath);

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(sitemapPath, sitemapXml.trim());

console.log(`✅ Sitemap generated successfully at: ${sitemapPath}`);
console.log(`📊 Total URLs: ${allRoutes.length}`);
console.log(`   - Static routes: ${staticRoutes.length}`);
console.log(`   - Category routes: ${categoryRoutes.length}`);
console.log(`   - Article routes: ${articleRoutes.length}`);
console.log(`   - Product routes: ${productRoutes.length}`);
console.log(`🌐 Domain: ${SITE_URL}`);
console.log(`📅 Generated on: ${TODAY.toISOString()}`);

console.log('\n📋 Generated URLs:');
allRoutes.forEach((route) => {
  console.log(`   ${toAbsoluteUrl(route.url)}`);
});