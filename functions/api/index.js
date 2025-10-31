export async function onRequestGet({ env }) {
  const result = await env.DB.prepare("SELECT * FROM products").all();
  return new Response(JSON.stringify(result.results), {
    headers: { "Content-Type": "application/json" }
  });
}
