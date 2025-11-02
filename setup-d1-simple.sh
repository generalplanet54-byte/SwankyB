#!/bin/bash

# Cloudflare D1 Database Setup via API
# Executes SQL migrations using Cloudflare API directly

set -e

ACCOUNT_ID="43f14f26801fb2389382fa084e3442e6"
DATABASE_ID="bfc16265-30bd-4bcf-8a72-f2a5a5baf61a"
API_TOKEN="$CLOUDFLARE_API_TOKEN"

if [ -z "$API_TOKEN" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set"
    exit 1
fi

echo "🔧 Setting up Cloudflare D1 Production Database..."

# Function to execute SQL via API
execute_sql() {
    local sql="$1"
    local description="$2"
    
    echo "📋 $description"
    
    # Create JSON payload
    local json_payload=$(jq -n --arg sql "$sql" '{"sql": $sql}')
    
    # Execute via API
    local response=$(curl -s -X POST \
        "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query" \
        -H "Authorization: Bearer $API_TOKEN" \
        -H "Content-Type: application/json" \
        -d "$json_payload")
    
    # Check if successful
    if echo "$response" | jq -r '.result[0].success' | grep -q 'true'; then
        echo "✅ $description completed successfully"
        return 0
    else
        echo "❌ $description failed"
        echo "Response: $response" | jq '.'
        return 1
    fi
}

echo "Creating core tables..."

# Create products table
execute_sql "CREATE TABLE IF NOT EXISTS products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    brand TEXT,
    description TEXT,
    image TEXT,
    affiliate_url TEXT,
    price REAL,
    category TEXT,
    rating REAL,
    review_count INTEGER,
    is_featured BOOLEAN DEFAULT 0,
    meta_title TEXT,
    meta_description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);" "Creating products table"

# Create articles table
execute_sql "CREATE TABLE IF NOT EXISTS articles (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    excerpt TEXT,
    content TEXT NOT NULL,
    featured_image TEXT,
    author TEXT DEFAULT 'SwankyBoyz Team',
    publish_date DATE,
    is_published BOOLEAN DEFAULT 1,
    meta_title TEXT,
    meta_description TEXT,
    schema_markup TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);" "Creating articles table"

# Create newsletter subscribers table
execute_sql "CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    name TEXT,
    subscribed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT 1,
    preferences TEXT,
    source TEXT DEFAULT 'website'
);" "Creating newsletter subscribers table"

# Create categories table
execute_sql "CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);" "Creating categories table"

echo "🎉 Database setup complete!"

# Verify setup
echo "🔍 Verifying database..."
response=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"sql": "SELECT name FROM sqlite_master WHERE type=\"table\" AND name NOT LIKE \"sqlite_%\" AND name NOT LIKE \"_cf_%\" ORDER BY name;"}')

echo "Tables created:"
echo "$response" | jq -r '.result[0].results[].name' | sed 's/^/  - /'

echo ""
echo "✅ Production database ready!"
echo ""
echo "Next steps:"
echo "1. Add product data: Run the product catalog migration"
echo "2. Deploy your site: npm run build && npx wrangler pages deploy dist"
echo "3. Configure environment variables in Cloudflare Pages dashboard"