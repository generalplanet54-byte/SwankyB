// Astro API route for products from D1 database
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    // Access the D1 database from Cloudflare runtime
    const db = locals.runtime?.env.DB;
    
    if (!db) {
      return new Response(JSON.stringify({ 
        error: 'Database not configured',
        fallback: true 
      }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');
    const category = url.searchParams.get('category');

    let query = `
      SELECT 
        p.id,
        p.name,
        p.brand,
        p.description,
        p.image,
        p.affiliate_url,
        p.price,
        p.category,
        p.rating,
        p.created_at
      FROM products p
    `;

    let params: any[] = [];

    if (category) {
      query += ` WHERE p.category = ?`;
      params.push(category);
    }

    query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await db.prepare(query).bind(...params).all();

    return new Response(JSON.stringify({
      success: true,
      products: result.results || [],
      count: result.results?.length || 0
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60'
      }
    });

  } catch (error) {
    console.error('Products API error:', error);
    
    return new Response(JSON.stringify({
      error: 'Failed to fetch products',
      fallback: true,
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};