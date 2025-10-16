import createSupabaseFromEnv from '../../src/lib/supabase-cloudflare';

interface AffiliateClickPayload {
  productId: string;
  productName?: string;
  productUrl?: string;
  affiliateUrl: string;
  source?: string;
}

const MAX_TEXT_LENGTH = 512;

const sanitizeText = (value: unknown, limit = MAX_TEXT_LENGTH) => {
  if (typeof value !== 'string') return null;
  if (!value.trim()) return null;
  return value.slice(0, limit);
};

const hashIp = async (ip: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
};

export async function onRequest(context: any) {
  const { request, env } = context;

  if (request.method !== 'POST') {
    return new Response('Method Not Allowed', {
      status: 405,
      headers: { Allow: 'POST' },
    });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Unsupported content type' }), {
      status: 415,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  let payload: AffiliateClickPayload | null = null;
  try {
    payload = (await request.json()) as AffiliateClickPayload;
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!payload || typeof payload !== 'object') {
    return new Response(JSON.stringify({ error: 'Missing payload' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const productId = sanitizeText(payload.productId, 120);
  const affiliateUrl = sanitizeText(payload.affiliateUrl, 600);

  if (!productId || !affiliateUrl) {
    return new Response(JSON.stringify({ error: 'productId and affiliateUrl are required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const supabase = createSupabaseFromEnv(env);

  const referer = sanitizeText(request.headers.get('referer'));
  const userAgent = sanitizeText(request.headers.get('user-agent'));
  const source = sanitizeText(payload.source, 150);
  const productName = sanitizeText(payload.productName, 200);
  const productUrl = sanitizeText(payload.productUrl, 600);

  const ip = request.headers.get('CF-Connecting-IP');
  const ipHash = ip ? await hashIp(ip) : null;

  const { error } = await supabase.from('affiliate_clicks').insert({
    product_id: productId,
    product_name: productName,
    product_url: productUrl,
    affiliate_url: affiliateUrl,
    click_source: source,
    referer,
    user_agent: userAgent,
    ip_hash: ipHash,
  });

  if (error) {
    return new Response(JSON.stringify({ error: String(error.message || error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(null, { status: 204 });
}
