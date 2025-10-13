

import { authenticateUser, createJWT, setJWTSecret } from '../auth';

export async function onRequestPost(context: any) {
  // Set JWT_SECRET from env for Cloudflare Pages Functions
  setJWTSecret(context.env?.JWT_SECRET || '');
  try {
    const { username, password } = await context.request.json();
    
    if (!username || !password) {
      return new Response(JSON.stringify({ error: 'Username and password required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const user = await authenticateUser(username, password);
    
    if (!user) {
      return new Response(JSON.stringify({ error: 'Invalid credentials' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    const token = await createJWT({
      userId: user.id,
      username: user.username,
      role: user.role
    });
    
    const response = new Response(JSON.stringify({
      success: true,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
    
    // Set secure HTTP-only cookie
    response.headers.set('Set-Cookie', `auth-token=${token}; HttpOnly; Secure; SameSite=Strict; Max-Age=86400; Path=/`);
    
    return response;
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}