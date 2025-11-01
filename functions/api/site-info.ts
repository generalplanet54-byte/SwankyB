import type { CloudflareContext } from '../types';

export const onRequest = async (context: CloudflareContext) => {
  const { request } = context;

  // Basic site information for AI crawlers
  const siteInfo = {
    name: "SwankyBoyz",
    url: "https://swankyboyz.com",
    description: "Premium product reviews, lifestyle guides, and expert recommendations for modern men",
    type: "blog",
    language: "en",
    lastUpdated: new Date().toISOString(),
    sections: {
      homepage: "https://swankyboyz.com/",
      articles: "https://swankyboyz.com/articles",
      categories: [
        "https://swankyboyz.com/category/skincare",
        "https://swankyboyz.com/category/audio",
        "https://swankyboyz.com/category/accessories",
        "https://swankyboyz.com/category/fragrance",
        "https://swankyboyz.com/category/grooming"
      ]
    },
    sitemap: "https://swankyboyz.com/sitemap.xml",
    robots: "https://swankyboyz.com/robots.txt",
    accessible: true,
    crawlable: true
  };

  return new Response(JSON.stringify(siteInfo, null, 2), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Cache-Control': 'public, max-age=3600'
    }
  });
};