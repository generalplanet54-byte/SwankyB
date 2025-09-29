import React from 'react';
import { useParams } from 'react-router-dom';
import { Clock, User, Calendar, Share2, Tag } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import ProductCard from '../common/ProductCard';
import { useAffiliate } from '../../contexts/AffiliateContext';

const ArticlePage: React.FC = () => {
  const { articleSlug } = useParams<{ articleSlug: string }>();
  const { articles } = useContent();
  const { products } = useAffiliate();

  const article = articles.find(a => a.slug === articleSlug);

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Article Not Found
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400">
          The article you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  // Get related products based on article category
  const relatedProducts = products
    .filter(product => product.category === article.category)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article.title,
        text: article.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Article link copied to clipboard!');
    }
  };

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Article Header */}
      <header className="mb-8">
        <div className="flex items-center space-x-2 mb-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
            {article.category}
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          {article.title}
        </h1>

        <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-4 mb-8">
          <div className="flex items-center space-x-6 text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span className="font-medium">{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5" />
              <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>{article.readTime}</span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 px-4 py-2 rounded-lg transition-colors duration-200"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
        />
      </header>

      {/* Article Content */}
      <div
        className="prose prose-lg dark:prose-invert max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 dark:border-gray-700 pt-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Article Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 pt-8">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <Tag className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            <span className="text-gray-600 dark:text-gray-300">Tags:</span>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {new Date(article.updatedAt).toLocaleDateString()}
          </p>
        </div>
      </footer>
    </article>
  );
};

export default ArticlePage;