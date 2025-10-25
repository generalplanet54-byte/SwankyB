import React, { createContext, useContext, useState, useEffect } from 'react';
import { launchProducts } from '../data/launchProducts';

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
  loading: boolean;
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

export const AffiliateProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<AffiliateProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const useLaunchProducts = () => {
    setProducts(launchProducts);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      // Prefer server-side public endpoint
      try {
        const res = await fetch('/api/products-d1');
        if (res.ok) {
          const json = await res.json();
          const productsData = json.products || [];
          const formattedProducts: AffiliateProduct[] = (productsData || []).map((product: any) => ({
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price ? `$${product.price}` : '',
            originalPrice: product.original_price ? `$${product.original_price}` : undefined,
            image: product.primary_image,
            affiliateUrl: product.amazon_url,
            rating: product.rating || 0,
            provider: 'amazon' as const,
            category: product.category,
            commission: 10.0
          }));
          if (formattedProducts.length) {
            setProducts(formattedProducts);
            return;
          }
          useLaunchProducts();
          return;
        }
      } catch (err) {
        // fallback to client-side supabase
      }

    } catch (error) {
      console.error('Error fetching products:', error);
      useLaunchProducts();
    } finally {
      setLoading(false);
    }
  };


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
    const product = products.find((p) => p.id === productId);
    if (!product) {
      console.error('Product not found:', productId);
      return;
    }

    if (!product.affiliateUrl) {
      console.error('Product missing affiliate URL:', product);
      return;
    }

    const payload = {
      productId: product.id,
      productName: product.name,
      productUrl: typeof window !== 'undefined' ? window.location.href : undefined,
      affiliateUrl: product.affiliateUrl,
      source: 'react-app',
    };

    const endpoint = '/api/affiliate-click';
    const body = JSON.stringify(payload);

    try {
      if (navigator?.sendBeacon) {
        const blob = new Blob([body], { type: 'application/json' });
        navigator.sendBeacon(endpoint, blob);
      } else {
        void fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body,
          keepalive: true,
        });
      }
    } catch (error) {
      console.error('Failed to record affiliate click', error);
    }

    const trackingUrl = `${product.affiliateUrl}?utm_source=swankyboyz&utm_medium=affiliate&utm_campaign=product_${productId}&utm_content=${Date.now()}`;
    window.open(trackingUrl, '_blank', 'noopener,noreferrer');
  };

  const getProductsByCategory = (category: string): AffiliateProduct[] => {
    return products.filter(product => product.category === category);
  };

  return (
    <AffiliateContext.Provider value={{
      products,
      loading,
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