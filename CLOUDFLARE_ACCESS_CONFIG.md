# Cloudflare Access API Authentication Configuration

## Current Setup:
- **CF-Access-Client-Id:** `e9e80d44ece840fcdae6a8c06e53efcc.access`
- **CF-Access-Client-Secret:** Stored as GitHub environment secret
- **Issue:** Frontend API calls need Access authentication

## Solution Options:

### Option 1: Configure Environment Variables in Cloudflare Pages

1. **Go to Cloudflare Pages Dashboard:**
   - Visit: https://dash.cloudflare.com/pages
   - Select your **swankyb** project
   - Go to **Settings** → **Environment variables**

2. **Add Production Environment Variables:**
   ```
   CF_ACCESS_CLIENT_ID=e9e80d44ece840fcdae6a8c06e53efcc.access
   CF_ACCESS_CLIENT_SECRET=[your-secret-from-github]
   ```

3. **Update API Functions to Include Access Headers:**
   Functions will automatically include these headers when making internal requests.

### Option 2: Frontend Client Configuration

Add Access headers to all API requests from the frontend:

```javascript
// In your API client configuration
const apiHeaders = {
  'CF-Access-Client-Id': 'e9e80d44ece840fcdae6a8c06e53efcc.access',
  'CF-Access-Client-Secret': process.env.CF_ACCESS_CLIENT_SECRET,
  'Content-Type': 'application/json'
};

// Use these headers for all API requests
fetch('/api/products-d1', { headers: apiHeaders })
```

### Option 3: Bypass Rules for API Endpoints (Recommended)

**Create specific bypass rules in Cloudflare Access:**

1. Go to **Zero Trust Dashboard** → **Access** → **Applications**
2. Find your SwankyB application
3. Edit **Policies**
4. Add **Bypass Policy:**
   - **Name:** API Endpoints Public Access
   - **Action:** Bypass
   - **Rule:** `http.request.uri.path starts_with "/api/"`
   - **Priority:** 1 (highest)

This allows public access to `/api/*` while keeping the main site protected.

## Quick Test Commands:

```bash
# Test with Access headers (replace SECRET with actual value)
curl -H "CF-Access-Client-Id: e9e80d44ece840fcdae6a8c06e53efcc.access" \
     -H "CF-Access-Client-Secret: YOUR_SECRET" \
     "https://aa9dff08.swankyb.pages.dev/api/products-d1"

# After bypass rule is added:
curl "https://aa9dff08.swankyb.pages.dev/api/products-d1"
```

## Recommended Approach:
**Use Option 3 (Bypass Rules)** - This keeps your site secure while allowing public API access for the frontend to work properly.