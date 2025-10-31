

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

import type { CloudflareContext } from '../types';

export async function onRequest(context: CloudflareContext) {
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
  } catch (_error) {
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

  const db = env.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const referer = sanitizeText(request.headers.get('referer'));
  const userAgent = sanitizeText(request.headers.get('user-agent'));
  const source = sanitizeText(payload.source, 150);
  const productName = sanitizeText(payload.productName, 200);
  const productUrl = sanitizeText(payload.productUrl, 600);

  const ip = request.headers.get('CF-Connecting-IP');
  const ipHash = ip ? await hashIp(ip) : null;

  try {
    const stmt = db.prepare(`
      INSERT INTO affiliate_clicks (
        product_id, product_name, product_url, affiliate_url, 
        click_source, referer, user_agent, ip_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    await stmt.bind(
      productId,
      productName,
      productUrl,
      affiliateUrl,
      source,
      referer,
      userAgent,
      ipHash
    ).run();
  } catch (error: any) {
    return new Response(JSON.stringify({ error: String(error.message || error) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return new Response(JSON.stringify({ success: true }), {
    status: 204,
  });
}
