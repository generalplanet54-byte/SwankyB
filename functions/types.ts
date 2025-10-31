/**
 * Type definitions for Cloudflare Pages Functions
 */

export interface CloudflareEnv {
  DB?: D1Database;
  JWT_SECRET?: string;
  [key: string]: unknown;
}

export interface CloudflareContext {
  request: Request;
  env: CloudflareEnv;
  params: Record<string, string>;
  waitUntil: (promise: Promise<unknown>) => void;
  next: () => Promise<Response>;
  data: Record<string, unknown>;
}

export interface PagesFunction {
  (context: CloudflareContext): Promise<Response> | Response;
}
