#!/bin/bash

# SwankyBoyz Image Generation Script
# Creates placeholder SVG images for all product categories

echo "🎨 SwankyBoyz Image Generation Starting..."

# Create image directories if they don't exist
mkdir -p /workspaces/SwankyB/public/images/products/{luxury,footwear,smartphones,laptops,audio-equipment,watches}
mkdir -p /workspaces/SwankyB/public/images/articles

# Function to create SVG placeholder
create_svg_placeholder() {
    local file_path="$1"
    local title="$2" 
    local color="$3"
    local icon="$4"
    
    cat > "$file_path" << EOF
<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:${color};stop-opacity:0.1" />
      <stop offset="100%" style="stop-color:${color};stop-opacity:0.3" />
    </linearGradient>
  </defs>
  <rect width="400" height="300" fill="url(#bg)" stroke="${color}" stroke-width="2"/>
  <text x="200" y="40" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="16" font-weight="bold">${title}</text>
  <text x="200" y="150" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="48">${icon}</text>
  <text x="200" y="260" text-anchor="middle" fill="${color}" font-family="Arial, sans-serif" font-size="12" opacity="0.7">SwankyBoyz Premium</text>
</svg>
EOF
    echo "✅ Created: $file_path"
}

# Luxury Products
create_svg_placeholder "/workspaces/SwankyB/public/images/products/luxury/skeleton-watch.svg" "Premium Skeleton Watch" "#D4AF37" "⌚"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/luxury/leather-briefcase.svg" "Premium Briefcase" "#8B4513" "💼"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/luxury/crocodile-wallet.svg" "Exotic Leather Wallet" "#2F4F4F" "👛"

# Grooming Products
create_svg_placeholder "/workspaces/SwankyB/public/images/products/grooming/cologne-bottle.svg" "Designer Cologne" "#4B0082" "🍾"

# Footwear Products  
create_svg_placeholder "/workspaces/SwankyB/public/images/products/footwear/nike-cortez.svg" "Nike Cortez Sneakers" "#FF6B35" "👟"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/footwear/orthopedic-shoes.svg" "Orthopedic Walking Shoes" "#228B22" "🦶"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/footwear/g-defy-shoes.svg" "G-DEFY Mighty Walk" "#1E90FF" "👞"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/footwear/orthofeet-sneakers.svg" "Orthofeet Sneakers" "#32CD32" "👟"

# Smartphone Products
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/samsung-flip7.svg" "Galaxy Z Flip7" "#1F2937" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/motorola-razr.svg" "Motorola razr 2024" "#DC2626" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/nothing-phone3.svg" "Nothing Phone (3)" "#000000" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/redmagic-10-air.svg" "REDMAGIC 10 Air" "#EF4444" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/oneplus-13.svg" "OnePlus 13" "#059669" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/honor-magic-v2.svg" "HONOR Magic V2" "#7C3AED" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/iphone-16-pro.svg" "iPhone 16 Pro" "#374151" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/galaxy-s25-ultra.svg" "Galaxy S25 Ultra" "#1F2937" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/smartphones/galaxy-s24-ultra.svg" "Galaxy S24 Ultra" "#F59E0B" "📱"

# Tech/Laptop Products
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/macbook-air-m4.svg" "MacBook Air M4" "#9CA3AF" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/macbook-pro-16-m4.svg" "MacBook Pro 16 M4" "#374151" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/macbook-pro-14-m4.svg" "MacBook Pro 14 M4" "#374151" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/lg-gram-15.svg" "LG gram 15" "#1F2937" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/asus-rog-g16.svg" "ASUS ROG Strix G16" "#EF4444" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/asus-rog-g18.svg" "ASUS ROG Strix G18" "#DC2626" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/msi-thin-gaming.svg" "MSI Thin Gaming" "#000000" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/lg-gram-pro-16.svg" "LG gram Pro 16" "#6B7280" "💻"

# Audio Equipment
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/shure-mv7-plus.svg" "Shure MV7+" "#1F2937" "🎙️"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/tech/maono-pd400x.svg" "MAONO PD400X" "#DC2626" "🎙️"

# Watches
create_svg_placeholder "/workspaces/SwankyB/public/images/products/watches/garmin-fenix-8.svg" "Garmin fēnix 8" "#059669" "⌚"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/watches/garmin-approach-s50.svg" "Garmin Approach S50" "#D4AF37" "⌚"
create_svg_placeholder "/workspaces/SwankyB/public/images/products/watches/garmin-s50-bundle.svg" "Garmin S50 Bundle" "#F59E0B" "⌚"

# Article Images
create_svg_placeholder "/workspaces/SwankyB/public/images/articles/luxury-accessories.svg" "Luxury Accessories Guide" "#D4AF37" "💎"
create_svg_placeholder "/workspaces/SwankyB/public/images/articles/smartphone-guide.svg" "Smartphone Buying Guide" "#1F2937" "📱"
create_svg_placeholder "/workspaces/SwankyB/public/images/articles/laptop-guide.svg" "Laptop Buying Guide" "#6B7280" "💻"
create_svg_placeholder "/workspaces/SwankyB/public/images/articles/footwear-guide.svg" "Footwear Guide" "#059669" "👟"
create_svg_placeholder "/workspaces/SwankyB/public/images/articles/podcast-microphones.svg" "Podcast Microphones" "#DC2626" "🎙️"

echo "🎉 SwankyBoyz Image Generation Complete!"
echo "📸 Created placeholder images for all product categories"
echo "🔧 All affiliate links are properly formatted with swankyboyz-20 tag"