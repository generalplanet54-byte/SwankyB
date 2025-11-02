#!/bin/bash

# Initialize Local Wrangler D1 Database
# This script runs the D1 migrations against the local Wrangler D1 instance

echo "🗄️ Initializing local Wrangler D1 database..."

# Run the initial schema migration
echo "📋 Creating database schema..."
npx wrangler d1 execute DB --local --file=./migrations/d1/001_initial_schema.sql

# Run additional migrations if needed
echo "🌱 Seeding data..."
if [ -f "./migrations/d1/002_seed_first_articles.sql" ]; then
    npx wrangler d1 execute DB --local --file=./migrations/d1/002_seed_first_articles.sql
fi

if [ -f "./migrations/d1/009_add_comprehensive_product_catalog.sql" ]; then
    npx wrangler d1 execute DB --local --file=./migrations/d1/009_add_comprehensive_product_catalog.sql
fi

echo "✅ Local D1 database initialized!"
echo "ℹ️  You can now restart your dev server: npm run dev"