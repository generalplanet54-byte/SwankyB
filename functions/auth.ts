import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-super-secret-jwt-key-change-in-production'
);

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
    passwordHash: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj/VcSAg/9qm', // P@ssW#rd
    role: 'admin',
    createdAt: new Date().toISOString(),
    failedAttempts: 0
  }
];

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createJWT(payload: any): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

export async function verifyJWT(token: string): Promise<any> {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw new Error('Invalid token');
  }
}

export async function authenticateUser(username: string, password: string): Promise<User | null> {
  const user = users.find(u => u.username === username);
  
  if (!user) {
    return null;
  }
  
  // Check if account is locked
  if (user.lockedUntil && new Date(user.lockedUntil) > new Date()) {
    throw new Error('Account is temporarily locked due to too many failed attempts');
  }
  
  const isValid = await verifyPassword(password, user.passwordHash);
  
  if (!isValid) {
    // Increment failed attempts
    user.failedAttempts += 1;
    
    // Lock account after 5 failed attempts for 15 minutes
    if (user.failedAttempts >= 5) {
      user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    }
    
    return null;
  }
  
  // Reset failed attempts on successful login
  user.failedAttempts = 0;
  user.lockedUntil = undefined;
  user.lastLogin = new Date().toISOString();
  
  return user;
}

export async function changePassword(userId: string, currentPassword: string, newPassword: string): Promise<boolean> {
  const user = users.find(u => u.id === userId);
  
  if (!user) {
    return false;
  }
  
  const isCurrentValid = await verifyPassword(currentPassword, user.passwordHash);
  
  if (!isCurrentValid) {
    return false;
  }
  
  user.passwordHash = await hashPassword(newPassword);
  return true;
}

// Rate limiting for password reset requests
const resetAttempts = new Map<string, { count: number; lastAttempt: number }>();

export async function requestPasswordReset(email: string): Promise<boolean> {
  const now = Date.now();
  const attempts = resetAttempts.get(email) || { count: 0, lastAttempt: 0 };
  
  // Reset counter if more than 1 hour has passed
  if (now - attempts.lastAttempt > 60 * 60 * 1000) {
    attempts.count = 0;
  }
  
  // Limit to 3 reset requests per hour
  if (attempts.count >= 3) {
    throw new Error('Too many password reset requests. Please try again later.');
  }
  
  attempts.count += 1;
  attempts.lastAttempt = now;
  resetAttempts.set(email, attempts);
  
  const user = users.find(u => u.email === email);
  
  if (!user) {
    // Don't reveal if email exists
    return true;
  }
  
  // In production, send email with reset token
  console.log(`Password reset requested for ${email}`);
  
  return true;
}