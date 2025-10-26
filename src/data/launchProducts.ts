export interface LaunchAffiliateProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  affiliateUrl: string;
  rating: number;
  provider: 'amazon' | 'cjdropshipping' | 'aliexpress';
  category: string;
  commission: number;
}

export const launchProducts: LaunchAffiliateProduct[] = [
  // GROOMING - Electric Shavers & Trimmers
  {
    id: 'prod-braun-series-9-pro-plus',
    name: 'Braun Series 9 PRO+ Electric Shaver',
    description: 'Braun\'s flagship five-element shaver with ProComfort head, 60-minute battery life, and SmartCare cleaning center for effortless daily grooming.',
    price: '$299.99',
    originalPrice: '$349.99',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4ooMFju',
    rating: 4.8,
    provider: 'amazon',
    category: 'Grooming',
    commission: 12
  },
  {
    id: 'prod-braun-series-8',
    name: 'Braun Series 8 8567cc Electric Razor',
    description: 'High-performance 4+1 shaving system engineered for dense beards with precision trimmer and SmartCare Center.',
    price: '$199.99',
    originalPrice: '$229.99',
    image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/43cCrdG',
    rating: 4.6,
    provider: 'amazon',
    category: 'Grooming',
    commission: 12
  },
  {
    id: 'prod-braun-hair-clippers-9-in-1',
    name: 'Braun 9-in-1 Beard, Ear & Nose Trimmer Kit',
    description: 'Comprehensive grooming kit with Gillette ProGlide Razor, cordless rechargeable design for complete head-to-toe styling.',
    price: '$59.99',
    originalPrice: '$79.99',
    image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/47nIqPk',
    rating: 4.5,
    provider: 'amazon',
    category: 'Grooming',
    commission: 10
  },
  {
    id: 'prod-braun-series-7-kit',
    name: 'Braun Series 7 7420 11-in-1 Grooming Kit',
    description: 'AutoSense-powered all-in-one grooming system with eleven premium attachments for beard, body, and hair care.',
    price: '$119.99',
    originalPrice: '$139.99',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/46SQyY4',
    rating: 4.7,
    provider: 'amazon',
    category: 'Grooming',
    commission: 12
  },
  {
    id: 'prod-wahl-stainless-steel-slate',
    name: 'WAHL Stainless Steel Lithium Ion 2.0+ Slate Trimmer',
    description: 'Premium all-in-one men\'s grooming kit with stainless steel construction, 4-hour lithium battery, and self-sharpening blades.',
    price: '$79.99',
    image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4n5fGPU',
    rating: 4.4,
    provider: 'amazon',
    category: 'Grooming',
    commission: 10
  },
  {
    id: 'prod-manscaped-beard-hedger',
    name: 'MANSCAPED Beard Hedger Premium Trimmer',
    description: '20-length adjustable beard trimmer with stainless steel T-blade and waterproof design for precision styling.',
    price: '$69.99',
    originalPrice: '$89.99',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/476kfUf',
    rating: 4.5,
    provider: 'amazon',
    category: 'Grooming',
    commission: 10
  },
  {
    id: 'prod-manscaped-chairman-pro',
    name: 'MANSCAPED The Chairman PRO Electric Shaver',
    description: 'Dual-head electric shaver featuring SkinSafe four-blade foil technology, wireless charging, and travel-ready USB-C power.',
    price: '$89.99',
    originalPrice: '$109.99',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4nap8BQ',
    rating: 4.4,
    provider: 'amazon',
    category: 'Grooming',
    commission: 10
  },
  {
    id: 'prod-metalfx-double-foil',
    name: 'METALFX Double Foil Travel Shaver',
    description: 'Handheld electric razor for travel, portable cordless close shave for head, beard, and neck with compact design.',
    price: '$29.99',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4he6uYf',
    rating: 4.2,
    provider: 'amazon',
    category: 'Travel',
    commission: 8
  },

  // FOOTWEAR - Sneakers & Orthopedic Shoes
  {
    id: 'prod-nike-cortez-sneakers',
    name: 'Nike Men\'s Cortez Sneakers',
    description: 'Classic Nike Cortez with timeless silhouette, premium leather upper, and cushioned midsole for all-day comfort.',
    price: '$85.00',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4mMEw7e',
    rating: 4.6,
    provider: 'amazon',
    category: 'Footwear',
    commission: 8
  },
  {
    id: 'prod-gravity-defyer-mighty-walk',
    name: 'Gravity Defyer Men\'s Mighty Walk Pain Relief Shoes',
    description: 'Advanced orthopedic walking shoes with arch support, plantar fasciitis relief, and included custom orthotic for all-day comfort.',
    price: '$159.99',
    originalPrice: '$189.99',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4h0cX9k',
    rating: 4.5,
    provider: 'amazon',
    category: 'Footwear',
    commission: 10
  },
  {
    id: 'prod-gdefy-mighty-walk-orthopedic',
    name: 'G-DEFY Mighty Walk Men\'s Orthopedic Walking Shoe',
    description: 'VersoShock Technology for pain relief from running and prolonged standing, with arch support and diabetic-friendly design.',
    price: '$169.99',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/3IUsQ4j',
    rating: 4.6,
    provider: 'amazon',
    category: 'Footwear',
    commission: 10
  },
  {
    id: 'prod-orthofeet-edgewater-sneakers',
    name: 'Orthofeet Men\'s Orthopedic Knit Edgewater Sneakers',
    description: 'Lightweight orthopedic sneakers with premium cushioning, arch support, and breathable knit construction for maximum comfort.',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4o3Ap7R',
    rating: 4.4,
    provider: 'amazon',
    category: 'Footwear',
    commission: 10
  },

  // SMARTPHONES - Premium & Foldable Devices
  {
    id: 'prod-samsung-galaxy-z-flip7',
    name: 'Samsung Galaxy Z Flip7 Cell Phone 512GB',
    description: 'AI-powered foldable smartphone with long battery life, 512GB storage, unlocked for all carriers, 2025 model in Coral Red.',
    price: '$1,099.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/46SkWQU',
    rating: 4.7,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-motorola-razr-2024',
    name: 'Motorola razr 2024 Unlocked 8/256GB',
    description: 'Modern flip phone with 50MP camera, made for US networks, 8GB RAM and 256GB storage in Beach Sand.',
    price: '$699.99',
    originalPrice: '$799.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/46Bc7ME',
    rating: 4.5,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-nothing-phone-3',
    name: 'Nothing Phone (3) 5G Unlocked 256GB',
    description: 'Android 15 smartphone with Snapdragon 8s Gen4, quad 50MP cameras, AMOLED display, 5150mAh battery, and unique Glyph Interface.',
    price: '$649.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/48abGdl',
    rating: 4.6,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-redmagic-10-air',
    name: 'REDMAGIC 10 Air Gaming Smartphone 5G',
    description: '120Hz gaming phone with 6.8" FHD+ display, under-display camera, 5860mAh battery, 16GB+512GB, 80W fast charging.',
    price: '$799.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/3KDphjs',
    rating: 4.4,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-oneplus-13',
    name: 'OnePlus 13 12GB+256GB Unlocked',
    description: 'Snapdragon 8 Elite flagship with 80W SUPERVOOC fast charging, 50W wireless, Hasselblad camera, Black Eclipse.',
    price: '$899.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4gVobvI',
    rating: 4.7,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-honor-magic-v2',
    name: 'HONOR Magic V2 Dual SIM 512GB+16GB',
    description: 'Premium foldable smartphone with 512GB storage, 16GB RAM, 5G connectivity, factory unlocked in Phantom Purple.',
    price: '$1,299.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4gQH82m',
    rating: 4.6,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-apple-iphone-16-pro',
    name: 'Apple iPhone 16 Pro 256GB Black Titanium',
    description: 'Renewed iPhone 16 Pro for T-Mobile, 256GB storage in Black Titanium with advanced camera system and A18 Pro chip.',
    price: '$999.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/3Iufsnz',
    rating: 4.8,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-samsung-galaxy-s25-ultra',
    name: 'SAMSUNG Galaxy S25 Ultra 512GB',
    description: 'AI-powered flagship with 512GB storage, Snapdragon 8 Elite, built-in S Pen, 5000mAh battery, Titanium Black.',
    price: '$1,299.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/432w9x4',
    rating: 4.9,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-samsung-galaxy-s24-ultra',
    name: 'SAMSUNG Galaxy S24 Ultra 256GB',
    description: '50MP 100x zoom camera, Note Assist, fastest processor, S Pen included, rugged design in Titanium Yellow.',
    price: '$1,199.99',
    originalPrice: '$1,299.99',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/3IWoiKP',
    rating: 4.8,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },

  // LAPTOPS - MacBooks & Gaming
  {
    id: 'prod-macbook-air-m4-2025',
    name: 'Apple MacBook Air 13" M4 Chip with AppleCare+',
    description: 'Built for Apple Intelligence, 13.6" Liquid Retina Display, 16GB memory, 256GB SSD, Touch ID, Silver with 3-year AppleCare+.',
    price: '$1,399.99',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/3KzOivV',
    rating: 4.9,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-macbook-pro-m4-pro-16',
    name: 'Apple MacBook Pro 16" M4 Pro Chip',
    description: '14-core CPU, 20-core GPU, 16.2" Liquid Retina XDR Display, 24GB unified memory, 512GB SSD, Space Black.',
    price: '$2,499.99',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/3VOrj2I',
    rating: 4.9,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-macbook-pro-m4-14',
    name: 'Apple MacBook Pro 14" M4 Chip',
    description: '10-core CPU, 10-core GPU, 14.2" Liquid Retina XDR Display, 16GB unified memory, 512GB SSD, Space Black.',
    price: '$1,599.99',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4o39RDE',
    rating: 4.9,
    provider: 'amazon',
    category: 'Tech',
    commission: 3
  },
  {
    id: 'prod-lg-gram-15-touchscreen',
    name: 'LG gram 15" Thin Touchscreen Laptop',
    description: 'Intel Evo Edition Core Ultra7 255H, 16GB RAM, 1TB SSD, Windows 11 Home, AI-enabled, Obsidian Black.',
    price: '$1,299.99',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4pQKEy5',
    rating: 4.6,
    provider: 'amazon',
    category: 'Tech',
    commission: 4
  },
  {
    id: 'prod-asus-rog-strix-g16-2025',
    name: 'ASUS ROG Strix G16 (2025) Gaming Laptop',
    description: '16" FHD+ 165Hz display, RTX 5060, Intel Core i7-14650HX, 16GB DDR5, 1TB SSD, Wi-Fi 7, Windows 11.',
    price: '$1,699.99',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/46TnNci',
    rating: 4.7,
    provider: 'amazon',
    category: 'Tech',
    commission: 4
  },
  {
    id: 'prod-asus-rog-strix-g18',
    name: 'ASUS ROG Strix G18 Gaming Laptop',
    description: 'Intel Ultra 9-275HX, RTX 5060, 64GB DDR5, 2TB SSD, 18" 2.5K display, RGB keyboard, Eclipse Gray.',
    price: '$2,499.99',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/3KTPzy0',
    rating: 4.8,
    provider: 'amazon',
    category: 'Tech',
    commission: 4
  },
  {
    id: 'prod-msi-thin-gaming',
    name: 'MSI Thin Gaming Laptop 15.6" FHD 144Hz',
    description: 'Intel i5-13420H, RTX 3050, 16GB RAM, 512GB NVMe SSD, Windows 11 Home, affordable gaming performance.',
    price: '$849.99',
    originalPrice: '$999.99',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4nHqoxs',
    rating: 4.4,
    provider: 'amazon',
    category: 'Tech',
    commission: 4
  },
  {
    id: 'prod-lg-gram-pro-16',
    name: 'LG gram Pro 16" Lightweight Laptop',
    description: 'Intel Core Ultra9 285H, NVIDIA RTX 5050, 32GB RAM, 2TB SSD, Windows 11 Home, premium ultraportable.',
    price: '$2,299.99',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4mNkucw',
    rating: 4.7,
    provider: 'amazon',
    category: 'Tech',
    commission: 4
  },

  // AUDIO - Microphones & Podcasting
  {
    id: 'prod-shure-mv7-plus',
    name: 'Shure MV7+ Podcast Dynamic Microphone',
    description: 'OBS certified, enhanced audio, LED panel, USB-C & XLR outputs, auto level mode, digital pop filter, reverb effects.',
    price: '$329.99',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/42mtyhw',
    rating: 4.8,
    provider: 'amazon',
    category: 'Audio',
    commission: 8
  },
  {
    id: 'prod-maono-pd400x',
    name: 'MAONO PD400X Dynamic USB/XLR Microphone',
    description: 'Podcast PC microphone with software, EQ, tap-to-mute, headphone jack, gain knob, for streaming and recording.',
    price: '$129.99',
    image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/46yYFJ8',
    rating: 4.6,
    provider: 'amazon',
    category: 'Audio',
    commission: 8
  },

  // SMARTWATCHES - Garmin Premium Collection
  {
    id: 'prod-garmin-fenix-8-51mm',
    name: 'Garmin fēnix 8 51mm AMOLED Sapphire',
    description: 'Premium multisport GPS smartwatch, long battery life, dive-rated, LED flashlight, titanium with Spark Orange band.',
    price: '$1,099.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4nAhBx0',
    rating: 4.9,
    provider: 'amazon',
    category: 'Wearables',
    commission: 5
  },
  {
    id: 'prod-garmin-approach-s50',
    name: 'Garmin Approach S50 Golf GPS Smartwatch',
    description: 'Advanced golf GPS, AMOLED display, on-course features, wrist-based heart rate, Cream Gold with Ivory band.',
    price: '$499.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4q2CRxh',
    rating: 4.7,
    provider: 'amazon',
    category: 'Wearables',
    commission: 5
  },
  {
    id: 'prod-garmin-approach-s50-bundle',
    name: 'Garmin Approach S50 with CT1 Club Tracking Bundle',
    description: 'Golf GPS smartwatch with Wearable4U power bank bundle and CT1 club tracking tags for complete game analysis.',
    price: '$599.99',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://amzn.to/4pQKyqd',
    rating: 4.8,
    provider: 'amazon',
    category: 'Wearables',
    commission: 5
  },

  // SKINCARE - Premium Men's Care
  {
    id: 'prod-clinique-lotion',
    name: 'Clinique Dramatically Different Moisturizing Lotion+',
    description: 'Dermatologist-developed daily hydrator that strengthens the skin barrier and delivers all-day moisture.',
    price: '$32.00',
    originalPrice: '$38.00',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=800',
    affiliateUrl: 'https://www.amazon.com/dp/B00BQZSR5E?tag=swankyboyz-20',
    rating: 4.5,
    provider: 'amazon',
    category: 'Skincare',
    commission: 8
  },
  {
    id: 'prod-tom-ford-oud-wood',
    name: 'Tom Ford Oud Wood Eau de Parfum',
    description: 'Iconic luxury fragrance blending rare oud wood with cardamom, sandalwood, and amber accords.',
    price: '$285.00',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=800',
    affiliateUrl: 'https://www.amazon.com/dp/B07D3DBPP1?tag=swankyboyz-20',
    rating: 4.7,
    provider: 'amazon',
    category: 'Fragrance',
    commission: 10
  },
  {
    id: 'prod-ridge-wallet',
    name: 'The Ridge Minimalist Metal Wallet',
    description: 'Aerospace-grade aluminum wallet with RFID blocking and expandable card capacity for streamlined everyday carry.',
    price: '$95.00',
    originalPrice: '$125.00',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=800',
    affiliateUrl: 'https://www.amazon.com/dp/B07S8G1JXQ?tag=swankyboyz-20',
    rating: 4.6,
    provider: 'amazon',
    category: 'Accessories',
    commission: 10
  },
  {
    id: 'prod-sony-wf-1000xm4',
    name: 'Sony WF-1000XM4 Noise Cancelling Earbuds',
    description: 'Flagship wireless earbuds with industry-leading noise cancellation, LDAC support, and adaptive sound control.',
    price: '$278.00',
    originalPrice: '$299.99',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    affiliateUrl: 'https://www.amazon.com/dp/B094CZTQWX?tag=swankyboyz-20',
    rating: 4.7,
    provider: 'amazon',
    category: 'Audio',
    commission: 8
  },
  {
    id: 'prod-apple-airpods-pro',
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Apple\'s flagship earbuds with Adaptive Transparency, Personalized Spatial Audio, and the H2 chip for immersive sound.',
    price: '$249.00',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155228ef44?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://www.amazon.com/dp/B0BDHX8Z63?tag=swankyboyz-20',
    rating: 4.8,
    provider: 'amazon',
    category: 'Audio',
    commission: 8
  }
];
