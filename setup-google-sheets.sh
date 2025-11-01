#!/bin/bash

# Google Sheets Setup Helper Script
# This script helps you complete the Google Sheets integration

echo "╔══════════════════════════════════════════════════════════════╗"
echo "║                                                              ║"
echo "║   📊 Google Sheets Integration Setup Helper                 ║"
echo "║                                                              ║"
echo "╚══════════════════════════════════════════════════════════════╝"
echo ""

SHEET_ID="1zP27ODUO6tB6x636DnHALUzhvhrqNjNLKND7fRz-zjk"

echo "✅ Step 1: Sheet ID Detected"
echo "   Sheet ID: $SHEET_ID"
echo ""

echo "📋 Step 2: Check if credentials exist"
if [ -f "scripts/credentials.json" ]; then
    echo "   ✅ credentials.json found!"
    echo ""
    
    # Extract service account email
    SERVICE_EMAIL=$(grep -o '"client_email": "[^"]*' scripts/credentials.json | cut -d'"' -f4)
    if [ -n "$SERVICE_EMAIL" ]; then
        echo "   📧 Service Account Email: $SERVICE_EMAIL"
        echo ""
        echo "   ⚠️  IMPORTANT: Make sure you've shared your Google Sheet with this email!"
        echo "   To share:"
        echo "   1. Open: https://docs.google.com/spreadsheets/d/$SHEET_ID/edit"
        echo "   2. Click 'Share' button"
        echo "   3. Add: $SERVICE_EMAIL"
        echo "   4. Give 'Editor' permissions"
        echo "   5. Click 'Send'"
        echo ""
    fi
else
    echo "   ❌ credentials.json NOT found"
    echo ""
    echo "   📝 You need to create Google Cloud credentials:"
    echo ""
    echo "   1. Go to: https://console.cloud.google.com/apis"
    echo "   2. Create a new project (or select existing)"
    echo "   3. Enable 'Google Sheets API'"
    echo "   4. Go to 'Credentials' → 'Create Credentials' → 'Service Account'"
    echo "   5. Fill in details:"
    echo "      - Name: swankyboyz-sync-service"
    echo "      - Description: Service account for syncing Google Sheets"
    echo "   6. Click 'Create and Continue' → Skip optional steps → 'Done'"
    echo "   7. Click on the service account you just created"
    echo "   8. Go to 'Keys' tab → 'Add Key' → 'Create New Key'"
    echo "   9. Choose 'JSON' format"
    echo "   10. Download the file"
    echo "   11. Save it as: /workspaces/SwankyB/scripts/credentials.json"
    echo ""
    echo "   After you create credentials.json, run this script again!"
    exit 1
fi

echo "📋 Step 3: Update sync script with Sheet ID"
if grep -q "YOUR_SHEET_ID_HERE" scripts/sync-sheets.ts; then
    echo "   Updating Sheet ID in sync script..."
    sed -i "s/YOUR_SHEET_ID_HERE/$SHEET_ID/g" scripts/sync-sheets.ts
    echo "   ✅ Sheet ID updated in scripts/sync-sheets.ts"
else
    echo "   ✅ Sheet ID already configured"
fi
echo ""

echo "📋 Step 4: Check Google Sheet structure"
echo "   Your sheet should have these tabs/sheets:"
echo "   📄 Sheet 1: 'Products' with columns:"
echo "      - id, name, brand, description, image, affiliate_url"
echo "   📄 Sheet 2: 'Articles' with columns:"
echo "      - id, title, slug, excerpt, content, cover_image, visuals, date"
echo ""

echo "═══════════════════════════════════════════════════════════════"
echo "📊 READY TO SYNC?"
echo "═══════════════════════════════════════════════════════════════"
echo ""
echo "If you've completed all steps above, run:"
echo ""
echo "   npm run sync"
echo ""
echo "This will:"
echo "   • Connect to your Google Sheet"
echo "   • Fetch all products and articles"
echo "   • Replace the sample data in your database"
echo "   • Show you a summary of what was synced"
echo ""
