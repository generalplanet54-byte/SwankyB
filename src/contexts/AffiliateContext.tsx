import React, { createContext, useContext, useState } from 'react';

export interface AffiliateProduct {
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

interface AffiliateContextType {
  products: AffiliateProduct[];
  addProduct: (product: Omit<AffiliateProduct, 'id'>) => void;
  updateProduct: (id: string, updates: Partial<AffiliateProduct>) => void;
  deleteProduct: (id: string) => void;
  trackClick: (productId: string) => void;
  getProductsByCategory: (category: string) => AffiliateProduct[];
}

const AffiliateContext = createContext<AffiliateContextType | undefined>(undefined);

export const useAffiliate = () => {
  const context = useContext(AffiliateContext);
  if (context === undefined) {
    throw new Error('useAffiliate must be used within an AffiliateProvider');
  }
  return context;
};

const mockProducts: AffiliateProduct[] = [
  {
    id: '1',
    name: 'Kiehl\'s Age Defender Power Serum',
    description: 'Potent anti-aging serum with vitamin C and peptides for visible skin improvement.',
    price: '$89.00',
    originalPrice: '$105.00',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/48yqHFT',
    rating: 4.6,
    provider: 'amazon',
    category: 'Skincare',
    commission: 12.0
  },
  {
    id: '2',
    name: 'Clinique Dramatically Different Moisturizing Lotion+',
    description: 'Dermatologist-developed daily moisturizer suitable for all skin types.',
    price: '$32.00',
    originalPrice: '$38.00',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4gEb6ql',
    rating: 4.4,
    provider: 'amazon',
    category: 'Skincare',
    commission: 10.5
  },
  {
    id: '3',
    name: 'Jack Black Protein Booster Eye Rescue',
    description: 'Men\'s eye cream with caffeine to reduce puffiness and dark circles.',
    price: '$42.00',
    originalPrice: '$48.00',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4nPhWvD',
    rating: 4.3,
    provider: 'amazon',
    category: 'Men\'s Skincare',
    commission: 11.0
  },
  {
    id: '4',
    name: 'La Mer The Moisturizing Cream',
    description: 'Luxury moisturizing cream with Miracle Broth for ultimate skin transformation.',
    price: '$190.00',
    originalPrice: '$220.00',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/3IAtkfK',
    rating: 4.5,
    provider: 'amazon',
    category: 'Luxury Skincare',
    commission: 8.0
  },
  {
    id: '5',
    name: 'Augustinus Bader The Rich Cream',
    description: 'Award-winning anti-aging cream with patented TFC8 technology.',
    price: '$265.00',
    originalPrice: '$295.00',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/46UcGB6',
    rating: 4.7,
    provider: 'amazon',
    category: 'Luxury Skincare',
    commission: 9.5
  },
  {
    id: '6',
    name: 'Drunk Elephant C-Firma Day Serum',
    description: 'Potent vitamin C serum with antioxidants for brighter, firmer skin.',
    price: '$80.00',
    originalPrice: '$90.00',
    image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4pTJBgS',
    rating: 4.2,
    provider: 'amazon',
    category: 'Skincare',
    commission: 11.5
  },
  {
    id: '7',
    name: 'Sony WF-1000XM4 Wireless Earbuds',
    description: 'Premium wireless earbuds with industry-leading noise cancellation.',
    price: '$279.99',
    originalPrice: '$329.99',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4pEQAtH',
    rating: 4.8,
    provider: 'amazon',
    category: 'Audio',
    commission: 7.5
  },
  {
    id: '8',
    name: 'Apple AirPods Pro (2nd Generation)',
    description: 'Advanced wireless earbuds with H2 chip and adaptive transparency.',
    price: '$249.99',
    originalPrice: '$279.99',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/3IeOMHh',
    rating: 4.7,
    provider: 'amazon',
    category: 'Audio',
    commission: 6.0
  },
  {
    id: '9',
    name: 'Bose QuietComfort Earbuds',
    description: 'World-class noise cancellation in a comfortable, secure fit.',
    price: '$329.99',
    originalPrice: '$379.99',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4gOkBU8',
    rating: 4.6,
    provider: 'amazon',
    category: 'Audio',
    commission: 8.0
  },
  {
    id: '10',
    name: 'Sennheiser Momentum True Wireless 3',
    description: 'Audiophile-grade wireless earbuds with exceptional sound quality.',
    price: '$229.99',
    originalPrice: '$259.99',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/48xkoCs',
    rating: 4.5,
    provider: 'amazon',
    category: 'Audio',
    commission: 9.0
  },
  {
    id: '11',
    name: 'Jabra Elite 85t Wireless Earbuds',
    description: 'Premium earbuds with advanced ANC and superior call quality.',
    price: '$179.99',
    originalPrice: '$229.99',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/3IysvnQ',
    rating: 4.4,
    provider: 'amazon',
    category: 'Audio',
    commission: 10.0
  },
  {
    id: '12',
    name: 'The Ridge Wallet',
    description: 'Ultra-slim minimalist wallet with RFID blocking and premium materials.',
    price: '$95.00',
    originalPrice: '$115.00',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4pWQoGH',
    rating: 4.6,
    provider: 'amazon',
    category: 'Accessories',
    commission: 12.5
  },
  {
    id: '13',
    name: 'Bellroy Card Sleeve Wallet',
    description: 'Premium leather card sleeve with exceptional Australian craftsmanship.',
    price: '$69.00',
    originalPrice: '$79.00',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4gIqJxd',
    rating: 4.7,
    provider: 'amazon',
    category: 'Accessories',
    commission: 11.0
  },
  {
    id: '14',
    name: 'Ekster Parliament Wallet',
    description: 'Smart wallet with quick-access mechanism and optional solar tracker.',
    price: '$129.00',
    originalPrice: '$149.00',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4pGc4qd',
    rating: 4.5,
    provider: 'amazon',
    category: 'Accessories',
    commission: 10.5
  },
  {
    id: '15',
    name: 'Secrid Cardprotector',
    description: 'Dutch-designed aluminum card protector with RFID/NFC blocking.',
    price: '$65.00',
    originalPrice: '$75.00',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/46T79uD',
    rating: 4.8,
    provider: 'amazon',
    category: 'Accessories',
    commission: 13.0
  },
  {
    id: '16',
    name: 'Herschel Charlie Wallet',
    description: 'Classic bifold wallet with timeless design and premium materials.',
    price: '$45.00',
    originalPrice: '$55.00',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/46DrdQr',
    rating: 4.3,
    provider: 'amazon',
    category: 'Accessories',
    commission: 9.5
  },
  {
    id: '17',
    name: 'Fossil Derrick Front Pocket Bifold',
    description: 'Premium leather bifold wallet designed for front pocket carry.',
    price: '$38.00',
    originalPrice: '$48.00',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4mx54ck',
    rating: 4.4,
    provider: 'amazon',
    category: 'Accessories',
    commission: 8.5
  },
  {
    id: '18',
    name: 'Tom Ford Oud Wood Eau de Parfum',
    description: 'Luxury fragrance with rare oud, rosewood, and sandalwood.',
    price: '$350.00',
    originalPrice: '$395.00',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4mAbaJ9',
    rating: 4.9,
    provider: 'amazon',
    category: 'Fragrance',
    commission: 6.5
  },
  {
    id: '19',
    name: 'Creed Aventus Eau de Parfum',
    description: 'Legendary masculine fragrance with pineapple, birch, and patchouli.',
    price: '$445.00',
    originalPrice: '$495.00',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/3Vz0Iqd',
    rating: 4.8,
    provider: 'amazon',
    category: 'Fragrance',
    commission: 5.5
  },
  {
    id: '20',
    name: 'Dior Sauvage Eau de Toilette',
    description: 'Modern classic fragrance with bergamot, pepper, and ambroxan.',
    price: '$98.00',
    originalPrice: '$118.00',
    image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amzn.to/4pvLzng',
    rating: 4.6,
    provider: 'amazon',
    category: 'Fragrance',
    commission: 8.0
  }
];

export const AffiliateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<AffiliateProduct[]>(mockProducts);

  const addProduct = (productData: Omit<AffiliateProduct, 'id'>) => {
    const newProduct: AffiliateProduct = {
      ...productData,
      id: Date.now().toString(),
    };
    setProducts(prev => [...prev, newProduct]);
  };

  const updateProduct = (id: string, updates: Partial<AffiliateProduct>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const trackClick = (productId: string) => {
    // In a real implementation, this would send analytics data
    console.log('Tracking affiliate click:', productId);
    
    // Add UTM parameters for tracking
    const product = products.find(p => p.id === productId);
    if (product) {
      const trackingUrl = `${product.affiliateUrl}?utm_source=swankyboyz&utm_medium=affiliate&utm_campaign=product_${productId}&utm_content=${Date.now()}`;
      window.open(trackingUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const getProductsByCategory = (category: string): AffiliateProduct[] => {
    return products.filter(product => product.category === category);
  };

  return (
    <AffiliateContext.Provider value={{
      products,
      addProduct,
      updateProduct,
      deleteProduct,
      trackClick,
      getProductsByCategory
    }}>
      {children}
    </AffiliateContext.Provider>
  );
};