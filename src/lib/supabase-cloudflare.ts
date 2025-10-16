import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for Cloudflare (Pages Functions / Workers).
 * Reads environment from the Pages/Workers `env` object or process.env for local dev.
 * Prioritizes Bolt AI database credentials over standard Supabase credentials.
 */
export default function createSupabaseFromEnv(env?: Record<string, string | undefined>): SupabaseClient {
  // Try Bolt AI database first (primary), then fall back to standard Supabase
  const supabaseUrl = 
    env?.VITE_BOLT_DATABASE_URL || 
    env?.BOLT_DATABASE_URL ||
    process.env.VITE_BOLT_DATABASE_URL ||
    process.env.BOLT_DATABASE_URL ||
    env?.SUPABASE_URL || 
    process.env.SUPABASE_URL;
    
  const supabaseAnonKey = 
    env?.VITE_BOLT_DATABASE_ANON_KEY || 
    env?.BOLT_DATABASE_ANON_KEY ||
    process.env.VITE_BOLT_DATABASE_ANON_KEY ||
    process.env.BOLT_DATABASE_ANON_KEY ||
    env?.SUPABASE_ANON_KEY || 
    process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Database credentials must be provided. Set VITE_BOLT_DATABASE_URL and VITE_BOLT_DATABASE_ANON_KEY (or SUPABASE_URL and SUPABASE_ANON_KEY) in env');
  }

  return createClient(supabaseUrl as string, supabaseAnonKey as string, {
    global: { fetch }
  });
}
