import React from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import ArticleCard from '../common/ArticleCard';
import ProductCard from '../common/ProductCard';
import { useAffiliate } from '../../contexts/AffiliateContext';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { articles } = useContent();
  const { getProductsByCategory } = useAffiliate();

  const categoryNames: { [key: string]: string } = {
    'tech-gadgets': 'Tech Gadgets',
    'lifestyle': 'Lifestyle',
    'productivity': 'Productivity',
    'fitness': 'Fitness',
    'luxury-accessories': 'Luxury Accessories'
  };

  const categoryName = categoryNames[categorySlug || ''] || 'Category';
  const categoryArticles = articles.filter(article => 
    article.category.toLowerCase().replace(/\s+/g, '-') === categorySlug
  );
  const categoryProducts = getProductsByCategory(categoryName);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {categoryName}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover the latest products, reviews, and insights in {categoryName.toLowerCase()}.
        </p>
      </div>

      {/* Featured Products Section */}
      {categoryProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Featured Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
          Latest Articles
        </h2>
        {categoryArticles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categoryArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-gray-600 dark:text-gray-400">
              No articles found in this category. Check back soon for new content!
            </p>
          </div>
        )}
      </section>
    </div>
  );
};

export default CategoryPage;