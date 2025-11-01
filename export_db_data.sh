#!/bin/bash

# Export current database data to readable formats
echo "📦 Exporting database data..."
echo ""

# Export Products to CSV
echo "Exporting products..."
sqlite3 -header -csv swankyboyz.db "SELECT * FROM products;" > swankyboyz_products_backup.csv
echo "✅ Products exported to: swankyboyz_products_backup.csv"

# Export Articles to CSV
echo "Exporting articles..."
sqlite3 -header -csv swankyboyz.db "SELECT * FROM articles;" > swankyboyz_articles_backup.csv
echo "✅ Articles exported to: swankyboyz_articles_backup.csv"

# Export Products to JSON-like format
echo ""
echo "Creating readable text export..."
sqlite3 swankyboyz.db << 'SQL' > swankyboyz_data_backup.txt
.mode box
.headers on
SELECT '=== PRODUCTS ===' as info;
SELECT * FROM products;
SELECT '' as separator;
SELECT '=== ARTICLES ===' as info;
SELECT id, title, slug, date FROM articles;
SQL
echo "✅ Readable export: swankyboyz_data_backup.txt"

echo ""
echo "📊 Export Summary:"
echo "   • SQL dump: swankyboyz_backup_*.sql"
echo "   • Products CSV: swankyboyz_products_backup.csv"
echo "   • Articles CSV: swankyboyz_articles_backup.csv"
echo "   • Readable text: swankyboyz_data_backup.txt"
echo ""
echo "🔄 You can restore later with:"
echo "   sqlite3 swankyboyz.db < swankyboyz_backup_*.sql"
