import React from 'react';
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';
import Layout from '@/layouts/Layout.astro';

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
  return (
    <Layout 
      title="Best Grooming Kits Comparison | Complete Grooming Sets | SwankyBoyz"
      description="Compare the best grooming kits for men. Find complete shaving and beard grooming sets with expert reviews and ratings."
    >
      <main className="bg-charcoal min-h-screen py-16">
        <div className="container space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Complete Grooming Solutions</p>
            <h1 className="font-display text-5xl leading-tight text-off-white sm:text-6xl">
              Best Grooming Kits & Complete Sets
            </h1>
            <p className="text-lg text-off-white/70 max-w-2xl">
              Save time and money with all-in-one grooming kits. We've tested the best complete grooming sets that give you everything you need for professional-quality home grooming, from beard trimming to full-body styling.
            </p>
          </div>

          {/* Introduction Content */}
          <div className="space-y-6 prose prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Why Choose a Grooming Kit?</h2>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>Cost Savings:</strong> Get 7-11 tools for the price of 2-3 individual purchases</li>
                <li><strong>Convenience:</strong> One charge, multiple grooming tasks completed</li>
                <li><strong>Storage:</strong> Everything included comes in organized cases for travel</li>
                <li><strong>Consistency:</strong> All attachments are designed to work together seamlessly</li>
                <li><strong>Quality:</strong> Premium kits use better motors and durable construction</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">What to Look For</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Attachment Count</h3>
                  <p className="text-sm text-off-white/80">More attachments = greater versatility, but quality matters more than quantity.</p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Battery Life</h3>
                  <p className="text-sm text-off-white/80">Minimum 40-60 minutes recommended for complete grooming session without interruption.</p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Build Quality</h3>
                  <p className="text-sm text-off-white/80">Stainless steel or premium plastic ensures durability through years of daily use.</p>
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

          {/* CTA */}
          <section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl border border-champagne/20 p-12">
            <h2 className="font-display text-3xl text-off-white font-bold">Ready to Simplify Your Routine?</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Pick your ideal grooming kit from the comparison above. All links lead to Amazon where you can check current prices, read customer reviews, and see available colors/variants.
            </p>
            <p className="text-sm text-off-white/60">
              We earn a small commission from qualifying purchases at no cost to you.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default GroomingKitsComparison;
