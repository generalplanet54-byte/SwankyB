#!/bin/bash

# Copilot Agent Configuration Verification Script
# Run this to verify your repository is properly configured

echo "🔍 Verifying GitHub Copilot Agent Configuration..."
echo ""

# Color codes
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

ERRORS=0
WARNINGS=0

# Function to check if file exists
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1 exists"
        return 0
    else
        echo -e "${RED}❌${NC} $1 is missing"
        ((ERRORS++))
        return 1
    fi
}

# Function to check if directory exists
check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1 directory exists"
        return 0
    else
        echo -e "${RED}❌${NC} $1 directory is missing"
        ((ERRORS++))
        return 1
    fi
}

# Function to check if file contains text
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✅${NC} $1 contains required content"
        return 0
    else
        echo -e "${YELLOW}⚠️${NC} $1 may be missing required content: $2"
        ((WARNINGS++))
        return 1
    fi
}

echo "📁 Checking Documentation Files..."
echo "---"
check_file ".github/copilot-instructions.md"
check_file ".github/SETUP_GUIDE.md"
check_file ".github/CONTRIBUTING.md"
check_file ".github/README.md"
check_file "COPILOT_AGENT_CONFIGURATION.md"

echo ""
echo "📁 Checking Workflow Files..."
echo "---"
check_dir ".github/workflows"
check_file ".github/workflows/sync.yml"

echo ""
echo "🔒 Checking Security Configuration..."
echo "---"
check_file ".gitignore"
if check_content ".gitignore" "credentials.json"; then
    echo -e "${GREEN}✅${NC} credentials.json is in .gitignore"
else
    echo -e "${RED}❌${NC} credentials.json should be in .gitignore"
    ((ERRORS++))
fi

if check_content ".gitignore" "*.db"; then
    echo -e "${GREEN}✅${NC} Database files are in .gitignore"
else
    echo -e "${YELLOW}⚠️${NC} Consider adding database files to .gitignore"
    ((WARNINGS++))
fi

echo ""
echo "📜 Checking Scripts..."
echo "---"
check_file "scripts/sync-sheets.ts"
check_file "package.json"

if check_content "package.json" "\"sync\""; then
    echo -e "${GREEN}✅${NC} npm run sync script is configured"
else
    echo -e "${RED}❌${NC} npm run sync script is missing"
    ((ERRORS++))
fi

echo ""
echo "📦 Checking Project Structure..."
echo "---"
check_dir "src"
check_dir "public/assets"
check_dir "scripts"

echo ""
echo "🔍 Checking Copilot Instructions Content..."
echo "---"
check_content ".github/copilot-instructions.md" "Project Overview"
check_content ".github/copilot-instructions.md" "Technology Stack"
check_content ".github/copilot-instructions.md" "Code Style Guidelines"

echo ""
echo "📋 Checking Setup Guide Content..."
echo "---"
check_content ".github/SETUP_GUIDE.md" "Google Sheets Integration"
check_content ".github/SETUP_GUIDE.md" "Prerequisites"
check_content ".github/SETUP_GUIDE.md" "Deployment"

echo ""
echo "🤝 Checking Contributing Guide Content..."
echo "---"
check_content ".github/CONTRIBUTING.md" "Pull Request"
check_content ".github/CONTRIBUTING.md" "Code Style"
check_content ".github/CONTRIBUTING.md" "Testing"

echo ""
echo "⚙️ Checking Optional Files..."
echo "---"
if [ -f "scripts/credentials.json" ]; then
    echo -e "${GREEN}✅${NC} Google Sheets credentials found"
    echo -e "${YELLOW}⚠️${NC} Make sure credentials.json is not committed to git!"
else
    echo -e "${YELLOW}ℹ️${NC} scripts/credentials.json not found (create when setting up Google Sheets API)"
fi

if [ -f "swankyboyz.db" ]; then
    echo -e "${GREEN}✅${NC} Local database found"
else
    echo -e "${YELLOW}ℹ️${NC} swankyboyz.db not found (will be created on first build)"
fi

echo ""
echo "═══════════════════════════════════════════"
echo "📊 VERIFICATION SUMMARY"
echo "═══════════════════════════════════════════"

if [ $ERRORS -eq 0 ] && [ $WARNINGS -eq 0 ]; then
    echo -e "${GREEN}✅ Configuration is complete and ready!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Read .github/SETUP_GUIDE.md for setup instructions"
    echo "2. Configure Google Sheets API credentials"
    echo "3. Run 'npm run sync' to test content synchronization"
    echo "4. Start development with 'npm run dev'"
    exit 0
elif [ $ERRORS -eq 0 ]; then
    echo -e "${YELLOW}⚠️  Configuration is mostly complete with $WARNINGS warnings${NC}"
    echo ""
    echo "Review the warnings above and fix if needed."
    exit 0
else
    echo -e "${RED}❌ Configuration has $ERRORS errors and $WARNINGS warnings${NC}"
    echo ""
    echo "Please fix the errors above before proceeding."
    exit 1
fi
