/**
 * Advanced SEO Optimization Utilities
 * Generate optimized meta tags, schema markup, and structured data
 */

export interface SEOMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: 'summary' | 'summary_large_image' | 'app' | 'player';
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots?: string;
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export interface ProductSchema {
  '@context': 'https://schema.org';
  '@type': 'Product';
  name: string;
  description: string;
  image: string[];
  brand?: {
    '@type': 'Brand';
    name: string;
  };
  offers?: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
    availability: string;
    url: string;
    seller?: {
      '@type': 'Organization';
      name: string;
    };
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
    bestRating?: string;
    worstRating?: string;
  };
  review?: Array<{
    '@type': 'Review';
    author: {
      '@type': 'Person';
      name: string;
    };
    datePublished: string;
    reviewBody: string;
    reviewRating: {
      '@type': 'Rating';
      ratingValue: string;
      bestRating?: string;
      worstRating?: string;
    };
  }>;
}

export interface ArticleSchema {
  '@context': 'https://schema.org';
  '@type': 'Article' | 'BlogPosting' | 'NewsArticle';
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified?: string;
  author: {
    '@type': 'Person' | 'Organization';
    name: string;
    url?: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
  articleBody?: string;
  wordCount?: number;
  keywords?: string[];
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

/**
 * Generate optimized page title
 */
export const generateOptimizedTitle = (
  baseTitle: string,
  siteName: string = 'SwankyBoyz',
  maxLength: number = 60
): string => {
  const fullTitle = `${baseTitle} | ${siteName}`;
  
  if (fullTitle.length <= maxLength) {
    return fullTitle;
  }

  // Truncate base title to fit
  const remainingLength = maxLength - siteName.length - 3; // 3 for " | "
  const truncatedBase = baseTitle.substring(0, remainingLength - 3) + '...';
  return `${truncatedBase} | ${siteName}`;
};

/**
 * Generate optimized meta description
 */
export const generateOptimizedDescription = (
  description: string,
  maxLength: number = 160
): string => {
  if (description.length <= maxLength) {
    return description;
  }

  // Truncate at last complete sentence before maxLength
  const truncated = description.substring(0, maxLength - 3);
  const lastPeriod = truncated.lastIndexOf('.');
  const lastSpace = truncated.lastIndexOf(' ');

  if (lastPeriod > maxLength * 0.7) {
    return description.substring(0, lastPeriod + 1);
  }

  return truncated.substring(0, lastSpace) + '...';
};

/**
 * Generate product schema markup
 */
export const generateProductSchema = (
  product: {
    name: string;
    description: string;
    image: string | string[];
    brand?: string;
    price?: number;
    currency?: string;
    availability?: boolean;
    url?: string;
    rating?: number;
    reviewCount?: number;
  }
): ProductSchema => {
  const images = Array.isArray(product.image) ? product.image : [product.image];

  const schema: ProductSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: images,
  };

  if (product.brand) {
    schema.brand = {
      '@type': 'Brand',
      name: product.brand,
    };
  }

  if (product.price !== undefined) {
    schema.offers = {
      '@type': 'Offer',
      price: product.price.toFixed(2),
      priceCurrency: product.currency || 'USD',
      availability: product.availability !== false
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: product.url || '',
    };
  }

  if (product.rating !== undefined && product.reviewCount !== undefined) {
    schema.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating.toFixed(1),
      reviewCount: product.reviewCount.toString(),
      bestRating: '5',
      worstRating: '1',
    };
  }

  return schema;
};

/**
 * Generate article schema markup
 */
export const generateArticleSchema = (
  article: {
    title: string;
    description: string;
    image: string | string[];
    publishedDate: string;
    modifiedDate?: string;
    author: string;
    authorUrl?: string;
    url: string;
    content?: string;
    keywords?: string[];
  },
  siteName: string = 'SwankyBoyz',
  siteLogoUrl: string = 'https://swankyboyz.com/logo.png'
): ArticleSchema => {
  const images = Array.isArray(article.image) ? article.image : [article.image];

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.description,
    image: images,
    datePublished: article.publishedDate,
    dateModified: article.modifiedDate || article.publishedDate,
    author: {
      '@type': 'Person',
      name: article.author,
      url: article.authorUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: siteName,
      logo: {
        '@type': 'ImageObject',
        url: siteLogoUrl,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url,
    },
    articleBody: article.content,
    wordCount: article.content?.split(/\s+/).length,
    keywords: article.keywords,
  };
};

/**
 * Generate breadcrumb schema
 */
export const generateBreadcrumbSchema = (
  breadcrumbs: Array<{ name: string; url?: string }>
): BreadcrumbSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Generate FAQ schema
 */
export const generateFAQSchema = (
  faqs: Array<{ question: string; answer: string }>
): FAQSchema => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
};

/**
 * Extract keywords from content
 */
export const extractKeywords = (
  content: string,
  maxKeywords: number = 10
): string[] => {
  // Remove HTML tags
  const plainText = content.replace(/<[^>]*>/g, ' ');

  // Common stop words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would',
    'could', 'should', 'may', 'might', 'can', 'this', 'that', 'these',
    'those', 'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which',
    'who', 'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both',
    'few', 'more', 'most', 'some', 'such', 'no', 'not', 'only', 'own',
    'same', 'so', 'than', 'too', 'very', 'just',
  ]);

  // Extract words
  const words = plainText
    .toLowerCase()
    .match(/\b[a-z]{3,}\b/g) || [];

  // Count word frequency
  const wordFreq: { [key: string]: number } = {};
  words.forEach((word) => {
    if (!stopWords.has(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  // Sort by frequency and return top keywords
  return Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
};

/**
 * Generate canonical URL
 */
export const generateCanonicalURL = (
  path: string,
  baseURL: string = 'https://swankyboyz.com'
): string => {
  // Remove trailing slash
  const cleanBase = baseURL.replace(/\/$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${cleanBase}${cleanPath}`;
};

/**
 * Generate robots meta tag value
 */
export const generateRobotsTag = (
  options: {
    index?: boolean;
    follow?: boolean;
    noarchive?: boolean;
    nosnippet?: boolean;
    noimageindex?: boolean;
  } = {}
): string => {
  const rules: string[] = [];

  rules.push(options.index !== false ? 'index' : 'noindex');
  rules.push(options.follow !== false ? 'follow' : 'nofollow');

  if (options.noarchive) rules.push('noarchive');
  if (options.nosnippet) rules.push('nosnippet');
  if (options.noimageindex) rules.push('noimageindex');

  return rules.join(', ');
};

/**
 * Validate and optimize image alt text
 */
export const optimizeImageAlt = (
  altText: string,
  context?: string,
  maxLength: number = 125
): string => {
  let optimized = altText.trim();

  // Remove common redundant phrases
  optimized = optimized
    .replace(/^(image of|picture of|photo of)\s+/i, '')
    .replace(/\s+(image|picture|photo)$/i, '');

  // Add context if provided and alt is too short
  if (context && optimized.length < 10) {
    optimized = `${optimized} - ${context}`;
  }

  // Truncate if too long
  if (optimized.length > maxLength) {
    optimized = optimized.substring(0, maxLength - 3) + '...';
  }

  return optimized;
};

/**
 * Calculate content readability score (Flesch Reading Ease)
 */
export const calculateReadabilityScore = (content: string): number => {
  const plainText = content.replace(/<[^>]*>/g, ' ');
  const sentences = plainText.split(/[.!?]+/).filter((s) => s.trim().length > 0);
  const words = plainText.match(/\b[a-z]+\b/gi) || [];
  const syllables = words.reduce((count, word) => {
    return count + countSyllables(word);
  }, 0);

  if (sentences.length === 0 || words.length === 0) return 0;

  const avgWordsPerSentence = words.length / sentences.length;
  const avgSyllablesPerWord = syllables / words.length;

  // Flesch Reading Ease formula
  const score = 206.835 - 1.015 * avgWordsPerSentence - 84.6 * avgSyllablesPerWord;

  return Math.max(0, Math.min(100, score));
};

/**
 * Count syllables in a word (simplified)
 */
const countSyllables = (word: string): number => {
  word = word.toLowerCase();
  if (word.length <= 3) return 1;

  word = word.replace(/(?:[^laeiouy]es|ed|[^laeiouy]e)$/, '');
  word = word.replace(/^y/, '');

  const matches = word.match(/[aeiouy]{1,2}/g);
  return matches ? matches.length : 1;
};

export default {
  generateOptimizedTitle,
  generateOptimizedDescription,
  generateProductSchema,
  generateArticleSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  extractKeywords,
  generateCanonicalURL,
  generateRobotsTag,
  optimizeImageAlt,
  calculateReadabilityScore,
};
