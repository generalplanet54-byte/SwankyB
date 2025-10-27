import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { Clock, User, ArrowRight } from 'lucide-react';
import { Article } from '../../contexts/ContentContext';

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = memo(({ article }) => {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="relative">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
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

        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
          {article.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <User className="h-4 w-4" />
              <span>{article.author}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="h-4 w-4" />
              <span>{article.readTime}</span>
            </div>
          </div>
          <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
        </div>

        <Link
          to={`/articles/${article.slug}`}
          className="inline-flex items-center space-x-2 text-blue-600 dark:text-blue-400 hover:underline font-semibold"
        >
          <span>Read More</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
});

ArticleCard.displayName = 'ArticleCard';

export default ArticleCard;