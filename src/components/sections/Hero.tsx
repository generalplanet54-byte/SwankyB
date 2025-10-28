import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Star, Zap } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-charcoal via-charcoal to-charcoal text-off-white py-20">
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal to-charcoal opacity-40"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="flex justify-center items-center space-x-2 mb-6">
            <Zap className="h-12 w-12 text-champagne" />
            <h1 className="text-5xl md:text-7xl font-display font-bold">
              Swanky<span className="text-champagne">Boyz</span>
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-off-white/70 mb-8 max-w-3xl mx-auto">
            Discover the latest tech gadgets, lifestyle products, and luxury accessories. 
            We curate the best deals and provide honest reviews to elevate your lifestyle.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <Link
              to="/category/grooming"
              className="bg-champagne hover:bg-amber-300 text-charcoal px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <TrendingUp className="h-5 w-5" />
              <span>Executive Grooming</span>
            </Link>
            
            <Link
              to="/category/audio"
              className="bg-transparent border-2 border-champagne hover:bg-champagne hover:text-charcoal text-champagne px-8 py-4 rounded-lg font-semibold text-lg transition-colors duration-200 inline-flex items-center space-x-2"
            >
              <Star className="h-5 w-5" />
              <span>Shop Best Earbuds</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-champagne mb-2">500+</div>
              <div className="text-off-white/70">Products Reviewed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-champagne mb-2">50K+</div>
              <div className="text-off-white/70">Monthly Readers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-champagne mb-2">95%</div>
              <div className="text-off-white/70">Customer Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

Hero.displayName = 'Hero';

export default Hero;