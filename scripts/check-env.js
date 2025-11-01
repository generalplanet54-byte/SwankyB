// Simple preflight check to ensure required build-time env vars are present.
// Note: VITE_SUPABASE_* variables are optional as Supabase is not currently used
const optional = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missing = optional.filter((k) => !process.env[k] || process.env[k].trim() === '');
if (missing.length > 0) {
  console.warn('⚠️  Optional environment variables not set:', missing.join(', '));
  console.warn('These are not required for the current build, but may be needed if Supabase features are enabled.');
} else {
  console.log('✓ All optional Supabase environment variables are present.');
}
console.log('✓ Preflight check passed.');
process.exit(0);