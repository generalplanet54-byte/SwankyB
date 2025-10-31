export async function onRequestPost(_context: any) {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
  
  // Clear the auth cookie
  response.headers.set('Set-Cookie', 'auth-token=; HttpOnly; Secure; SameSite=Strict; Max-Age=0; Path=/');
  
  return response;
}