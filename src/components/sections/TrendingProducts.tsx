import React from 'react';
import { TrendingUp } from 'lucide-react';
import { useAffiliate } from '../../contexts/AffiliateContext';
import ProductCard from '../common/ProductCard';

const TrendingProducts: React.FC = () => {
  const { products } = useAffiliate();
  
  // Get top-rated products as trending
  const trendingProducts = products
    .filter(product => product.rating >= 4.5)
    .slice(0, 6);

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-50 dark:bg-gray-900">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <TrendingUp className="h-8 w-8 text-blue-600" />
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white">
            Trending Products
          </h2>
        </div>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover the most popular products our community is loving right now.
        </p>
      </div>

      {trendingProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trendingProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">
            No trending products available at the moment. Check back soon!
          </p>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;