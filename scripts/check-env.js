// Simple preflight check to ensure required build-time env vars are present.
const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missing = required.filter((k) => !process.env[k] || process.env[k].trim() === '');
if (missing.length > 0) {
  console.error('Missing required environment variables for build:', missing.join(', '));
  console.error('Set these as GitHub Actions secrets or in your local environment before building.');
  process.exit(1);
}
console.log('All required VITE_* build environment variables are present.');
process.exit(0);
// Simple preflight check used by CI to ensure required VITE_ env vars are present
const required = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];
const missing = required.filter(k => !process.env[k]);
if (missing.length) {
  console.error('Missing required environment variables:', missing.join(', '));
  process.exit(1);
}
console.log('Preflight check passed — required VITE_ variables present.');