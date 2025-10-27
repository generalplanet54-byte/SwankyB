#!/bin/bash

echo "🚀 SwankyBoyz Development Server Setup"
echo "======================================"
echo ""
echo "Choose your development mode:"
echo ""
echo "1) Frontend Only (npm run dev)"
echo "   - ✅ Fast startup"
echo "   - ✅ UI development" 
echo "   - ❌ API calls will fail (graceful fallbacks)"
echo ""
echo "2) Full Stack (npm run dev:full)"
echo "   - ✅ Complete API functionality"
echo "   - ✅ Admin features work"
echo "   - ⚠️  Requires Cloudflare auth"
echo ""
echo "3) Production Preview (npm run preview:pages)"
echo "   - ✅ Test production build"
echo "   - ✅ All features enabled"
echo "   - ⚠️  Must run 'npm run build' first"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
  1)
    echo "🎯 Starting frontend development server..."
    npm run dev
    ;;
  2)
    echo "🔧 Starting full-stack development servers..."
    echo "Note: This requires Cloudflare authentication."
    echo "Run 'npx wrangler auth login' if you haven't already."
    npm run dev:full
    ;;
  3)
    echo "📦 Building for production preview..."
    npm run build && npm run preview:pages
    ;;
  *)
    echo "❌ Invalid choice. Please run the script again."
    exit 1
    ;;
esac