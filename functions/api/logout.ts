export async function onRequestPost(context: any) {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Clear the auth cookie (Secure flag only on HTTPS)
  const isProduction = context.request.url.includes('https://');
  const secureCookie = isProduction ? 'Secure; ' : '';
  response.headers.set('Set-Cookie', `auth-token=; HttpOnly; ${secureCookie}SameSite=Strict; Max-Age=0; Path=/`);
  
  return response;
}