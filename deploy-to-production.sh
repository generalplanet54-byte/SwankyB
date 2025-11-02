#!/bin/bash

# SwankyBoyz Production Deployment Script
# This script automates the deployment process to Cloudflare Pages
# Version: 1.0
# Date: November 2, 2025

set -e  # Exit on any error

echo "=================================================="
echo "SwankyBoyz Production Deployment"
echo "=================================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
    echo "ℹ️  $1"
}

# Step 1: Pre-flight checks
echo "Step 1: Pre-flight Checks"
echo "=========================="
echo ""

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    print_error "package.json not found. Are you in the SwankyBoyz directory?"
    exit 1
fi
print_success "Repository directory verified"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    print_warning "node_modules not found. Running npm install..."
    npm install
    print_success "Dependencies installed"
else
    print_success "Dependencies already installed"
fi

# Check if wrangler is available
if ! command -v wrangler &> /dev/null; then
    print_warning "Wrangler CLI not found. Installing globally..."
    npm install -g wrangler@latest
    print_success "Wrangler installed"
else
    print_success "Wrangler CLI available"
fi

echo ""
echo "Step 2: Environment Check"
echo "========================="
echo ""

# Check if required environment variables are documented
print_info "Required environment variables:"
echo "  - CF_API_TOKEN (Cloudflare API token)"
echo "  - CF_ACCOUNT_ID (Cloudflare account ID)"
echo "  - JWT_SECRET (for admin authentication)"
echo ""

# Ask user if they've configured environment variables
read -p "Have you configured the required secrets in GitHub and Cloudflare Pages? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "Please configure environment variables before deploying:"
    echo ""
    echo "GitHub Secrets (Settings → Secrets and variables → Actions):"
    echo "  - CF_API_TOKEN"
    echo "  - CF_ACCOUNT_ID"
    echo "  - JWT_SECRET"
    echo ""
    echo "Cloudflare Pages (Settings → Environment Variables):"
    echo "  - JWT_SECRET"
    echo "  - D1_DATABASE_ID=bfc16265-30bd-4bcf-8a72-f2a5a5baf61a"
    echo ""
    exit 1
fi
print_success "Environment variables confirmed"

echo ""
echo "Step 3: Build Process"
echo "===================="
echo ""

print_info "Building the application..."
npm run build

if [ $? -eq 0 ]; then
    print_success "Build completed successfully"
else
    print_error "Build failed. Please check the error messages above."
    exit 1
fi

# Check if dist directory was created
if [ ! -d "dist" ]; then
    print_error "dist/ directory not found after build. Build may have failed."
    exit 1
fi
print_success "Build artifacts verified in dist/"

echo ""
echo "Step 4: Database Check"
echo "====================="
echo ""

# Ask if D1 database has been initialized
read -p "Have you initialized the production D1 database with migrations? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_warning "You need to initialize the D1 database. Run these commands:"
    echo ""
    echo "wrangler d1 execute swankyb_content --file=./migrations/d1/001_initial_schema.sql --remote"
    echo "wrangler d1 execute swankyb_content --file=./migrations/d1/002_seed_first_articles.sql --remote"
    echo "wrangler d1 execute swankyb_content --file=./migrations/d1/009_add_comprehensive_product_catalog.sql --remote"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi
print_success "Database initialization confirmed"

echo ""
echo "Step 5: Deployment Options"
echo "=========================="
echo ""

print_info "Choose deployment method:"
echo "  1) Deploy via GitHub Actions (push to main)"
echo "  2) Deploy via Wrangler CLI (direct)"
echo "  3) Exit (manual deployment)"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        print_info "Preparing to push to main branch for GitHub Actions deployment..."
        
        # Check git status
        if [ -n "$(git status --porcelain)" ]; then
            print_warning "You have uncommitted changes. Commit them before pushing."
            git status --short
            echo ""
            read -p "Do you want to continue with push? (y/n) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
        fi
        
        # Check current branch
        current_branch=$(git branch --show-current)
        if [ "$current_branch" != "main" ]; then
            print_warning "You are on branch '$current_branch', not 'main'"
            read -p "Do you want to push to origin/$current_branch? (y/n) " -n 1 -r
            echo
            if [[ ! $REPLY =~ ^[Yy]$ ]]; then
                exit 1
            fi
        fi
        
        print_info "Pushing to origin/$current_branch..."
        git push origin $current_branch
        
        print_success "Code pushed! GitHub Actions will handle deployment."
        echo ""
        print_info "Monitor deployment at: https://github.com/generalplanet54-byte/SwankyB/actions"
        ;;
    
    2)
        echo ""
        print_info "Deploying via Wrangler CLI..."
        
        # Check if authenticated
        print_info "Checking Wrangler authentication..."
        wrangler whoami || {
            print_warning "Not authenticated. Running wrangler login..."
            wrangler login
        }
        
        print_info "Deploying to Cloudflare Pages..."
        wrangler pages deploy ./dist --project-name=swankyb --branch=main
        
        if [ $? -eq 0 ]; then
            print_success "Deployment completed successfully!"
        else
            print_error "Deployment failed. Check the error messages above."
            exit 1
        fi
        ;;
    
    3)
        print_info "Manual deployment selected. You can deploy by:"
        echo "  - Pushing code to trigger GitHub Actions"
        echo "  - Using: wrangler pages deploy ./dist --project-name=swankyb"
        exit 0
        ;;
    
    *)
        print_error "Invalid choice. Exiting."
        exit 1
        ;;
esac

echo ""
echo "Step 6: Post-Deployment Verification"
echo "===================================="
echo ""

print_info "Waiting 10 seconds for deployment to propagate..."
sleep 10

# Define the deployment URL
DEPLOY_URL="https://swankyb.pages.dev"

print_info "Testing homepage..."
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOY_URL" 2>/dev/null)

if [ "$HTTP_STATUS" == "200" ]; then
    print_success "Homepage is accessible (HTTP $HTTP_STATUS)"
else
    print_warning "Homepage returned HTTP $HTTP_STATUS (may still be deploying)"
fi

print_info "Testing API endpoints..."
API_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$DEPLOY_URL/api/products-d1?limit=1" 2>/dev/null)

if [ "$API_STATUS" == "200" ]; then
    print_success "Products API is working (HTTP $API_STATUS)"
else
    print_warning "Products API returned HTTP $API_STATUS"
fi

echo ""
echo "=================================================="
echo "Deployment Complete!"
echo "=================================================="
echo ""
print_success "Your site should be live at: $DEPLOY_URL"
echo ""
print_info "Next steps:"
echo "  1. Visit your site and verify it loads correctly"
echo "  2. Test all major features (products, articles, admin login)"
echo "  3. Change the default admin password (netmin/P@ssW#rd)"
echo "  4. Set up Google Analytics and Search Console"
echo "  5. Submit your sitemap: $DEPLOY_URL/sitemap.xml"
echo ""
print_info "For detailed monitoring, check:"
echo "  - Cloudflare Dashboard: https://dash.cloudflare.com"
echo "  - GitHub Actions: https://github.com/generalplanet54-byte/SwankyB/actions"
echo "  - Site Logs: Cloudflare Pages → swankyb → Functions logs"
echo ""
print_warning "Important security reminder:"
echo "  - Change default admin password immediately!"
echo "  - Review and update environment variables"
echo "  - Enable 2FA for critical accounts"
echo ""

# Optional: Open the site in browser
read -p "Would you like to open the site in your browser? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    if command -v open &> /dev/null; then
        open "$DEPLOY_URL"
    elif command -v xdg-open &> /dev/null; then
        xdg-open "$DEPLOY_URL"
    else
        print_info "Please visit: $DEPLOY_URL"
    fi
fi

echo ""
print_success "Deployment script completed successfully! 🎉"
echo ""
