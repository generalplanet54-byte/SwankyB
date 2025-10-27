/**
 * SEO Schema Markup Generators
 * For implementing rich snippets and structured data
 */

interface SchemaMarkupProps {
  [key: string]: any;
}

/**
 * Organization Schema
 * @description Shows up in knowledge panels
 */
export const organizationSchema = (): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  'name': 'SwankyBoyz',
  'description': 'The world\'s premier authority for high-end male grooming and lifestyle products',
  'url': 'https://swankyboyz.com',
  'logo': 'https://swankyboyz.com/logo.png',
  'sameAs': [
    'https://twitter.com/swankyboyz',
    'https://instagram.com/swankyboyz',
    'https://facebook.com/swankyboyz'
  ],
  'contact': {
    '@type': 'ContactPoint',
    'telephone': '+1-xxx-xxx-xxxx',
    'contactType': 'Customer Support'
  }
});

/**
 * FAQPage Schema
 * @description Generates FAQ rich snippets
 */
export const faqSchema = (items: Array<{ question: string; answer: string }>): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  'mainEntity': items.map(item => ({
    '@type': 'Question',
    'name': item.question,
    'acceptedAnswer': {
      '@type': 'Answer',
      'text': item.answer
    }
  }))
});

/**
 * Product Schema
 * @description Generates product rich snippets with pricing and availability
 */
export const productSchema = (product: {
  name: string;
  description: string;
  image: string;
  price: string;
  priceCurrency: string;
  rating: number;
  reviewCount: number;
  availability: string;
  url: string;
}): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'Product',
  'name': product.name,
  'description': product.description,
  'image': product.image,
  'url': product.url,
  'offers': {
    '@type': 'Offer',
    'url': product.url,
    'priceCurrency': product.priceCurrency,
    'price': product.price.replace('$', ''),
    'availability': product.availability,
    'seller': {
      '@type': 'Organization',
      'name': 'Amazon'
    }
  },
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': product.rating.toString(),
    'bestRating': '5',
    'worstRating': '1',
    'ratingCount': product.reviewCount.toString()
  }
});

/**
 * Article Schema
 * @description Generates article rich snippets
 */
export const articleSchema = (article: {
  headline: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified: string;
  author: string;
  url: string;
}): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'NewsArticle',
  'headline': article.headline,
  'description': article.description,
  'image': article.image,
  'datePublished': article.datePublished,
  'dateModified': article.dateModified,
  'author': {
    '@type': 'Person',
    'name': article.author
  },
  'publisher': {
    '@type': 'Organization',
    'name': 'SwankyBoyz',
    'logo': {
      '@type': 'ImageObject',
      'url': 'https://swankyboyz.com/logo.png'
    }
  },
  'mainEntityOfPage': {
    '@type': 'WebPage',
    '@id': article.url
  }
});

/**
 * BreadcrumbList Schema
 * @description Generates breadcrumb navigation schema
 */
export const breadcrumbSchema = (items: Array<{ name: string; url: string }>): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  'itemListElement': items.map((item, index) => ({
    '@type': 'ListItem',
    'position': index + 1,
    'name': item.name,
    'item': item.url
  }))
});

/**
 * Review Schema (Aggregate)
 * @description Shows aggregate ratings in search results
 */
export const reviewSchema = (reviews: Array<{
  author: string;
  rating: number;
  text: string;
  datePublished: string;
}>): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'Review',
  'itemReviewed': {
    '@type': 'Thing',
    'name': 'Product'
  },
  'reviewRating': reviews.map(review => ({
    '@type': 'Rating',
    'ratingValue': review.rating.toString()
  })),
  'author': {
    '@type': 'Person',
    'name': reviews[0]?.author || 'Anonymous'
  },
  'reviewBody': reviews[0]?.text || '',
  'datePublished': reviews[0]?.datePublished || new Date().toISOString()
});

/**
 * LocalBusiness Schema
 * @description For location-based businesses
 */
export const localBusinessSchema = (business: {
  name: string;
  address: string;
  telephone: string;
  image: string;
  rating: number;
}): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  'name': business.name,
  'image': business.image,
  'address': {
    '@type': 'PostalAddress',
    'streetAddress': business.address
  },
  'telephone': business.telephone,
  'aggregateRating': {
    '@type': 'AggregateRating',
    'ratingValue': business.rating.toString(),
    'bestRating': '5'
  }
});

/**
 * HowTo Schema
 * @description Generates "How To" guides for rich snippets
 */
export const howToSchema = (howTo: {
  name: string;
  description: string;
  image: string;
  steps: Array<{
    name: string;
    text: string;
    image?: string;
  }>;
}): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  'name': howTo.name,
  'description': howTo.description,
  'image': howTo.image,
  'step': howTo.steps.map((step, index) => ({
    '@type': 'HowToStep',
    'position': (index + 1).toString(),
    'name': step.name,
    'text': step.text,
    ...(step.image && { 'image': step.image })
  }))
});

/**
 * AggregateOffer Schema
 * @description Shows price ranges and availability
 */
export const aggregateOfferSchema = (offer: {
  priceCurrency: string;
  lowPrice: string;
  highPrice: string;
  offerCount: number;
  offers: Array<{
    price: string;
    availability: string;
  }>;
}): SchemaMarkupProps => ({
  '@context': 'https://schema.org',
  '@type': 'AggregateOffer',
  'priceCurrency': offer.priceCurrency,
  'lowPrice': offer.lowPrice,
  'highPrice': offer.highPrice,
  'offerCount': offer.offerCount.toString(),
  'offers': offer.offers.map(o => ({
    '@type': 'Offer',
    'price': o.price,
    'availability': o.availability
  }))
});

/**
 * React component to inject schema into head
 */
export const useSchemaMarkup = (schema: SchemaMarkupProps): void => {
  if (typeof window === 'undefined') return;

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

/**
 * Helper function to generate script tag string for schema markup
 * Use in Astro components with set:html directive
 */
export const getSchemaMarkupScript = (schema: SchemaMarkupProps): string => {
  return JSON.stringify(schema);
};
