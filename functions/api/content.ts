import createSupabaseFromEnv from '../../src/lib/supabase-cloudflare';

export async function onRequest(context: any) {
  const env = context.env || {};
  const supabase = createSupabaseFromEnv(env);

  try {
    const [{ data: products, error: pErr }, { data: articles, error: aErr }] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('articles').select('*').order('published_at', { ascending: false })
    ]);

    if (pErr) throw pErr;
    if (aErr) throw aErr;

    return new Response(JSON.stringify({ products, articles }), {
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
