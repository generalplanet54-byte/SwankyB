#!/bin/bash

# Cloudflare D1 Production Database Setup Script
# Run this after setting CLOUDFLARE_API_TOKEN environment variable

echo "🔧 Setting up Cloudflare D1 Production Database..."

# Check if API token is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set"
    echo "Please visit https://dash.cloudflare.com/profile/api-tokens"
    echo "Create a token with Zone:Zone:Read, Account:Cloudflare Workers:Edit, Account:D1:Edit permissions"
    echo "Then run: export CLOUDFLARE_API_TOKEN='your-token-here'"
    exit 1
fi

echo "✅ API Token found, proceeding with database setup..."

# Verify we can connect to Cloudflare
echo "🔍 Checking Cloudflare authentication..."
npx wrangler whoami

if [ $? -ne 0 ]; then
    echo "❌ Authentication failed. Please check your API token."
    exit 1
fi

echo "✅ Successfully authenticated with Cloudflare"

# Initialize production database with initial schema
echo "📋 Initializing production database with initial schema..."
npx wrangler d1 execute swankyb_content --file=./migrations/d1/001_initial_schema.sql --remote

if [ $? -ne 0 ]; then
    echo "❌ Failed to execute initial schema migration"
    exit 1
fi

echo "✅ Initial schema migration completed"

# Add comprehensive product catalog
echo "📦 Adding comprehensive product catalog..."
npx wrangler d1 execute swankyb_content --file=./migrations/d1/009_add_comprehensive_product_catalog.sql --remote

if [ $? -ne 0 ]; then
    echo "❌ Failed to execute product catalog migration"
    exit 1
fi

echo "✅ Product catalog migration completed"

# Optional: Run additional migrations if needed
echo "🔄 Checking for additional migrations..."

# You can add more migrations here as needed:
# npx wrangler d1 execute swankyb_content --file=./migrations/d1/010_add_comprehensive_articles.sql --remote

echo "🎉 Production database setup complete!"
echo ""
echo "Next steps:"
echo "1. Verify the database: npx wrangler d1 execute swankyb_content --command='SELECT COUNT(*) as product_count FROM products' --remote"
echo "2. Deploy your site: npm run build && npx wrangler pages deploy dist"
echo "3. Configure your production environment variables in Cloudflare Pages dashboard"