#!/bin/bash

# Credentials Verification Script
# Run this after creating credentials.json

echo "🔍 Checking Google Sheets credentials..."
echo ""

if [ ! -f "scripts/credentials.json" ]; then
    echo "❌ credentials.json not found!"
    echo ""
    echo "Expected location: /workspaces/SwankyB/scripts/credentials.json"
    echo ""
    echo "Please create the credentials file first."
    echo "See MIGRATION_QUICK_START.md for instructions."
    exit 1
fi

echo "✅ credentials.json found!"
echo ""

# Check if it's valid JSON
if ! python3 -m json.tool scripts/credentials.json > /dev/null 2>&1; then
    echo "❌ credentials.json is not valid JSON"
    echo ""
    echo "Please check the file format."
    exit 1
fi

echo "✅ Valid JSON format"
echo ""

# Extract key information
SERVICE_EMAIL=$(grep -o '"client_email": "[^"]*' scripts/credentials.json | cut -d'"' -f4)
PROJECT_ID=$(grep -o '"project_id": "[^"]*' scripts/credentials.json | cut -d'"' -f4)

if [ -n "$SERVICE_EMAIL" ]; then
    echo "📧 Service Account Email:"
    echo "   $SERVICE_EMAIL"
    echo ""
    echo "⚠️  IMPORTANT: Share your Google Sheet with this email!"
    echo ""
    echo "To share:"
    echo "1. Open: https://docs.google.com/spreadsheets/d/1zP27ODUO6tB6x636DnHALUzhvhrqNjNLKND7fRz-zjk/edit"
    echo "2. Click 'Share' button"
    echo "3. Paste: $SERVICE_EMAIL"
    echo "4. Give 'Editor' permissions"
    echo "5. Uncheck 'Notify people'"
    echo "6. Click 'Send'"
    echo ""
else
    echo "⚠️  Could not extract service account email"
fi

if [ -n "$PROJECT_ID" ]; then
    echo "📁 Project ID: $PROJECT_ID"
    echo ""
fi

echo "═══════════════════════════════════════════════════════════════"
echo "✅ Credentials are valid!"
echo ""
echo "Next steps:"
echo "1. Make sure you've shared your Google Sheet with the service account"
echo "2. Run: npm run sync"
echo ""
