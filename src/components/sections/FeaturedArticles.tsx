import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight, ExternalLink } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';

const FeaturedArticles: React.FC = () => {
  const { articles } = useContent();
  const featuredArticles = articles.filter(article => article.featured).slice(0, 5);
  // reserved for future CTA tracking integration

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Featured Articles
        </h2>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover our latest reviews, guides, and insights on the hottest products and trends.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Main Featured Article */}
        {featuredArticles[0] && (
          <div className="lg:row-span-2">
            <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full">
              <div className="relative">
                <img
                  src={featuredArticles[0].featuredImage}
                  alt={featuredArticles[0].title}
                  className="w-full h-64 lg:h-96 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/product-placeholder.png';
                    (e.target as HTMLImageElement).alt = 'Article image placeholder';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {featuredArticles[0].category}
                  </span>
                </div>
              </div>
              
              <div className="p-6 lg:p-8">
                <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  <Link
                    to={`/articles/${featuredArticles[0].slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {featuredArticles[0].title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                  {featuredArticles[0].excerpt}
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-6">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <User className="h-4 w-4" />
                      <span>{featuredArticles[0].author}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredArticles[0].readTime}</span>
                    </div>
                  </div>
                  <span>{new Date(featuredArticles[0].publishedAt).toLocaleDateString()}</span>
                </div>
                
                <Link
                  to={`/articles/${featuredArticles[0].slug}`}
                  className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200"
                >
                  <span>Read Full Article</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          </div>
        )}

        {/* Secondary Featured Articles */}
        <div className="space-y-8">
          {featuredArticles.slice(1, 3).map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex">
                <div className="flex-shrink-0">
                  <img
                    src={article.featuredImage}
                    alt={article.title}
                    className="w-32 h-32 object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/assets/product-placeholder.png';
                      (e.target as HTMLImageElement).alt = 'Article image placeholder';
                    }}
                  />
                </div>
                
                <div className="p-6 flex-grow">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-2 py-1 rounded text-sm">
                      {article.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    <Link
                      to={`/articles/${article.slug}`}
                      className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                    >
                      {article.title}
                    </Link>
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                    {article.excerpt.substring(0, 100)}...
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                    <div className="flex items-center space-x-2">
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <Link
                      to={`/articles/${article.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Read more
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Additional Featured Articles */}
      {featuredArticles.length > 3 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featuredArticles.slice(3, 5).map((article) => (
            <article
              key={article.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative">
                <img
                  src={article.featuredImage}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/assets/product-placeholder.png';
                    (e.target as HTMLImageElement).alt = 'Article image placeholder';
                  }}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                    {article.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  <Link
                    to={`/articles/${article.slug}`}
                    className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {article.title}
                  </Link>
                </h3>
                
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {article.excerpt.substring(0, 120)}...
                </p>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center space-x-2">
                    <span>{article.author}</span>
                    <span>•</span>
                    <span>{article.readTime}</span>
                  </div>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      <div className="text-center mt-12">
        <Link
          to="/articles"
          className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200"
        >
          <span>View All Articles</span>
          <ExternalLink className="h-5 w-5" />
        </Link>
      </div>
    </section>
  );
};

export default FeaturedArticles;