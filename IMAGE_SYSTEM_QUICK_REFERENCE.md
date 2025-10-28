# Quick Reference - Image System

## Verify Everything Works

```bash
# 1. Check all images exist
ls -R public/images/

# 2. Count local images in data files
grep -c "/images/" src/data/launchArticles.ts   # Should output: 20
grep -c "/images/" src/data/launchProducts.ts   # Should output: 39

# 3. Verify no external URLs remain
grep -r "https://images\." src/data/            # Should be empty

# 4. Test image access
cat public/images/articles/skincare-luxury.svg  # Should show SVG content

# 5. Start dev server
npm run dev
```

## If You Need to Regenerate Images

```bash
# Regenerate all 28 images
node generate-images.cjs

# This will recreate:
# - 9 article images
# - 19 product images  
# - 1 hero image
```

## If You Need to Update Paths Again

```bash
# Re-run path update script
node update-image-paths.cjs

# This will scan and update image paths in:
# - src/data/launchArticles.ts
# - src/data/launchProducts.ts
```

## Image Categories Reference

### Articles (1200x675)
- `/images/articles/skincare-luxury.svg` - Skincare articles
- `/images/articles/grooming-essentials.svg` - Grooming articles
- `/images/articles/style-guide.svg` - Fashion/style articles
- `/images/articles/lifestyle-luxury.svg` - Lifestyle articles
- `/images/articles/tech-gadgets.svg` - Tech/audio articles
- `/images/articles/watches-accessories.svg` - Watch/accessory articles
- `/images/articles/fragrances.svg` - Fragrance articles
- `/images/articles/business-style.svg` - Business/professional articles
- `/images/articles/fitness-wellness.svg` - Fitness/wellness articles

### Products (800x600)
- `/images/products/grooming/electric-shaver.svg` - Electric shavers
- `/images/products/grooming/trimmer.svg` - Beard trimmers
- `/images/products/grooming/hair-clipper.svg` - Hair clippers
- `/images/products/grooming/nose-trimmer.svg` - Precision trimmers
- `/images/products/fashion/sneakers.svg` - Shoes/sneakers
- `/images/products/fashion/watch.svg` - Watches
- `/images/products/fashion/sunglasses.svg` - Sunglasses
- `/images/products/fashion/wallet.svg` - Wallets
- `/images/products/fashion/bag.svg` - Bags/backpacks
- `/images/products/tech/laptop.svg` - Laptops
- `/images/products/tech/headphones.svg` - Headphones/earbuds
- `/images/products/tech/tablet.svg` - Tablets
- `/images/products/skincare/serum.svg` - Serums
- `/images/products/skincare/moisturizer.svg` - Moisturizers
- `/images/products/skincare/eye-cream.svg` - Eye creams
- `/images/products/skincare/cleanser.svg` - Cleansers
- `/images/products/lifestyle/cologne.svg` - Colognes/perfumes
- `/images/products/lifestyle/fitness.svg` - Fitness gear

## Troubleshooting

### Images not displaying?
1. Check browser console for errors
2. Verify file exists: `ls public/images/articles/`
3. Clear browser cache
4. Restart dev server: `npm run dev`

### Need to add a new image category?
1. Edit `generate-images.cjs`
2. Add to `imageDefinitions` array
3. Run: `node generate-images.cjs`
4. Update data files to use new image

### Want different colors?
1. Edit `generate-images.cjs`
2. Modify the `colors` object
3. Regenerate: `node generate-images.cjs`

## Color Palette Used

```javascript
Charcoal: #2C2C2C  // Dark backgrounds
Steel:    #4A4A4A  // Medium gray
Gold:     #C5A572  // Accent/luxury
Burgundy: #8B3A3A  // Warm accent
Navy:     #1A2332  // Deep blue
Silver:   #8A8D93  // Light gray
Bronze:   #8C6239  // Warm metal
Black:    #000000  // Pure black
White:    #FFFFFF  // Pure white
```

## Future Enhancement Ideas

1. **Replace with Real Photos**
   - Source professional product photography
   - Maintain SVG as fallback
   - Update paths in data files

2. **Add CDN**
   - Upload to Cloudflare Images
   - Implement image transformation
   - Enable global caching

3. **Optimize Further**
   - Convert to WebP format
   - Add responsive images (srcset)
   - Implement lazy loading with blur-up

4. **Advanced Features**
   - Image hover effects
   - Product zoom on click
   - Gallery lightbox
   - 360° product views

## Status: ✅ Complete & Production Ready
