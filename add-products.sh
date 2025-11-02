#!/bin/bash

# Add Product Data to Cloudflare D1 Database
# Simplified product insertion using API

set -e

ACCOUNT_ID="43f14f26801fb2389382fa084e3442e6"
DATABASE_ID="bfc16265-30bd-4bcf-8a72-f2a5a5baf61a"
API_TOKEN="$CLOUDFLARE_API_TOKEN"

if [ -z "$API_TOKEN" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN environment variable is not set"
    exit 1
fi

echo "📦 Adding products to Cloudflare D1 Database..."

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

echo "Adding sample products..."

# Add sample products
execute_sql "INSERT OR REPLACE INTO products (id, name, brand, description, image, affiliate_url, price, category) VALUES 
('luxury-watch-001', 'Premium Skeleton Watch', 'Luxury Watch Co.', 'Automatic skeleton watch with gold dial', '/assets/luxury-watch.jpg', 'https://amzn.to/496SE8j', 299.99, 'Luxury'),
('leather-briefcase-001', 'Executive Leather Briefcase', 'Executive Leather', 'Full-grain leather briefcase for professionals', '/assets/leather-briefcase.jpg', 'https://amzn.to/4huaDHR', 249.99, 'Luxury'),
('cologne-001', 'Designer Woody Cologne', 'Designer Fragrances', 'Sophisticated woody and spicy notes cologne', '/assets/cologne.jpg', 'https://amzn.to/3JwTC30', 89.99, 'Grooming'),
('wallet-001', 'Crocodile Leather Wallet', 'Unique Leather Goods', 'RFID protected crocodile embossed wallet', '/assets/wallet.jpg', 'https://amazon.com/dp/B07P3KVGG1', 79.99, 'Luxury'),
('iphone-15-pro', 'iPhone 15 Pro Max', 'Apple', 'Latest flagship iPhone with titanium design', '/assets/iphone-15-pro.jpg', 'https://amzn.to/3ZY5KxY', 1199.99, 'Smartphones');" "Adding sample luxury and tech products"

# Add grooming products
execute_sql "INSERT OR REPLACE INTO products (id, name, brand, description, image, affiliate_url, price, category) VALUES
('beard-trimmer-001', 'Professional Beard Trimmer', 'Philips', 'Precision trimmer for professional grooming', '/assets/beard-trimmer.jpg', 'https://amzn.to/beard-trimmer', 89.99, 'Grooming'),
('body-groomer-001', 'All-Body Electric Groomer', 'Manscaped', 'Complete body grooming solution', '/assets/body-groomer.jpg', 'https://amzn.to/body-groomer', 79.99, 'Grooming'),
('shaving-kit-001', 'Premium Shaving Kit', 'The Art of Shaving', 'Complete wet shaving experience', '/assets/shaving-kit.jpg', 'https://amzn.to/shaving-kit', 149.99, 'Grooming');" "Adding grooming essentials"

# Add tech products
execute_sql "INSERT OR REPLACE INTO products (id, name, brand, description, image, affiliate_url, price, category) VALUES
('macbook-pro-001', 'MacBook Pro M3', 'Apple', 'Professional laptop with M3 chip', '/assets/macbook-pro.jpg', 'https://amzn.to/macbook-pro', 1999.99, 'Laptops'),
('gaming-laptop-001', 'Gaming Laptop RTX 4070', 'ASUS ROG', 'High-performance gaming laptop', '/assets/gaming-laptop.jpg', 'https://amzn.to/gaming-laptop', 1599.99, 'Laptops'),
('microphone-001', 'Professional USB Microphone', 'Blue Yeti', 'Studio-quality recording microphone', '/assets/microphone.jpg', 'https://amzn.to/blue-yeti-mic', 99.99, 'Audio Equipment');" "Adding tech products"

echo "🎉 Product data added successfully!"

# Verify products were added
echo "🔍 Verifying products..."
response=$(curl -s -X POST \
    "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/d1/database/$DATABASE_ID/query" \
    -H "Authorization: Bearer $API_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{"sql": "SELECT COUNT(*) as count FROM products;"}')

product_count=$(echo "$response" | jq -r '.result[0].results[0].count')
echo "✅ Total products in database: $product_count"

echo ""
echo "🚀 Database is now ready with products!"
echo ""
echo "Next steps:"
echo "1. Build your site: npm run build"
echo "2. Deploy to Cloudflare Pages: npx wrangler pages deploy dist"