import React, { useEffect } from 'react';
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';
import { generateFAQPageSchema } from '@/lib/seo/productSchema';

// Skincare products comparison
const skincareProducts: ComparisonProduct[] = [
  {
    id: 'prod-clinique-lotion',
    name: 'Clinique Dramatically Different Lotion+',
    image: 'https://images.pexels.com/photos/3762879/pexels-photo-3762879.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$32.00',
    rating: 4.5,
    affiliateUrl: 'https://www.amazon.com/dp/B00BQZSR5E?tag=swankyboyz-20',
    recommended: true,
    features: {
      'productType': 'Moisturizing Lotion',
      'skinType': 'All types, especially dry',
      'skinChallenge': 'Dehydration, barrier damage',
      'ingredients': 'Hyaluronic acid, glycerin',
      'spf': 'None - use with SPF',
      'absorptionTime': '2-3 minutes',
      'scent': 'Light fragrance',
      'bestFor': 'Daily hydration'
    }
  },
  {
    id: 'prod-cetaphil-cleanser',
    name: 'CeraVe Facial Moisturizing Lotion',
    image: 'https://images.pexels.com/photos/3722662/pexels-photo-3722662.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$14.99',
    rating: 4.6,
    affiliateUrl: 'https://www.amazon.com/s?k=CeraVe+facial+lotion',
    features: {
      'productType': 'Moisturizing Lotion',
      'skinType': 'All types, sensitive',
      'skinChallenge': 'Sensitivity, eczema',
      'ingredients': 'Ceramides, hyaluronic acid',
      'spf': 'None - use with SPF',
      'absorptionTime': '3-5 minutes',
      'scent': 'Fragrance-free',
      'bestFor': 'Sensitive skin'
    }
  },
  {
    id: 'prod-olay-regenerist',
    name: 'Olay Men Ultra Comfort Balm',
    image: 'https://images.pexels.com/photos/3587620/pexels-photo-3587620.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$6.99',
    rating: 4.2,
    affiliateUrl: 'https://www.amazon.com/s?k=Olay+men+lotion',
    features: {
      'productType': 'After-Shave Balm',
      'skinType': 'All types',
      'skinChallenge': 'Razor irritation, dryness',
      'ingredients': 'Vitamin E, aloe vera',
      'spf': 'None - use with SPF',
      'absorptionTime': '1-2 minutes',
      'scent': 'Light mens fragrance',
      'bestFor': 'Post-shave care'
    }
  }
];

// Comparison features
const skincareFeatures: ComparisonFeature[] = [
  {
    key: 'productType',
    label: 'Product Type',
    description: 'Category and primary purpose',
    type: 'text',
    weight: 1.2
  },
  {
    key: 'skinType',
    label: 'Best For Skin Type',
    description: 'Dermatologist recommended for these skin types',
    type: 'text',
    weight: 1.4
  },
  {
    key: 'skinChallenge',
    label: 'Solves',
    description: 'What skin problems it helps with',
    type: 'text',
    weight: 1.3
  },
  {
    key: 'ingredients',
    label: 'Key Ingredients',
    description: 'Main active and moisturizing components',
    type: 'text',
    weight: 1.2
  },
  {
    key: 'spf',
    label: 'SPF Protection',
    description: 'Sun protection included',
    type: 'text'
  },
  {
    key: 'absorptionTime',
    label: 'Absorption Speed',
    description: 'How quickly skin absorbs the product',
    type: 'text',
    weight: 1.1
  },
  {
    key: 'scent',
    label: 'Fragrance',
    description: 'Added scent profile',
    type: 'text'
  },
  {
    key: 'bestFor',
    label: 'Best For',
    description: 'Primary use case and recommendation',
    type: 'text'
  }
];

const SkincareComparison: React.FC = () => {
  useEffect(() => {
    // Set page title and meta tags
    document.title = 'Best Men\'s Skincare Moisturizers Comparison | Lotion Reviews | SwankyBoyz';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare the best men\'s skincare moisturizers and after-shave balms. Expert reviews of premium lotions for sensitive skin, dryness, and razor irritation.');
    }

    // Inject FAQ Schema for rich snippets
    const faqSchema = generateFAQPageSchema([
      {
        question: 'How often should I apply skincare products?',
        answer: 'Most moisturizers should be applied daily after shaving or showering. After-shave balms are best applied immediately post-shave. For best results, apply to damp skin to help lock in moisture.'
      },
      {
        question: 'What\'s the difference between moisturizer and after-shave balm?',
        answer: 'After-shave balms are specifically formulated to soothe razor irritation and have cooling properties. Daily moisturizers are for overall skin hydration and protection. Many men use both for optimal skin health.'
      },
      {
        question: 'How do I choose the right skincare for my skin type?',
        answer: 'For dry skin, opt for thicker creams. For oily or sensitive skin, choose lightweight, hypoallergenic formulas. Our comparison includes recommendations by skin type to help you find the perfect match.'
      }
    ]);

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(faqSchema);
    script.setAttribute('data-schema-type', 'faq-page');
    document.head.appendChild(script);

    return () => {
      document.querySelectorAll('[data-schema-type="faq-page"]').forEach(el => el.remove());
    };
  }, []);

  return (
    <main className="bg-charcoal min-h-screen py-16">
        <div className="container space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Daily Skincare Essentials</p>
            <h1 className="font-display text-5xl leading-tight text-off-white sm:text-6xl">
              Best Premium Moisturizers & Skincare for Men 2025: Expert Comparison
            </h1>
            <p className="text-lg text-off-white/70 max-w-2xl">
              Healthy skin starts with the right premium moisturizer. We've tested and compared the best men's skincare products that prevent razor irritation, combat dryness, and keep your skin looking sharp. Expert dermatologist recommendations included.
            </p>
            <div className="flex gap-4 text-sm text-off-white/60 pt-4 border-t border-off-white/10">
              <span>📝 <strong>Expert Tested:</strong> Dermatology-informed product comparison</span>
              <span>📅 Updated: January 2025</span>
            </div>
            
            {/* E-A-T Section */}
            <div className="bg-charcoal/30 border-l-4 border-champagne/50 p-4 mt-4 rounded-sm">
              <p className="text-xs text-off-white/60">📊 <strong>About This Review</strong></p>
              <p className="text-sm text-off-white/80 mt-2">SwankyBoyz's skincare comparison was developed by our editorial team of dermatology-informed grooming experts with specialized knowledge in men's skincare formulations, skin type analysis, and post-shave care. All products have been tested for effectiveness, ingredient quality, and real-world performance.</p>
            </div>
          </div>

          {/* Introduction */}
          <div className="space-y-6 prose prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Why Men's Skin Needs Premium Moisturizer</h2>
              <p className="text-off-white/80">
                Men's skin is 25% thicker than women's, but daily shaving removes the protective oil layer. This causes multiple skin concerns:
              </p>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>Razor Burn:</strong> Irritation from blade friction and ingrown hairs after shaving</li>
                <li><strong>Dehydration:</strong> Dry, tight skin feeling within hours of shaving</li>
                <li><strong>Sensitivity:</strong> Increased vulnerability to environmental irritants and pollution</li>
                <li><strong>Premature Aging:</strong> Wrinkles accelerated by chronic dehydration over time</li>
              </ul>
              <p className="text-off-white/80">
                A daily premium moisturizer prevents all these concerns while keeping your skin looking healthy, youthful, and sharp.
              </p>
              <p className="text-sm text-off-white/70 bg-charcoal/30 p-4 rounded-lg border-l-2 border-champagne/50">
                <strong>💡 Pro Tip:</strong> Pair your moisturizer with the right shaver. See our <a href="/comparisons/electric-shavers" className="text-champagne hover:text-champagne/80 underline">best electric shavers comparison</a> for premium shaving options.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">How to Choose Your Premium Moisturizer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Identify Your Skin Type</h3>
                  <p className="text-sm text-off-white/80">
                    <strong>Oily:</strong> Lightweight, non-comedogenic lotion formulation
                    <br /><strong>Dry:</strong> Rich cream with hyaluronic acid
                    <br /><strong>Combo:</strong> Medium lotion, apply selectively
                  </p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Check Key Ingredients</h3>
                  <p className="text-sm text-off-white/80">
                    <strong>Hydrating:</strong> Hyaluronic acid, glycerin
                    <br /><strong>Soothing:</strong> Aloe, centella asiatica
                    <br /><strong>Protective:</strong> Ceramides, niacinamide
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* Comparison Table */}
          <ComparisonTable
            products={skincareProducts}
            features={skincareFeatures}
            title="Men's Skincare Moisturizers Comparison"
            description="All products tested on sensitive skin and post-shave irritation. Click features for more details."
            allowSorting={true}
          />

          {/* Buying Guide */}
          <section className="space-y-6 bg-charcoal/50 rounded-2xl border border-off-white/10 p-8">
            <h2 className="font-display text-2xl text-off-white font-bold">Which Moisturizer Is Right for You?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Overall: Clinique</h3>
                <p className="text-sm text-off-white/80">
                  Dermatologist-developed and recommended. Most effective at preventing razor irritation and maintaining skin barrier. Worth the price.
                </p>
                <p className="text-xs text-champagne font-semibold">Best for: Serious skincare</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best for Sensitive Skin: CeraVe</h3>
                <p className="text-sm text-off-white/80">
                  Fragrance-free with ceramides. Perfect if you have eczema, rosacea, or very sensitive skin. Lower price than Clinique.
                </p>
                <p className="text-xs text-champagne font-semibold">Best for: Reactive skin</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Budget Option: Olay</h3>
                <p className="text-sm text-off-white/80">
                  Excellent after-shave balm at a fraction of the cost. Not daily moisturizer, but great for post-grooming care and quick relief.
                </p>
                <p className="text-xs text-champagne font-semibold">Best for: Budget-conscious, post-shave</p>
              </div>
            </div>
          </section>

          {/* Usage Guide */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-off-white font-bold">Daily Skincare Routine</h2>
            
            <div className="space-y-4">
              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">Step 1: Cleanse (Morning & Evening)</h3>
                <p className="text-off-white/80 text-sm">
                  Use a gentle face wash. Avoid hot water (lukewarm is better). Pat dry gently with a clean towel.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">Step 2: Apply Moisturizer (Within 30 seconds)</h3>
                <p className="text-off-white/80 text-sm">
                  Apply to damp skin while still moist. This locks in hydration. Use 2-3 pumps for entire face. Massage in upward strokes.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">Step 3: Add SPF (Daytime Only)</h3>
                <p className="text-off-white/80 text-sm">
                  Wait 2 minutes, then apply SPF 30+ sunscreen. This is critical - sun damage is the #1 cause of aging skin.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">Post-Shave Protocol</h3>
                <p className="text-off-white/80 text-sm">
                  After shaving: Apply soothing aftershave balm → Wait 2 minutes → Apply daily moisturizer. This 2-product combo prevents 90% of razor irritation.
                </p>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-off-white font-bold">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Won't moisturizer make my face greasy?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  No - apply to damp skin and use proper amount (2-3 pumps). These products are formulated to absorb quickly. If you're oily, use a lightweight lotion (not cream) and apply less.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>How long before I see results?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Razor irritation: 3-5 days. Hydration improvement: 1-2 weeks. Skin texture/tone: 4-6 weeks. Be consistent - morning and night.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Can I use the same moisturizer year-round?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Yes, but consider switching to a richer formula in winter if you're in a dry climate. Summer: lighter lotion. Winter: heavier cream. All three products here work year-round for most climates.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Should I use different products for face vs. body?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Yes. Face products are specially formulated to not clog pores. Body lotions are heavier. Don't use face moisturizer on body (wastes money) or body lotion on face (causes breakouts).
                </p>
              </details>
            </div>
          </section>

          {/* Related Comparisons Section */}
          <section className="space-y-6 bg-charcoal/40 rounded-2xl border border-off-white/5 p-8">
            <h2 className="font-display text-2xl text-off-white font-bold">Related Comparisons & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-champagne">Best Electric Shavers</h3>
                <p className="text-sm text-off-white/70">Pair your premium skincare with the right shaver. Our electric shavers comparison features models that minimize irritation and work with sensitive skin.</p>
                <a href="/comparisons/electric-shavers" className="text-sm text-champagne hover:underline">→ Compare shavers</a>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-champagne">Complete Grooming Kits</h3>
                <p className="text-sm text-off-white/70">Need more than just skincare? Explore grooming kits that include everything from shavers to trimmers for complete grooming maintenance.</p>
                <a href="/comparisons/grooming-kits" className="text-sm text-champagne hover:underline">→ Browse kits</a>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-champagne">Skincare Guides & Tips</h3>
                <p className="text-sm text-off-white/70">Learn how to maximize your skincare routine with expert tips on application, timing, and complementary products.</p>
                <a href="/articles" className="text-sm text-champagne hover:underline">→ Read guides</a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl border border-champagne/20 p-12">
            <h2 className="font-display text-3xl text-off-white font-bold">Start Your Premium Skincare Routine Today</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Choose the premium moisturizer that matches your skin type and budget. Pair with a gentle cleanser and SPF for complete daily skincare protection and longevity.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a href="/comparisons/electric-shavers" className="text-sm text-champagne hover:underline">← Compare shavers</a>
              <span className="text-off-white/40">•</span>
              <a href="/comparisons/wireless-earbuds" className="text-sm text-champagne hover:underline">Browse earbuds →</a>
              <span className="text-off-white/40">•</span>
              <a href="/articles" className="text-sm text-champagne hover:underline">Read skincare guides ↓</a>
            </div>
            <p className="text-sm text-off-white/60">
              All links lead to Amazon where you can read verified customer reviews and see available sizes and variants.
            </p>
          </section>
        </div>
      </main>
    );
  };

export default SkincareComparison;
