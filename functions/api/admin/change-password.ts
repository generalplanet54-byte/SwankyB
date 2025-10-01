import { verifyJWT, changePassword } from '../../auth';

export async function onRequestPost(context: any) {
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
    const { currentPassword, newPassword } = await context.request.json();
    
    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: 'Current and new passwords required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Validate new password strength
    if (newPassword.length < 8) {
      return new Response(JSON.stringify({ error: 'New password must be at least 8 characters long' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const success = await changePassword(payload.userId, currentPassword, newPassword);
    
    if (!success) {
      return new Response(JSON.stringify({ error: 'Current password is incorrect' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}