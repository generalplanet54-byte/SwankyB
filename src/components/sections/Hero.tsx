import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, Zap } from 'lucide-react';

const Hero: React.FC = memo(() => {
  return (
    <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800 text-white py-20">
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
            Discover the latest tech gadgets, lifestyle products, and luxury accessories. 
            We curate the best deals and provide honest reviews to elevate your lifestyle.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/category/skincare"
              className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Explore Skincare</span>
            </Link>
            
            <Link
              to="/category/audio"
              className="bg-transparent border-2 border-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Star className="h-5 w-5" />
              <span>Premium Audio</span>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">500+</div>
              <div className="text-blue-100">Products Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
              <div className="text-blue-100">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">95%</div>
              <div className="text-blue-100">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

export default Hero;