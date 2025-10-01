import { verifyJWT } from '../../auth';

export async function onRequestGet(context: any) {
  try {
    const cookieHeader = context.request.headers.get('Cookie');
    
    if (!cookieHeader) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const cookies = Object.fromEntries(
      cookieHeader.split('; ').map(cookie => cookie.split('='))
    );
    
    const token = cookies['auth-token'];
    
    if (!token) {
      return new Response(JSON.stringify({ error: 'Not authenticated' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const payload = await verifyJWT(token);
    
    return new Response(JSON.stringify({
      user: {
        id: payload.userId,
        username: payload.username,
        role: payload.role
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Invalid token' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}