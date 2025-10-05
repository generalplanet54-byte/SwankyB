

// JWT_SECRET will be set in each function handler from env
let JWT_SECRET: string = '';
export function setJWTSecret(secret: string) {
  JWT_SECRET = secret;
}


interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  role: 'admin';
  createdAt: string;
  lastLogin?: string;
  failedAttempts: number;
  lockedUntil?: string;
}

// In production, this would be stored in a database
const users: User[] = [
  {
    id: '1',
    username: 'netmin',
    email: 'admin@swankyboyz.com',
    // SHA-256 hash of "P@ssW#rd" for demo
    passwordHash: 'uYF5wD5fEEMdPfZ0SP5n1ArZpK6CxYqHwBYF9KfxwzE=', 
    role: 'admin',
    createdAt: new Date().toISOString(),
    failedAttempts: 0
  }
];

/**
 * Utility: base64 encode/decode
 */
function toBase64(input: ArrayBuffer): string {
  return btoa(String.fromCharCode(...new Uint8Array(input)));
}
function fromBase64(str: string): ArrayBuffer {
  const binary = atob(str);
  const len = binary.length;
  const buffer = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}

/**
 * Password hashing & verification (WebCrypto)
 */
export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return toBase64(hashBuffer);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  const hashed = await hashPassword(password);
  return hashed === hash;
}

/**
 * JWT signing & verification (HS256, WebCrypto)
 */
async function getKey(secret: string, usage: KeyUsage): Promise<CryptoKey> {
  if (!secret) throw new Error('JWT_SECRET is not set');
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    [usage]
  );
}

export async function createJWT(payload: Record<string, any>): Promise<string> {
  const header = { alg: "HS256", typ: "JWT" };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 24 * 60 * 60; // 24h expiry

  const body = { ...payload, iat, exp };

  const unsigned = 
    btoa(JSON.stringify(header)) + "." + 
    btoa(JSON.stringify(body));

  const key = await getKey(JWT_SECRET, "sign");
  const signature = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(unsigned));
  const signatureBase64 = toBase64(signature);

  return `${unsigned}.${signatureBase64}`;
}

export async function verifyJWT(token: string): Promise<any> {
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

  const body = JSON.parse(atob(bodyB64));
  if (body.exp && Date.now() / 1000 > body.exp) {
    throw new Error("Token expired");
  }

  return body;
}

/**
 * User authentication
 */
export async function authenticateUser(username: string, password: string): Promise<User | null> {
  const user = users.find(u => u.username === username);
  if (!user) return null;

  // Check lock
  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    throw new Error("Account is temporarily locked due to too many failed attempts");
  }

  const isValid = await verifyPassword(password, user.passwordHash);
  if (!isValid) {
    user.failedAttempts += 1;
    if (user.failedAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    }
    return null;
  }

  user.failedAttempts = 0;
  user.lockedUntil = undefined;
  user.lastLogin = new Date().toISOString();
  return user;
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
  const user = users.find(u => u.id === userId);
  if (!user) return false;

  const isCurrentValid = await verifyPassword(currentPassword, user.passwordHash);
  if (!isCurrentValid) return false;

  user.passwordHash = await hashPassword(newPassword);
  return true;
}

/**
 * Password reset rate limiting
 */
const resetAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function requestPasswordReset(email: string): Promise<boolean> {
  const now = Date.now();
  const attempts = resetAttempts.get(email) || { count: 0, lastAttempt: 0 };

  if (now - attempts.lastAttempt > 60 * 60 * 1000) {
    attempts.count = 0;
  }

  if (attempts.count >= 3) {
    throw new Error("Too many password reset requests. Please try again later.");
  }

  attempts.count += 1;
  attempts.lastAttempt = now;
  resetAttempts.set(email, attempts);

  const user = users.find(u => u.email === email);
  if (!user) {
    return true; // Don't reveal if email exists
  }

  // In production, send reset token email
  console.log(`Password reset requested for ${email}`);
  return true;
}
