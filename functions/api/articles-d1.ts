import type { CloudflareContext } from '../types';

// API endpoint to fetch articles from D1 database
export async function onRequestGet(context: CloudflareContext) {
  try {
    const db = context.env.DB;
    
    if (!db) {
      return new Response(JSON.stringify({ 
        error: 'Database not configured',
        fallback: true 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const url = new URL(context.request.url);
    const slug = url.searchParams.get('slug');
    const category = url.searchParams.get('category');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    let query = `
      SELECT 
        a.id,
        a.title,
        a.slug,
        a.excerpt,
        a.content,
        a.featured_image,
        a.author,
        a.meta_title,
        a.meta_description,
        a.focus_keyword,
        a.read_time,
        a.view_count,
        a.published_at,
        a.updated_at,
        c.name as category_name,
        c.slug as category_slug
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.status = 'published'
    `;

    const params: any[] = [];

    if (slug) {
      query += ` AND a.slug = ?`;
      params.push(slug);
    }

    if (category) {
      query += ` AND c.slug = ?`;
      params.push(category);
    }

    query += ` ORDER BY a.published_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const stmt = db.prepare(query);
    const { results } = await stmt.bind(...params).all();

    // If single article requested, fetch related products and tags
    if (slug && results.length > 0) {
      const articleId = results[0].id;

      // Fetch products for this article
      const productsStmt = db.prepare(`
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.brand,
          p.description,
          p.primary_image,
          p.price,
          p.original_price,
          p.amazon_url,
          p.rating,
          ap.affiliate_override_url,
          ap.display_order
        FROM products p
        INNER JOIN article_products ap ON p.id = ap.product_id
        WHERE ap.article_id = ?
        ORDER BY ap.display_order
      `);
      const { results: products } = await productsStmt.bind(articleId).all();

      // Fetch tags
      const tagsStmt = db.prepare(`
        SELECT t.name, t.slug
        FROM tags t
        INNER JOIN article_tags at ON t.id = at.tag_id
        WHERE at.article_id = ?
      `);
      const { results: tags } = await tagsStmt.bind(articleId).all();

      results[0].products = products;
      results[0].tags = tags.map((t: any) => t.name);
    }

    return new Response(JSON.stringify({
      articles: results,
      total: results.length,
      limit,
      offset
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300' // Cache for 5 minutes
      }
    });

  } catch (error: any) {
    console.error('D1 Query Error:', error);
    return new Response(JSON.stringify({ 
      error: 'Database query failed',
      message: error.message 
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
