import type { CloudflareEnv, CloudflareContext } from '../types';

/**
 * Newsletter API Endpoint
 * POST /api/newsletter - Subscribe email to newsletter
 * DELETE /api/newsletter - Unsubscribe email
 * 
 * Handles email validation, duplicate prevention, and external service integration
 */

// interface NewsletterPayload {
//   email: string;
//   firstName?: string;
//   lastName?: string;
//   source?: string;
//   sourcePage?: string;
//   categories?: string[];
//   consent?: boolean;
// }

// interface UnsubscribePayload {
//   email: string;
//   reason?: string;
// }

const MAX_TEXT_LENGTH = 512;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const sanitizeText = (value: unknown, limit = MAX_TEXT_LENGTH): string | null => {
  if (typeof value !== 'string') return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, limit);
};

const validateEmail = (email: string): boolean => {
  if (!email || typeof email !== 'string') return false;
  if (email.length > 254) return false; // RFC 5321
  return EMAIL_REGEX.test(email.toLowerCase());
};

// const hashEmail = async (email: string): Promise<string> => {
//   const encoder = new TextEncoder();
//   const data = encoder.encode(email.toLowerCase());
//   const hashBuffer = await crypto.subtle.digest('SHA-256', data);
//   const hashArray = Array.from(new Uint8Array(hashBuffer));
//   return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
// };

const sendToEmailService = async (
  email: string,
  payload: Record<string, unknown>,
  env: CloudflareEnv
): Promise<{ success: boolean; externalId?: string; error?: string }> => {
  /**
   * Integration point for external email services
   * Supported: ConvertKit (default), Klaviyo, SendGrid
   * Currently configured via environment variables
   */

  const SERVICE = env.EMAIL_SERVICE || 'konvertkit'; // konvertkit, klaviyo, sendgrid
  const API_KEY = env.EMAIL_SERVICE_API_KEY;
  const API_URL = env.EMAIL_SERVICE_API_URL;

  if (!API_KEY || !API_URL) {
    console.warn('Email service not configured, storing locally only');
    return { success: true }; // Fail gracefully - store locally
  }

  try {
    if (SERVICE === 'konvertkit') {
      // ConvertKit API: POST /subscribers
      const response = await fetch(`${API_URL}/subscribers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          subscriber: {
            email: email.toLowerCase(),
            first_name: payload.firstName,
            last_name: payload.lastName,
            fields: {
              source: payload.source || 'website',
              source_page: payload.sourcePage,
              product_interests: payload.categories?.join(','),
            },
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error: `ConvertKit error: ${error}` };
      }

      const data = await response.json();
      return {
        success: true,
        externalId: data.subscriber?.id?.toString(),
      };
    }

    if (SERVICE === 'klaviyo') {
      // Klaviyo API: POST /api/v1/people
      const response = await fetch(`${API_URL}/people`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Klaviyo-API-Key ${API_KEY}`,
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          properties: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            source: payload.source || 'website',
            sourcePage: payload.sourcePage,
            productInterests: payload.categories?.join(','),
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error: `Klaviyo error: ${error}` };
      }

      const data = await response.json();
      return {
        success: true,
        externalId: data.id,
      };
    }

    if (SERVICE === 'sendgrid') {
      // SendGrid Contacts API: PUT /v3/marketing/contacts
      const response = await fetch(`${API_URL}/contacts`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          contacts: [
            {
              email: email.toLowerCase(),
              first_name: payload.firstName,
              last_name: payload.lastName,
              custom_fields: {
                e1_T: payload.source || 'website',
                e2_T: payload.sourcePage,
                e3_T: payload.categories?.join(','),
              },
            },
          ],
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        return { success: false, error: `SendGrid error: ${error}` };
      }

      return { success: true };
    }

    return { success: false, error: `Unknown email service: ${SERVICE}` };
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    return { success: false, error: `Email service error: ${errorMessage}` };
  }
};

export async function onRequest(context: CloudflareContext) {
  const { request, env } = context;

  // Handle CORS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Max-Age': '86400',
      },
    });
  }

  const contentType = request.headers.get('content-type') || '';
  if (!contentType.includes('application/json')) {
    return new Response(JSON.stringify({ error: 'Unsupported content type' }), {
      status: 415,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  let payload: Record<string, unknown> | null = null;
  try {
    payload = await request.json() as Record<string, unknown>;
  } catch (_error) {
    return new Response(JSON.stringify({ error: 'Invalid JSON payload' }), {
      status: 400,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  const db = env.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: 'Database not configured' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  // ==========================================
  // SUBSCRIBE - POST /api/newsletter
  // ==========================================
  if (request.method === 'POST') {
    const email = sanitizeText(payload.email);
    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    const firstName = sanitizeText(payload.firstName, 100);
    const lastName = sanitizeText(payload.lastName, 100);
    const source = sanitizeText(payload.source, 100) || 'website';
    const sourcePage = sanitizeText(payload.sourcePage, 500);
    const categories = Array.isArray(payload.categories)
      ? payload.categories.slice(0, 10).map((c: unknown) => sanitizeText(c, 50)).filter(Boolean)
      : [];
    const consent = payload.consent === true;
    const ip = request.headers.get('CF-Connecting-IP');
    const userAgent = sanitizeText(request.headers.get('user-agent'));

    try {
      // Check if already subscribed
      const existingCheck = db.prepare('SELECT id, status FROM newsletter_subscribers WHERE email = ?');
      const existing = await existingCheck.bind(email.toLowerCase()).first();

      if (existing) {
        // Update existing subscriber
        if (existing.status === 'unsubscribed') {
          // Reactivate unsubscribed user
          const updateStmt = db.prepare(`
            UPDATE newsletter_subscribers 
            SET status = 'active', 
                first_name = COALESCE(?, first_name),
                last_name = COALESCE(?, last_name),
                product_categories = ?,
                updated_at = CURRENT_TIMESTAMP,
                marketing_consent = ?,
                consent_timestamp = CURRENT_TIMESTAMP
            WHERE email = ?
          `);
          await updateStmt
            .bind(
              firstName,
              lastName,
              categories.length > 0 ? JSON.stringify(categories) : null,
              consent ? 1 : 0,
              email.toLowerCase()
            )
            .run();
        } else {
          // Already active, just return success
          return new Response(JSON.stringify({ success: true, status: 'already_subscribed' }), {
            status: 200,
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        }
      } else {
        // Insert new subscriber
        const insertStmt = db.prepare(`
          INSERT INTO newsletter_subscribers (
            email, first_name, last_name, source, subscription_source_page,
            product_categories, status, marketing_consent, consent_timestamp,
            signup_ip_address, signup_user_agent, consent_ip_address
          ) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, CURRENT_TIMESTAMP, ?, ?, ?)
        `);
        await insertStmt
          .bind(
            email.toLowerCase(),
            firstName,
            lastName,
            source,
            sourcePage,
            categories.length > 0 ? JSON.stringify(categories) : null,
            consent ? 1 : 0,
            ip,
            userAgent,
            ip
          )
          .run();
      }

      // Send to external email service (async, don't wait)
      const emailServiceResult = await sendToEmailService(email.toLowerCase(), payload, env);
      if (emailServiceResult.success && emailServiceResult.externalId) {
        // Update with external ID
        const updateExternalStmt = db.prepare(`
          UPDATE newsletter_subscribers 
          SET external_id = ?, external_service = ?
          WHERE email = ?
        `);
        await updateExternalStmt
          .bind(emailServiceResult.externalId, env.EMAIL_SERVICE || 'konvertkit', email.toLowerCase())
          .run();
      }

      return new Response(JSON.stringify({ success: true, status: 'subscribed' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error: unknown) {
      console.error('Newsletter subscription error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return new Response(
        JSON.stringify({ error: `Subscription error: ${errorMessage}` }),
        {
          status: 500,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
        }
      );
    }
  }

  // ==========================================
  // UNSUBSCRIBE - DELETE /api/newsletter
  // ==========================================
  if (request.method === 'DELETE') {
    const email = sanitizeText(payload.email);
    const reason = sanitizeText(payload.reason, 500);

    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    try {
      const unsubscribeStmt = db.prepare(`
        UPDATE newsletter_subscribers 
        SET status = 'unsubscribed', 
            updated_at = CURRENT_TIMESTAMP
        WHERE email = ?
      `);
      await unsubscribeStmt.bind(email.toLowerCase()).run();

      // Log unsubscribe reason if provided
      if (reason) {
        console.log(`Unsubscribe reason for ${email}: ${reason}`);
      }

      return new Response(JSON.stringify({ success: true, status: 'unsubscribed' }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    } catch (error: unknown) {
      console.error('Unsubscribe error:', error);
      const errorMessage = error instanceof Error ? error.message : String(error);
      return new Response(JSON.stringify({ error: `Unsubscribe error: ${errorMessage}` }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }
  }

  // Unsupported method
  return new Response(JSON.stringify({ error: 'Method not allowed' }), {
    status: 405,
    headers: {
      'Content-Type': 'application/json',
      'Allow': 'POST, DELETE, OPTIONS',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
