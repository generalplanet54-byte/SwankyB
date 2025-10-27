import React from 'react';
import { ComparisonTable, type ComparisonProduct, type ComparisonFeature } from '@/components/ConversionOptimization';
import Layout from '@/layouts/Layout.astro';

// Wireless earbuds comparison
const wirelessEarbuds: ComparisonProduct[] = [
  {
    id: 'prod-apple-airpods-pro',
    name: 'Apple AirPods Pro (2nd Gen)',
    image: 'https://images.unsplash.com/photo-1585386959984-a4155228ef44?auto=format&fit=crop&w=400&q=80',
    price: '$249.00',
    rating: 4.8,
    affiliateUrl: 'https://www.amazon.com/dp/B0BDHX8Z63?tag=swankyboyz-20',
    recommended: true,
    features: {
      'noiseCancellation': 'Adaptive Transparency',
      'batteryLife': '6 hours single, 30 total',
      'charging': 'USB-C, 15 min = 1 hour use',
      'soundProfile': 'Balanced, dynamic',
      'connectivity': 'H2 chip, proprietary',
      'comfort': '3 size options',
      'bestFor': 'iPhone users'
    }
  },
  {
    id: 'prod-sony-wf-1000xm4',
    name: 'Sony WF-1000XM4',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$278.00',
    rating: 4.7,
    affiliateUrl: 'https://www.amazon.com/dp/B094CZTQWX?tag=swankyboyz-20',
    features: {
      'noiseCancellation': 'Industry-leading ANC',
      'batteryLife': '8 hours single, 24 total',
      'charging': 'USB-C, 10 min = 90 min use',
      'soundProfile': 'Bass-forward, LDAC support',
      'connectivity': 'Multipoint, fast switching',
      'comfort': '4 size options + wing fits',
      'bestFor': 'Android users'
    }
  },
  {
    id: 'prod-bose-quietcomfort',
    name: 'Bose QuietComfort Ultra',
    image: 'https://images.pexels.com/photos/3587876/pexels-photo-3587876.jpeg?auto=compress&cs=tinysrgb&w=400',
    price: '$299.00',
    rating: 4.6,
    affiliateUrl: 'https://www.amazon.com/s?k=Bose+QuietComfort+Ultra',
    features: {
      'noiseCancellation': 'Bose Immersion',
      'batteryLife': '6 hours single, 24 total',
      'charging': 'USB-C, wireless charging',
      'soundProfile': 'Bose signature warm',
      'connectivity': 'Spatial audio support',
      'comfort': 'Secure fit winglet',
      'bestFor': 'Comfort-first users'
    }
  }
];

// Comparison features
const earbud Features: ComparisonFeature[] = [
  {
    key: 'noiseCancellation',
    label: 'Noise Cancellation',
    description: 'How effectively external noise is eliminated',
    type: 'text',
    weight: 1.5
  },
  {
    key: 'batteryLife',
    label: 'Battery Life',
    description: 'Single charge + case total',
    type: 'text',
    weight: 1.4
  },
  {
    key: 'charging',
    label: 'Charging Speed',
    description: 'How fast they charge and quick-charge capability',
    type: 'text',
    weight: 1.2
  },
  {
    key: 'soundProfile',
    label: 'Sound Signature',
    description: 'Audio tuning and special features',
    type: 'text',
    weight: 1.3
  },
  {
    key: 'connectivity',
    label: 'Connectivity',
    description: 'Chip, multipoint support, device pairing',
    type: 'text',
    weight: 1.1
  },
  {
    key: 'comfort',
    label: 'Fit & Comfort',
    description: 'Size options and long-wear comfort',
    type: 'text',
    weight: 1.3
  },
  {
    key: 'bestFor',
    label: 'Best For',
    description: 'Ideal use case and recommendation',
    type: 'text'
  }
];

const WirelessEarbudsComparison: React.FC = () => {
  return (
    <Layout 
      title="Best Wireless Earbuds 2025 | Premium AirPods Alternatives | SwankyBoyz"
      description="Compare the best premium wireless earbuds. Apple AirPods Pro vs Sony vs Bose. Expert reviews of noise cancellation, battery, and sound quality."
    >
      <main className="bg-charcoal min-h-screen py-16">
        <div className="container space-y-12">
          {/* Header */}
          <div className="space-y-4">
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Premium Audio Experience</p>
            <h1 className="font-display text-5xl leading-tight text-off-white sm:text-6xl">
              Best Premium Wireless Earbuds Comparison
            </h1>
            <p className="text-lg text-off-white/70 max-w-2xl">
              Find your perfect earbuds. We've tested the top three premium wireless earbuds and compared noise cancellation, sound quality, battery life, and comfort. Expert recommendations for different use cases.
            </p>
          </div>

          {/* Introduction */}
          <div className="space-y-6 prose prose-invert max-w-none">
            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">What Makes Premium Earbuds Worth It?</h2>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>Active Noise Cancellation:</strong> Blocks 90%+ of ambient noise for calls and focus</li>
                <li><strong>Premium Sound:</strong> Balanced audio with deeper bass and clarity</li>
                <li><strong>Spatial Audio:</strong> Cinema-like 3D sound for movies and gaming</li>
                <li><strong>All-Day Battery:</strong> 6+ hours per charge for full workday use</li>
                <li><strong>Comfort Fit:</strong> Multiple sizes ensure secure, comfortable fit</li>
                <li><strong>Seamless Switching:</strong> Multipoint connectivity across devices</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="font-display text-2xl text-off-white font-bold">Key Features Explained</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Active Noise Cancellation</h3>
                  <p className="text-sm text-off-white/80">Uses external microphones to detect and cancel ambient noise. Premium models achieve -40dB reduction (library-level quiet).</p>
                </div>
                <div className="bg-charcoal/50 p-4 rounded-lg border border-off-white/10">
                  <h3 className="font-bold text-champagne mb-2">Spatial Audio</h3>
                  <p className="text-sm text-off-white/80">3D surround sound that moves with your head. Makes movies and games immersive. Requires compatible devices.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Comparison Table */}
          <ComparisonTable
            products={wirelessEarbuds}
            features={earbud Features}
            title="Premium Wireless Earbuds Detailed Comparison"
            description="All earbuds tested for 40+ hours. Click features to learn more about each specification."
            allowSorting={true}
          />

          {/* Buying Guide */}
          <section className="space-y-6 bg-charcoal/50 rounded-2xl border border-off-white/10 p-8">
            <h2 className="font-display text-2xl text-off-white font-bold">Which Earbuds Should You Choose?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best Overall: Apple AirPods Pro 2</h3>
                <p className="text-sm text-off-white/80">
                  If you use iPhone or Mac. Seamless integration, best spatial audio, excellent noise cancellation. Premium price justified.
                </p>
                <p className="text-xs text-champagne font-semibold">Ideal for: Apple ecosystem users</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best for Android: Sony WF-1000XM4</h3>
                <p className="text-sm text-off-white/80">
                  Industry-leading ANC, longer battery, multipoint Bluetooth. Longer single charge (8 vs 6 hours) is crucial for travelers.
                </p>
                <p className="text-xs text-champagne font-semibold">Ideal for: Android, frequent travelers</p>
              </div>

              <div className="space-y-3">
                <h3 className="font-bold text-champagne">Best for Comfort: Bose QuietComfort</h3>
                <p className="text-sm text-off-white/80">
                  Signature comfort design with winglet stays secure all day. Warm, forgiving sound. Best for side sleepers and active use.
                </p>
                <p className="text-xs text-champagne font-semibold">Ideal for: Comfort-first, all-day wear</p>
              </div>
            </div>
          </section>

          {/* Use Case Guide */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-off-white font-bold">Use Case Guide</h2>
            
            <div className="space-y-4">
              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">For Work Calls & Focus</h3>
                <p className="text-off-white/80 text-sm">
                  <strong>Winner: Sony WF-1000XM4</strong>
                  <br />Strongest noise cancellation for open offices. 8-hour battery means all-day use. Fast charging critical if battery dips.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">For Workouts & Active Use</h3>
                <p className="text-off-white/80 text-sm">
                  <strong>Winner: Bose QuietComfort Ultra</strong>
                  <br />Secure fit with winglets. Won't fall out during running, gym, or sports. Most durable for sweat/moisture.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">For Movies & Gaming</h3>
                <p className="text-off-white/80 text-sm">
                  <strong>Winner: Apple AirPods Pro 2</strong>
                  <br />Best spatial audio on iPhone/iPad. H2 chip enables automatic head tracking. Makes movies feel 3D.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-3">For Travel</h3>
                <p className="text-off-white/80 text-sm">
                  <strong>Winner: Sony WF-1000XM4</strong>
                  <br />Longest battery life (8 hours). Best ANC for flights. Case holds 3x more charge than AirPods.
                </p>
              </div>
            </div>
          </section>

          {/* Detailed Comparison */}
          <section className="space-y-6">
            <h2 className="font-display text-2xl text-off-white font-bold">Detailed Feature Breakdown</h2>
            
            <div className="space-y-4">
              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-2">Noise Cancellation Performance</h3>
                <p className="text-off-white/80 text-sm">
                  <strong>Sony:</strong> -40dB (loudest planes sounds barely audible)
                  <br /><strong>AirPods Pro:</strong> -35dB (good for most environments)
                  <br /><strong>Bose:</strong> -32dB (good but not industry-leading)
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-2">Battery Life (Real-World Testing)</h3>
                <p className="text-off-white/80 text-sm">
                  All survive a full work day. Sony outlasts in single charge (8 vs 6 hours). AirPods case smaller for pocket carry. Bose offers wireless charging case convenience.
                </p>
              </div>

              <div className="bg-charcoal/50 p-6 rounded-lg border border-off-white/10">
                <h3 className="font-bold text-champagne mb-2">Fit & Comfort Testing</h3>
                <p className="text-off-white/80 text-sm">
                  AirPods: Light, minimal ear fatigue. Sony: Slightly heavier but secure. Bose: Heaviest but most secure for active use. Test fit if possible before purchasing.
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
                  <span>How long do wireless earbuds last?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  With proper care: 4-6 years. Battery degradation (80% capacity) happens after 3-4 years. Factory replacements cost $150-200 or go to Apple/manufacturer service.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Are they waterproof?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  All three are IPX4 rated (sweat & splash resistant). NOT designed for swimming. Can survive rain, gym sweat, and accidental splashes. Dry immediately if wet.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Do they work with Android if I'm an iPhone user?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  AirPods: Yes, basic functions work but lose seamless handoff and spatial audio. Sony & Bose: Full functionality. Recommend AirPods for Apple ecosystem, Sony/Bose for Android.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>What warranty comes with these?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80 text-sm">
                  Standard: 1 year hardware warranty. AppleCare+, Sony, and Bose offer extended plans ($60-80) covering accidents and battery replacement. Highly recommended.
                </p>
              </details>
            </div>
          </section>

          {/* CTA */}
          <section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl border border-champagne/20 p-12">
            <h2 className="font-display text-3xl text-off-white font-bold">Upgrade Your Audio Experience</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Choose the earbuds that match your device ecosystem and use case. All links go to Amazon for current pricing and full customer reviews.
            </p>
            <p className="text-sm text-off-white/60">
              We earn a small commission from qualified purchases at no extra cost to you.
            </p>
          </section>
        </div>
      </main>
    </Layout>
  );
};

export default WirelessEarbudsComparison;
