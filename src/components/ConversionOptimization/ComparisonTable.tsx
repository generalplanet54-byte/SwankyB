import React, { useState } from 'react';
import { ChevronDown, Check, X, AlertCircle } from 'lucide-react';

export interface ComparisonProduct {
  id: string;
  name: string;
  image: string;
  price: string;
  rating: number;
  affiliateUrl: string;
  recommended?: boolean;
  features: Record<string, string | number | boolean>;
}

export interface ComparisonFeature {
  key: string;
  label: string;
  description?: string;
  type?: 'text' | 'numeric' | 'boolean';
  weight?: number; // For weighted scoring
}

interface ComparisonTableProps {
  products: ComparisonProduct[];
  features: ComparisonFeature[];
  title?: string;
  description?: string;
  allowSorting?: boolean;
}

const ComparisonTable: React.FC<ComparisonTableProps> = ({
  products,
  features,
  title = "Product Comparison",
  description,
}) => {
  const [expandedFeature, setExpandedFeature] = useState<string | null>(null);

  // Calculate score for each product
  const calculateScore = (product: ComparisonProduct) => {
    let score = 0;
    features.forEach((feature) => {
      const value = product.features[feature.key];
      const weight = feature.weight || 1;

      if (feature.type === 'boolean') {
        if (value === true) score += 10 * weight;
      } else if (feature.type === 'numeric') {
        score += (Number(value) || 0) * weight;
      }
    });

    return Math.round(score / 10);
  };

  // Use products directly (sorting disabled for simpler UX)
  const sortedProducts = products;

  return (
    <div id="product-comparison" className="w-full rounded-2xl bg-charcoal/50 p-6 border border-off-white/10">
      {/* Header */}
      <div className="mb-8 space-y-2">
        <h3 className="font-display text-2xl text-off-white">{title}</h3>
        {description && (
          <p className="text-off-white/70">{description}</p>
        )}
      </div>

      {/* Mobile-friendly horizontal scroll */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-off-white/10">
              <th className="sticky left-0 bg-charcoal/80 z-10 px-4 py-4 text-left text-xs font-semibold uppercase tracking-[0.2em] text-off-white/70">
                Features
              </th>
              {sortedProducts.map((product) => (
                <th
                  key={product.id}
                  className={`px-4 py-4 text-center transition-all ${
                    product.recommended ? 'bg-champagne/10 border-l border-champagne/50' : ''
                  }`}
                >
                  {product.recommended && (
                    <div className="mb-2 inline-block rounded-full bg-champagne/20 px-2 py-1 text-[0.65rem] font-bold uppercase tracking-[0.2em] text-champagne">
                      ⭐ Recommended
                    </div>
                  )}
                  <div className="aspect-square overflow-hidden rounded-lg mb-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-off-white text-sm">{product.name}</h4>
                    <div className="space-y-1">
                      <div className="text-lg font-bold text-champagne">{product.price}</div>
                      <div className="text-xs text-off-white/70">⭐ {product.rating}/5</div>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-off-white/10">
            {features.map((feature) => (
              <tr key={feature.key} className="hover:bg-white/5 transition">
                <td
                  onClick={() => setExpandedFeature(
                    expandedFeature === feature.key ? null : feature.key
                  )}
                  className="sticky left-0 bg-charcoal z-10 px-4 py-4 cursor-pointer group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-off-white group-hover:text-champagne transition">
                      {feature.label}
                    </span>
                    {feature.description && (
                      <AlertCircle className="h-4 w-4 text-off-white/40 flex-shrink-0" />
                    )}
                    {feature.description && (
                      <ChevronDown
                        className={`h-4 w-4 text-off-white/40 transition ${
                          expandedFeature === feature.key ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </div>

                  {expandedFeature === feature.key && feature.description && (
                    <p className="mt-2 text-xs text-off-white/60">{feature.description}</p>
                  )}
                </td>

                {sortedProducts.map((product) => {
                  const value = product.features[feature.key];
                  const isBoolean = feature.type === 'boolean' || typeof value === 'boolean';

                  return (
                    <td
                      key={`${product.id}-${feature.key}`}
                      className={`px-4 py-4 text-center ${
                        product.recommended ? 'bg-champagne/5' : ''
                      }`}
                    >
                      {isBoolean ? (
                        value ? (
                          <div className="flex justify-center">
                            <Check className="h-5 w-5 text-emerald-400" />
                          </div>
                        ) : (
                          <div className="flex justify-center">
                            <X className="h-5 w-5 text-off-white/30" />
                          </div>
                        )
                      ) : (
                        <div className="text-sm font-medium text-off-white">
                          {value}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}

            {/* Score row */}
            <tr className="bg-charcoal/50 border-t-2 border-champagne/30 font-bold">
              <td className="sticky left-0 bg-charcoal/50 z-10 px-4 py-4 text-off-white">
                Overall Score
              </td>
              {sortedProducts.map((product) => (
                <td
                  key={`score-${product.id}`}
                  className={`px-4 py-4 text-center ${
                    product.recommended ? 'bg-champagne/10' : ''
                  }`}
                >
                  <div className="text-2xl font-bold text-champagne">
                    {calculateScore(product)}/100
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* CTA Section */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {sortedProducts.map((product) => (
          <a
            key={`cta-${product.id}`}
            href={product.affiliateUrl}
            target="_blank"
            rel="nofollow sponsored noopener"
            data-affiliate-link
            data-affiliate-id={product.id}
            data-affiliate-name={product.name}
            className={`inline-flex items-center justify-center rounded-full px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] transition ${
              product.recommended
                ? 'bg-champagne text-charcoal hover:bg-champagne/90'
                : 'border border-champagne text-champagne hover:bg-champagne/10'
            }`}
          >
            {product.recommended ? '👉 Buy Now' : 'View Details'}
          </a>
        ))}
      </div>

      {/* Affiliate Disclosure */}
      <div className="mt-6 rounded-lg bg-yellow-500/10 p-4 border border-yellow-500/20">
        <p className="text-xs text-yellow-100/80">
          <strong>💡 Affiliate Disclosure:</strong> We may earn a commission from links above at no additional cost to you. See our
          <a href="/affiliate-disclosure" className="ml-1 underline hover:no-underline">
            full disclosure
          </a>
          .
        </p>
      </div>
    </div>
  );
};

export default ComparisonTable;
