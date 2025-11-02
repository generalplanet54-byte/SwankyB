#!/bin/bash

# Test SwankyBoyz API Endpoints
echo "🧪 Testing SwankyBoyz API Endpoints..."
echo ""

SITE_URL="https://4fb0a58b.swankyb.pages.dev"

echo "Testing products endpoint..."
curl -s "$SITE_URL/api/products-d1" | jq '.' | head -10

echo ""
echo "Testing articles endpoint..."
curl -s "$SITE_URL/api/articles-d1" | jq '.' | head -10

echo ""
echo "Testing admin endpoint..."
curl -s "$SITE_URL/api/admin/me" | jq '.' | head -5