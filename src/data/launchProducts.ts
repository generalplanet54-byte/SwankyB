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
  {
    id: 'prod-braun-series-9-pro-plus',
    name: 'Braun Series 9 PRO+ Electric Shaver',
    description: 'Braun\'s flagship five-element shaver with ProComfort head, 60-minute battery life, and SmartCare cleaning center for effortless daily grooming.',
    price: '$299.99',
    originalPrice: '$349.99',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://www.amazon.com/dp/B0CQ8L1JNV?tag=swankyboyz-20',
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
    image: 'https://images.unsplash.com/photo-1502767089025-6572583495b0?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://www.amazon.com/dp/B08WJQJX7K?tag=swankyboyz-20',
    rating: 4.6,
    provider: 'amazon',
    category: 'Grooming',
    commission: 12
  },
  {
    id: 'prod-braun-series-7-kit',
    name: 'Braun Series 7 7420 11-in-1 Grooming Kit',
    description: 'AutoSense-powered all-in-one grooming system with eleven premium attachments for beard, body, and hair care.',
    price: '$119.99',
    originalPrice: '$139.99',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://www.amazon.com/dp/B0B1Q96D12?tag=swankyboyz-20',
    rating: 4.7,
    provider: 'amazon',
    category: 'Grooming',
    commission: 12
  },
  {
    id: 'prod-manscaped-beard-hedger',
    name: 'MANSCAPED Beard Hedger Premium Trimmer',
    description: '20-length adjustable beard trimmer with stainless steel T-blade and waterproof design for precision styling.',
    price: '$99.99',
    originalPrice: '$129.99',
    image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://www.amazon.com/dp/B0BTBD2J11?tag=swankyboyz-20',
    rating: 4.5,
    provider: 'amazon',
    category: 'Grooming',
    commission: 10
  },
  {
    id: 'prod-manscaped-chairman-pro',
    name: 'MANSCAPED The Chairman PRO Electric Shaver',
    description: 'Dual-head electric shaver featuring SkinSafe technology, wireless charging, and travel-ready USB-C power.',
    price: '$89.99',
    originalPrice: '$109.99',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80',
    affiliateUrl: 'https://www.amazon.com/dp/B0CGLM5J9R?tag=swankyboyz-20',
    rating: 4.4,
    provider: 'amazon',
    category: 'Travel',
    commission: 10
  },
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
