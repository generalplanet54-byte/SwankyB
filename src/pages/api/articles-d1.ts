// Astro API route for articles from D1 database
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, locals }) => {
  try {
    // Access the D1 database from Astro's runtime
    const db = locals.runtime?.env?.DB;
    
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
    const slug = url.searchParams.get('slug');
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
        a.publish_date,
        a.is_published,
        a.meta_title,
        a.meta_description,
        a.created_at,
        a.updated_at
      FROM articles a
    `;

    let params: any[] = [];

    if (slug) {
      query += ` WHERE a.slug = ? AND a.is_published = 1`;
      params.push(slug);
    } else {
      query += ` WHERE a.is_published = 1`;
    }

    query += ` ORDER BY a.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const result = await db.prepare(query).bind(...params).all();

    // If requesting single article by slug, return just the article
    if (slug && result.results?.length > 0) {
      return new Response(JSON.stringify({
        success: true,
        article: result.results[0]
      }), {
        status: 200,
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=3600, s-maxage=7200, stale-while-revalidate=86400'
        }
      });
    }

    return new Response(JSON.stringify({
      success: true,
      articles: result.results || [],
      count: result.results?.length || 0
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=3600'
      }
    });

  } catch (error) {
    console.error('Articles API error:', error);
    
    return new Response(JSON.stringify({
      error: 'Failed to fetch articles',
      fallback: true,
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};