import { seoDefaults } from './config';
import type { JsonLd, MetaTag, SeoInput } from './types';

export interface ProductForJsonLd {
  id: string;
  name: string;
  description: string;
  url: string;
  image: string;
  brand: string;
  price: number;
  priceCurrency?: string;
  ratingValue: number;
  reviewCount: number;
  reviewBody: string;
  author: string;
  availability?: string;
  asin?: string;
}

const defaultAvailability = 'https://schema.org/InStock';
const defaultCurrency = 'USD';

const formatRating = (rating: number) => Number(rating.toFixed(1));
const formatPrice = (price: number) => price.toFixed(2);

const resolveUrl = (base: string, path: string | undefined) => {
  if (!path) return base;
  if (path.startsWith('http')) return path;
  return `${base.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
};

export const resolveSeo = (input: SeoInput = {}) => {
  const canonical = resolveUrl(seoDefaults.baseUrl, input.canonical);

  return {
    title: input.title ?? seoDefaults.siteName,
    description: input.description ?? seoDefaults.description,
    canonical,
    ogType: input.ogType ?? 'website',
    image: input.image,
    siteName: seoDefaults.siteName,
    locale: seoDefaults.locale,
    twitterHandle: seoDefaults.twitterHandle,
    noIndex: input.noIndex ?? false,
    publishedTime: input.publishedTime,
    modifiedTime: input.modifiedTime,
    section: input.section,
    tags: input.tags,
  };
};

export const buildMetaTags = (input: SeoInput = {}): MetaTag[] => {
  const seo = resolveSeo(input);
  const tags: MetaTag[] = [
    { tag: 'meta', attrs: { name: 'description', content: seo.description } },
    { tag: 'link', attrs: { rel: 'canonical', href: seo.canonical } },
    { tag: 'meta', attrs: { property: 'og:title', content: seo.title } },
    { tag: 'meta', attrs: { property: 'og:description', content: seo.description } },
    { tag: 'meta', attrs: { property: 'og:type', content: seo.ogType } },
    { tag: 'meta', attrs: { property: 'og:url', content: seo.canonical } },
    { tag: 'meta', attrs: { property: 'og:site_name', content: seo.siteName } },
    { tag: 'meta', attrs: { property: 'og:locale', content: seo.locale } },
    { tag: 'meta', attrs: { name: 'twitter:card', content: 'summary_large_image' } },
    { tag: 'meta', attrs: { name: 'twitter:title', content: seo.title } },
    { tag: 'meta', attrs: { name: 'twitter:description', content: seo.description } },
  ];

  if (seo.twitterHandle) {
    tags.push({
      tag: 'meta',
      attrs: { name: 'twitter:site', content: seo.twitterHandle },
    });
    tags.push({
      tag: 'meta',
      attrs: { name: 'twitter:creator', content: seo.twitterHandle },
    });
  }

  if (seo.image) {
    const { src, alt = seo.title, width, height } = seo.image;
    tags.push({ tag: 'meta', attrs: { property: 'og:image', content: src } });
    tags.push({ tag: 'meta', attrs: { name: 'twitter:image', content: src } });
    tags.push({ tag: 'meta', attrs: { property: 'og:image:alt', content: alt } });
    if (width) tags.push({ tag: 'meta', attrs: { property: 'og:image:width', content: `${width}` } });
    if (height) tags.push({ tag: 'meta', attrs: { property: 'og:image:height', content: `${height}` } });
  }

  if (seo.noIndex) {
    tags.push({ tag: 'meta', attrs: { name: 'robots', content: 'noindex, nofollow' } });
  }

  if (seo.publishedTime) {
    tags.push({ tag: 'meta', attrs: { property: 'article:published_time', content: seo.publishedTime } });
  }

  if (seo.modifiedTime) {
    tags.push({ tag: 'meta', attrs: { property: 'article:modified_time', content: seo.modifiedTime } });
  }

  if (seo.section) {
    tags.push({ tag: 'meta', attrs: { property: 'article:section', content: seo.section } });
  }

  if (seo.tags?.length) {
    seo.tags.forEach((tagValue) =>
      tags.push({ tag: 'meta', attrs: { property: 'article:tag', content: tagValue } })
    );
  }

  return tags;
};

export const buildOrganizationJsonLd = (): JsonLd => ({
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: seoDefaults.siteName,
  url: seoDefaults.baseUrl,
  description: seoDefaults.description,
  logo: `${seoDefaults.baseUrl}/logo.png`,
  sameAs: [seoDefaults.baseUrl],
});

export const buildArticleJsonLd = (input: SeoInput): JsonLd | null => {
  const seo = resolveSeo(input);
  if (!seo.publishedTime) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: seo.title,
    description: seo.description,
    datePublished: seo.publishedTime,
    dateModified: seo.modifiedTime ?? seo.publishedTime,
    mainEntityOfPage: seo.canonical,
    publisher: {
      '@type': 'Organization',
      name: seoDefaults.siteName,
      url: seoDefaults.baseUrl,
    },
    image: seo.image?.src,
  } satisfies JsonLd;
};

export const buildProductReviewJsonLd = (product: ProductForJsonLd): JsonLd => {
  const availability = product.availability ?? defaultAvailability;
  const priceCurrency = product.priceCurrency ?? defaultCurrency;

  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    sku: product.id,
    ...(product.asin ? { mpn: product.asin } : {}),
    name: product.name,
    image: product.image,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    url: product.url,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: formatRating(product.ratingValue),
      reviewCount: product.reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    review: {
      '@type': 'Review',
      reviewBody: product.reviewBody,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: formatRating(product.ratingValue),
        bestRating: 5,
        worstRating: 1,
      },
      author: {
        '@type': 'Person',
        name: product.author,
      },
    },
    offers: {
      '@type': 'Offer',
      url: product.url,
      price: formatPrice(product.price),
      priceCurrency,
      availability,
    },
  } satisfies JsonLd;
};

export const buildProductCollectionJsonLd = (products: ProductForJsonLd[]): JsonLd => {
  const itemListElement = products.map((product, index) => {
    const productSchema = buildProductReviewJsonLd(product);
    const { ['@context']: _context, ...productWithoutContext } = productSchema as Record<string, unknown>;

    return {
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      url: product.url,
      item: productWithoutContext,
    };
  });

  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'SwankyBoyz Grooming Spotlight',
    description: 'Curated grooming essentials reviewed by the SwankyBoyz editorial desk.',
    itemListOrder: 'https://schema.org/ItemListOrderAscending',
    itemListElement,
  } satisfies JsonLd;
};
