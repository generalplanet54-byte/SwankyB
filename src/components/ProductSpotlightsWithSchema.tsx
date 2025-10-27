/**
 * Product Spotlights Component with Schema Injection
 * Renders product spotlight grid and injects JSON-LD schema markup
 */

import React from 'react';
import { useProductSchema } from './ProductSchemaInjector';

interface SpotlightProduct {
  id: string;
  name: string;
  summary: string;
  image: string;
  price: number;
  priceCurrency: string;
  ratingValue: number;
  reviewCount: number;
  badges: string[];
  tagline: string;
  pros: string[];
  cons: string[];
  useCases: string[];
  author: string;
  affiliateUrl: string;
  url: string;
  slug: string;
}

interface ProductSpotlightsWithSchemaProps {
  products: SpotlightProduct[];
}

export function ProductSpotlightsWithSchema({ products }: ProductSpotlightsWithSchemaProps) {
  // Transform spotlightProducts to match ProductSchemaInjector interface
  const schemaProducts = products.map(product => ({
    id: product.id,
    name: product.name,
    description: product.summary,
    price: String(product.price),
    image: product.image,
    affiliateUrl: product.affiliateUrl,
    rating: product.ratingValue,
    category: product.tagline,
  }));

  // Inject schemas
  useProductSchema(schemaProducts, true);

  return (
    <section id="product-spotlight" className="bg-[#121212] py-24">
      <div className="container space-y-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="uppercase text-xs tracking-[0.5em] text-champagne/70">Editor Spotlight</p>
            <h2 className="font-display text-4xl leading-tight text-off-white sm:text-5xl">
              Grooming tools that earn a permanent slot in the SwankyBoyz kit.
            </h2>
            <p className="text-base text-off-white/70">
              Every product below survived hands-on testing in studio, backstage, and on the road. We audit performance,
              durability, and ease of upkeep before a single link goes live.
            </p>
          </div>
          <div className="max-w-sm rounded-3xl border border-off-white/15 bg-charcoal/70 p-6 text-sm text-off-white/60">
            <p className="font-semibold uppercase tracking-[0.25em] text-champagne/80">Affiliate Standards</p>
            <p className="mt-3">
              As an Amazon Associate we earn from qualifying purchases. Pricing and availability can change without notice;
              always confirm on the retailer site before checkout.
            </p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {products.map((product) => (
            <article
              key={product.id}
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-off-white/10 bg-charcoal/80 shadow-luxury transition hover:border-champagne/50"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  className="h-60 w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div>
                    <p className="text-sm font-semibold text-off-white/90">Rated {product.ratingValue.toFixed(1)} / 5</p>
                    <p className="text-xs text-off-white/60">{product.reviewCount.toLocaleString()} verified impressions</p>
                  </div>
                  <div className="flex flex-wrap justify-end gap-2">
                    {product.badges.map((badge) => (
                      <span key={badge} className="rounded-full bg-off-white/10 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-off-white/80">
                        {badge}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-6 p-8">
                <header className="space-y-3">
                  <p className="text-xs uppercase tracking-[0.4em] text-champagne/80">{product.tagline}</p>
                  <h3 className="font-display text-2xl text-off-white">{product.name}</h3>
                  <p className="text-sm text-off-white/70">{product.summary}</p>
                </header>

                <div className="grid gap-4 text-sm text-off-white/80">
                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-off-white/50">Why we love it</p>
                    <ul className="mt-2 space-y-2">
                      {product.pros.map((pro) => (
                        <li key={pro} className="flex gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-champagne"></span>
                          <span>{pro}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-off-white/50">Need to know</p>
                    <ul className="mt-2 space-y-2">
                      {product.cons.map((con) => (
                        <li key={con} className="flex gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-off-white/30"></span>
                          <span>{con}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-[0.3em] text-off-white/50">Best for</p>
                    <ul className="mt-2 space-y-2">
                      {product.useCases.map((useCase) => (
                        <li key={useCase} className="flex gap-3">
                          <span className="mt-1 h-1.5 w-1.5 rounded-full bg-off-white/30"></span>
                          <span>{useCase}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-auto space-y-4">
                  <div className="flex items-center justify-between text-sm text-off-white/70">
                    <span className="text-sm uppercase tracking-[0.3em]">${product.price.toFixed(2)} {product.priceCurrency ?? 'USD'}</span>
                    <span className="text-xs text-off-white/50">Reviewed by {product.author}</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <a
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-full border border-transparent bg-champagne px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-charcoal transition hover:bg-champagne/90"
                      href={product.affiliateUrl}
                      target="_blank"
                      rel="nofollow sponsored noopener"
                      data-affiliate-link
                      data-affiliate-id={product.id}
                      data-affiliate-name={product.name}
                      data-affiliate-url={product.affiliateUrl}
                      data-affiliate-product-url={product.url}
                      data-affiliate-source="homepage:spotlight"
                    >
                      Shop Amazon
                    </a>
                    <a
                      className="inline-flex items-center justify-center rounded-full border border-off-white/30 px-5 py-3 text-xs font-semibold uppercase tracking-[0.4em] text-off-white transition hover:border-champagne/80 hover:text-champagne"
                      href={`/reviews/${product.slug}`}
                    >
                      Read review
                    </a>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
