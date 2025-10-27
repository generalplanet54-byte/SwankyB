import React from 'react';
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';
import Layout from '@/layouts/Layout.astro';

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
  return (
    <Layout 
      title="Best Men's Skincare Moisturizers Comparison | Lotion Reviews | SwankyBoyz"
      description="Compare the best men's skincare moisturizers and after-shave balms. Expert reviews of premium lotions for sensitive skin, dryness, and razor irritation."
    >
      <main className="bg-charcoal min-h-screen py-16">
        <div className="container space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Daily Skincare Essentials</p>
            <h1 className="font-display text-5xl leading-tight text-off-white sm:text-6xl">
              Best Moisturizers & Skincare for Men
            </h1>
            <p className="text-lg text-off-white/70 max-w-2xl">
              Healthy skin starts with the right moisturizer. We've tested and compared the best men's skincare products that prevent razor irritation, combat dryness, and keep your skin looking sharp. Expert dermatologist recommendations included.
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-6 prose prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Why Men Need Quality Moisturizer</h2>
              <p className="text-off-white/80">
                Men's skin is 25% thicker than women's, but shaving removes the protective oil layer daily. This causes:
              </p>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>Razor Burn:</strong> Irritation from blade friction and ingrown hairs</li>
                <li><strong>Dehydration:</strong> Dry, tight skin feeling within hours of shaving</li>
                <li><strong>Sensitivity:</strong> Increased vulnerability to environmental irritants</li>
                <li><strong>Premature Aging:</strong> Wrinkles accelerated by chronic dehydration</li>
              </ul>
              <p className="text-off-white/80">
                A daily moisturizer prevents all of these while keeping your skin looking healthy and youthful.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">How to Choose the Right Moisturizer</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Identify Your Skin Type</h3>
                  <p className="text-sm text-off-white/80">
                    <strong>Oily:</strong> Lightweight, non-comedogenic lotion
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

          {/* CTA */}
          <section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl border border-champagne/20 p-12">
            <h2 className="font-display text-3xl text-off-white font-bold">Start Your Skincare Routine Today</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Choose the moisturizer that matches your skin type and budget. Pair with a gentle cleanser and SPF for complete daily protection.
            </p>
            <p className="text-sm text-off-white/60">
              All links lead to Amazon where you can read detailed customer reviews and see available sizes.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default SkincareComparison;
