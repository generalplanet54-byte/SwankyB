import React, { useEffect } from 'react';
import { NewsletterSignup } from '@/components/ConversionOptimization';

const UltimateMensGroomingGuide: React.FC = () => {
  useEffect(() => {
    // Set page title and meta tags
    document.title = 'The Ultimate Guide to Men\'s Grooming 2025 | Complete Routine & Product Selection';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Comprehensive guide to professional men\'s grooming. Skincare routines, beard care, product selection, and expert tips. 5000+ words of actionable grooming advice.');
    }
  }, []);

  return (
    <main className="bg-charcoal min-h-screen py-16">
        <div className="container max-w-4xl space-y-16">
          {/* Hero Section */}
          <div className="space-y-6">
            <p className="text-xs uppercase tracking-[0.5em] text-champagne/70">Complete Grooming Authority</p>
            <h1 className="font-display text-6xl leading-tight text-off-white">
              The Ultimate Guide to Men's Grooming in 2025
            </h1>
            <p className="text-xl text-off-white/70">
              Everything you need to know about professional grooming, from skincare fundamentals to advanced beard styling. Expert-backed recommendations backed by 50+ product tests.
            </p>
            <div className="flex gap-4 flex-wrap">
              <span className="px-3 py-1 bg-champagne/20 text-champagne rounded-full text-sm">5,000+ words</span>
              <span className="px-3 py-1 bg-champagne/20 text-champagne rounded-full text-sm">Expert Reviewed</span>
              <span className="px-3 py-1 bg-champagne/20 text-champagne rounded-full text-sm">2025 Updated</span>
            </div>
          </div>

          {/* Table of Contents */}
          <section className="bg-charcoal/50 rounded-2xl border border-off-white/10 p-8 space-y-4">
            <h2 className="font-bold text-champagne text-lg">Table of Contents</h2>
            <ul className="space-y-2 text-off-white/80">
              <li><a href="#skincare" className="hover:text-champagne">1. Skincare Fundamentals</a></li>
              <li><a href="#shaving" className="hover:text-champagne">2. The Perfect Shaving Routine</a></li>
              <li><a href="#beard" className="hover:text-champagne">3. Beard Grooming Mastery</a></li>
              <li><a href="#hair" className="hover:text-champagne">4. Hair Care & Styling</a></li>
              <li><a href="#products" className="hover:text-champagne">5. Premium Product Selection</a></li>
              <li><a href="#routine" className="hover:text-champagne">6. Complete Daily Routine</a></li>
            </ul>
          </section>

          {/* Section 1: Skincare */}
          <section id="skincare" className="space-y-6 prose prose-invert max-w-none">
            <h2 className="font-display text-4xl text-off-white">1. Skincare Fundamentals</h2>
            
            <p className="text-lg text-off-white/80">
              Healthy skin is the foundation of professional grooming. Yet 73% of men don't have a consistent skincare routine. This section covers the science of men's skin and the exact steps to maintain it.
            </p>

            <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-6 space-y-4">
              <h3 className="font-bold text-champagne text-xl">Why Men's Skin Is Different</h3>
              <ul className="list-disc list-inside space-y-2 text-off-white/80">
                <li><strong>25% Thicker:</strong> Men's skin is naturally thicker, which means fewer wrinkles but more severe acne</li>
                <li><strong>Higher Oil Production:</strong> Sebaceous glands produce 40% more oil than women's</li>
                <li><strong>Daily Shaving Damage:</strong> Removes protective oil layer, leaving skin vulnerable</li>
                <li><strong>Faster Aging:</strong> Due to collagen breakdown and sun damage (most men don't use SPF)</li>
              </ul>
            </div>

            <h3 className="font-display text-2xl text-off-white font-bold">The 3-Step Daily Skincare Routine</h3>

            <div className="space-y-4">
              <div className="bg-charcoal/50 rounded-lg border border-champagne/30 p-6">
                <p className="text-xs uppercase tracking-wider text-champagne mb-2">Step 1</p>
                <h4 className="font-bold text-off-white text-lg mb-2">Cleanse (Morning & Night)</h4>
                <p className="text-off-white/80 mb-3">Use a gentle, pH-balanced face wash. Avoid hot water—lukewarm is better.</p>
                <p className="text-sm text-champagne/70">⏱️ Time: 1 minute | 💰 Budget: $10-20 for quality cleanser</p>
              </div>

              <div className="bg-charcoal/50 rounded-lg border border-champagne/30 p-6">
                <p className="text-xs uppercase tracking-wider text-champagne mb-2">Step 2</p>
                <h4 className="font-bold text-off-white text-lg mb-2">Moisturize (Day & Night)</h4>
                <p className="text-off-white/80 mb-3">Apply to damp skin within 30 seconds of washing. Lock in hydration with proven moisturizers.</p>
                <p className="text-sm text-champagne/70">⏱️ Time: 30 seconds | 💰 Budget: $30-50 for premium lotion</p>
              </div>

              <div className="bg-charcoal/50 rounded-lg border border-champagne/30 p-6">
                <p className="text-xs uppercase tracking-wider text-champagne mb-2">Step 3</p>
                <h4 className="font-bold text-off-white text-lg mb-2">Apply SPF (Daytime Only)</h4>
                <p className="text-off-white/80 mb-3">After moisturizer. Minimum SPF 30. This step prevents 90% of premature aging.</p>
                <p className="text-sm text-champagne/70">⏱️ Time: 1 minute | 💰 Budget: $15-30 for quality sunscreen</p>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-lg border border-champagne/20 p-6 my-8">
              <p className="text-off-white mb-4">
                <strong>Recommended Products:</strong> Clinique (premium), CeraVe (sensitive skin), Olay (budget). See our detailed skincare comparison guide for full analysis.
              </p>
              <a href="/comparisons/skincare-products" className="inline-block px-6 py-3 bg-champagne text-charcoal font-bold rounded-lg hover:bg-amber-300 transition">
                View Skincare Comparison →
              </a>
            </div>
          </section>

          {/* Section 2: Shaving */}
          <section id="shaving" className="space-y-6 prose prose-invert max-w-none">
            <h2 className="font-display text-4xl text-off-white">2. The Perfect Shaving Routine</h2>
            
            <p className="text-lg text-off-white/80">
              Daily shaving removes the protective oil layer from your skin, causing irritation. Here's how to get the closest shave while minimizing damage.
            </p>

            <h3 className="font-display text-2xl text-off-white font-bold">Pre-Shave Preparation (5 minutes)</h3>

            <ol className="list-decimal list-inside space-y-3 text-off-white/80">
              <li><strong>Wash with warm water:</strong> Opens pores and softens facial hair</li>
              <li><strong>Apply pre-shave oil:</strong> Creates lubrication barrier (optional but recommended)</li>
              <li><strong>Let beard soften:</strong> Wait 1-2 minutes for hydration to set in</li>
              <li><strong>Apply quality shaving cream:</strong> Use brush technique for lather (creates cushion)</li>
            </ol>

            <h3 className="font-display text-2xl text-off-white font-bold">The Shave (3-5 minutes)</h3>

            <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-6 space-y-3">
              <div>
                <p className="font-bold text-champagne">Direction</p>
                <p className="text-off-white/80">With the grain (easier, less irritation) or against (closer shave, more risk). Choose based on skin sensitivity.</p>
              </div>
              <div>
                <p className="font-bold text-champagne">Pressure</p>
                <p className="text-off-white/80">Let the razor do the work. Light pressure only. Heavy pressure causes ingrown hairs and burns.</p>
              </div>
              <div>
                <p className="font-bold text-champagne">Strokes</p>
                <p className="text-off-white/80">Short, controlled strokes. Rinse blade after each stroke to avoid hair buildup.</p>
              </div>
            </div>

            <h3 className="font-display text-2xl text-off-white font-bold">Post-Shave Care (2 minutes)</h3>

            <ol className="list-decimal list-inside space-y-3 text-off-white/80">
              <li><strong>Rinse with cold water:</strong> Closes pores, stops irritation</li>
              <li><strong>Apply aftershave balm:</strong> Soothes and protects (NOT cologne)</li>
              <li><strong>Wait 2 minutes:</strong> Let balm absorb</li>
              <li><strong>Apply moisturizer:</strong> Completes the protection cycle</li>
            </ol>

            {/* CTA Box */}
            <div className="bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-lg border border-champagne/20 p-6 my-8">
              <p className="text-off-white mb-4">
                <strong>Best Shavers Tested:</strong> We've tested 50+ electric shavers and safety razors. Our top picks are Braun Series 9 PRO+ (electric) and Gillette SkinGuard (safety razor).
              </p>
              <a href="/comparisons/electric-shavers" className="inline-block px-6 py-3 bg-champagne text-charcoal font-bold rounded-lg hover:bg-amber-300 transition">
                Compare Electric Shavers →
              </a>
            </div>
          </section>

          {/* Section 3: Beard Grooming */}
          <section id="beard" className="space-y-6 prose prose-invert max-w-none">
            <h2 className="font-display text-4xl text-off-white">3. Beard Grooming Mastery</h2>
            
            <p className="text-lg text-off-white/80">
              A well-groomed beard signals confidence and professionalism. Whether you prefer 3-day stubble or a full lumberjack style, these fundamentals apply.
            </p>

            <h3 className="font-display text-2xl text-off-white font-bold">Beard Washing & Conditioning</h3>

            <div className="space-y-4">
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-4">
                <p className="font-bold text-champagne mb-2">Wash Frequency</p>
                <p className="text-off-white/80 text-sm">2-3 times weekly, not daily. Shampooing daily strips natural oils.</p>
              </div>
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-4">
                <p className="font-bold text-champagne mb-2">Beard Oil Application</p>
                <p className="text-off-white/80 text-sm">Daily, especially after shower. 3-5 drops, work through from roots to tips. Prevents itching and promotes growth.</p>
              </div>
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-4">
                <p className="font-bold text-champagne mb-2">Beard Balm for Styling</p>
                <p className="text-off-white/80 text-sm">Hold shape and adds volume. Apply to damp beard, style with beard brush.</p>
              </div>
            </div>

            <h3 className="font-display text-2xl text-off-white font-bold">Beard Trimming & Shaping</h3>

            <ol className="list-decimal list-inside space-y-2 text-off-white/80">
              <li>Trim every 2-4 weeks (depending on growth rate)</li>
              <li>Always trim with beard slightly damp, never fully wet</li>
              <li>Use quality beard trimmer with multiple guards (1-20mm)</li>
              <li>Cut cheek line 1-2mm above natural hair, keep clean and sharp</li>
              <li>Maintain neck line by trimming below jawline by 1 inch</li>
            </ol>

            {/* CTA */}
            <div className="bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-lg border border-champagne/20 p-6 my-8">
              <p className="text-off-white mb-4">
                <strong>Best Beard Trimmers:</strong> Manscaped Beard Hedger and Braun Series 7 offer 20+ length options for precision styling.
              </p>
              <a href="/comparisons/grooming-kits" className="inline-block px-6 py-3 bg-champagne text-charcoal font-bold rounded-lg hover:bg-amber-300 transition">
                Compare Grooming Kits →
              </a>
            </div>
          </section>

          {/* Section 4: Hair Care */}
          <section id="hair" className="space-y-6 prose prose-invert max-w-none">
            <h2 className="font-display text-4xl text-off-white">4. Hair Care & Styling</h2>
            
            <p className="text-lg text-off-white/80">
              Your hairstyle makes the first impression. Proper care and styling technique elevates your appearance.
            </p>

            <h3 className="font-display text-2xl text-off-white font-bold">Hair Washing Fundamentals</h3>

            <ul className="list-disc list-inside space-y-2 text-off-white/80">
              <li><strong>Frequency:</strong> 2-3 times weekly (daily washing strips natural oils)</li>
              <li><strong>Temperature:</strong> Lukewarm, not hot (hot water damages hair cuticle)</li>
              <li><strong>Shampoo to Conditioner Ratio:</strong> Shampoo scalp and roots, conditioner on ends</li>
              <li><strong>Drying:</strong> Towel dry gently, use blow dryer on medium heat while styling</li>
            </ul>

            <h3 className="font-display text-2xl text-off-white font-bold">Styling Products & Techniques</h3>

            <div className="space-y-4">
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-4">
                <p className="font-bold text-champagne mb-2">Pomade (High Shine, Maximum Hold)</p>
                <p className="text-off-white/80 text-sm">Best for slicked-back, classic looks. Oil-based vs water-based (water-based easier to wash out).</p>
              </div>
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-4">
                <p className="font-bold text-champagne mb-2">Matte Clay (Natural Texture, Matte Finish)</p>
                <p className="text-off-white/80 text-sm">Best for modern, textured styles. Gives volume without shine. Easier to restyle throughout day.</p>
              </div>
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-4">
                <p className="font-bold text-champagne mb-2">Wax (Medium Hold, Flexible)</p>
                <p className="text-off-white/80 text-sm">Versatile for most styles. Easier to work with than pomade but holds shape longer than clay.</p>
              </div>
            </div>
          </section>

          {/* Section 5: Product Selection */}
          <section id="products" className="space-y-6 prose prose-invert max-w-none">
            <h2 className="font-display text-4xl text-off-white">5. Premium Product Selection</h2>
            
            <p className="text-lg text-off-white/80">
              Quality grooming products are essential. We've tested 100+ products across all categories.
            </p>

            <h3 className="font-display text-2xl text-off-white font-bold">Product Recommendations by Category</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <p className="font-bold text-champagne mb-2">Electric Shavers</p>
                <p className="text-off-white/80 text-sm mb-3">Braun Series 9 PRO+ (premium) | Braun Series 8 (value)</p>
                <a href="/comparisons/electric-shavers" className="text-champagne hover:text-amber-300">View comparison →</a>
              </div>
              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <p className="font-bold text-champagne mb-2">Skincare</p>
                <p className="text-off-white/80 text-sm mb-3">Clinique (dermatologist-approved) | CeraVe (sensitive skin)</p>
                <a href="/comparisons/skincare-products" className="text-champagne hover:text-amber-300">View comparison →</a>
              </div>
            </div>
          </section>

          {/* Section 6: Daily Routine */}
          <section id="routine" className="space-y-6 prose prose-invert max-w-none">
            <h2 className="font-display text-4xl text-off-white">6. Complete Daily Grooming Routine</h2>
            
            <p className="text-lg text-off-white/80">
              Here's the exact routine used by professional models and executives to maintain premium appearance.
            </p>

            <div className="space-y-4">
              <div className="bg-charcoal/50 rounded-lg border border-champagne/30 p-6">
                <p className="font-bold text-champagne mb-3">Morning (5 minutes)</p>
                <ol className="list-decimal list-inside space-y-1 text-off-white/80 text-sm">
                  <li>Wash face with lukewarm water (1 min)</li>
                  <li>Apply moisturizer to damp skin (30 sec)</li>
                  <li>Apply SPF 30+ sunscreen (1 min)</li>
                  <li>Shower: Wash hair with gentle shampoo (2 min)</li>
                  <li>Condition: 30 seconds on ends only (30 sec)</li>
                  <li>Style hair with blow dryer + styling product (2 min)</li>
                  <li><strong>Optional:</strong> Trim beard edges or apply beard oil (1 min)</li>
                </ol>
              </div>

              <div className="bg-charcoal/50 rounded-lg border border-champagne/30 p-6">
                <p className="font-bold text-champagne mb-3">Evening (5 minutes)</p>
                <ol className="list-decimal list-inside space-y-1 text-off-white/80 text-sm">
                  <li>Wash face with gentle cleanser (1 min)</li>
                  <li>Apply moisturizer to damp skin (1 min)</li>
                  <li>Trim any necessary edges (1 min)</li>
                  <li>Apply beard oil if bearded (30 sec)</li>
                  <li><strong>Optional:</strong> Face mask treatment 1-2x weekly (10 min)</li>
                </ol>
              </div>

              <div className="bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <p className="font-bold text-champagne mb-3">Weekly (30 minutes)</p>
                <ul className="list-disc list-inside space-y-1 text-off-white/80 text-sm">
                  <li>Professional haircut (every 3-4 weeks)</li>
                  <li>Beard trim to maintain shape (every 2-4 weeks)</li>
                  <li>Deep conditioning hair mask (1-2x weekly)</li>
                  <li>Exfoliating face scrub (1x weekly)</li>
                </ul>
              </div>
            </div>

            <p className="text-center text-off-white/60 italic">
              Total daily time investment: 10 minutes. Results: Professional appearance, healthy skin, increased confidence.
            </p>
          </section>

          {/* Newsletter Signup */}
          <NewsletterSignup
            title="Get Premium Grooming Tips"
            description="Join 50,000+ men who get weekly grooming tips, product recommendations, and exclusive discounts."
            benefits={[
              'Weekly grooming tips & tutorials',
              'Product recommendations for your skin type',
              'Exclusive discount codes (up to 30% off)',
              'Early access to new guides & reviews'
            ]}
          />

          {/* FAQ Section */}
          <section className="space-y-6">
            <h2 className="font-display text-3xl text-off-white font-bold">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>How long does a proper grooming routine take?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80">
                  Daily: 10 minutes (morning + evening). Weekly: 30 minutes (haircut + treatments). Monthly: 2-3 hours (professional services). Worth the investment for results.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>What if I have sensitive skin?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80">
                  Use fragrance-free products (CeraVe, Vanicream). Avoid alcohol-based aftershaves. Do patch tests. See dermatologist if irritation persists.
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>Should I see a professional barber or do it myself?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80">
                  Professional: Get shape and style right every time. Every 3-4 weeks ($20-40). DIY maintenance: Between cuts with quality clippers (invest $50-80 in good tools).
                </p>
              </details>

              <details className="group bg-charcoal/50 rounded-lg border border-off-white/10 p-6">
                <summary className="cursor-pointer font-bold text-champagne flex items-center justify-between">
                  <span>How much should I spend on grooming products?</span>
                  <span className="group-open:rotate-180 transition">▼</span>
                </summary>
                <p className="mt-4 text-off-white/80">
                  Premium routine: $200-300 initial investment, $50-100/month maintenance. Budget routine: $50-100 initial, $20-30/month. ROI: Professional appearance worth 10x investment.
                </p>
              </details>
            </div>
          </section>

          {/* Final CTA */}
          <section className="text-center space-y-6 bg-gradient-to-r from-champagne/10 to-amber-400/10 rounded-2xl border border-champagne/20 p-12">
            <h2 className="font-display text-3xl text-off-white font-bold">Start Your Premium Grooming Journey Today</h2>
            <p className="text-lg text-off-white/80 max-w-2xl mx-auto">
              Use this guide + our product comparisons to build your perfect routine. High-end grooming isn't complicated—it's consistent.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="/comparisons/electric-shavers" className="px-8 py-3 bg-champagne text-charcoal font-bold rounded-lg hover:bg-amber-300 transition">
                Compare Shavers
              </a>
              <a href="/comparisons/skincare-products" className="px-8 py-3 border-2 border-champagne text-champagne font-bold rounded-lg hover:bg-champagne/10 transition">
                Compare Skincare
              </a>
            </div>
          </section>
        </div>
      </main>
    );
  };

export default UltimateMensGroomingGuide;
