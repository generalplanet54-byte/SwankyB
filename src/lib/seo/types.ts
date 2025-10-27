export type OpenGraphType = 'website' | 'article' | 'profile' | 'product';

export interface SeoDefaults {
  siteName: string;
  baseUrl: string;
  description: string;
  locale: string;
  twitterHandle?: string;
}

export interface SeoInput {
  title?: string;
  description?: string;
  canonical?: string;
  ogType?: OpenGraphType;
  image?: {
    src: string;
    alt?: string;
    width?: number;
    height?: number;
  };
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
  section?: string;
  tags?: string[];
  structuredData?: JsonLd | JsonLd[];
}

export interface MetaTag {
  tag: 'meta' | 'link';
  attrs: Record<string, string>;
}

export interface JsonLd {
  '@context': 'https://schema.org';
  '@type': string;
  [key: string]: unknown;
}
