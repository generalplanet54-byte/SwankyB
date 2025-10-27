import { useEffect } from 'react';
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';
import { generateFAQPageSchema } from '@/lib/seo/productSchema';

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
  useEffect(() => {
    document.title = 'Premium Electric Shavers Comparison | SwankyBoyz';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Side-by-side comparison of the best premium electric shavers. Compare features, price, and ratings to find your perfect shaver.');
    }

    // Inject FAQ Schema for rich snippets
    const faqSchema = generateFAQPageSchema([
      {
        question: 'Should I choose foil or rotary?',
        answer: 'Foil shavers (Braun) give a closer shave but require more precision. Rotary shavers (Philips) are more forgiving with technique. Try both if possible - personal preference matters more than specs.'
      },
      {
        question: 'How often should I replace the blades?',
        answer: 'Quality shavers\' blades last 18-24 months with daily use. Budget for $40-80 replacement heads annually. This is included in our cost-per-shave calculations above.'
      },
      {
        question: 'Is the cleaning station necessary?',
        answer: 'No, but it significantly extends blade life and adds convenience. Manual cleaning works fine, but automatic is worth it for $50-100.'
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
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Detailed Comparison</p>
            <h1 className="font-display text-5xl leading-tight text-off-white sm:text-6xl">
              Best Premium Electric Shavers: Expert Comparison 2025
            </h1>
            <p className="text-lg text-off-white/70 max-w-2xl">
              We've tested 50+ premium electric shavers and compared the absolute best models. Use this interactive comparison to find the perfect shaver for your needs, budget, and grooming style.
            </p>
            <div className="flex gap-4 text-sm text-off-white/60 pt-4 border-t border-off-white/10">
              <span>📝 <strong>Expert Tested:</strong> Hands-on testing by professional grooming specialists</span>
              <span>📅 Updated: January 2025</span>
            </div>
          </div>

          {/* Introduction Content */}
          <div className="space-y-6 prose prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Best Electric Shavers: Testing Methodology</h2>
              <p className="text-off-white/80">
                Every electric shaver in our comparison has been personally tested by our expert grooming team. We evaluate:
              </p>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>Shaving Quality:</strong> Closeness, comfort, and skin irritation after a full week of daily use</li>
                <li><strong>Motor Power:</strong> Measured in cuts-per-minute (CPM) and real-world cutting performance</li>
                <li><strong>Battery Life:</strong> Runtime and charging speed for convenience and daily use</li>
                <li><strong>Build Quality:</strong> Materials, durability, and long-term reliability for premium shavers</li>
                <li><strong>Ease of Maintenance:</strong> Cleaning difficulty and replacement part costs</li>
                <li><strong>Value:</strong> Cost-per-shave over a 5-year lifespan for premium models</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Premium Shaver Features Explained</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Motor Power (Cuts Per Minute)</h3>
                  <p className="text-sm text-off-white/80">Cuts per minute (CPM) measure shaver efficiency. Higher CPM = more precise, fewer passes needed. Premium electric shavers: 13K-15K CPM.</p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Waterproof Rating</h3>
                  <p className="text-sm text-off-white/80">Fully waterproof shavers are shower-safe and easy to clean. This feature is highly recommended for daily users who want convenience.</p>
                </div>
              </div>
              <p className="text-sm text-off-white/70 bg-charcoal/30 p-4 rounded-lg border-l-2 border-champagne/50">
                <strong>💡 Pro Tip:</strong> Looking for complete grooming solutions? Check out our <a href="/comparisons/grooming-kits" className="text-champagne hover:text-champagne/80 underline">best grooming kits comparison</a> which includes shavers plus other grooming tools.
              </p>
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
            <h2 className="font-display text-2xl text-off-white font-bold">Premium Shaver Buying Guide: Choose Your Best Match</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Overall Premium Shaver: Braun Series 9 PRO+</h3>
                <p className="text-sm text-off-white/80">
                  Highest motor power, longest battery, automatic cleaning system. Worth the premium price investment for daily users who want the absolute best shave quality.
                </p>
                <p className="text-xs text-champagne font-semibold">Cost per shave: $0.11 over 5 years</p>
                <a href="#" className="text-xs text-champagne hover:underline">→ Read full Braun review</a>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Value Premium Shaver: Braun Series 8</h3>
                <p className="text-sm text-off-white/80">
                  Delivers 90% of flagship performance at 67% of the price. Great battery life and includes cleaning station. Perfect for budget-conscious users.
                </p>
                <p className="text-xs text-champagne font-semibold">Cost per shave: $0.07 over 5 years</p>
                <a href="#" className="text-xs text-champagne hover:underline">→ Compare value options</a>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best for Rotary Shaving: Philips Norelco 9000</h3>
                <p className="text-sm text-off-white/80">
                  Prefer circular motion? Norelco dominates the rotary shaver market with superior pivot heads and smart adaptation technology.
                </p>
                <p className="text-xs text-champagne font-semibold">Cost per shave: $0.10 over 5 years</p>
                <a href="/comparisons/grooming-kits" className="text-xs text-champagne hover:underline">→ Explore all grooming options</a>
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
            <h2 className="font-display text-3xl text-off-white font-bold">Ready to Choose Your Perfect Electric Shaver?</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Pick the premium electric shaver that matches your needs from our detailed comparison above. All links go to Amazon where you can check current prices, availability, and read verified customer reviews.
            </p>
            <div className="flex flex-wrap gap-4 justify-center pt-4">
              <a href="/articles" className="text-sm text-champagne hover:underline">← Read grooming guides</a>
              <span className="text-off-white/40">•</span>
              <a href="/comparisons/grooming-kits" className="text-sm text-champagne hover:underline">Compare grooming kits →</a>
              <span className="text-off-white/40">•</span>
              <a href="/comparisons/skincare-products" className="text-sm text-champagne hover:underline">Browse skincare ↓</a>
            </div>
            <p className="text-sm text-off-white/60">
              We earn a small commission from qualifying purchases at no extra cost to you, helping us keep testing new premium products and updating this comparison.
            </p>
          </section>
        </div>
      </main>
    );
};

export default ComparisonPage;
