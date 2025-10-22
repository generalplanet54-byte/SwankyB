import createSupabaseFromEnv from '../../src/lib/supabase-cloudflare';
import { launchProducts } from '../../src/data/launchProducts';
import { launchArticles } from '../../src/data/launchArticles';

const jsonResponse = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' }
  });

const fallbackPayload = {
  products: launchProducts,
  articles: launchArticles
};

export async function onRequest(context: any) {
  const env = context.env || {};
  let supabase;

  try {
    supabase = createSupabaseFromEnv(env);
  } catch (error) {
    console.warn('⚠️  Falling back to launch content – Supabase env missing/unavailable:', error);
    return jsonResponse(fallbackPayload);
  }

  try {
    const [{ data: products, error: pErr }, { data: articles, error: aErr }] = await Promise.all([
      supabase.from('products').select('*').order('created_at', { ascending: false }),
      supabase.from('articles').select('*').order('published_at', { ascending: false })
    ]);

    if (pErr) throw pErr;
    if (aErr) throw aErr;

    return jsonResponse({ products, articles });
  } catch (err: any) {
    console.error('❌  Falling back to launch content – Supabase query failed:', err);
    return jsonResponse(fallbackPayload);
  }
}
