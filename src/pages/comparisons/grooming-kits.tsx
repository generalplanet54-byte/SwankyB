import React, { useEffect } from 'react';
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';
import { generateFAQPageSchema } from '@/lib/seo/productSchema';

// Grooming kit comparison data
const groomingKits: ComparisonProduct[] = [
  {
    id: 'prod-braun-series-7-kit',
    name: 'Braun Series 7 11-in-1 Grooming Kit',
    image: 'https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&w=400&q=80',
    price: '$119.99',
    rating: 4.7,
    affiliateUrl: 'https://amzn.to/46SQyY4',
    recommended: true,
    features: {
      'itemCount': '11 attachments',
      'shaver': 'AutoSense foil shaver',
      'trimmer': 'Precision trimmer included',
      'battery': '40-60 min runtime',
      'waterproof': true,
      'chargingTime': '1 hour',
      'storage': 'Travel pouch included',
      'bestFor': 'Complete grooming'
    }
  },
  {
    id: 'prod-braun-hair-clippers-9-in-1',
    name: 'Braun 9-in-1 Beard & Trimmer Kit',
    image: 'https://images.unsplash.com/photo-1595475884562-073c30d45670?auto=format&fit=crop&w=400&q=80',
    price: '$59.99',
    rating: 4.5,
    affiliateUrl: 'https://amzn.to/47nIqPk',
    features: {
      'itemCount': '9 attachments',
      'shaver': 'Gillette ProGlide included',
      'trimmer': 'Beard trimmer with 20 lengths',
      'battery': '30-40 min runtime',
      'waterproof': true,
      'chargingTime': '1.5 hours',
      'storage': 'Compact case',
      'bestFor': 'Beard grooming'
    }
  },
  {
    id: 'prod-wahl-stainless-steel-kit',
    name: 'WAHL Stainless Steel Grooming Kit',
    image: 'https://images.unsplash.com/photo-1517832207067-4db24a2ae47c?auto=format&fit=crop&w=400&q=80',
    price: '$79.99',
    rating: 4.4,
    affiliateUrl: 'https://amzn.to/4n5fGPU',
    features: {
      'itemCount': '7 pieces',
      'shaver': 'Lithium foil shaver',
      'trimmer': 'Multiple head options',
      'battery': '120 min runtime',
      'waterproof': true,
      'chargingTime': '1 hour',
      'storage': 'Stainless steel case',
      'bestFor': 'Heavy daily use'
    }
  }
];

// Comparison features
const kitFeatures: ComparisonFeature[] = [
  {
    key: 'itemCount',
    label: 'Attachments Included',
    description: 'Number of different grooming heads and attachments',
    type: 'text',
    weight: 1.3
  },
  {
    key: 'shaver',
    label: 'Primary Shaver',
    description: 'Main shaving head technology',
    type: 'text',
    weight: 1.5
  },
  {
    key: 'trimmer',
    label: 'Beard Trimmer',
    description: 'Beard trimming capability and adjustability',
    type: 'text',
    weight: 1.4
  },
  {
    key: 'battery',
    label: 'Battery Runtime',
    description: 'Minutes of use per charge',
    type: 'text',
    weight: 1.3
  },
  {
    key: 'waterproof',
    label: 'Waterproof',
    description: 'Can be used in the shower',
    type: 'boolean',
    weight: 1.2
  },
  {
    key: 'chargingTime',
    label: 'Charge Time',
    description: 'Time for full battery charge',
    type: 'text'
  },
  {
    key: 'storage',
    label: 'Storage/Carry',
    description: 'How it comes packaged for storage or travel',
    type: 'text'
  },
  {
    key: 'bestFor',
    label: 'Best For',
    description: 'Primary use case recommendation',
    type: 'text'
  }
];

const GroomingKitsComparison: React.FC = () => {
  useEffect(() => {
    // Set page title and meta tags
    document.title = 'Best Grooming Kits Comparison | Complete Grooming Sets | SwankyBoyz';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Compare the best grooming kits for men. Find complete shaving and beard grooming sets with expert reviews and ratings.');
    }

    // Inject FAQ Schema for rich snippets
    const faqSchema = generateFAQPageSchema([
      {
        question: 'What should I look for in a grooming kit?',
        answer: 'Look for kits with quality shaving tools, multiple attachment options for different beard styles, cordless convenience, and a good warranty. Our comparison focuses on kits that deliver excellent value for daily users.'
      },
      {
        question: 'Are all-in-one kits better than individual tools?',
        answer: 'All-in-one kits offer convenience and often better value than buying tools separately. However, serious groomers sometimes prefer individual premium tools. Our comparison includes both for your consideration.'
      },
      {
        question: 'How often do I need to replace the parts?',
        answer: 'Most quality kit components last 12-24 months with daily use. Blades and trimmer heads are typically the first items to need replacement. We provide cost estimates for ongoing maintenance in our detailed comparison.'
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
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Complete Grooming Solutions</p>
            <h1 className="font-display text-5xl leading-tight text-off-white sm:text-6xl">
              Best Grooming Kits & Complete Sets 2025: Expert Comparison
            </h1>
            <p className="text-lg text-off-white/70 max-w-2xl">
              Save time and money with premium all-in-one grooming kits. We've tested the best complete grooming sets that give you everything needed for professional-quality home grooming, from beard trimming to full-body styling.
            </p>
            <div className="flex gap-4 text-sm text-off-white/60 pt-4 border-t border-off-white/10">
              <span>📝 <strong>Expert Tested:</strong> Complete grooming kit analysis by professionals</span>
              <span>📅 Updated: January 2025</span>
            </div>
          </div>

          {/* Introduction Content */}
          <div className="space-y-6 prose prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Why Choose Premium Grooming Kits?</h2>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>Cost Savings:</strong> Get 7-11 professional grooming tools for the price of 2-3 individual purchases</li>
                <li><strong>Convenience:</strong> One charge, multiple grooming tasks completed with versatile attachments</li>
                <li><strong>Storage:</strong> Everything included comes in organized travel cases and storage solutions</li>
                <li><strong>Consistency:</strong> All grooming attachments are designed to work together seamlessly</li>
                <li><strong>Quality:</strong> Premium grooming kits use better motors and durable construction for longevity</li>
              </ul>
              <p className="text-sm text-off-white/70 bg-charcoal/30 p-4 rounded-lg border-l-2 border-champagne/50">
                <strong>💡 Pro Tip:</strong> Not looking for a complete kit? Check our <a href="/comparisons/electric-shavers" className="text-champagne hover:text-champagne/80 underline">best electric shavers comparison</a> for individual premium shavers.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">What to Look For in Grooming Kits</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Attachment Count</h3>
                  <p className="text-sm text-off-white/80">More attachments = greater versatility, but quality and usability matter more than quantity in grooming kits.</p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Battery Runtime</h3>
                  <p className="text-sm text-off-white/80">Minimum 40-60 minutes recommended for complete grooming session without interruption or recharging.</p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Build Quality</h3>
                  <p className="text-sm text-off-white/80">Stainless steel or premium plastic construction ensures durability and reliability through years of daily grooming use.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Comparison Table */}
          <ComparisonTable
            products={groomingKits}
            features={kitFeatures}
            title="Grooming Kits Detailed Comparison"
            description="Click headers to learn more about each feature. All kits include travel storage and warranty."
            allowSorting={true}
          />

          {/* Buying Guide */}
          <section className="space-y-6 bg-charcoal/50 rounded-2xl border border-off-white/10 p-8">
            <h2 className="font-display text-2xl text-off-white font-bold">Which Kit Should You Choose?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Overall: Braun Series 7</h3>
                <p className="text-sm text-off-white/80">
                  Maximum versatility with 11 attachments and powerful AutoSense motor. Perfect if you need to handle every grooming task imaginable.
                </p>
                <p className="text-xs text-champagne font-semibold">Best for: Complete grooming control</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Value: Braun 9-in-1</h3>
                <p className="text-sm text-off-white/80">
                  50% less than the Series 7, but covers 90% of grooming needs. Great if you prioritize beard grooming.
                </p>
                <p className="text-xs text-champagne font-semibold">Best for: Budget-conscious beard groomers</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Durability: WAHL Stainless</h3>
                <p className="text-sm text-off-white/80">
                  Built to last with stainless steel construction and 120-minute battery. Best warranty and customer support.
                </p>
                <p className="text-xs text-champagne font-semibold">Best for: Heavy daily use, travel</p>
              </div>
            </div>
          </section>

          {/* Feature Deep-Dive */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-off-white font-bold">Feature Breakdown</h2>
            
            <div className="space-y-4">
              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">Attachment Types</h3>
                <p className="text-off-white/80 text-sm mb-3">Standard kits include:</p>
                <ul className="grid grid-cols-2 gap-2 text-off-white/70 text-sm">
                  <li>✓ Foil shaver head</li>
                  <li>✓ Beard trimmer</li>
                  <li>✓ Detail trimmer</li>
                  <li>✓ Hair clipper</li>
                  <li>✓ Ear/nose trimmer</li>
                  <li>✓ Styling comb</li>
                </ul>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-2">Battery Performance</h3>
                <p className="text-off-white/80 text-sm">
                  All three kits offer lithium-ion batteries with 40-120 minute runtimes. For reference: a full grooming session (shave + beard trim + cleanup) takes 15-20 minutes, so you'll charge every 2-6 uses.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-2">Waterproof & Cleaning</h3>
                <p className="text-off-white/80 text-sm">
                  All kits are fully waterproof for wet/dry use. Manual cleaning is easy with removable heads. Optional: cleaning stations ($50-100) auto-clean heads daily.
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
                  <span>Do all attachments fit all motors?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  No - attachments are proprietary to each brand and motor model. Braun attachments won't fit WAHL motors. This is intentional for safety and performance.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>How often do attachments need replacement?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  With daily use: 18-24 months. Replacement heads cost $40-80. Budget $3-5/month for maintenance, still cheaper than monthly barber visits.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Are kits worth it vs. individual tools?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Absolutely. A shaver + trimmer + clipper individually costs $200-300. Kits give all three for $60-120. Plus convenience of one charge powering everything.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Can I use these for head shaving?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Yes, all include clipper attachments. Some use them with 0mm guard for bald head. For frequent head shaving, consider dedicated head shavers instead.
                </p>
              </details>
            </div>
          </section>

          {/* Related Comparisons Section */}
          <section className="space-y-6 bg-charcoal/40 rounded-2xl border border-off-white/5 p-8">
            <h2 className="font-display text-2xl text-off-white font-bold">Related Comparisons & Resources</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-champagne">Premium Electric Shavers</h3>
                <p className="text-sm text-off-white/70">Want a dedicated premium shaver? Compare the best electric shavers with advanced features like automatic cleaning stations and superior motor power.</p>
                <a href="/comparisons/electric-shavers" className="text-sm text-champagne hover:underline">→ Compare shavers</a>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-champagne">Post-Grooming Skincare</h3>
                <p className="text-sm text-off-white/70">Complete your grooming routine with the right moisturizers and after-shave products. Our skincare comparison covers options for all skin types.</p>
                <a href="/comparisons/skincare-products" className="text-sm text-champagne hover:underline">→ Browse skincare</a>
              </div>
              <div className="space-y-3">
                <h3 className="font-semibold text-champagne">Grooming Techniques & Tips</h3>
                <p className="text-sm text-off-white/70">Master your grooming kit with our expert guides covering proper use, maintenance, and pro tips for best results.</p>
                <a href="/articles" className="text-sm text-champagne hover:underline">→ Read grooming guides</a>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl border border-champagne/20 p-12">
            <h2 className="font-display text-3xl text-off-white font-bold">Ready to Simplify Your Grooming Routine?</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Pick your ideal premium grooming kit from our detailed comparison above. All links lead to Amazon where you can check current prices, read verified customer reviews, and see available colors and variants.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a href="/comparisons/electric-shavers" className="text-sm text-champagne hover:underline">← Compare shavers</a>
              <span className="text-off-white/40">•</span>
              <a href="/comparisons/skincare-products" className="text-sm text-champagne hover:underline">Browse skincare →</a>
              <span className="text-off-white/40">•</span>
              <a href="/articles" className="text-sm text-champagne hover:underline">Read grooming guides ↓</a>
            </div>
            <p className="text-sm text-off-white/60">
              We earn a small commission from qualifying purchases at no extra cost to you, helping us keep testing and reviewing premium grooming products.
            </p>
          </section>
        </div>
      </main>
    );
  };

export default GroomingKitsComparison;
