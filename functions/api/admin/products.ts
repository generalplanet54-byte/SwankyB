import { verifyJWT, setJWTSecret } from '../../auth';
import createSupabaseFromEnv from '../../../src/lib/supabase-cloudflare';

async function requireAdmin(context: any) {
  setJWTSecret(context.env?.JWT_SECRET || '');
  const cookieHeader = context.request.headers.get('Cookie');
  if (!cookieHeader) throw new Error('Not authenticated');
  const cookies = Object.fromEntries(cookieHeader.split('; ').map((c: string) => c.split('=')));
  const token = cookies['auth-token'];
  if (!token) throw new Error('Not authenticated');
  const payload = await verifyJWT(token);
  if (!payload || payload.role !== 'admin') throw new Error('Not authorized');
  return payload;
}

export async function onRequest(context: any) {
  try {
    await requireAdmin(context);
    const supabase = createSupabaseFromEnv(context.env || {});

    const method = context.request.method.toUpperCase();
    if (method === 'GET') {
      const { data, error } = await supabase.from('products').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return new Response(JSON.stringify({ products: data }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    const body = await context.request.json().catch(() => ({}));

    if (method === 'POST') {
      const { name, slug, description, category, price, amazon_url, image_url } = body;
      const payload: any = { name, slug, description, category, price, amazon_url, image_url };
      const { data, error } = await supabase.from('products').insert([payload]).select();
      if (error) throw error;
      return new Response(JSON.stringify({ product: data?.[0] || null }), { status: 201, headers: { 'Content-Type': 'application/json' } });
    }

    if (method === 'PUT') {
      const { id, updates } = body;
      if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      const { data, error } = await supabase.from('products').update(updates).eq('id', id).select();
      if (error) throw error;
      return new Response(JSON.stringify({ product: data?.[0] || null }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    if (method === 'DELETE') {
      const { id } = body;
      if (!id) return new Response(JSON.stringify({ error: 'Missing id' }), { status: 400, headers: { 'Content-Type': 'application/json' } });
      const { data, error } = await supabase.from('products').delete().eq('id', id).select();
      if (error) throw error;
      return new Response(JSON.stringify({ deleted: data?.[0] || null }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: { 'Content-Type': 'application/json' } });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err.message || String(err) }), { status: 401, headers: { 'Content-Type': 'application/json' } });
  }
}
