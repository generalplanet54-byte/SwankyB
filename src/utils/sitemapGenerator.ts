import { launchArticles } from '../data/launchArticles';

export interface SitemapUrl {
  url: string;
  lastmod?: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: string;
}

export const generateSitemapUrls = (domain: string = 'https://swankyb.com'): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static routes
  const staticUrls: SitemapUrl[] = [
    {
      url: `${domain}/`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '1.0'
    },
    {
      url: `${domain}/articles`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: '0.8'
    }
  ];

  // Category URLs
  const categories = [...new Set(launchArticles.map(article => article.category))];
  const categoryUrls: SitemapUrl[] = categories.map(category => ({
    url: `${domain}/category/${category.toLowerCase().replace(/\s+/g, '-')}`,
    lastmod: currentDate,
    changefreq: 'weekly',
    priority: '0.6'
  }));

  // Article URLs
  const articleUrls: SitemapUrl[] = launchArticles.map(article => ({
    url: `${domain}/article/${article.slug}`,
    lastmod: article.updatedAt ? new Date(article.updatedAt).toISOString().split('T')[0] : currentDate,
    changefreq: 'weekly',
    priority: '0.7'
  }));

  return [...staticUrls, ...categoryUrls, ...articleUrls];
};

export const generateSitemapXML = (urls: SitemapUrl[]): string => {
  const urlElements = urls.map(({ url, lastmod, changefreq, priority }) => `
  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlElements}
</urlset>`;
};

/**
 * Generates a complete sitemap for the website
 * @param domain - The base domain for the website
 * @returns XML sitemap as a string
 */
export const generateCompleteSitemap = (domain: string = 'https://swankyb.com'): string => {
  const urls = generateSitemapUrls(domain);
  return generateSitemapXML(urls);
};

/**
 * Get sitemap statistics
 * @param domain - The base domain for the website
 * @returns Object with sitemap statistics
 */
export const getSitemapStats = (domain: string = 'https://swankyb.com') => {
  const urls = generateSitemapUrls(domain);
  
  const stats = {
    totalUrls: urls.length,
    staticUrls: urls.filter(url => url.url.endsWith('/') || url.url.endsWith('/articles')).length,
    categoryUrls: urls.filter(url => url.url.includes('/category/')).length,
    articleUrls: urls.filter(url => url.url.includes('/article/')).length,
    lastGenerated: new Date().toISOString(),
    domain
  };

  return stats;
};

/**
 * Validate sitemap URLs
 * @param urls - Array of sitemap URLs
 * @returns Array of validation errors
 */
export const validateSitemapUrls = (urls: SitemapUrl[]): string[] => {
  const errors: string[] = [];
  
  urls.forEach((url, index) => {
    // Check URL format
    try {
      new URL(url.url);
    } catch {
      errors.push(`Invalid URL at index ${index}: ${url.url}`);
    }
    
    // Check priority range
    const priority = parseFloat(url.priority);
    if (priority < 0 || priority > 1) {
      errors.push(`Invalid priority at index ${index}: ${url.priority} (must be between 0.0 and 1.0)`);
    }
    
    // Check lastmod format
    if (url.lastmod && !/^\d{4}-\d{2}-\d{2}$/.test(url.lastmod)) {
      errors.push(`Invalid lastmod format at index ${index}: ${url.lastmod} (should be YYYY-MM-DD)`);
    }
  });
  
  return errors;
};