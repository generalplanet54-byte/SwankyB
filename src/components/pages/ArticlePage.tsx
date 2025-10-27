import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, User, Calendar, Share2, Tag } from 'lucide-react';
import { useContent } from '../../contexts/ContentContext';
import ProductCard from '../common/ProductCard';
import { useAffiliate } from '../../contexts/AffiliateContext';
import Breadcrumbs, { BreadcrumbItem } from '../common/Breadcrumbs';
import StructuredData from '../common/StructuredData';
import { slugify } from '../../lib/slugify';

const FALLBACK_SITE_URL = import.meta.env.VITE_SITE_URL || 'https://swankyboyz.com';

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

  const siteUrl = useMemo(() => {
    if (typeof window !== 'undefined' && window.location.origin) {
      return window.location.origin;
    }
    return FALLBACK_SITE_URL;
  }, [FALLBACK_SITE_URL]);

  const toAbsoluteUrl = useMemo(() => (
    (path: string) => {
      try {
        return new URL(path, siteUrl).toString();
      } catch (error) {
        return path;
      }
    }
  ), [siteUrl]);

  const categorySlug = slugify(article.category);

  const breadcrumbs: BreadcrumbItem[] = useMemo(() => ([
    { label: 'Home', href: '/' },
    { label: 'Articles', href: '/articles' },
    { label: article.category, href: `/category/${categorySlug}` },
    { label: article.title, href: `/articles/${article.slug}` }
  ]), [article.category, article.slug, article.title, categorySlug]);

  const publishedAtISO = useMemo(() => {
    try {
      const date = new Date(article.publishedAt.replace(' ', 'T') + 'Z');
      return date.toISOString();
    } catch {
      return new Date().toISOString();
    }
  }, [article.publishedAt]);
  
  const updatedAtISO = useMemo(() => {
    if (!article.updatedAt) return publishedAtISO;
    try {
      const date = new Date(article.updatedAt.replace(' ', 'T') + 'Z');
      return date.toISOString();
    } catch {
      return publishedAtISO;
    }
  }, [article.updatedAt, publishedAtISO]);

  const articleStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.seoTitle || article.title,
    description: article.seoDescription || article.excerpt,
    image: article.featuredImage,
    author: {
      '@type': 'Person',
      name: article.author
    },
    publisher: {
      '@type': 'Organization',
      name: 'SwankyBoyz',
      logo: {
        '@type': 'ImageObject',
        url: toAbsoluteUrl('/logo.png')
      }
    },
    datePublished: publishedAtISO,
    dateModified: updatedAtISO,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': toAbsoluteUrl(`/articles/${article.slug}`)
    },
    articleSection: article.category,
    keywords: article.tags
  }), [article, publishedAtISO, toAbsoluteUrl, updatedAtISO]);

  const breadcrumbStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: toAbsoluteUrl(crumb.href || `/articles/${article.slug}`)
    }))
  }), [article.slug, breadcrumbs, toAbsoluteUrl]);

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
                {/* Render published date only when valid */}
                {(() => {
                  const pd = new Date(article.publishedAt);
                  return !isNaN(pd.getTime()) ? (
                    <span className="text-sm">{pd.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  ) : (
                    <span className="text-sm text-gray-500">Unknown publish date</span>
                  );
                })()}
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

      {/* Article Content - improved contrast & typography */}
      <div
        className={
          `article-content prose prose-lg md:prose-xl max-w-none mb-16 ` +
          `prose-headings:font-extrabold prose-headings:tracking-tight prose-headings:text-gray-900 dark:prose-headings:text-white ` +
          `prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-8 prose-h1:leading-tight ` +
          `prose-h2:text-3xl prose-h2:mb-5 prose-h2:mt-7 prose-h2:leading-tight ` +
          `prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-6 prose-h3:leading-snug ` +
          `prose-h4:text-xl prose-h4:mb-3 prose-h4:mt-5 ` +
          // Stronger paragraph contrast
          `prose-p:leading-relaxed prose-p:text-gray-800 dark:prose-p:text-gray-100 prose-p:mb-4 ` +
          // Links, bold, italics
          `prose-a:text-blue-600 dark:prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline ` +
          `prose-strong:text-gray-900 dark:prose-strong:text-white prose-em:text-gray-800 dark:prose-em:text-gray-200 ` +
          // Lists and numbering
          `prose-ul:text-gray-800 dark:prose-ul:text-gray-100 prose-ol:text-gray-800 dark:prose-ol:text-gray-100 prose-li:mb-2 ` +
          // Blockquote and code
          `prose-blockquote:border-l-4 prose-blockquote:border-gray-300 dark:prose-blockquote:border-gray-600 prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-transparent prose-blockquote:text-gray-700 dark:prose-blockquote:text-gray-200 prose-code:bg-gray-100 dark:prose-code:bg-gray-800 prose-code:text-red-600 dark:prose-code:text-red-400 prose-pre:bg-gray-900 prose-pre:text-gray-100 ` +
          // Images
          `prose-img:rounded-xl prose-img:shadow-lg prose-img:mb-6 ` +
          // Text alignment utilities (allow inline alignment classes in content)
          `prose-p.text-left prose-p.text-justify prose-li.text-left `
        }
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
            Last updated: {(() => {
              const ud = new Date(article.updatedAt);
              return !isNaN(ud.getTime()) ? ud.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Unknown';
            })()}
          </p>
        </div>
      </footer>
      
      <StructuredData data={[articleStructuredData, breadcrumbStructuredData]} />
    </article>
  );
};

export default ArticlePage;