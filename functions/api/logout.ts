export async function onRequestPost(context: any) {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Clear the auth cookie (match the same flags used in login)
  const isProduction = context.request.url.includes('swankyboyz.com');
  const cookieFlags = isProduction 
    ? 'HttpOnly; Secure; SameSite=Strict'
    : 'HttpOnly; SameSite=Lax';
  
  response.headers.set('Set-Cookie', `auth-token=; ${cookieFlags}; Max-Age=0; Path=/`);
  
  return response;
}