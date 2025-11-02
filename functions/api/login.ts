
import { authenticateUser, createJWT, setJWTSecret } from '../auth';

/**
 * POST /api/login
 * Authenticates user and sets secure HttpOnly cookie with JWT token
 * Request body: { username: string, password: string }
 */
export async function onRequestPost(context: any) {
  // Set JWT_SECRET from Cloudflare Pages environment variables
  const jwtSecret = context.env?.JWT_SECRET;
  
  if (!jwtSecret) {
    console.error('[/api/login] JWT_SECRET not configured in environment variables');
    return new Response(JSON.stringify({ 
      error: 'Server configuration error',
      message: 'Authentication system not properly configured'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://swankyboyz.com',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }
  
  setJWTSecret(jwtSecret);
  
  try {
    const { username, password } = await context.request.json();
    
    if (!username || !password) {
      return new Response(JSON.stringify({ 
        error: 'Username and password required',
        message: 'Please provide both username and password'
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://swankyboyz.com',
          'Access-Control-Allow-Credentials': 'true'
        }
      });
    }
    
    const user = await authenticateUser(username, password);
    
    if (!user) {
      console.log(`[/api/login] Failed login attempt for username: ${username}`);
      return new Response(JSON.stringify({ 
        error: 'Invalid credentials',
        message: 'Username or password is incorrect'
      }), {
        status: 401,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'https://swankyboyz.com',
          'Access-Control-Allow-Credentials': 'true'
        }
      });
    }
    
    const token = await createJWT({
      userId: user.id,
      username: user.username,
      role: user.role
    });
    
    console.log(`[/api/login] Successful login for user: ${username}`);
    
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
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://swankyboyz.com',
        'Access-Control-Allow-Credentials': 'true',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin'
      }
    });
    
    // Set secure HTTP-only cookie with JWT token
    // Note: In production, ensure domain matches your actual domain
    const isProduction = context.request.url.includes('swankyboyz.com');
    const cookieFlags = isProduction 
      ? 'HttpOnly; Secure; SameSite=Strict'
      : 'HttpOnly; SameSite=Lax'; // Remove Secure flag for localhost
    
    response.headers.set(
      'Set-Cookie', 
      `auth-token=${token}; ${cookieFlags}; Max-Age=86400; Path=/`
    );
    
    return response;
  } catch (error: any) {
    console.error('[/api/login] Login error:', error.message);
    return new Response(JSON.stringify({ 
      error: error.message || 'Login failed',
      message: 'An error occurred during authentication'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'https://swankyboyz.com',
        'Access-Control-Allow-Credentials': 'true'
      }
    });
  }
}