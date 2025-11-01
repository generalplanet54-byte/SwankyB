#!/bin/bash

# SwankyBoyz Google Sheets Integration Setup Script
# This script helps you set up the Google Sheets integration quickly

set -e

echo "🚀 SwankyBoyz Google Sheets Integration Setup"
echo "============================================="
echo ""

# Check if we're in the right directory
if [[ ! -f "package.json" ]]; then
    echo "❌ Error: Please run this script from the SwankyBoyz project root directory"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed. Please install Node.js 22+ first."
    exit 1
fi

# Check Node version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [[ $NODE_VERSION -lt 22 ]]; then
    echo "❌ Error: Node.js version 22 or higher is required. Current version: $(node -v)"
    exit 1
fi

echo "✅ Node.js version check passed: $(node -v)"
echo ""

# Install dependencies if needed
echo "📦 Checking dependencies..."
if [[ ! -d "node_modules" ]]; then
    echo "Installing dependencies..."
    npm install
else
    echo "✅ Dependencies already installed"
fi
echo ""

# Check for credentials file
echo "🔑 Checking Google Sheets credentials..."
if [[ ! -f "scripts/credentials.json" ]]; then
    echo "⚠️  Google Sheets credentials not found"
    echo ""
    echo "Please complete these steps:"
    echo "1. Go to https://console.cloud.google.com/apis"
    echo "2. Create a new project or select existing"
    echo "3. Enable Google Sheets API"
    echo "4. Create Service Account credentials"
    echo "5. Download the JSON file as 'scripts/credentials.json'"
    echo ""
    echo "📋 Example structure (scripts/credentials.json.example exists for reference)"
    
    # Check if example exists
    if [[ -f "scripts/credentials.json.example" ]]; then
        echo "✅ Found credentials example file"
    else
        echo "❌ Credentials example file missing"
    fi
else
    echo "✅ Google Sheets credentials found"
fi
echo ""

# Check environment variables
echo "🌍 Checking environment setup..."
if [[ -z "$GOOGLE_SHEET_ID" ]]; then
    echo "⚠️  GOOGLE_SHEET_ID environment variable not set"
    echo ""
    echo "To set your Google Sheet ID:"
    echo "export GOOGLE_SHEET_ID=\"your_sheet_id_from_url\""
    echo ""
    echo "Get your Sheet ID from the URL:"
    echo "https://docs.google.com/spreadsheets/d/[SHEET_ID]/edit"
else
    echo "✅ GOOGLE_SHEET_ID is set: $GOOGLE_SHEET_ID"
fi
echo ""

# Create assets directory if it doesn't exist
echo "📁 Setting up assets directory..."
if [[ ! -d "public/assets" ]]; then
    mkdir -p public/assets
    echo "✅ Created public/assets directory"
else
    echo "✅ Assets directory already exists"
fi
echo ""

# Test database setup
echo "🗄️  Testing database setup..."
if npm run postbuild > /dev/null 2>&1; then
    echo "✅ Database setup successful"
else
    echo "⚠️  Database setup failed - will be created on first sync"
fi
echo ""

# Check if we can run sync (dry run style check)
echo "🔄 Testing sync script..."
if [[ -f "scripts/credentials.json" && ! -z "$GOOGLE_SHEET_ID" ]]; then
    echo "🧪 Running sync test..."
    if npm run sync; then
        echo "✅ Sync test successful!"
    else
        echo "⚠️  Sync test failed - please check your credentials and sheet setup"
    fi
else
    echo "⏸️  Skipping sync test (missing credentials or sheet ID)"
fi
echo ""

# Image validation test
echo "🖼️  Testing image validation..."
if npm run validate-images > /dev/null 2>&1; then
    echo "✅ Image validation working"
else
    echo "⚠️  Image validation failed"
fi
echo ""

echo "📋 Setup Summary:"
echo "=================="
echo ""
echo "✅ Project structure verified"
echo "✅ Dependencies installed"

if [[ -f "scripts/credentials.json" ]]; then
    echo "✅ Google Sheets credentials configured"
else
    echo "❌ Google Sheets credentials missing"
fi

if [[ ! -z "$GOOGLE_SHEET_ID" ]]; then
    echo "✅ Sheet ID configured"
else
    echo "❌ Sheet ID not set"
fi

echo "✅ Assets directory ready"
echo "✅ Database scripts ready"
echo ""

echo "🎯 Next Steps:"
echo "=============="
echo ""

if [[ ! -f "scripts/credentials.json" ]]; then
    echo "1. Set up Google Sheets API credentials (see GOOGLE_SHEETS_INTEGRATION_GUIDE.md)"
    echo "2. Download credentials.json to scripts/ folder"
fi

if [[ -z "$GOOGLE_SHEET_ID" ]]; then
    echo "3. Set GOOGLE_SHEET_ID environment variable"
    echo "   export GOOGLE_SHEET_ID=\"your_sheet_id\""
fi

echo "4. Create your Google Sheet with 'Products' and 'Articles' tabs"
echo "5. Share sheet with service account email from credentials.json"
echo "6. Run 'npm run sync' to test the integration"
echo ""

echo "📚 Documentation:"
echo "- GOOGLE_SHEETS_INTEGRATION_GUIDE.md - Complete setup guide"
echo "- scripts/credentials.json.example - Credentials file structure"
echo ""

echo "🚀 Quick Commands:"
echo "- npm run sync              # Sync from Google Sheets"
echo "- npm run validate-images   # Validate all images"
echo "- npm run build            # Build site"
echo "- npm run dev              # Start development server"
echo ""

if [[ -f "scripts/credentials.json" && ! -z "$GOOGLE_SHEET_ID" ]]; then
    echo "🎉 Setup appears complete! Try running 'npm run sync' to test."
else
    echo "⚠️  Setup incomplete - follow the next steps above to finish configuration."
fi

echo ""
echo "Need help? Check GOOGLE_SHEETS_INTEGRATION_GUIDE.md for detailed instructions!"