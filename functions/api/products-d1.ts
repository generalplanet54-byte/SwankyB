// API endpoint to fetch products from D1 database
export async function onRequestGet(context: any) {
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
    const limit = parseInt(url.searchParams.get('limit') || '100');
    const offset = parseInt(url.searchParams.get('offset') || '0');

    const query = `
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
        p.review_count,
        p.is_active,
        p.created_at,
        p.updated_at,
        c.name as category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;

    const params: any[] = [limit, offset];

    const stmt = db.prepare(query);
    const { results } = await stmt.bind(...params).all();

    return new Response(JSON.stringify({ products: results }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (e: any) {
    console.error({
      message: e.message,
      cause: e.cause?.message
    });
    return new Response(JSON.stringify({ 
      error: 'An error occurred while fetching products.',
      details: e.message
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
