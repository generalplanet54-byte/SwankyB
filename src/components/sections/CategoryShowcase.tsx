import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Heart, Briefcase, Dumbbell, Gem, ArrowRight } from 'lucide-react';

const CategoryShowcase: React.FC = () => {
  const categories = [
    {
      name: 'Executive Grooming',
      slug: 'grooming',
      icon: Briefcase,
      description: 'Sophisticated grooming essentials for the discerning gentleman',
      image: 'https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      color: 'from-slate-700 to-slate-900'
    },
    {
      name: 'Premium Audio',
      slug: 'audio-equipment',
      icon: Smartphone,
      description: 'Luxury audio equipment for the sophisticated professional',
      image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      color: 'from-blue-800 to-indigo-900'
    },
    {
      name: 'Luxury Accessories',
      slug: 'accessories',
      icon: Gem,
      description: 'Executive accessories that command respect and attention',
      image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      color: 'from-amber-700 to-orange-800'
    },
    {
      name: 'Signature Fragrances',
      slug: 'fragrance',
      icon: Heart,
      description: 'Distinguished scents that define executive presence',
      image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      color: 'from-emerald-700 to-green-800'
    },
    {
      name: 'Elite Technology',
      slug: 'technology',
      icon: Dumbbell,
      description: 'Cutting-edge tech for the modern executive lifestyle',
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      color: 'from-purple-700 to-violet-800'
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Executive Collections
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Meticulously curated luxury collections for the sophisticated gentleman who demands excellence.
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