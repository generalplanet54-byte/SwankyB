import createSupabaseFromEnv from '../../src/lib/supabase-cloudflare';

export async function onRequest(context: any) {
  const env = context.env || {};
  const supabase = createSupabaseFromEnv(env);

  try {
    const [
      { data: products, error: pErr },
      { data: articles, error: aErr },
      { data: article_products, error: apErr }
    ] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('articles').select('*').eq('is_published', true).order('published_at', { ascending: false }),
      supabase.from('article_products').select(`
        article_id,
        display_order,
        products (*)
      `).order('display_order', { ascending: true })
    ]);

    if (pErr) throw pErr;
    if (aErr) throw aErr;
    if (apErr) throw apErr;

    return new Response(JSON.stringify({ products, articles, article_products }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
