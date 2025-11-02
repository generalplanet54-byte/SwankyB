#!/bin/bash

# Direct Cloudflare D1 API Setup Script
# This bypasses wrangler CLI issues and uses the API directly

ACCOUNT_ID="43f14f26801fb2389382fa084e3442e6"
DATABASE_ID="bfc16265-30bd-4bcf-8a72-f2a5a5baf61a"
API_TOKEN="$CLOUDFLARE_API_TOKEN"

echo "🔧 Setting up Cloudflare D1 Production Database via API..."

if [ -z "$API_TOKEN" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set"
    exit 1
fi

echo "✅ API Token found, proceeding with database setup..."

# Function to execute SQL via API
execute_sql() {
    local sql_content="$1"
    local description="$2"
    
    echo "📋 $description"
    
    # Escape the SQL for JSON
    local escaped_sql=$(echo "$sql_content" | sed 's/"/\\"/g' | tr '\n' ' ')
    
    # Execute via API
    local response=$(curl -s -X POST \
        "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query" \
        -H "Authorization: Bearer $API_TOKEN" \
        -H "Content-Type: application/json" \
        -d "{\"sql\": \"$escaped_sql\"}")
    
    # Check if successful
    if echo "$response" | grep -q '"success":true'; then
        echo "✅ $description completed successfully"
        return 0
    else
        echo "❌ $description failed"
        echo "Response: $response"
        return 1
    fi
}

# Execute initial schema migration
if [ -f "./migrations/d1/001_initial_schema.sql" ]; then
    sql_content=$(cat "./migrations/d1/001_initial_schema.sql")
    execute_sql "$sql_content" "Executing initial schema migration"
else
    echo "❌ Migration file not found: ./migrations/d1/001_initial_schema.sql"
    exit 1
fi

# Execute product catalog migration
if [ -f "./migrations/d1/009_add_comprehensive_product_catalog.sql" ]; then
    sql_content=$(cat "./migrations/d1/009_add_comprehensive_product_catalog.sql")
    execute_sql "$sql_content" "Executing comprehensive product catalog migration"
else
    echo "❌ Migration file not found: ./migrations/d1/009_add_comprehensive_product_catalog.sql"
    exit 1
fi

# Verify setup
echo "🔍 Verifying database setup..."
response=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"sql": "SELECT COUNT(*) as count FROM sqlite_master WHERE type=\"table\" AND name NOT LIKE \"sqlite_%\";"}')

echo "Database verification response: $response"

echo "🎉 Production database setup complete!"
echo ""
echo "Next steps:"
echo "1. Deploy your site: npm run build && npx wrangler pages deploy dist"
echo "2. Configure environment variables in Cloudflare Pages dashboard"