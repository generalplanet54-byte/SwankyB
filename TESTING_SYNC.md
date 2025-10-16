# Testing Bolt AI Content Sync

This document provides instructions for testing the Bolt AI database content sync functionality.

## Prerequisites

Before testing, ensure you have:

1. ✅ Node.js 18+ installed
2. ✅ Access to the Bolt AI database (credentials in `wrangler.toml`)
3. ✅ Internet connection
4. ✅ npm dependencies installed (`npm install`)

## Test 1: Verify Database Connection

Test that you can connect to the Bolt AI database:

```bash
# Create a simple test script
cat > test-connection.mjs << 'EOF'
import { createClient } from '@supabase/supabase-js';

const BOLT_DATABASE_URL = "https://wuwczwpfnswwctumvqsq.supabase.co";
const BOLT_DATABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind1d2N6d3BmbnN3d2N0dW12cXNxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1Mzg4ODMsImV4cCI6MjA3NTExNDg4M30.EGziTHFcFPQprqmSrvvfxzEEHY2HVuknezkpGidd3UA";

const supabase = createClient(BOLT_DATABASE_URL, BOLT_DATABASE_ANON_KEY);

async function testConnection() {
  try {
    const { data, error } = await supabase.from('articles').select('count');
    if (error) throw error;
    console.log('✅ Database connection successful!');
    console.log('   Articles count:', data);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
  }
}

testConnection();
EOF

# Run the test
node test-connection.mjs

# Clean up
rm test-connection.mjs
```

**Expected Result:** You should see "✅ Database connection successful!" with an article count.

## Test 2: Run Content Sync

Test the full sync process:

```bash
npm run sync-bolt-content
```

**Expected Output:**

```
🚀 Starting Bolt AI Database Content Sync

═══════════════════════════════════════════
🔄 Fetching data from Bolt AI database...
   Database: https://wuwczwpfnswwctumvqsq.supabase.co
✅ Found X published articles
✅ Found Y article-product relationships
🔄 Transforming articles to local format...
🔄 Generating TypeScript content...
🔄 Writing to src/data/launchArticles.ts...
✅ Successfully updated launchArticles.ts

═══════════════════════════════════════════
✨ Sync completed successfully!
   Updated X articles
```

**Expected Result:** 
- The script completes without errors
- `src/data/launchArticles.ts` is updated with a new timestamp in the header comment
- The file contains valid TypeScript code

## Test 3: Verify Generated Content

Check that the generated file is valid:

```bash
# Check the file was updated
head -20 src/data/launchArticles.ts

# Verify TypeScript compilation
npx tsc --noEmit

# Run the linter on the specific file
npx eslint src/data/launchArticles.ts --fix
```

**Expected Result:**
- File header shows recent sync timestamp
- TypeScript compilation passes
- No linting errors in the generated file

## Test 4: Test Application with Synced Data

Verify the application works with the synced content:

```bash
# Start development server
npm run dev
```

Then open http://localhost:5173 and verify:

1. ✅ Home page loads without errors
2. ✅ Articles are displayed correctly
3. ✅ Article pages load with full content
4. ✅ Products are linked to articles
5. ✅ All images load properly
6. ✅ No console errors in browser DevTools

## Test 5: Build for Production

Ensure the synced content works in production build:

```bash
# Build the application
npm run build

# Preview the production build
npm run preview
```

Then open http://localhost:4173 and verify:

1. ✅ Production build completes successfully
2. ✅ Preview server runs without errors
3. ✅ All content is accessible
4. ✅ SEO metadata is present (check page source)

## Test 6: Compare with Database

Manually verify the synced content matches the database:

1. **Access Supabase Dashboard:**
   - Go to https://supabase.com/dashboard
   - Open project `wuwczwpfnswwctumvqsq`

2. **Check Articles:**
   ```sql
   SELECT id, title, slug, updated_at 
   FROM articles 
   WHERE is_published = true 
   ORDER BY published_at DESC;
   ```

3. **Compare with Local File:**
   - Open `src/data/launchArticles.ts`
   - Verify titles and slugs match
   - Check that dates are current

## Test 7: Test Automatic Sync (GitHub Actions)

If you've enabled the GitHub Actions workflow:

1. **Manual Trigger:**
   - Go to your repository on GitHub
   - Navigate to Actions tab
   - Select "Sync Bolt AI Content" workflow
   - Click "Run workflow"
   - Wait for completion

2. **Verify Results:**
   - Check workflow logs for success message
   - Verify commit was created (if there were changes)
   - Pull changes locally and test

## Test 8: Test Error Handling

Test that the sync script handles errors gracefully:

```bash
# Test with invalid credentials (should fail gracefully)
VITE_BOLT_DATABASE_ANON_KEY="invalid" npm run sync-bolt-content

# Test without network (should show appropriate error)
# (Disconnect network or use a network blocker)
npm run sync-bolt-content
```

**Expected Result:**
- Clear error messages are displayed
- Script exits with error code (non-zero)
- Troubleshooting tips are shown

## Common Issues and Solutions

### Issue: "Cannot find module '@supabase/supabase-js'"

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Failed to fetch articles"

**Possible causes:**
1. No internet connection
2. Database credentials are incorrect
3. Database is down or unreachable
4. RLS policies block access

**Solution:**
1. Check internet connection
2. Verify credentials in `wrangler.toml`
3. Check Supabase dashboard for database status
4. Verify RLS policies allow public read access

### Issue: "No articles found in Bolt AI database"

**Possible causes:**
1. No published articles in database
2. RLS policies are too restrictive

**Solution:**
1. Check database has articles with `is_published = true`
2. Review RLS policies in Supabase dashboard

### Issue: TypeScript errors after sync

**Solution:**
```bash
# Check for syntax errors in generated file
cat src/data/launchArticles.ts | head -100

# Verify TypeScript types
npx tsc --noEmit

# If issues persist, run sync again
npm run sync-bolt-content
```

## Performance Benchmarks

Expected performance metrics:

| Operation | Expected Time | Notes |
|-----------|--------------|-------|
| Database fetch | 1-3 seconds | Depends on network and article count |
| Transform articles | < 1 second | Local processing |
| Write to file | < 1 second | File I/O |
| Total sync time | 2-5 seconds | For typical dataset (6-10 articles) |

## Cleanup

After testing, if you want to revert changes:

```bash
# Restore original file from git
git checkout src/data/launchArticles.ts

# Or restore from a specific commit
git checkout HEAD~1 src/data/launchArticles.ts
```

## Success Criteria

The sync functionality is working correctly if:

- ✅ Script runs without errors
- ✅ `launchArticles.ts` is updated with current timestamp
- ✅ Generated TypeScript is valid
- ✅ Application builds successfully
- ✅ All articles display correctly in browser
- ✅ Article-product relationships are maintained
- ✅ SEO metadata is preserved

## Reporting Issues

If you encounter issues during testing:

1. Save the error output
2. Check `src/data/launchArticles.ts` for corruption
3. Verify database access via Supabase dashboard
4. Review `BOLT_SYNC_README.md` for troubleshooting
5. Check GitHub Issues for similar problems

---

Last updated: 2025-10-16
