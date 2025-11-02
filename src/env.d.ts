/// <reference path="../.astro/types.d.ts" />

interface Window {
  gtag?: (command: string, action: string, params?: Record<string, any>) => void;
}

// Type definitions for Cloudflare runtime in Astro
declare namespace App {
  interface Locals {
    runtime: {
      env: {
        DB: D1Database;
        [key: string]: any;
      };
      cf: CfProperties;
      ctx: ExecutionContext;
    };
  }
}

// Cloudflare D1 types
interface D1Database {
  prepare(query: string): D1PreparedStatement;
  dump(): Promise<ArrayBuffer>;
  batch<T = unknown>(statements: D1PreparedStatement[]): Promise<D1Result<T>[]>;
  exec(query: string): Promise<D1ExecResult>;
}

interface D1PreparedStatement {
  bind(...values: any[]): D1PreparedStatement;
  first<T = unknown>(): Promise<T>;
  run(): Promise<D1Result>;
  all<T = unknown>(): Promise<D1Result<T>>;
  raw<T = unknown>(): Promise<T[]>;
}

interface D1Result<T = unknown> {
  results?: T[];
  success: boolean;
  meta: {
    duration: number;
    size_after: number;
    rows_read: number;
    rows_written: number;
  };
}

interface D1ExecResult {
  count: number;
  duration: number;
}