import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Comprehensive grooming products with detailed information
const groomingProducts = [
  {
    name: "Braun Series 9 PRO+ Electric Shaver",
    slug: "braun-series-9-pro-plus-electric-shaver",
    description: "The ultimate electric shaver for the modern gentleman. The Braun Series 9 PRO+ delivers the closest, most comfortable shave with its revolutionary 5 Pro Shave Elements. Featuring the ProComfort Head that adapts to facial contours and the intelligent SmartCare Center for automatic cleaning and charging. Perfect for men who demand professional-grade grooming results.",
    fullDescription: `
<h2>The Pinnacle of Electric Shaving Technology</h2>
<p>The Braun Series 9 PRO+ represents the ultimate evolution in men's grooming technology. Engineered for the most discerning gentlemen, this premium electric shaver combines cutting-edge innovation with superior comfort.</p>

<h3>Revolutionary 5 Pro Shave Elements</h3>
<ul>
<li><strong>ProLift & Cut Trimmer:</strong> Lifts and cuts flat-lying hairs with precision</li>
<li><strong>Specialized Middle Trimmer:</strong> Cuts stubborn hairs that grow in different directions</li>
<li><strong>2 OptiFoil Cutting Elements:</strong> Capture more hair with every stroke</li>
<li><strong>Direct & Cut Trimmer:</strong> Cuts hair that lies flat against the skin</li>
</ul>

<h3>ProComfort Head Technology</h3>
<p>The flexible ProComfort Head adapts to your facial contours, ensuring maximum skin contact while maintaining gentleness. The pressure-sensitive technology automatically adjusts to prevent irritation.</p>

<h3>SmartCare Center - Professional Maintenance</h3>
<p>The intelligent SmartCare Center automatically cleans, lubricates, charges, and dries your shaver. One press delivers hygiene and performance that matches professional barbershop standards.</p>

<h3>Who Should Choose the Series 9 PRO+?</h3>
<ul>
<li>Executives and professionals who value premium quality</li>
<li>Men with sensitive skin requiring gentle yet effective shaving</li>
<li>Those seeking the closest possible electric shave</li>
<li>Busy individuals who want effortless maintenance</li>
</ul>
`,
    price: 299.99,
    originalPrice: 349.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/4ooMFju",
    imageUrl: "https://m.media-amazon.com/images/I/61GjzFzFURL._AC_SL1500_.jpg",
    rating: 4.8,
    features: [
      "5 Pro Shave Elements for ultimate closeness",
      "ProComfort Head adapts to facial contours", 
      "SmartCare Center for automatic maintenance",
      "100% waterproof for wet & dry use",
      "60-minute cordless runtime"
    ],
    tags: ["premium", "electric-shaver", "braun", "professional", "smart-care"]
  },
  {
    name: "Braun Series 8 8567cc Electric Razor",
    slug: "braun-series-8-8567cc-electric-razor",
    description: "Advanced electric razor engineered for dense beards. Features 4+1 shaving elements with precision long hair trimmer and 5-in-1 SmartCare Center. Delivers close, gentle shaves even on the toughest beards with 60-minute runtime for ultimate convenience.",
    fullDescription: `
<h2>Precision Engineering for Dense Beards</h2>
<p>The Braun Series 8 8567cc is specifically engineered for men with dense, challenging beards. This sophisticated electric razor combines German precision with innovative technology to deliver consistently superior results.</p>

<h3>4+1 Shaving Elements System</h3>
<ul>
<li><strong>OptiFoil:</strong> Captures more hair in every stroke</li>
<li><strong>DirectCut Trimmer:</strong> Cuts flat-lying hairs efficiently</li>
<li><strong>HyperLift & Cut Trimmer:</strong> Lifts and cuts challenging hairs</li>
<li><strong>ProLift Trimmer:</strong> Captures flat-lying hairs</li>
<li><strong>Precision Long Hair Trimmer:</strong> Perfect for detailed grooming</li>
</ul>

<h3>Advanced Wet & Dry Technology</h3>
<p>100% waterproof design allows for comfortable dry shaving or refreshing wet shaves with foam or gel. The flexible head adapts to facial contours for maximum comfort and efficiency.</p>

<h3>5-in-1 SmartCare Center</h3>
<p>Automatically cleans, lubricates, dries, charges, and selects the optimal cleaning program. Maintains peak performance with minimal effort.</p>

<h3>Perfect For:</h3>
<ul>
<li>Men with thick, coarse, or dense facial hair</li>
<li>Those who shave daily or every other day</li>
<li>Professionals seeking reliable, consistent results</li>
<li>Men who prefer both wet and dry shaving options</li>
</ul>
`,
    price: 199.99,
    originalPrice: 249.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/43cCrdG",
    imageUrl: "https://m.media-amazon.com/images/I/71+2sLVlYCL._AC_SL1500_.jpg",
    rating: 4.6,
    features: [
      "4+1 shaving elements for dense beards",
      "Precision long hair trimmer included",
      "5-in-1 SmartCare Center maintenance",
      "Wet & dry shaving capability",
      "60-minute cordless operation"
    ],
    tags: ["electric-razor", "braun", "dense-beard", "wet-dry", "smart-care"]
  },
  {
    name: "Braun 9-in-1 Hair Clippers for Men",
    slug: "braun-9-in-1-hair-clippers-grooming-kit",
    description: "Complete grooming solution featuring 9-in-1 versatility. Includes beard, ear & nose trimmer, body grooming attachments, cordless operation, and Gillette ProGlide razor. The ultimate all-in-one grooming kit for the modern man.",
    fullDescription: `
<h2>Complete Grooming Arsenal in One Kit</h2>
<p>The Braun 9-in-1 Hair Clippers represent the ultimate in grooming versatility. This comprehensive kit eliminates the need for multiple devices, providing professional-quality results for every grooming need.</p>

<h3>9 Essential Grooming Tools</h3>
<ul>
<li><strong>Hair Clipper:</strong> Professional-grade cutting for all hair lengths</li>
<li><strong>Beard Trimmer:</strong> Precision styling for facial hair</li>
<li><strong>Detail Trimmer:</strong> Perfect for edges and fine work</li>
<li><strong>Ear & Nose Trimmer:</strong> Safe, comfortable grooming</li>
<li><strong>Body Groomer:</strong> Gentle yet effective body hair management</li>
<li><strong>Multiple Combs:</strong> Various length settings for customization</li>
<li><strong>Gillette ProGlide Razor:</strong> Premium blade for finishing touches</li>
</ul>

<h3>German Engineering Excellence</h3>
<p>Featuring ultra-sharp stainless steel blades that stay sharp longer, with precision-engineered cutting mechanisms that deliver consistent results across all attachments.</p>

<h3>Cordless Convenience</h3>
<p>Powerful lithium-ion battery provides extended runtime with quick-charge capability. Cordless design offers complete freedom of movement.</p>

<h3>Ideal For:</h3>
<ul>
<li>Men seeking one comprehensive grooming solution</li>
<li>Travelers who want to pack light</li>
<li>Those new to grooming who want versatility</li>
<li>Anyone looking for exceptional value</li>
</ul>
`,
    price: 89.99,
    originalPrice: 119.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/47nIqPk",
    imageUrl: "https://m.media-amazon.com/images/I/81fX0JMJSQL._AC_SL1500_.jpg",
    rating: 4.5,
    features: [
      "9-in-1 complete grooming solution",
      "Includes Gillette ProGlide razor",
      "Cordless & rechargeable operation",
      "Multiple precision attachments",
      "German-engineered cutting technology"
    ],
    tags: ["hair-clipper", "9-in-1", "braun", "grooming-kit", "versatile"]
  },
  {
    name: "Braun All-in-One Series 7 7420 Grooming Kit",
    slug: "braun-series-7-7420-all-in-one-grooming-kit",
    description: "Professional 11-in-1 grooming system covering every need. Features beard, face, nose, ear trimmer, hair clippers, body groomer, and manscaping tools. The most comprehensive grooming solution for the complete gentleman.",
    fullDescription: `
<h2>The Ultimate 11-in-1 Grooming Experience</h2>
<p>The Braun Series 7 7420 redefines comprehensive grooming with its professional-grade 11-in-1 system. This premium kit addresses every grooming need with precision, comfort, and reliability.</p>

<h3>Complete 11-Tool Arsenal</h3>
<ul>
<li><strong>Precision Hair Clipper:</strong> Professional salon-quality cutting</li>
<li><strong>Beard & Mustache Trimmer:</strong> Detailed facial hair styling</li>
<li><strong>Detail Trimmer:</strong> Perfect edges and fine lines</li>
<li><strong>Nose & Ear Trimmer:</strong> Safe, hygienic grooming</li>
<li><strong>Body Groomer:</strong> Gentle full-body hair management</li>
<li><strong>Manscaping Tools:</strong> Specialized intimate grooming</li>
<li><strong>Multiple Guide Combs:</strong> 13 length settings (1-21mm)</li>
<li><strong>Precision Dial:</strong> 20 lock-in length settings</li>
</ul>

<h3>Advanced AutoSense Technology</h3>
<p>Intelligent motor automatically adjusts power based on hair density, ensuring optimal cutting performance while maintaining skin comfort.</p>

<h3>Premium Build Quality</h3>
<p>German-engineered with lifetime sharp blades that never need oiling. 100% waterproof design allows for easy cleaning and wet/dry use.</p>

<h3>Long-lasting Performance</h3>
<p>Up to 100 minutes of cordless runtime with quick 1-hour charging. LED display shows battery status and maintenance reminders.</p>

<h3>Perfect For:</h3>
<ul>
<li>Men who want the ultimate grooming experience</li>
<li>Those seeking professional salon results at home</li>
<li>Individuals who value German engineering quality</li>
<li>Men looking for long-term grooming investment</li>
</ul>
`,
    price: 149.99,
    originalPrice: 199.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/46SQyY4",
    imageUrl: "https://m.media-amazon.com/images/I/81lHN4-mKJL._AC_SL1500_.jpg",
    rating: 4.7,
    features: [
      "11-in-1 complete grooming system",
      "AutoSense technology adapts to hair density",
      "100 minutes cordless runtime",
      "20 precision length settings",
      "Lifetime sharp blades"
    ],
    tags: ["series-7", "11-in-1", "braun", "autosense", "premium"]
  },
  {
    name: "WAHL Stainless Steel Lithium Ion 2.0+ Slate Trimmer",
    slug: "wahl-stainless-steel-lithium-slate-trimmer",
    description: "Professional-grade American craftsmanship meets modern technology. Features stainless steel construction, lithium-ion power, and comprehensive grooming attachments. The perfect blend of durability, performance, and value for discerning men.",
    fullDescription: `
<h2>American Craftsmanship Meets Modern Innovation</h2>
<p>The WAHL Stainless Steel Lithium Ion 2.0+ Slate represents over 100 years of American grooming expertise. This professional-grade trimmer combines traditional craftsmanship with cutting-edge technology.</p>

<h3>Premium Stainless Steel Construction</h3>
<p>Built with high-grade stainless steel for exceptional durability and hygiene. The sleek slate finish provides a sophisticated aesthetic while ensuring long-lasting performance and easy maintenance.</p>

<h3>Advanced Lithium Ion 2.0+ Technology</h3>
<ul>
<li><strong>Extended Runtime:</strong> Up to 4 hours of continuous use</li>
<li><strong>Quick Charge:</strong> 15-minute charge provides 30 minutes of use</li>
<li><strong>No Memory Effect:</strong> Battery maintains full capacity over time</li>
<li><strong>Consistent Power:</strong> Steady cutting performance throughout use</li>
</ul>

<h3>Comprehensive Grooming Kit</h3>
<ul>
<li>Precision trimmer with adjustable guide combs</li>
<li>Nose and ear trimmer attachment</li>
<li>Detail trimmer for precision work</li>
<li>Multiple guide combs for various lengths</li>
<li>Professional-grade accessories</li>
</ul>

<h3>Professional Performance</h3>
<p>Self-sharpening precision blades stay sharp for years. The powerful motor cuts through all hair types effortlessly while maintaining whisper-quiet operation.</p>

<h3>Ideal For:</h3>
<ul>
<li>Men who appreciate American-made quality</li>
<li>Professionals requiring reliable performance</li>
<li>Those seeking exceptional battery life</li>
<li>Users who value durability and longevity</li>
</ul>
`,
    price: 79.99,
    originalPrice: 99.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/4n5fGPU",
    imageUrl: "https://m.media-amazon.com/images/I/71yzLKdE9cL._AC_SL1500_.jpg",
    rating: 4.4,
    features: [
      "Stainless steel construction",
      "4-hour lithium-ion battery life",
      "15-minute quick charge capability",
      "Self-sharpening precision blades",
      "American-made quality"
    ],
    tags: ["wahl", "stainless-steel", "lithium-ion", "american-made", "professional"]
  },
  {
    name: "MANSCAPED The Beard Hedger Premium Trimmer",
    slug: "manscaped-beard-hedger-premium-trimmer",
    description: "Revolutionary 20-length adjustable blade wheel for ultimate precision. Features stainless steel T-blade technology, waterproof design, and cordless convenience. The premium choice for men who demand perfection in facial hair grooming.",
    fullDescription: `
<h2>Precision Redefined for the Modern Gentleman</h2>
<p>The MANSCAPED Beard Hedger Premium represents a revolutionary approach to facial hair grooming. Designed specifically for men who demand precision, comfort, and style in their grooming routine.</p>

<h3>Revolutionary 20-Length Adjustable Blade Wheel</h3>
<p>The innovative adjustable blade wheel provides 20 different length settings with precise 0.5mm increments. This allows for seamless blending and perfect length consistency across your entire beard or mustache.</p>

<h3>Stainless Steel T-Blade Technology</h3>
<ul>
<li><strong>Superior Cutting Performance:</strong> Sharp, durable stainless steel construction</li>
<li><strong>Precise Edge Definition:</strong> Perfect for creating clean lines and edges</li>
<li><strong>Skin-Safe Design:</strong> Rounded blade tips prevent nicks and cuts</li>
<li><strong>Easy Maintenance:</strong> Simple to clean and maintain sharpness</li>
</ul>

<h3>Waterproof Wet/Dry Capability</h3>
<p>IPX7 waterproof rating allows for convenient use in the shower with foam or gel, or comfortable dry trimming. Easy rinse cleaning keeps the trimmer hygienic and fresh.</p>

<h3>Cordless Freedom & Power</h3>
<p>High-performance battery provides extended runtime with consistent power delivery. USB charging ensures convenient charging anywhere, anytime.</p>

<h3>Perfect For:</h3>
<ul>
<li>Men who take facial hair styling seriously</li>
<li>Those seeking professional barbershop precision at home</li>
<li>Individuals who prefer wet or dry grooming flexibility</li>
<li>Style-conscious men who want the latest grooming technology</li>
</ul>
`,
    price: 69.99,
    originalPrice: 89.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/476kfUf",
    imageUrl: "https://m.media-amazon.com/images/I/61GVjHRrwzL._AC_SL1500_.jpg",
    rating: 4.3,
    features: [
      "20-length adjustable blade wheel",
      "Stainless steel T-blade technology",
      "IPX7 waterproof design",
      "Cordless with USB charging",
      "Precision facial hair trimming"
    ],
    tags: ["manscaped", "beard-trimmer", "adjustable", "waterproof", "precision"]
  },
  {
    name: "MANSCAPED The Chairman PRO Electric Foil Shaver",
    slug: "manscaped-chairman-pro-electric-foil-shaver",
    description: "Premium electric foil shaver with dual interchangeable blade heads. Features SkinSafe 4-blade foil technology and stubble trimmer. USB-C wireless charging with gentle neck-friendly design for the ultimate comfortable shave.",
    fullDescription: `
<h2>Executive-Level Shaving Excellence</h2>
<p>The MANSCAPED Chairman PRO elevates electric shaving to executive levels. This premium foil shaver is engineered for the modern professional who demands superior comfort, performance, and style.</p>

<h3>Dual Interchangeable Blade System</h3>
<ul>
<li><strong>SkinSafe 4-Blade Foil Head:</strong> Ultra-close shave without irritation</li>
<li><strong>Precision Stubble Trimmer:</strong> Perfect for maintaining stubble or detail work</li>
<li><strong>Easy Swap Technology:</strong> Quick blade head changes for versatility</li>
<li><strong>Advanced Foil Design:</strong> Captures hair efficiently while protecting skin</li>
</ul>

<h3>SkinSafe Technology</h3>
<p>Revolutionary SkinSafe design prioritizes skin health and comfort. The advanced foil system provides an incredibly close shave while minimizing friction and irritation, especially on sensitive neck areas.</p>

<h3>Modern Charging & Connectivity</h3>
<p>Features USB-C charging for fast, convenient power delivery. Wireless charging compatibility provides ultimate convenience for the tech-savvy gentleman.</p>

<h3>Ergonomic Professional Design</h3>
<p>Sleek, sophisticated design fits comfortably in hand with balanced weight distribution. The premium materials and finish reflect the quality and attention to detail expected by discerning professionals.</p>

<h3>Gentle on Sensitive Skin</h3>
<p>Specifically engineered for men with sensitive skin, particularly around the delicate neck area. Reduces razor burn, ingrown hairs, and post-shave irritation.</p>

<h3>Ideal For:</h3>
<ul>
<li>Business professionals requiring impeccable grooming</li>
<li>Men with sensitive skin prone to irritation</li>
<li>Those who prefer electric shaving convenience</li>
<li>Individuals seeking premium grooming tools</li>
</ul>
`,
    price: 89.99,
    originalPrice: 119.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/4nap8BQ",
    imageUrl: "https://m.media-amazon.com/images/I/61oFPfJZvnL._AC_SL1500_.jpg",
    rating: 4.2,
    features: [
      "Dual interchangeable blade heads",
      "SkinSafe 4-blade foil technology",
      "USB-C wireless charging",
      "Gentle on sensitive neck skin",
      "Professional executive design"
    ],
    tags: ["manscaped", "electric-shaver", "foil-shaver", "skinsafe", "wireless-charging"]
  },
  {
    name: "METALFX Double Foil Shaver Travel Razor",
    slug: "metalfx-double-foil-travel-shaver",
    description: "Compact handheld electric razor perfect for travel and touch-ups. Features double foil design, portable cordless operation, and versatile use for head, beard, and neck. The ideal travel companion for the mobile professional.",
    fullDescription: `
<h2>Ultimate Portability Meets Reliable Performance</h2>
<p>The METALFX Double Foil Shaver is the perfect solution for men who need reliable grooming performance in a compact, travel-friendly package. Don't let its size fool you - this mighty shaver delivers professional results.</p>

<h3>Compact Double Foil Design</h3>
<p>The innovative double foil system maximizes cutting efficiency in a minimal footprint. Two precision foils work together to capture and cut hair quickly and comfortably, providing a surprisingly close shave.</p>

<h3>Ultimate Travel Convenience</h3>
<ul>
<li><strong>Pocket-Sized Design:</strong> Fits easily in travel bags, briefcases, or pockets</li>
<li><strong>TSA-Friendly:</strong> Perfect for air travel with no restrictions</li>
<li><strong>Lightweight Construction:</strong> Won't add bulk to your travel kit</li>
<li><strong>Durable Build:</strong> Withstands the rigors of frequent travel</li>
</ul>

<h3>Versatile Grooming Applications</h3>
<p>This versatile shaver works effectively on:</p>
<ul>
<li>Face and neck for quick touch-ups</li>
<li>Head shaving for bald men</li>
<li>Beard maintenance and cleanup</li>
<li>Emergency grooming situations</li>
</ul>

<h3>Cordless Convenience</h3>
<p>Battery-powered operation eliminates the need for cords or outlets. Simple, reliable power that's ready when you need it most.</p>

<h3>Easy Maintenance</h3>
<p>Simple design means easy cleaning and maintenance. Pop-off foil heads allow for quick cleaning and blade access.</p>

<h3>Perfect For:</h3>
<ul>
<li>Frequent travelers and business professionals</li>
<li>Men who need emergency grooming solutions</li>
<li>Those seeking an affordable backup shaver</li>
<li>Students and budget-conscious individuals</li>
<li>Anyone wanting a reliable travel grooming tool</li>
</ul>
`,
    price: 39.99,
    originalPrice: 49.99,
    category: "Grooming",
    affiliateUrl: "https://amzn.to/4he6uYf",
    imageUrl: "https://m.media-amazon.com/images/I/61tGzRqS6HL._AC_SL1500_.jpg",
    rating: 4.0,
    features: [
      "Compact double foil design",
      "Perfect for travel and portability",
      "Cordless battery operation",
      "Versatile head, beard, neck use",
      "Easy maintenance and cleaning"
    ],
    tags: ["metalfx", "travel-shaver", "portable", "double-foil", "budget-friendly"]
  }
];

// Generate product import JSON
const productImportData = {
  products: groomingProducts,
  metadata: {
    category: "Grooming",
    importDate: new Date().toISOString(),
    totalProducts: groomingProducts.length,
    priceRange: {
      min: Math.min(...groomingProducts.map(p => p.price)),
      max: Math.max(...groomingProducts.map(p => p.price))
    }
  }
};

// Write the import file
const outputPath = path.join(__dirname, '../public/data/grooming-products-import.json');
const outputDir = path.dirname(outputPath);

// Ensure directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

fs.writeFileSync(outputPath, JSON.stringify(productImportData, null, 2));

console.log(`✅ Grooming products import file created: ${outputPath}`);
console.log(`📦 Total products: ${groomingProducts.length}`);
console.log(`💰 Price range: $${productImportData.metadata.priceRange.min} - $${productImportData.metadata.priceRange.max}`);
console.log(`📊 Categories: ${productImportData.metadata.category}`);

// Summary for manual import
console.log('\n📋 PRODUCT SUMMARY FOR MANUAL ADMIN IMPORT:');
console.log('=' .repeat(60));
groomingProducts.forEach((product, index) => {
  console.log(`${index + 1}. ${product.name}`);
  console.log(`   Price: $${product.price}`);
  console.log(`   Affiliate: ${product.affiliateUrl}`);
  console.log(`   Slug: ${product.slug}`);
  console.log('');
});

export { groomingProducts };