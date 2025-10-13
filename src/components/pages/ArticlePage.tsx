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
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Article Header */}
      <header className="mb-12">
        <div className="flex items-center flex-wrap gap-2 mb-6">
          <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
            {article.category}
          </span>
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium"
            >
              #{tag}
            </span>
          ))}
        </div>

        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight tracking-tight">
          {article.title}
        </h1>

        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between flex-wrap gap-6 mb-10 pb-8 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center flex-wrap gap-6 text-gray-600 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <User className="h-5 w-5 text-gray-400" />
              <span className="font-semibold text-gray-900 dark:text-white">{article.author}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-gray-400" />
              <span className="text-sm">{new Date(article.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-medium">{article.readTime}</span>
            </div>
          </div>

          <button
            onClick={handleShare}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all duration-200 font-medium shadow-sm hover:shadow-md"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        </div>

        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-80 md:h-[32rem] object-cover rounded-2xl shadow-2xl"
        />
      </header>

      {/* Article Content */}
      <div
        className="prose prose-lg md:prose-xl dark:prose-invert max-w-none mb-16 prose-headings:font-bold prose-headings:tracking-tight prose-p:leading-relaxed prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-lg"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-gray-200 dark:border-gray-700 pt-16 mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-10 tracking-tight">
            Related Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Article Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-700 pt-10 mt-16">
        <div className="flex items-center justify-between flex-wrap gap-6">
          <div className="flex items-center flex-wrap gap-3">
            <div className="flex items-center space-x-2">
              <Tag className="h-5 w-5 text-gray-400" />
              <span className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">Tags:</span>
            </div>
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1.5 rounded-full text-sm font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
            Last updated: {new Date(article.updatedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>
        </div>
      </footer>
    </article>
  );
};

export default ArticlePage;