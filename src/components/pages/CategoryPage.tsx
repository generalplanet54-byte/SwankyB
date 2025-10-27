import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useContent } from '../../contexts/ContentContext';
import ArticleCard from '../common/ArticleCard';
import ProductCard from '../common/ProductCard';
import { useAffiliate } from '../../contexts/AffiliateContext';
import Breadcrumbs from '../common/Breadcrumbs';
import type { BreadcrumbItem } from '../common/Breadcrumbs';
import StructuredData from '../common/StructuredData';
import { slugify } from '../../lib/slugify';

const CategoryPage: React.FC = () => {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  const { articles } = useContent();
  const { getProductsByCategory, products } = useAffiliate();

  const FALLBACK_SITE_URL = import.meta.env.VITE_SITE_URL || 'https://swankyboyz.com';

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

  const derivedCategoryNames = useMemo(() => {
    const map = new Map<string, string>();
    articles.forEach(article => {
      map.set(slugify(article.category), article.category);
    });
    products.forEach(product => {
      if (product.category) {
        map.set(slugify(product.category), product.category);
      }
    });
    return map;
  }, [articles, products]);

  const normalizedSlug = categorySlug || '';

  const formatCategorySlug = useMemo(() => (
    (slug: string) => slug
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')
  ), []);

  const resolvedCategoryName = normalizedSlug
    ? derivedCategoryNames.get(normalizedSlug) || formatCategorySlug(normalizedSlug)
    : 'Category';

  const categoryArticles = useMemo(() => (
    articles.filter(article => slugify(article.category) === normalizedSlug)
  ), [articles, normalizedSlug]);

  const categoryProducts = normalizedSlug
    ? getProductsByCategory(resolvedCategoryName)
    : [];

  const breadcrumbs: BreadcrumbItem[] = useMemo(() => (
    normalizedSlug
      ? [
          { label: 'Home', href: '/' },
          { label: 'Articles', href: '/articles' },
          { label: resolvedCategoryName, href: `/category/${normalizedSlug}` }
        ]
      : [
          { label: 'Home', href: '/' },
          { label: 'Articles', href: '/articles' }
        ]
  ), [normalizedSlug, resolvedCategoryName]);

  const breadcrumbStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: toAbsoluteUrl(crumb.href || `/category/${normalizedSlug}`)
    }))
  }), [breadcrumbs, normalizedSlug, toAbsoluteUrl]);

  const itemListStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `${resolvedCategoryName} Articles`,
    itemListElement: categoryArticles.map((article, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: article.title,
      url: toAbsoluteUrl(`/article/${article.slug}`)
    }))
  }), [categoryArticles, resolvedCategoryName, toAbsoluteUrl]);

  const collectionStructuredData = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${resolvedCategoryName} Category`,
    url: normalizedSlug ? toAbsoluteUrl(`/category/${normalizedSlug}`) : toAbsoluteUrl('/articles'),
    description: `Discover the latest products, reviews, and insights in ${resolvedCategoryName}.`
  }), [normalizedSlug, resolvedCategoryName, toAbsoluteUrl]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumbs */}
      <div className="mb-8">
        <Breadcrumbs items={breadcrumbs} />
      </div>
      
      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
          {resolvedCategoryName}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Discover the latest products, reviews, and insights in {resolvedCategoryName.toLowerCase()}.
        </p>
      </div>

      {/* Featured Products Section */}
      {categoryProducts.length > 0 && (
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Articles Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Latest Articles</h2>
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

      <StructuredData data={[collectionStructuredData, itemListStructuredData, breadcrumbStructuredData]} />
    </div>
  );
};

export default CategoryPage;