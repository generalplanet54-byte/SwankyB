#!/bin/bash

# Setup Local D1 Development Environment
# This script ensures the local D1 database is properly initialized

echo "🔧 Setting up local D1 database..."

# Stop any running wrangler processes
pkill -f wrangler 2>/dev/null || true
sleep 2

# Clean up old database files to start fresh
echo "🧹 Cleaning up old database files..."
rm -rf .wrangler/state/v3/d1/ 2>/dev/null || true

# Run database migrations
echo "📦 Running database migrations..."
npx wrangler d1 execute swankyb_content --file=./migrations/d1/001_initial_schema.sql --local
npx wrangler d1 execute swankyb_content --file=./migrations/d1/009_add_comprehensive_product_catalog.sql --local  
npx wrangler d1 execute swankyb_content --file=./migrations/d1/002_seed_first_articles.sql --local

# Verify database setup
echo "✅ Verifying database setup..."
PRODUCT_COUNT=$(npx wrangler d1 execute swankyb_content --command="SELECT COUNT(*) FROM products;" --local 2>/dev/null | grep -oE '[0-9]+' | tail -1)
ARTICLE_COUNT=$(npx wrangler d1 execute swankyb_content --command="SELECT COUNT(*) FROM articles;" --local 2>/dev/null | grep -oE '[0-9]+' | tail -1)

echo "📊 Database Status:"
echo "   Products: $PRODUCT_COUNT"
echo "   Articles: $ARTICLE_COUNT"

echo "🚀 Starting development server..."
npm run dev