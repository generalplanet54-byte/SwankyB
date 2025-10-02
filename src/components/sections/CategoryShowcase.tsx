import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Heart, Briefcase, Dumbbell, Gem, ArrowRight } from 'lucide-react';

const CategoryShowcase: React.FC = () => {
  const categories = [
    {
      name: 'Skincare',
      slug: 'skincare',
      icon: Heart,
      description: 'Premium skincare products from Kiehl\'s, Clinique, and luxury brands',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      color: 'from-pink-500 to-rose-600'
    },
    {
      name: 'Audio',
      slug: 'audio',
      icon: Smartphone,
      description: 'Premium wireless earbuds from Sony, Apple, Bose, and more',
      image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
      color: 'from-blue-500 to-purple-600'
    },
    {
      name: 'Accessories',
      slug: 'accessories',
      icon: Briefcase,
      description: 'Premium wallets from The Ridge, Bellroy, Ekster, and more',
      image: 'https://images.pexels.com/photos/8148577/pexels-photo-8148577.jpeg?auto=compress&cs=tinysrgb&w=500',
      color: 'from-green-500 to-teal-600'
    },
    {
      name: 'Fragrance',
      slug: 'fragrance',
      icon: Gem,
      description: 'Luxury fragrances from Tom Ford, Creed, and premium brands',
      image: 'https://images.pexels.com/photos/965989/pexels-photo-965989.jpeg?auto=compress&cs=tinysrgb&w=500',
      color: 'from-orange-500 to-red-600'
    },
    {
      name: 'Grooming',
      slug: 'grooming',
      icon: Dumbbell,
      description: 'Men\'s grooming essentials and premium care products',
      image: 'https://images.pexels.com/photos/3685530/pexels-photo-3685530.jpeg?auto=compress&cs=tinysrgb&w=500',
      color: 'from-yellow-500 to-amber-600'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Explore Our Categories
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover curated products and expert reviews across our specialized categories.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <Link
              key={category.slug}
              to={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                
                <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                  <div className="flex items-center space-x-3">
                    <Icon className="h-8 w-8" />
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </div>
                  
                  <div>
                    <p className="text-white text-opacity-90 mb-4">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-2 group-hover:translate-x-2 transition-transform duration-200">
                      <span className="font-semibold">Explore Category</span>
                      <ArrowRight className="h-5 w-5" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default CategoryShowcase;