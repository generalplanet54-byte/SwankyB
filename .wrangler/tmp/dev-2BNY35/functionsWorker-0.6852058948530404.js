var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// .wrangler/tmp/pages-p1CKy1/functionsWorker-0.6852058948530404.mjs
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var JWT_SECRET = "";
function setJWTSecret(secret) {
  JWT_SECRET = secret;
}
__name(setJWTSecret, "setJWTSecret");
__name2(setJWTSecret, "setJWTSecret");
var users = [
  {
    id: "1",
    username: "netmin",
    email: "admin@swankyboyz.com",
    // SHA-256 hash of "P@ssW#rd" for demo
    // NOTE: corrected SHA-256 (base64) for password "P@ssW#rd"
    passwordHash: "CHoFpVm3FNu8THh/uHxYNqpGRl0I4larqXg6A7e9Mec=",
    role: "admin",
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    failedAttempts: 0
  }
];
function toBase64(input) {
  const base64 = btoa(String.fromCharCode(...new Uint8Array(input)));
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
}
__name(toBase64, "toBase64");
__name2(toBase64, "toBase64");
function fromBase64(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  const binary = atob(base64);
  const len = binary.length;
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}
__name(fromBase64, "fromBase64");
__name2(fromBase64, "fromBase64");
async function hashPassword(password) {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return toBase64(hashBuffer);
}
__name(hashPassword, "hashPassword");
__name2(hashPassword, "hashPassword");
async function verifyPassword(password, hash) {
  const hashed = await hashPassword(password);
  return hashed === hash;
}
__name(verifyPassword, "verifyPassword");
__name2(verifyPassword, "verifyPassword");
async function getKey(secret, usage) {
  if (!secret) throw new Error("JWT_SECRET is not set");
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}
__name(getKey, "getKey");
__name2(getKey, "getKey");
async function createJWT(payload) {
  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1e3);
  const exp = iat + 24 * 60 * 60;
  const body = { ...payload, iat, exp };
  const headerB64 = btoa(JSON.stringify(header)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const bodyB64 = btoa(JSON.stringify(body)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "");
  const unsigned = `${headerB64}.${bodyB64}`;
  const key = await getKey(JWT_SECRET, "sign");
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(unsigned));
  const signatureBase64 = toBase64(signature);
  return `${unsigned}.${signatureBase64}`;
}
__name(createJWT, "createJWT");
__name2(createJWT, "createJWT");
async function verifyJWT(token) {
  const [headerB64, bodyB64, signatureB64] = token.split(".");
  if (!headerB64 || !bodyB64 || !signatureB64) {
    throw new Error("Invalid token format");
  }
  const unsigned = `${headerB64}.${bodyB64}`;
  const key = await getKey(JWT_SECRET, "verify");
  const valid = await crypto.subtle.verify(
    "HMAC",
    key,
    fromBase64(signatureB64),
    new TextEncoder().encode(unsigned)
  );
  if (!valid) throw new Error("Invalid token");
  let bodyBase64 = bodyB64.replace(/-/g, "+").replace(/_/g, "/");
  while (bodyBase64.length % 4) {
    bodyBase64 += "=";
  }
  const body = JSON.parse(atob(bodyBase64));
  if (body.exp && Date.now() / 1e3 > body.exp) {
    throw new Error("Token expired");
  }
  return body;
}
__name(verifyJWT, "verifyJWT");
__name2(verifyJWT, "verifyJWT");
async function authenticateUser(username, password) {
  const user = users.find((u) => u.username === username);
  if (!user) return null;
  if (user.lockedUntil && new Date(user.lockedUntil) > /* @__PURE__ */ new Date()) {
    throw new Error("Account is temporarily locked due to too many failed attempts");
  }
  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    user.failedAttempts += 1;
    if (user.failedAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1e3).toISOString();
    }
    return null;
  }
  user.failedAttempts = 0;
  user.lockedUntil = void 0;
  user.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
  return user;
}
__name(authenticateUser, "authenticateUser");
__name2(authenticateUser, "authenticateUser");
async function changePassword(userId, currentPassword, newPassword) {
  const user = users.find((u) => u.id === userId);
  if (!user) return false;
  const isCurrentValid = await verifyPassword(currentPassword, user.passwordHash);
  if (!isCurrentValid) return false;
  user.passwordHash = await hashPassword(newPassword);
  return true;
}
__name(changePassword, "changePassword");
__name2(changePassword, "changePassword");
async function onRequestPost(context) {
  setJWTSecret(context.env?.JWT_SECRET || "");
  try {
    const cookieHeader = context.request.headers.get("Cookie");
    if (!cookieHeader) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => cookie.split("="))
    );
    const token = cookies["auth-token"];
    if (!token) {
      return new Response(JSON.stringify({ error: "Not authenticated" }), {
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }
    const payload = await verifyJWT(token);
    const { currentPassword, newPassword } = await context.request.json();
    if (!currentPassword || !newPassword) {
      return new Response(JSON.stringify({ error: "Current and new passwords required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (newPassword.length < 8) {
      return new Response(JSON.stringify({ error: "New password must be at least 8 characters long" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    const success = await changePassword(payload.userId, currentPassword, newPassword);
    if (!success) {
      return new Response(JSON.stringify({ error: "Current password is incorrect" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestPost, "onRequestPost");
__name2(onRequestPost, "onRequestPost");
async function onRequestPost2(context) {
  const { request, env } = context;
  try {
    const body = await request.json().catch(() => ({}));
    const topic = (body.topic || "").toString();
    const category = (body.category || "General").toString();
    if (!topic) {
      return new Response(JSON.stringify({ error: "Topic is required" }), { status: 400, headers: { "Content-Type": "application/json" } });
    }
    const anthropicKey = env.ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY?.value || "";
    if (anthropicKey) {
      try {
        const prompt = `You are an assistant that outputs a JSON object describing a complete SEO-optimized article for the topic: "${topic}" in the category: "${category}". Output only valid JSON with the following fields: title, excerpt, content (HTML string, use semantic tags like <h2>, <p>, <ul>, <li>), seoTitle, seoDescription, tags (array), readTime (e.g., '6 min read'), featuredImage (a URL). Ensure content is at least 6 sections and uses headings. Do not include any extra text outside the JSON.`;
        const res = await fetch("https://api.anthropic.com/v1/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": anthropicKey,
            "anthropic-version": "2023-06-01"
          },
          body: JSON.stringify({
            model: "claude-3-5-haiku-20241022",
            max_tokens: 1200,
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7
          })
        });
        const json = await res.json();
        const contentText = json?.content?.[0]?.text || "";
        let parsed = null;
        try {
          parsed = JSON.parse(contentText);
        } catch (e) {
          parsed = null;
        }
        if (parsed) {
          return new Response(JSON.stringify({ article: parsed }), { status: 200, headers: { "Content-Type": "application/json" } });
        }
      } catch (err) {
        console.error("Anthropic Claude call failed:", err?.message || err);
      }
    }
    const slug = topic.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const readTime = Math.floor(Math.random() * 8) + 4 + " min read";
    const content = `
      <h2>Introduction to ${topic}</h2>
      <p>In this guide, we cover everything you need to know about ${topic} within the ${category} category.</p>
      <h2>Why ${topic} matters</h2>
      <p>Choosing the right ${topic} can improve outcomes and satisfaction. Consider these factors:</p>
      <ul>
        <li>Performance and quality</li>
        <li>Price and value</li>
        <li>Usability and support</li>
      </ul>
      <h2>Top picks</h2>
      <p>Below are our recommended options and what makes them stand out.</p>
      <h2>Buying guide</h2>
      <p>How to choose the best ${topic} for your needs.</p>
      <h2>Conclusion</h2>
      <p>Final thoughts and recommendations for ${topic} buyers.</p>
    `.trim();
    const article = {
      title: `The Ultimate Guide to ${topic}`,
      excerpt: `Everything you need to know about ${topic} in this comprehensive guide.`,
      content,
      seoTitle: `${topic} - Complete Guide & Reviews | SwankyBoyz`,
      seoDescription: `Find the best ${topic} products, expert reviews, and buying tips in our comprehensive guide.`,
      tags: [topic.toLowerCase(), category.toLowerCase(), "guide"],
      readTime,
      featuredImage: `/images/articles/masculine-luxury.svg`,
      category
    };
    return new Response(JSON.stringify({ article }), { status: 200, headers: { "Content-Type": "application/json" } });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message || "Unknown error" }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
}
__name(onRequestPost2, "onRequestPost2");
__name2(onRequestPost2, "onRequestPost");
async function onRequestGet(context) {
  const jwtSecret = context.env?.JWT_SECRET;
  if (!jwtSecret) {
    console.error("[/api/admin/me] JWT_SECRET not configured in environment variables");
    return new Response(JSON.stringify({
      error: "Server configuration error",
      message: "Authentication system not properly configured"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://swankyboyz.com",
        "Access-Control-Allow-Credentials": "true",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
  setJWTSecret(jwtSecret);
  try {
    const cookieHeader = context.request.headers.get("Cookie");
    if (!cookieHeader) {
      console.log("[/api/admin/me] No Cookie header present");
      return new Response(JSON.stringify({
        error: "Not authenticated",
        message: "No authentication cookie found"
      }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://swankyboyz.com",
          "Access-Control-Allow-Credentials": "true",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }
    const cookies = Object.fromEntries(
      cookieHeader.split("; ").map((cookie) => {
        const [key, ...valueParts] = cookie.split("=");
        return [key, valueParts.join("=")];
      })
    );
    const token = cookies["auth-token"];
    if (!token) {
      console.log("[/api/admin/me] auth-token cookie not found");
      return new Response(JSON.stringify({
        error: "Not authenticated",
        message: "Authentication token not found in cookies"
      }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://swankyboyz.com",
          "Access-Control-Allow-Credentials": "true",
          "X-Content-Type-Options": "nosniff"
        }
      });
    }
    const payload = await verifyJWT(token);
    console.log(`[/api/admin/me] Successfully authenticated user: ${payload.username}`);
    return new Response(JSON.stringify({
      user: {
        id: payload.userId,
        username: payload.username,
        role: payload.role
      }
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://swankyboyz.com",
        "Access-Control-Allow-Credentials": "true",
        "X-Content-Type-Options": "nosniff",
        "Cache-Control": "no-store, no-cache, must-revalidate, private"
      }
    });
  } catch (error) {
    console.error("[/api/admin/me] Token verification failed:", error.message);
    return new Response(JSON.stringify({
      error: "Invalid token",
      message: error.message || "Authentication token is invalid or expired"
    }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://swankyboyz.com",
        "Access-Control-Allow-Credentials": "true",
        "X-Content-Type-Options": "nosniff"
      }
    });
  }
}
__name(onRequestGet, "onRequestGet");
__name2(onRequestGet, "onRequestGet");
async function onRequestGet2(context) {
  try {
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({
        error: "Database not configured",
        fallback: true
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = new URL(context.request.url);
    const slug = url.searchParams.get("slug");
    const category = url.searchParams.get("category");
    const limit = parseInt(url.searchParams.get("limit") || "20");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    let query = `
      SELECT 
        a.id,
        a.title,
        a.slug,
        a.excerpt,
        a.content,
        a.featured_image,
        a.author,
        a.meta_title,
        a.meta_description,
        a.focus_keyword,
        a.read_time,
        a.view_count,
        a.published_at,
        a.updated_at,
        c.name as category_name,
        c.slug as category_slug
      FROM articles a
      LEFT JOIN categories c ON a.category_id = c.id
      WHERE a.status = 'published'
    `;
    const params = [];
    if (slug) {
      query += ` AND a.slug = ?`;
      params.push(slug);
    }
    if (category) {
      query += ` AND c.slug = ?`;
      params.push(category);
    }
    query += ` ORDER BY a.published_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);
    const stmt = db.prepare(query);
    const { results } = await stmt.bind(...params).all();
    if (slug && results.length > 0) {
      const articleId = results[0].id;
      const productsStmt = db.prepare(`
        SELECT 
          p.id,
          p.name,
          p.slug,
          p.brand,
          p.description,
          p.primary_image,
          p.price,
          p.original_price,
          p.amazon_url,
          p.rating,
          ap.affiliate_override_url,
          ap.display_order
        FROM products p
        INNER JOIN article_products ap ON p.id = ap.product_id
        WHERE ap.article_id = ?
        ORDER BY ap.display_order
      `);
      const { results: products } = await productsStmt.bind(articleId).all();
      const tagsStmt = db.prepare(`
        SELECT t.name, t.slug
        FROM tags t
        INNER JOIN article_tags at ON t.id = at.tag_id
        WHERE at.article_id = ?
      `);
      const { results: tags } = await tagsStmt.bind(articleId).all();
      results[0].products = products;
      results[0].tags = tags.map((t) => t.name);
    }
    return new Response(JSON.stringify({
      articles: results,
      total: results.length,
      limit,
      offset
    }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=300"
        // Cache for 5 minutes
      }
    });
  } catch (error) {
    console.error("D1 Query Error:", error);
    return new Response(JSON.stringify({
      error: "Database query failed",
      message: error.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet2, "onRequestGet2");
__name2(onRequestGet2, "onRequestGet");
async function onRequestPost3(context) {
  const jwtSecret = context.env?.JWT_SECRET;
  if (!jwtSecret) {
    console.error("[/api/login] JWT_SECRET not configured in environment variables");
    return new Response(JSON.stringify({
      error: "Server configuration error",
      message: "Authentication system not properly configured"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://swankyboyz.com",
        "Access-Control-Allow-Credentials": "true"
      }
    });
  }
  setJWTSecret(jwtSecret);
  try {
    const { username, password } = await context.request.json();
    if (!username || !password) {
      return new Response(JSON.stringify({
        error: "Username and password required",
        message: "Please provide both username and password"
      }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://swankyboyz.com",
          "Access-Control-Allow-Credentials": "true"
        }
      });
    }
    const user = await authenticateUser(username, password);
    if (!user) {
      console.log(`[/api/login] Failed login attempt for username: ${username}`);
      return new Response(JSON.stringify({
        error: "Invalid credentials",
        message: "Username or password is incorrect"
      }), {
        status: 401,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "https://swankyboyz.com",
          "Access-Control-Allow-Credentials": "true"
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
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://swankyboyz.com",
        "Access-Control-Allow-Credentials": "true",
        "X-Content-Type-Options": "nosniff",
        "Referrer-Policy": "strict-origin-when-cross-origin"
      }
    });
    const isProduction = context.request.url.includes("https://");
    const secureCookie = isProduction ? "Secure; " : "";
    response.headers.set(
      "Set-Cookie",
      `auth-token=${token}; HttpOnly; ${secureCookie}SameSite=Strict; Max-Age=86400; Path=/`
    );
    return response;
  } catch (error) {
    console.error("[/api/login] Login error:", error.message);
    return new Response(JSON.stringify({
      error: error.message || "Login failed",
      message: "An error occurred during authentication"
    }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "https://swankyboyz.com",
        "Access-Control-Allow-Credentials": "true"
      }
    });
  }
}
__name(onRequestPost3, "onRequestPost3");
__name2(onRequestPost3, "onRequestPost");
async function onRequestPost4(context) {
  const response = new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
  const isProduction = context.request.url.includes("https://");
  const secureCookie = isProduction ? "Secure; " : "";
  response.headers.set("Set-Cookie", `auth-token=; HttpOnly; ${secureCookie}SameSite=Strict; Max-Age=0; Path=/`);
  return response;
}
__name(onRequestPost4, "onRequestPost4");
__name2(onRequestPost4, "onRequestPost");
async function onRequestGet3(context) {
  try {
    const db = context.env.DB;
    if (!db) {
      return new Response(JSON.stringify({
        error: "Database not configured",
        fallback: true
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const url = new URL(context.request.url);
    const limit = parseInt(url.searchParams.get("limit") || "100");
    const offset = parseInt(url.searchParams.get("offset") || "0");
    let query = `
      SELECT 
        p.id,
        p.name,
        p.slug,
        p.brand,
        p.description,
        p.primary_image,
        p.price,
        p.original_price,
        p.amazon_url,
        p.rating,
        p.review_count,
        p.is_active,
        p.created_at,
        p.updated_at,
        c.name as category
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
    `;
    const params = [limit, offset];
    const stmt = db.prepare(query);
    const { results } = await stmt.bind(...params).all();
    return new Response(JSON.stringify({ products: results }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (e) {
    console.error({
      message: e.message,
      cause: e.cause?.message
    });
    return new Response(JSON.stringify({
      error: "An error occurred while fetching products.",
      details: e.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
__name(onRequestGet3, "onRequestGet3");
__name2(onRequestGet3, "onRequestGet");
var MAX_TEXT_LENGTH = 512;
var sanitizeText = /* @__PURE__ */ __name2((value, limit = MAX_TEXT_LENGTH) => {
  if (typeof value !== "string") return null;
  if (!value.trim()) return null;
  return value.slice(0, limit);
}, "sanitizeText");
var hashIp = /* @__PURE__ */ __name2(async (ip) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(ip);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}, "hashIp");
async function onRequest(context) {
  const { request, env } = context;
  if (request.method !== "POST") {
    return new Response("Method Not Allowed", {
      status: 405,
      headers: { Allow: "POST" }
    });
  }
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Unsupported content type" }), {
      status: 415,
      headers: { "Content-Type": "application/json" }
    });
  }
  let payload = null;
  try {
    payload = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  if (!payload || typeof payload !== "object") {
    return new Response(JSON.stringify({ error: "Missing payload" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const productId = sanitizeText(payload.productId, 120);
  const affiliateUrl = sanitizeText(payload.affiliateUrl, 600);
  if (!productId || !affiliateUrl) {
    return new Response(JSON.stringify({ error: "productId and affiliateUrl are required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }
  const db = env.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: "Database not configured" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  const referer = sanitizeText(request.headers.get("referer"));
  const userAgent = sanitizeText(request.headers.get("user-agent"));
  const source = sanitizeText(payload.source, 150);
  const productName = sanitizeText(payload.productName, 200);
  const productUrl = sanitizeText(payload.productUrl, 600);
  const ip = request.headers.get("CF-Connecting-IP");
  const ipHash = ip ? await hashIp(ip) : null;
  try {
    const stmt = db.prepare(`
      INSERT INTO affiliate_clicks (
        product_id, product_name, product_url, affiliate_url, 
        click_source, referer, user_agent, ip_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    await stmt.bind(
      productId,
      productName,
      productUrl,
      affiliateUrl,
      source,
      referer,
      userAgent,
      ipHash
    ).run();
  } catch (error) {
    return new Response(JSON.stringify({ error: String(error.message || error) }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ success: true }), {
    status: 204
  });
}
__name(onRequest, "onRequest");
__name2(onRequest, "onRequest");
var MAX_TEXT_LENGTH2 = 512;
var EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
var sanitizeText2 = /* @__PURE__ */ __name2((value, limit = MAX_TEXT_LENGTH2) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  return trimmed.slice(0, limit);
}, "sanitizeText");
var validateEmail = /* @__PURE__ */ __name2((email) => {
  if (!email || typeof email !== "string") return false;
  if (email.length > 254) return false;
  return EMAIL_REGEX.test(email.toLowerCase());
}, "validateEmail");
var sendToEmailService = /* @__PURE__ */ __name2(async (email, payload, env) => {
  const SERVICE = env.EMAIL_SERVICE || "konvertkit";
  const API_KEY = env.EMAIL_SERVICE_API_KEY;
  const API_URL = env.EMAIL_SERVICE_API_URL;
  if (!API_KEY || !API_URL) {
    console.warn("Email service not configured, storing locally only");
    return { success: true };
  }
  try {
    if (SERVICE === "konvertkit") {
      const response = await fetch(`${API_URL}/subscribers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          subscriber: {
            email: email.toLowerCase(),
            first_name: payload.firstName,
            last_name: payload.lastName,
            fields: {
              source: payload.source || "website",
              source_page: payload.sourcePage,
              product_interests: payload.categories?.join(",")
            }
          }
        })
      });
      if (!response.ok) {
        const error = await response.text();
        return { success: false, error: `ConvertKit error: ${error}` };
      }
      const data = await response.json();
      return {
        success: true,
        externalId: data.subscriber?.id?.toString()
      };
    }
    if (SERVICE === "klaviyo") {
      const response = await fetch(`${API_URL}/people`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Klaviyo-API-Key ${API_KEY}`
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          properties: {
            firstName: payload.firstName,
            lastName: payload.lastName,
            source: payload.source || "website",
            sourcePage: payload.sourcePage,
            productInterests: payload.categories?.join(",")
          }
        })
      });
      if (!response.ok) {
        const error = await response.text();
        return { success: false, error: `Klaviyo error: ${error}` };
      }
      const data = await response.json();
      return {
        success: true,
        externalId: data.id
      };
    }
    if (SERVICE === "sendgrid") {
      const response = await fetch(`${API_URL}/contacts`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          contacts: [
            {
              email: email.toLowerCase(),
              first_name: payload.firstName,
              last_name: payload.lastName,
              custom_fields: {
                e1_T: payload.source || "website",
                e2_T: payload.sourcePage,
                e3_T: payload.categories?.join(",")
              }
            }
          ]
        })
      });
      if (!response.ok) {
        const error = await response.text();
        return { success: false, error: `SendGrid error: ${error}` };
      }
      return { success: true };
    }
    return { success: false, error: `Unknown email service: ${SERVICE}` };
  } catch (error) {
    return { success: false, error: `Email service error: ${String(error.message || error)}` };
  }
}, "sendToEmailService");
async function onRequest2(context) {
  const { request, env } = context;
  if (request.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
        "Access-Control-Max-Age": "86400"
      }
    });
  }
  const contentType = request.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) {
    return new Response(JSON.stringify({ error: "Unsupported content type" }), {
      status: 415,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  let payload = null;
  try {
    payload = await request.json();
  } catch (error) {
    return new Response(JSON.stringify({ error: "Invalid JSON payload" }), {
      status: 400,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  const db = env.DB;
  if (!db) {
    return new Response(JSON.stringify({ error: "Database not configured" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      }
    });
  }
  if (request.method === "POST") {
    const email = sanitizeText2(payload.email);
    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    const firstName = sanitizeText2(payload.firstName, 100);
    const lastName = sanitizeText2(payload.lastName, 100);
    const source = sanitizeText2(payload.source, 100) || "website";
    const sourcePage = sanitizeText2(payload.sourcePage, 500);
    const categories = Array.isArray(payload.categories) ? payload.categories.slice(0, 10).map((c) => sanitizeText2(c, 50)).filter(Boolean) : [];
    const consent = payload.consent === true;
    const ip = request.headers.get("CF-Connecting-IP");
    const userAgent = sanitizeText2(request.headers.get("user-agent"));
    try {
      const existingCheck = db.prepare("SELECT id, status FROM newsletter_subscribers WHERE email = ?");
      const existing = await existingCheck.bind(email.toLowerCase()).first();
      if (existing) {
        if (existing.status === "unsubscribed") {
          const updateStmt = db.prepare(`
            UPDATE newsletter_subscribers 
            SET status = 'active', 
                first_name = COALESCE(?, first_name),
                last_name = COALESCE(?, last_name),
                product_categories = ?,
                updated_at = CURRENT_TIMESTAMP,
                marketing_consent = ?,
                consent_timestamp = CURRENT_TIMESTAMP
            WHERE email = ?
          `);
          await updateStmt.bind(
            firstName,
            lastName,
            categories.length > 0 ? JSON.stringify(categories) : null,
            consent ? 1 : 0,
            email.toLowerCase()
          ).run();
        } else {
          return new Response(JSON.stringify({ success: true, status: "already_subscribed" }), {
            status: 200,
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*"
            }
          });
        }
      } else {
        const insertStmt = db.prepare(`
          INSERT INTO newsletter_subscribers (
            email, first_name, last_name, source, subscription_source_page,
            product_categories, status, marketing_consent, consent_timestamp,
            signup_ip_address, signup_user_agent, consent_ip_address
          ) VALUES (?, ?, ?, ?, ?, ?, 'active', ?, CURRENT_TIMESTAMP, ?, ?, ?)
        `);
        await insertStmt.bind(
          email.toLowerCase(),
          firstName,
          lastName,
          source,
          sourcePage,
          categories.length > 0 ? JSON.stringify(categories) : null,
          consent ? 1 : 0,
          ip,
          userAgent,
          ip
        ).run();
      }
      const emailServiceResult = await sendToEmailService(email.toLowerCase(), payload, env);
      if (emailServiceResult.success && emailServiceResult.externalId) {
        const updateExternalStmt = db.prepare(`
          UPDATE newsletter_subscribers 
          SET external_id = ?, external_service = ?
          WHERE email = ?
        `);
        await updateExternalStmt.bind(emailServiceResult.externalId, env.EMAIL_SERVICE || "konvertkit", email.toLowerCase()).run();
      }
      return new Response(JSON.stringify({ success: true, status: "subscribed" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      return new Response(
        JSON.stringify({ error: `Subscription error: ${String(error.message || error)}` }),
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
          }
        }
      );
    }
  }
  if (request.method === "DELETE") {
    const email = sanitizeText2(payload.email);
    const reason = sanitizeText2(payload.reason, 500);
    if (!email || !validateEmail(email)) {
      return new Response(JSON.stringify({ error: "Invalid email address" }), {
        status: 400,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
    try {
      const unsubscribeStmt = db.prepare(`
        UPDATE newsletter_subscribers 
        SET status = 'unsubscribed', 
            updated_at = CURRENT_TIMESTAMP
        WHERE email = ?
      `);
      await unsubscribeStmt.bind(email.toLowerCase()).run();
      if (reason) {
        console.log(`Unsubscribe reason for ${email}: ${reason}`);
      }
      return new Response(JSON.stringify({ success: true, status: "unsubscribed" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    } catch (error) {
      console.error("Unsubscribe error:", error);
      return new Response(JSON.stringify({ error: `Unsubscribe error: ${String(error.message || error)}` }), {
        status: 500,
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        }
      });
    }
  }
  return new Response(JSON.stringify({ error: "Method not allowed" }), {
    status: 405,
    headers: {
      "Content-Type": "application/json",
      "Allow": "POST, DELETE, OPTIONS",
      "Access-Control-Allow-Origin": "*"
    }
  });
}
__name(onRequest2, "onRequest2");
__name2(onRequest2, "onRequest");
var onRequest3 = /* @__PURE__ */ __name2(async (context) => {
  const { request } = context;
  const url = new URL(request.url);
  const siteInfo = {
    name: "SwankyBoyz",
    url: "https://swankyboyz.com",
    description: "Premium product reviews, lifestyle guides, and expert recommendations for modern men",
    type: "blog",
    language: "en",
    lastUpdated: (/* @__PURE__ */ new Date()).toISOString(),
    sections: {
      homepage: "https://swankyboyz.com/",
      articles: "https://swankyboyz.com/articles",
      categories: [
        "https://swankyboyz.com/category/skincare",
        "https://swankyboyz.com/category/audio",
        "https://swankyboyz.com/category/accessories",
        "https://swankyboyz.com/category/fragrance",
        "https://swankyboyz.com/category/grooming"
      ]
    },
    sitemap: "https://swankyboyz.com/sitemap.xml",
    robots: "https://swankyboyz.com/robots.txt",
    accessible: true,
    crawlable: true
  };
  return new Response(JSON.stringify(siteInfo, null, 2), {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
      "Cache-Control": "public, max-age=3600"
    }
  });
}, "onRequest");
async function onRequestGet4({ env }) {
  const result = await env.DB.prepare("SELECT * FROM products").all();
  return new Response(JSON.stringify(result.results), {
    headers: { "Content-Type": "application/json" }
  });
}
__name(onRequestGet4, "onRequestGet4");
__name2(onRequestGet4, "onRequestGet");
var routes = [
  {
    routePath: "/api/admin/change-password",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost]
  },
  {
    routePath: "/api/admin/generate-article",
    mountPath: "/api/admin",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost2]
  },
  {
    routePath: "/api/admin/me",
    mountPath: "/api/admin",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet]
  },
  {
    routePath: "/api/articles-d1",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet2]
  },
  {
    routePath: "/api/login",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost3]
  },
  {
    routePath: "/api/logout",
    mountPath: "/api",
    method: "POST",
    middlewares: [],
    modules: [onRequestPost4]
  },
  {
    routePath: "/api/products-d1",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet3]
  },
  {
    routePath: "/api/affiliate-click",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest]
  },
  {
    routePath: "/api/newsletter",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest2]
  },
  {
    routePath: "/api/site-info",
    mountPath: "/api",
    method: "",
    middlewares: [],
    modules: [onRequest3]
  },
  {
    routePath: "/api",
    mountPath: "/api",
    method: "GET",
    middlewares: [],
    modules: [onRequestGet4]
  }
];
function lexer(str) {
  var tokens = [];
  var i = 0;
  while (i < str.length) {
    var char = str[i];
    if (char === "*" || char === "+" || char === "?") {
      tokens.push({ type: "MODIFIER", index: i, value: str[i++] });
      continue;
    }
    if (char === "\\") {
      tokens.push({ type: "ESCAPED_CHAR", index: i++, value: str[i++] });
      continue;
    }
    if (char === "{") {
      tokens.push({ type: "OPEN", index: i, value: str[i++] });
      continue;
    }
    if (char === "}") {
      tokens.push({ type: "CLOSE", index: i, value: str[i++] });
      continue;
    }
    if (char === ":") {
      var name = "";
      var j = i + 1;
      while (j < str.length) {
        var code = str.charCodeAt(j);
        if (
          // `0-9`
          code >= 48 && code <= 57 || // `A-Z`
          code >= 65 && code <= 90 || // `a-z`
          code >= 97 && code <= 122 || // `_`
          code === 95
        ) {
          name += str[j++];
          continue;
        }
        break;
      }
      if (!name)
        throw new TypeError("Missing parameter name at ".concat(i));
      tokens.push({ type: "NAME", index: i, value: name });
      i = j;
      continue;
    }
    if (char === "(") {
      var count = 1;
      var pattern = "";
      var j = i + 1;
      if (str[j] === "?") {
        throw new TypeError('Pattern cannot start with "?" at '.concat(j));
      }
      while (j < str.length) {
        if (str[j] === "\\") {
          pattern += str[j++] + str[j++];
          continue;
        }
        if (str[j] === ")") {
          count--;
          if (count === 0) {
            j++;
            break;
          }
        } else if (str[j] === "(") {
          count++;
          if (str[j + 1] !== "?") {
            throw new TypeError("Capturing groups are not allowed at ".concat(j));
          }
        }
        pattern += str[j++];
      }
      if (count)
        throw new TypeError("Unbalanced pattern at ".concat(i));
      if (!pattern)
        throw new TypeError("Missing pattern at ".concat(i));
      tokens.push({ type: "PATTERN", index: i, value: pattern });
      i = j;
      continue;
    }
    tokens.push({ type: "CHAR", index: i, value: str[i++] });
  }
  tokens.push({ type: "END", index: i, value: "" });
  return tokens;
}
__name(lexer, "lexer");
__name2(lexer, "lexer");
function parse(str, options) {
  if (options === void 0) {
    options = {};
  }
  var tokens = lexer(str);
  var _a = options.prefixes, prefixes = _a === void 0 ? "./" : _a, _b = options.delimiter, delimiter = _b === void 0 ? "/#?" : _b;
  var result = [];
  var key = 0;
  var i = 0;
  var path = "";
  var tryConsume = /* @__PURE__ */ __name2(function(type) {
    if (i < tokens.length && tokens[i].type === type)
      return tokens[i++].value;
  }, "tryConsume");
  var mustConsume = /* @__PURE__ */ __name2(function(type) {
    var value2 = tryConsume(type);
    if (value2 !== void 0)
      return value2;
    var _a2 = tokens[i], nextType = _a2.type, index = _a2.index;
    throw new TypeError("Unexpected ".concat(nextType, " at ").concat(index, ", expected ").concat(type));
  }, "mustConsume");
  var consumeText = /* @__PURE__ */ __name2(function() {
    var result2 = "";
    var value2;
    while (value2 = tryConsume("CHAR") || tryConsume("ESCAPED_CHAR")) {
      result2 += value2;
    }
    return result2;
  }, "consumeText");
  var isSafe = /* @__PURE__ */ __name2(function(value2) {
    for (var _i = 0, delimiter_1 = delimiter; _i < delimiter_1.length; _i++) {
      var char2 = delimiter_1[_i];
      if (value2.indexOf(char2) > -1)
        return true;
    }
    return false;
  }, "isSafe");
  var safePattern = /* @__PURE__ */ __name2(function(prefix2) {
    var prev = result[result.length - 1];
    var prevText = prefix2 || (prev && typeof prev === "string" ? prev : "");
    if (prev && !prevText) {
      throw new TypeError('Must have text between two parameters, missing text after "'.concat(prev.name, '"'));
    }
    if (!prevText || isSafe(prevText))
      return "[^".concat(escapeString(delimiter), "]+?");
    return "(?:(?!".concat(escapeString(prevText), ")[^").concat(escapeString(delimiter), "])+?");
  }, "safePattern");
  while (i < tokens.length) {
    var char = tryConsume("CHAR");
    var name = tryConsume("NAME");
    var pattern = tryConsume("PATTERN");
    if (name || pattern) {
      var prefix = char || "";
      if (prefixes.indexOf(prefix) === -1) {
        path += prefix;
        prefix = "";
      }
      if (path) {
        result.push(path);
        path = "";
      }
      result.push({
        name: name || key++,
        prefix,
        suffix: "",
        pattern: pattern || safePattern(prefix),
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    var value = char || tryConsume("ESCAPED_CHAR");
    if (value) {
      path += value;
      continue;
    }
    if (path) {
      result.push(path);
      path = "";
    }
    var open = tryConsume("OPEN");
    if (open) {
      var prefix = consumeText();
      var name_1 = tryConsume("NAME") || "";
      var pattern_1 = tryConsume("PATTERN") || "";
      var suffix = consumeText();
      mustConsume("CLOSE");
      result.push({
        name: name_1 || (pattern_1 ? key++ : ""),
        pattern: name_1 && !pattern_1 ? safePattern(prefix) : pattern_1,
        prefix,
        suffix,
        modifier: tryConsume("MODIFIER") || ""
      });
      continue;
    }
    mustConsume("END");
  }
  return result;
}
__name(parse, "parse");
__name2(parse, "parse");
function match(str, options) {
  var keys = [];
  var re = pathToRegexp(str, keys, options);
  return regexpToFunction(re, keys, options);
}
__name(match, "match");
__name2(match, "match");
function regexpToFunction(re, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.decode, decode = _a === void 0 ? function(x) {
    return x;
  } : _a;
  return function(pathname) {
    var m = re.exec(pathname);
    if (!m)
      return false;
    var path = m[0], index = m.index;
    var params = /* @__PURE__ */ Object.create(null);
    var _loop_1 = /* @__PURE__ */ __name2(function(i2) {
      if (m[i2] === void 0)
        return "continue";
      var key = keys[i2 - 1];
      if (key.modifier === "*" || key.modifier === "+") {
        params[key.name] = m[i2].split(key.prefix + key.suffix).map(function(value) {
          return decode(value, key);
        });
      } else {
        params[key.name] = decode(m[i2], key);
      }
    }, "_loop_1");
    for (var i = 1; i < m.length; i++) {
      _loop_1(i);
    }
    return { path, index, params };
  };
}
__name(regexpToFunction, "regexpToFunction");
__name2(regexpToFunction, "regexpToFunction");
function escapeString(str) {
  return str.replace(/([.+*?=^!:${}()[\]|/\\])/g, "\\$1");
}
__name(escapeString, "escapeString");
__name2(escapeString, "escapeString");
function flags(options) {
  return options && options.sensitive ? "" : "i";
}
__name(flags, "flags");
__name2(flags, "flags");
function regexpToRegexp(path, keys) {
  if (!keys)
    return path;
  var groupsRegex = /\((?:\?<(.*?)>)?(?!\?)/g;
  var index = 0;
  var execResult = groupsRegex.exec(path.source);
  while (execResult) {
    keys.push({
      // Use parenthesized substring match if available, index otherwise
      name: execResult[1] || index++,
      prefix: "",
      suffix: "",
      modifier: "",
      pattern: ""
    });
    execResult = groupsRegex.exec(path.source);
  }
  return path;
}
__name(regexpToRegexp, "regexpToRegexp");
__name2(regexpToRegexp, "regexpToRegexp");
function arrayToRegexp(paths, keys, options) {
  var parts = paths.map(function(path) {
    return pathToRegexp(path, keys, options).source;
  });
  return new RegExp("(?:".concat(parts.join("|"), ")"), flags(options));
}
__name(arrayToRegexp, "arrayToRegexp");
__name2(arrayToRegexp, "arrayToRegexp");
function stringToRegexp(path, keys, options) {
  return tokensToRegexp(parse(path, options), keys, options);
}
__name(stringToRegexp, "stringToRegexp");
__name2(stringToRegexp, "stringToRegexp");
function tokensToRegexp(tokens, keys, options) {
  if (options === void 0) {
    options = {};
  }
  var _a = options.strict, strict = _a === void 0 ? false : _a, _b = options.start, start = _b === void 0 ? true : _b, _c = options.end, end = _c === void 0 ? true : _c, _d = options.encode, encode = _d === void 0 ? function(x) {
    return x;
  } : _d, _e = options.delimiter, delimiter = _e === void 0 ? "/#?" : _e, _f = options.endsWith, endsWith = _f === void 0 ? "" : _f;
  var endsWithRe = "[".concat(escapeString(endsWith), "]|$");
  var delimiterRe = "[".concat(escapeString(delimiter), "]");
  var route = start ? "^" : "";
  for (var _i = 0, tokens_1 = tokens; _i < tokens_1.length; _i++) {
    var token = tokens_1[_i];
    if (typeof token === "string") {
      route += escapeString(encode(token));
    } else {
      var prefix = escapeString(encode(token.prefix));
      var suffix = escapeString(encode(token.suffix));
      if (token.pattern) {
        if (keys)
          keys.push(token);
        if (prefix || suffix) {
          if (token.modifier === "+" || token.modifier === "*") {
            var mod = token.modifier === "*" ? "?" : "";
            route += "(?:".concat(prefix, "((?:").concat(token.pattern, ")(?:").concat(suffix).concat(prefix, "(?:").concat(token.pattern, "))*)").concat(suffix, ")").concat(mod);
          } else {
            route += "(?:".concat(prefix, "(").concat(token.pattern, ")").concat(suffix, ")").concat(token.modifier);
          }
        } else {
          if (token.modifier === "+" || token.modifier === "*") {
            throw new TypeError('Can not repeat "'.concat(token.name, '" without a prefix and suffix'));
          }
          route += "(".concat(token.pattern, ")").concat(token.modifier);
        }
      } else {
        route += "(?:".concat(prefix).concat(suffix, ")").concat(token.modifier);
      }
    }
  }
  if (end) {
    if (!strict)
      route += "".concat(delimiterRe, "?");
    route += !options.endsWith ? "$" : "(?=".concat(endsWithRe, ")");
  } else {
    var endToken = tokens[tokens.length - 1];
    var isEndDelimited = typeof endToken === "string" ? delimiterRe.indexOf(endToken[endToken.length - 1]) > -1 : endToken === void 0;
    if (!strict) {
      route += "(?:".concat(delimiterRe, "(?=").concat(endsWithRe, "))?");
    }
    if (!isEndDelimited) {
      route += "(?=".concat(delimiterRe, "|").concat(endsWithRe, ")");
    }
  }
  return new RegExp(route, flags(options));
}
__name(tokensToRegexp, "tokensToRegexp");
__name2(tokensToRegexp, "tokensToRegexp");
function pathToRegexp(path, keys, options) {
  if (path instanceof RegExp)
    return regexpToRegexp(path, keys);
  if (Array.isArray(path))
    return arrayToRegexp(path, keys, options);
  return stringToRegexp(path, keys, options);
}
__name(pathToRegexp, "pathToRegexp");
__name2(pathToRegexp, "pathToRegexp");
var escapeRegex = /[.+?^${}()|[\]\\]/g;
function* executeRequest(request) {
  const requestPath = new URL(request.url).pathname;
  for (const route of [...routes].reverse()) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult) {
      for (const handler of route.middlewares.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: mountMatchResult.path
        };
      }
    }
  }
  for (const route of routes) {
    if (route.method && route.method !== request.method) {
      continue;
    }
    const routeMatcher = match(route.routePath.replace(escapeRegex, "\\$&"), {
      end: true
    });
    const mountMatcher = match(route.mountPath.replace(escapeRegex, "\\$&"), {
      end: false
    });
    const matchResult = routeMatcher(requestPath);
    const mountMatchResult = mountMatcher(requestPath);
    if (matchResult && mountMatchResult && route.modules.length) {
      for (const handler of route.modules.flat()) {
        yield {
          handler,
          params: matchResult.params,
          path: matchResult.path
        };
      }
      break;
    }
  }
}
__name(executeRequest, "executeRequest");
__name2(executeRequest, "executeRequest");
var pages_template_worker_default = {
  async fetch(originalRequest, env, workerContext) {
    let request = originalRequest;
    const handlerIterator = executeRequest(request);
    let data = {};
    let isFailOpen = false;
    const next = /* @__PURE__ */ __name2(async (input, init) => {
      if (input !== void 0) {
        let url = input;
        if (typeof input === "string") {
          url = new URL(input, request.url).toString();
        }
        request = new Request(url, init);
      }
      const result = handlerIterator.next();
      if (result.done === false) {
        const { handler, params, path } = result.value;
        const context = {
          request: new Request(request.clone()),
          functionPath: path,
          next,
          params,
          get data() {
            return data;
          },
          set data(value) {
            if (typeof value !== "object" || value === null) {
              throw new Error("context.data must be an object");
            }
            data = value;
          },
          env,
          waitUntil: workerContext.waitUntil.bind(workerContext),
          passThroughOnException: /* @__PURE__ */ __name2(() => {
            isFailOpen = true;
          }, "passThroughOnException")
        };
        const response = await handler(context);
        if (!(response instanceof Response)) {
          throw new Error("Your Pages function should return a Response");
        }
        return cloneResponse(response);
      } else if ("ASSETS") {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      } else {
        const response = await fetch(request);
        return cloneResponse(response);
      }
    }, "next");
    try {
      return await next();
    } catch (error) {
      if (isFailOpen) {
        const response = await env["ASSETS"].fetch(request);
        return cloneResponse(response);
      }
      throw error;
    }
  }
};
var cloneResponse = /* @__PURE__ */ __name2((response) => (
  // https://fetch.spec.whatwg.org/#null-body-status
  new Response(
    [101, 204, 205, 304].includes(response.status) ? null : response.body,
    response
  )
), "cloneResponse");
var drainBody = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = pages_template_worker_default;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env);
  } catch (e) {
    const error = reduceError2(e);
    return Response.json(error, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-t6C6ZJ/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = middleware_loader_entry_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-t6C6ZJ/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env, ctx) => {
      this.env = env;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=functionsWorker-0.6852058948530404.js.map
