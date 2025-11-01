import type { CloudflareContext } from '../../types';
import { verifyJWT, setJWTSecret } from '../../auth';

/**
 * GET /api/admin/me
 * Returns the authenticated user's information from JWT cookie
 * Requires valid auth-token cookie with non-expired JWT
 */
export async function onRequestGet(context: CloudflareContext) {
  // Set JWT_SECRET from Cloudflare Pages environment variables
  const jwtSecret = context.env?.JWT_SECRET;
  
  if (!jwtSecret) {
    console.error('[/api/admin/me] JWT_SECRET not configured in environment variables');
    return new Response(JSON.stringify({ 
      error: 'Server configuration error',
      message: 'Authentication system not properly configured'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://swankyboyz.com',
        'Access-Control-Allow-Credentials': 'true',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
  
  setJWTSecret(jwtSecret);
  
  try {
    const cookieHeader = context.request.headers.get('Cookie');
    
    // No cookie header at all
    if (!cookieHeader) {
      console.log('[/api/admin/me] No Cookie header present');
      return new Response(JSON.stringify({ 
        error: 'Not authenticated',
        message: 'No authentication cookie found'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://swankyboyz.com',
          'Access-Control-Allow-Credentials': 'true',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }
    
    // Parse cookies
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map((cookie: string) => {
        const [key, ...valueParts] = cookie.split('=');
        return [key, valueParts.join('=')];
      })
    );
    
    const token = cookies['auth-token'];
    
    // Cookie exists but auth-token not present
    if (!token) {
      console.log('[/api/admin/me] auth-token cookie not found');
      return new Response(JSON.stringify({ 
        error: 'Not authenticated',
        message: 'Authentication token not found in cookies'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://swankyboyz.com',
          'Access-Control-Allow-Credentials': 'true',
          'X-Content-Type-Options': 'nosniff'
        }
      });
    }
    
    // Verify JWT token
    const payload = await verifyJWT(token);
    
    console.log(`[/api/admin/me] Successfully authenticated user: ${payload.username}`);
    
    // Return user information
    return new Response(JSON.stringify({
      user: {
        id: payload.userId,
        username: payload.username,
        role: payload.role
      }
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://swankyboyz.com',
        'Access-Control-Allow-Credentials': 'true',
        'X-Content-Type-Options': 'nosniff',
        'Cache-Control': 'no-store, no-cache, must-revalidate, private'
      }
    });
  } catch (error: any) {
    // Token verification failed (invalid signature or expired)
    console.error('[/api/admin/me] Token verification failed:', error.message);
    
    return new Response(JSON.stringify({ 
      error: 'Invalid token',
      message: error.message || 'Authentication token is invalid or expired'
    }), {
      status: 401,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://swankyboyz.com',
        'Access-Control-Allow-Credentials': 'true',
        'X-Content-Type-Options': 'nosniff'
      }
    });
  }
}