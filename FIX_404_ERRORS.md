# Fix for 404 JavaScript Chunk File Errors

## Problem
The application was showing 404 errors for missing JavaScript files:
- `Breadcrumbs-BpMFmvrn.js`
- `StructuredData-C8ONh2hg.js`
- `CategoryPage-CI4STghM.js`

## Root Cause
The project contains two separate application structures:

1. **Astro SSR Site** (active) - Located in `src/pages/*.astro`
2. **React SPA** (unused/legacy) - Defined in root `index.html` → `src/main.tsx` → `src/App.tsx`

The React SPA with lazy-loaded components (CategoryPage, Breadcrumbs, StructuredData) was **never being built** during the Astro build process, yet old browser caches or service worker caches still had references to these chunk files from previous builds.

Additionally, product pages were linking to `/category/:slug` routes, but there was no Astro page to handle these routes.

## Solution Implemented

### 1. Created Missing Category Page
- Added `src/pages/category/[slug].astro` to handle category routes
- Implements proper breadcrumbs and structured data in Astro (replacing the React components)
- Filters articles and products by category
- Includes proper SEO metadata and schema.org markup

### 2. Updated Service Worker
- Bumped cache version from `v1` to `v2` to force cache refresh
- Added better error handling for 404 responses
- Improved handling of chunk files to prevent caching of non-existent resources
- Added graceful network error handling

### 3. Architecture Clarification
The React SPA code (`index.html`, `src/main.tsx`, `src/App.tsx`, and `src/components/pages/*`) is legacy code that is **NOT being used or built**. The active application uses:
- Astro SSR for page rendering
- Astro pages in `src/pages/*.astro`
- Astro sections in `src/sections/*.astro`
- Astro components in `src/components/*.astro`

## Files Modified
- `src/pages/category/[slug].astro` (NEW) - Category page implementation
- `public/sw.js` - Updated service worker with v2 cache and better error handling

## Testing
After deployment, the 404 errors should be resolved because:
1. Category routes now have proper Astro pages to serve
2. Service worker v2 won't cache 404 responses
3. Old cached references will be cleared when service worker updates

## Future Considerations
Consider removing or archiving the unused React SPA code to avoid confusion:
- `index.html` (root level)
- `src/main.tsx`
- `src/App.tsx`
- `src/components/pages/*`
- `src/components/admin/*` (if not used)
- React-specific context and hooks that aren't used by Astro

These files can be safely removed if they're confirmed to not be needed, or moved to an `_archive` directory for reference.
