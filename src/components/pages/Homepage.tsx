import React from 'react';
import Hero from '../sections/Hero';
import FeaturedArticles from '../sections/FeaturedArticles';
import CategoryShowcase from '../sections/CategoryShowcase';
import TrendingProducts from '../sections/TrendingProducts';
import Newsletter from '../sections/Newsletter';

const Homepage: React.FC = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <FeaturedArticles />
      <CategoryShowcase />
      <TrendingProducts />
      <Newsletter />
    </div>
  );
};

export default Homepage;