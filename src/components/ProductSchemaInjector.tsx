/**
 * Product Schema Injector Component
 * Automatically injects JSON-LD schema markup for products into the page head
 */

import React from 'react';
import { generateProductSchema, generateAggregateOfferSchema } from '@/lib/seo/productSchema';

interface LaunchProduct {
  id: string;
  name: string;
  description: string;
  price: string;
  originalPrice?: string;
  image: string;
  affiliateUrl: string;
  rating: number;
  category: string;
  bestseller?: boolean;
}

interface ProductSchemaInjectorProps {
  products: LaunchProduct[];
  includeAggregateOffer?: boolean;
}

/**
 * Injects product schema markup into the page head
 * This component should be placed in a layout or parent component
 */
export function ProductSchemaInjector({ 
  products, 
  includeAggregateOffer = true 
}: ProductSchemaInjectorProps) {
  React.useEffect(() => {
    // Generate and inject Product schemas for each product
    products.forEach(product => {
      const schema = generateProductSchema({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        category: product.category,
        affiliateUrl: product.affiliateUrl,
      });

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      script.setAttribute('data-product-id', product.id);
      document.head.appendChild(script);
    });

    // Generate and inject AggregateOffer schema if requested
    if (includeAggregateOffer && products.length > 0) {
      const aggregateSchema = generateAggregateOfferSchema(products);
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(aggregateSchema);
      script.setAttribute('data-schema-type', 'aggregate-offer');
      document.head.appendChild(script);
    }

    // Cleanup: Remove scripts on component unmount
    return () => {
      document.querySelectorAll('[data-product-id]').forEach(el => el.remove());
      document.querySelectorAll('[data-schema-type="aggregate-offer"]').forEach(el => el.remove());
    };
  }, [products, includeAggregateOffer]);

  return null; // This component doesn't render anything
}

/**
 * Hook to use product schema injection
 */
export function useProductSchema(products: LaunchProduct[], includeAggregateOffer = true) {
  React.useEffect(() => {
    // Same implementation as component
    products.forEach(product => {
      const schema = generateProductSchema({
        name: product.name,
        description: product.description,
        image: product.image,
        price: product.price,
        originalPrice: product.originalPrice,
        rating: product.rating,
        category: product.category,
        affiliateUrl: product.affiliateUrl,
      });

      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(schema);
      script.setAttribute('data-product-id', product.id);
      document.head.appendChild(script);
    });

    if (includeAggregateOffer && products.length > 0) {
      const aggregateSchema = generateAggregateOfferSchema(products);
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(aggregateSchema);
      script.setAttribute('data-schema-type', 'aggregate-offer');
      document.head.appendChild(script);
    }

    return () => {
      document.querySelectorAll('[data-product-id]').forEach(el => el.remove());
      document.querySelectorAll('[data-schema-type="aggregate-offer"]').forEach(el => el.remove());
    };
  }, [products, includeAggregateOffer]);
}
