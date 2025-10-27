import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, Zap } from 'lucide-react';
import { useAffiliate } from '../../contexts/AffiliateContext';

const Hero: React.FC = () => {
  const { products, trackClick } = useAffiliate();

  const stats = useMemo(() => ({
    productsReviewed: products.length || 500,
    monthlyReaders: '50K+',
    satisfaction: '95%'
  }), [products.length]);

  const handleExploreProduct = (productId: string) => {
    trackClick(productId);
  };

  return (
    <section className="relative bg-gradient-to-br from-brand-dark via-brand to-brand-light text-white py-20">
      <div className="absolute inset-0 bg-black bg-opacity-20"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Zap className="h-12 w-12 text-yellow-400" />
            <h1 className="text-5xl md:text-7xl font-bold">
              Swanky<span className="text-yellow-400">Boyz</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Save time and buy with confidence — our expert reviews surface the best premium products, honest pros &amp; cons, and the latest deals so you can choose quickly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/category/skincare"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Explore Skincare</span>
            </Link>

            <button
              onClick={() => handleExploreProduct('prod-sony-wf-1000xm4')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-brand-contrast px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Star className="h-5 w-5" />
              <span>Shop Best Earbuds</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-tan mb-2">{stats.productsReviewed || '500+'}</div>
              <div className="text-gray-200">Products Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-tan mb-2">{stats.monthlyReaders}</div>
              <div className="text-gray-200">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-brand-tan mb-2">{stats.satisfaction}</div>
              <div className="text-gray-200">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;