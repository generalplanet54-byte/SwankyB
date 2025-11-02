// Astro API route for admin authentication check
import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ request, cookies }) => {
  try {
    // Check for authentication token
    const token = cookies.get('auth-token')?.value || 
                  request.headers.get('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return new Response(JSON.stringify({ 
        error: 'Not authenticated',
        authenticated: false 
      }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // For demo purposes, return a simple success response
    // In production, you'd verify the JWT token here
    return new Response(JSON.stringify({
      success: true,
      authenticated: true,
      user: {
        id: 'admin',
        email: 'admin@swankyboyz.com',
        role: 'admin'
      }
    }), {
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      }
    });

  } catch (error) {
    console.error('Admin auth error:', error);
    
    return new Response(JSON.stringify({
      error: 'Authentication check failed',
      authenticated: false,
      message: error instanceof Error ? error.message : 'Unknown error'
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};