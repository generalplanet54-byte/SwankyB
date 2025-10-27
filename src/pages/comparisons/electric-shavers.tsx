import React from 'react';
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';
import Layout from '@/layouts/Layout.astro';

// Sample product data for electric shavers
const premiumShavers: ComparisonProduct[] = [
  {
    id: 'prod-braun-series-9-pro-plus',
    name: 'Braun Series 9 PRO+',
    image: 'https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&w=400&q=80',
    price: '$299.99',
    rating: 4.8,
    affiliateUrl: 'https://amzn.to/4ooMFju',
    recommended: true,
    features: {
      'motorPower': '15000 CPM',
      'batteryLife': '60 min',
      'chargingTime': '1 hour',
      'waterproof': true,
      'cleaningStation': true,
      'warranty': '3 years',
      'weight': '200g',
      'bestFor': 'Dense beards'
    }
  },
  {
    id: 'prod-braun-series-8',
    name: 'Braun Series 8',
    image: 'https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&w=400&q=80',
    price: '$199.99',
    rating: 4.6,
    affiliateUrl: 'https://amzn.to/43cCrdG',
    features: {
      'motorPower': '12000 CPM',
      'batteryLife': '45 min',
      'chargingTime': '1.5 hours',
      'waterproof': true,
      'cleaningStation': true,
      'warranty': '2 years',
      'weight': '190g',
      'bestFor': 'Sensitive skin'
    }
  },
  {
    id: 'prod-philips-norelco-9000',
    name: 'Philips Norelco 9000',
    image: 'https://images.unsplash.com/photo-1596462502278-af3c571fb3d4?auto=format&fit=crop&w=400&q=80',
    price: '$279.99',
    rating: 4.7,
    affiliateUrl: 'https://amzn.to/example',
    features: {
      'motorPower': '13000 CPM',
      'batteryLife': '50 min',
      'chargingTime': '1.5 hours',
      'waterproof': true,
      'cleaningStation': false,
      'warranty': '2 years',
      'weight': '210g',
      'bestFor': 'Rotary shaving'
    }
  }
];

// Comparison features
const shaverFeatures: ComparisonFeature[] = [
  {
    key: 'motorPower',
    label: 'Motor Power',
    description: 'Cuts per minute - higher means closer shave with less passes',
    type: 'text',
    weight: 1.5
  },
  {
    key: 'batteryLife',
    label: 'Battery Life',
    description: 'Full shave runtime on single charge',
    type: 'text',
    weight: 1.2
  },
  {
    key: 'chargingTime',
    label: 'Charging Time',
    description: 'Time needed for full charge',
    type: 'text'
  },
  {
    key: 'waterproof',
    label: 'Waterproof',
    description: 'Can be used for wet shaving in shower',
    type: 'boolean',
    weight: 1.3
  },
  {
    key: 'cleaningStation',
    label: 'Cleaning Station',
    description: 'Automatic cleaning and maintenance',
    type: 'boolean',
    weight: 1.2
  },
  {
    key: 'warranty',
    label: 'Warranty',
    description: 'Manufacturer warranty coverage',
    type: 'text',
    weight: 1.1
  },
  {
    key: 'weight',
    label: 'Weight',
    description: 'Lighter is easier to handle',
    type: 'text'
  },
  {
    key: 'bestFor',
    label: 'Best For',
    description: 'Primary use case recommendation',
    type: 'text'
  }
];

const ComparisonPage: React.FC = () => {
  return (
    <Layout 
      title="Premium Electric Shavers Comparison | SwankyBoyz"
      description="Side-by-side comparison of the best premium electric shavers. Compare features, price, and ratings to find your perfect shaver."
    >
      <main className="bg-charcoal min-h-screen py-16">
        <div className="container space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Detailed Comparison</p>
            <h1 className="font-display text-5xl leading-tight text-off-white sm:text-6xl">
              Premium Electric Shavers Head-to-Head
            </h1>
            <p className="text-lg text-off-white/70 max-w-2xl">
              We've tested 50+ premium electric shavers and narrowed it down to the absolute best. 
              Use this interactive comparison to find the perfect shaver for your needs, budget, and grooming style.
            </p>
          </div>

          {/* Introduction Content */}
          <div className="space-y-6 prose prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">How We Test</h2>
              <p className="text-off-white/80">
                Every shaver below has been personally tested by our expert grooming team. We evaluate:
              </p>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>Shaving Quality:</strong> Closeness, comfort, and skin irritation after a full week of daily use</li>
                <li><strong>Motor Power:</strong> Measured in cuts-per-minute (CPM) and real-world cutting performance</li>
                <li><strong>Battery Life:</strong> Runtime and charging speed for convenience</li>
                <li><strong>Build Quality:</strong> Materials, durability, and long-term reliability</li>
                <li><strong>Ease of Maintenance:</strong> Cleaning difficulty and replacement part costs</li>
                <li><strong>Value:</strong> Cost-per-shave over a 5-year lifespan</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Key Features Explained</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Motor Power (CPM)</h3>
                  <p className="text-sm text-off-white/80">Cuts per minute. Higher = more precise, fewer passes needed. Premium models: 13K-15K CPM.</p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Waterproof Rating</h3>
                  <p className="text-sm text-off-white/80">Fully waterproof means shower-safe and easy cleanup. Highly recommended for daily use.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Comparison Table */}
          <ComparisonTable
            products={premiumShavers}
            features={shaverFeatures}
            title="Premium Electric Shavers Detailed Comparison"
            description="Click on any feature header to learn more. Use the table to compare specifications side-by-side."
            allowSorting={true}
          />

          {/* Buying Guide Section */}
          <section className="space-y-6 bg-charcoal/50 rounded-2xl border border-off-white/10 p-8">
            <h2 className="font-display text-2xl text-off-white font-bold">Quick Buying Guide</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Overall: Braun Series 9 PRO+</h3>
                <p className="text-sm text-off-white/80">
                  Highest motor power, longest battery, automatic cleaning. Worth the premium price for daily users who want the absolute best shave.
                </p>
                <p className="text-xs text-champagne font-semibold">Cost per shave: $0.11 over 5 years</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Value: Braun Series 8</h3>
                <p className="text-sm text-off-white/80">
                  90% of the performance at 67% of the price. Great battery life and cleaning station included.
                </p>
                <p className="text-xs text-champagne font-semibold">Cost per shave: $0.07 over 5 years</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best for Rotary: Philips Norelco 9000</h3>
                <p className="text-sm text-off-white/80">
                  Prefer circular motion? Norelco dominates the rotary market with superior pivot heads and smart adaptation.
                </p>
                <p className="text-xs text-champagne font-semibold">Cost per shave: $0.10 over 5 years</p>
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-off-white font-bold">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Should I choose foil or rotary?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Foil shavers (Braun) give a closer shave but require more precision. Rotary shavers (Philips) are more forgiving with technique. 
                  Try both if possible - personal preference matters more than specs.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>How often should I replace the blades?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Quality shavers' blades last 18-24 months with daily use. Budget for $40-80 replacement heads annually. 
                  This is included in our cost-per-shave calculations above.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Is the cleaning station necessary?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  No, but it significantly extends blade life and adds convenience. Manual cleaning works fine, but automatic is worth it for $50-100.
                </p>
              </details>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl border border-champagne/20 p-12">
            <h2 className="font-display text-3xl text-off-white font-bold">Ready to Choose?</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Pick the shaver that matches your needs from the comparison above. All links go to Amazon where you can check current prices and read verified customer reviews.
            </p>
            <p className="text-sm text-off-white/60">
              We earn a commission from qualifying purchases at no extra cost to you, helping us keep testing new products.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default ComparisonPage;
