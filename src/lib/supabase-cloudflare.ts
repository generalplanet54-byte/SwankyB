import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Create a Supabase client for Cloudflare (Pages Functions / Workers).
 * Reads environment from the Pages/Workers `env` object or process.env for local dev.
 */
export default function createSupabaseFromEnv(env?: Record<string, string | undefined>): SupabaseClient {
  const supabaseUrl = env?.SUPABASE_URL || process.env.SUPABASE_URL;
  const supabaseAnonKey = env?.SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('SUPABASE_URL and SUPABASE_ANON_KEY must be provided in env');
  }

  return createClient(supabaseUrl as string, supabaseAnonKey as string, {
    global: { fetch }
  });
}
