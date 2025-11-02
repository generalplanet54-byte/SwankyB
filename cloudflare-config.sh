#!/bin/bash
# Cloudflare Configuration
# Updated: November 2, 2025

export CLOUDFLARE_ACCOUNT_ID="43f14f26801fb2389382fa084e3442e6"
export CLOUDFLARE_DATABASE_ID="bfc16265-30bd-4bcf-8a72-f2a5a5baf61a"
export CLOUDFLARE_DATABASE_NAME="swankyb_content"
export CLOUDFLARE_API_TOKEN="4ATOuBziUPRbIqVkV3L1Ip5L4TVU-oytCFyEWNdS"

# Verify token is set
if [ -z "$CLOUDFLARE_API_TOKEN" ]; then
    echo "❌ Error: CLOUDFLARE_API_TOKEN is not set"
    exit 1
fi

echo "✅ Cloudflare configuration loaded"
echo "📍 Account ID: $CLOUDFLARE_ACCOUNT_ID"
echo "🗄️  Database: $CLOUDFLARE_DATABASE_NAME ($CLOUDFLARE_DATABASE_ID)"