/**
 * Product Schema Markup Generator
 * Generates JSON-LD structured data for products to improve SEO and SERP rich snippets
 */

export interface ProductSchemaOptions {
  name: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount?: number;
  category?: string;
  affiliateUrl: string;
  availability?: 'InStock' | 'OutOfStock' | 'PreOrder' | 'Discontinued';
  sku?: string;
  brand?: string;
  siteUrl?: string;
  productUrl?: string;
}

/**
 * Generate Product schema markup
 */
export function generateProductSchema(options: ProductSchemaOptions) {
  const {
    name,
    description,
    image,
    price,
    rating,
    reviewCount = 0,
    category,
    affiliateUrl,
    availability = 'InStock',
    sku,
    brand = 'SwankyBoyz',
    siteUrl = 'https://swankyboyz.com',
    productUrl,
  } = options;

  // Extract numeric price
  const numericPrice = parseFloat(price.replace('$', '').replace(',', ''));

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: Array.isArray(image) ? image : [image],
    sku: sku || name.toLowerCase().replace(/\s+/g, '-'),
    brand: {
      '@type': 'Brand',
      name: brand,
    },
    aggregateRating: reviewCount > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: Math.min(rating, 5),
      bestRating: 5,
      worstRating: 1,
      reviewCount,
    } : undefined,
    offers: {
      '@type': 'Offer',
      price: numericPrice.toString(),
      priceCurrency: 'USD',
      availability: `https://schema.org/${availability}`,
      url: affiliateUrl,
      seller: {
        '@type': 'Organization',
        name: 'Amazon',
      },
    },
    category,
    url: productUrl,
  };
}

/**
 * Generate AggregateOffer schema for product collections
 */
export function generateAggregateOfferSchema(
  products: Array<{
    price: string;
    originalPrice?: string;
  }>,
  options?: {
    siteUrl?: string;
    category?: string;
  }
) {
  const prices = products.map(p => parseFloat(p.price.replace('$', '').replace(',', '')));
  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);
  const avgPrice = (prices.reduce((a, b) => a + b, 0) / prices.length).toFixed(2);

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    priceCurrency: 'USD',
    lowPrice: minPrice.toString(),
    highPrice: maxPrice.toString(),
    offerCount: products.length,
    price: avgPrice,
    availability: 'https://schema.org/InStock',
  };
}

/**
 * Generate Review schema markup
 */
export function generateReviewSchema(options: {
  productName: string;
  reviewText: string;
  rating: number;
  author: string;
  publishDate: string;
  bestRating?: number;
  worstRating?: number;
}) {
  const {
    productName,
    reviewText,
    rating,
    author,
    publishDate,
    bestRating = 5,
    worstRating = 1,
  } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    productReviewed: productName,
    reviewRating: {
      '@type': 'Rating',
      ratingValue: Math.min(rating, bestRating),
      bestRating,
      worstRating,
    },
    reviewBody: reviewText,
    author: {
      '@type': 'Person',
      name: author,
    },
    datePublished: publishDate,
  };
}

/**
 * Generate FAQPage schema markup
 */
export function generateFAQPageSchema(
  faqs: Array<{
    question: string;
    answer: string;
  }>
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate BreadcrumbList schema
 */
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{
    label: string;
    url: string;
  }>,
  siteUrl: string = 'https://swankyboyz.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: new URL(item.url, siteUrl).toString(),
    })),
  };
}

/**
 * Generate ProductCollection schema (for category pages)
 */
export function generateProductCollectionSchema(
  products: Array<{
    name: string;
    image: string;
    price: string;
    rating: number;
    reviewCount?: number;
  }>,
  options: {
    collectionName: string;
    description: string;
    siteUrl?: string;
  }
) {
  const { collectionName, description, siteUrl = 'https://swankyboyz.com' } = options;

  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: collectionName,
    description,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: products.map((product, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: product.name,
          image: product.image,
          price: product.price.replace('$', ''),
          priceCurrency: 'USD',
          aggregateRating: product.reviewCount ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          } : undefined,
        },
      })),
    },
  };
}

/**
 * Generate Organization schema for website footer/global use
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SwankyBoyz',
    url: 'https://swankyboyz.com',
    logo: 'https://swankyboyz.com/logo.png',
    description: 'Premium men\'s grooming, style, and lifestyle guide for modern gentlemen',
    foundingDate: '2023',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-XXX-XXX-XXXX',
      contactType: 'Customer Support',
    },
    sameAs: [
      'https://www.facebook.com/swankyboyz',
      'https://www.instagram.com/swankyboyz',
      'https://www.twitter.com/swankyboyz',
    ],
  };
}
