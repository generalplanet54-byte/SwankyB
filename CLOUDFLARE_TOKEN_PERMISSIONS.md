# Cloudflare API Token Permissions Required

## Current Error
The API token is missing required permissions for D1 database operations.

## Required Token Permissions

To create a proper API token for D1 database management:

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Choose "Custom token"
4. Set the following permissions:

### Required Permissions:
- **Account** - `Cloudflare Workers:Edit`
- **Account** - `D1:Edit` 
- **User** - `User Details:Read`
- **Zone** - `Zone:Read` (if you have zones)

### Account Resources:
- Include: `Christiaanvanrooyen05@gmail.com's Account`

### Optional but Recommended:
- **Account** - `Account Settings:Read`

## Alternative: Use Full Access Token (Not Recommended for Production)

For development/testing, you can create a token with:
- **All accounts** - `All resources`
- **Permissions** - `All permissions`

## Steps After Creating New Token:

1. Replace the current token:
```bash
export CLOUDFLARE_API_TOKEN="your-new-token-here"
```

2. Test authentication:
```bash
npx wrangler whoami
```

3. Proceed with database setup:
```bash
npx wrangler d1 execute swankyb_content --file=./migrations/d1/001_initial_schema.sql --remote
npx wrangler d1 execute swankyb_content --file=./migrations/d1/009_add_comprehensive_product_catalog.sql --remote
```

## Quick Fix Script
After getting the new token, run:
```bash
./setup-production-d1.sh
```