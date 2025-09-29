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
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery life.',
    price: '$299.99',
    originalPrice: '$399.99',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amazon.com/affiliate-link-1',
    rating: 4.8,
    provider: 'amazon',
    category: 'Tech Gadgets',
    commission: 8.5
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and sleep tracking.',
    price: '$199.99',
    originalPrice: '$249.99',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amazon.com/affiliate-link-2',
    rating: 4.6,
    provider: 'amazon',
    category: 'Fitness',
    commission: 7.2
  },
  {
    id: '3',
    name: 'Luxury Leather Wallet',
    description: 'Premium Italian leather wallet with RFID blocking and minimalist design.',
    price: '$89.99',
    originalPrice: '$129.99',
    image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amazon.com/affiliate-link-3',
    rating: 4.9,
    provider: 'amazon',
    category: 'Luxury Accessories',
    commission: 12.0
  },
  {
    id: '4',
    name: 'Ergonomic Standing Desk',
    description: 'Height-adjustable standing desk for improved productivity and health.',
    price: '$449.99',
    originalPrice: '$599.99',
    image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amazon.com/affiliate-link-4',
    rating: 4.7,
    provider: 'amazon',
    category: 'Productivity',
    commission: 6.5
  },
  {
    id: '5',
    name: 'Aromatherapy Diffuser',
    description: 'Ultrasonic essential oil diffuser with LED lights and auto shut-off.',
    price: '$49.99',
    originalPrice: '$79.99',
    image: 'https://images.pexels.com/photos/7207142/pexels-photo-7207142.jpeg?auto=compress&cs=tinysrgb&w=500',
    affiliateUrl: 'https://amazon.com/affiliate-link-5',
    rating: 4.4,
    provider: 'amazon',
    category: 'Lifestyle',
    commission: 15.0
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