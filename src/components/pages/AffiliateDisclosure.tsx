import React from 'react';
import { useMetaTags } from '../../hooks/useMetaTags';

const AffiliateDisclosure: React.FC = () => {
  useMetaTags({
    title: 'Affiliate Disclosure | SwankyBoyz',
    description: 'Learn about SwankyBoyz affiliate partnerships and how we earn commissions from recommended products. Full transparency on our affiliate relationships.',
    robots: 'index, follow'
  });

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
          Affiliate Disclosure
        </h1>
        
        <div className="prose prose-lg max-w-none dark:prose-invert">
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <h2>Our Commitment to Transparency</h2>
          <p>
            At SwankyBoyz, we believe in complete transparency with our readers. This disclosure explains 
            how we earn revenue and how it affects our content recommendations.
          </p>

          <h2>Affiliate Marketing Programs</h2>
          <p>
            SwankyBoyz participates in various affiliate marketing programs, which means we earn commissions 
            from qualifying purchases made through our links. Our current affiliate partnerships include:
          </p>
          <ul>
            <li><strong>Amazon Associates Program:</strong> We earn from qualifying purchases on Amazon</li>
            <li><strong>Direct Brand Partnerships:</strong> Partnerships with grooming and lifestyle brands</li>
            <li><strong>Other Retail Partners:</strong> Various online retailers in our product categories</li>
          </ul>

          <h2>How Affiliate Links Work</h2>
          <p>
            When you click on an affiliate link and make a purchase, we may receive a small commission 
            at no extra cost to you. Here's what you need to know:
          </p>
          <ul>
            <li>The price you pay remains the same whether you use our link or not</li>
            <li>We only get paid if you actually make a purchase</li>
            <li>The commission comes from the retailer, not from your pocket</li>
            <li>We may earn different commission rates from different products or brands</li>
          </ul>

          <h2>Editorial Independence</h2>
          <p>
            Our affiliate relationships do not compromise our editorial integrity. We maintain strict 
            editorial standards:
          </p>
          <ul>
            <li><strong>Honest Reviews:</strong> We provide truthful, unbiased reviews based on actual testing</li>
            <li><strong>No Paid Placements:</strong> Product rankings are not influenced by commission rates</li>
            <li><strong>Disclosure Requirements:</strong> All affiliate content is clearly marked</li>
            <li><strong>Reader-First Approach:</strong> We prioritize what's best for our readers</li>
          </ul>

          <h2>Product Selection Criteria</h2>
          <p>
            We choose products to feature based on:
          </p>
          <ul>
            <li>Product quality and performance</li>
            <li>Value for money</li>
            <li>Reader interest and relevance</li>
            <li>Our testing and research results</li>
            <li>User reviews and feedback</li>
          </ul>
          <p>
            <em>Commission potential is never a primary factor in our product selection.</em>
          </p>

          <h2>Types of Affiliate Content</h2>
          <p>
            You'll find affiliate links in various types of content on our site:
          </p>
          <ul>
            <li><strong>Product Reviews:</strong> In-depth analysis of individual products</li>
            <li><strong>Comparison Articles:</strong> Side-by-side product comparisons</li>
            <li><strong>Buying Guides:</strong> Comprehensive guides for product categories</li>
            <li><strong>Deal Alerts:</strong> Information about sales and promotions</li>
          </ul>

          <h2>Identification of Affiliate Content</h2>
          <p>
            We clearly identify affiliate content through:
          </p>
          <ul>
            <li>Disclosure statements at the beginning of articles</li>
            <li>Clear labeling of affiliate links</li>
            <li>Footer notices on pages containing affiliate links</li>
            <li>"Ad" or "Sponsored" labels where applicable</li>
          </ul>

          <h2>Free Products and Sponsorships</h2>
          <p>
            Sometimes we receive free products for review or participate in sponsored content:
          </p>
          <ul>
            <li>All free products are clearly disclosed in our reviews</li>
            <li>Free products do not guarantee positive reviews</li>
            <li>Sponsored content is always labeled as such</li>
            <li>We maintain editorial control over all sponsored content</li>
          </ul>

          <h2>Price and Availability</h2>
          <p>
            Please note that:
          </p>
          <ul>
            <li>Prices and availability can change rapidly online</li>
            <li>We update our content regularly but cannot guarantee real-time accuracy</li>
            <li>Some products may be out of stock when you click our links</li>
            <li>Promotional prices may expire without notice</li>
          </ul>

          <h2>International Readers</h2>
          <p>
            Our affiliate programs may vary by country:
          </p>
          <ul>
            <li>Some links may only work for specific geographic regions</li>
            <li>Product availability varies by location</li>
            <li>We primarily focus on US and international shipping options</li>
          </ul>

          <h2>Your Support</h2>
          <p>
            When you use our affiliate links, you're supporting SwankyBoyz at no cost to yourself. 
            This support helps us:
          </p>
          <ul>
            <li>Continue providing free, high-quality content</li>
            <li>Purchase products for testing and review</li>
            <li>Maintain and improve our website</li>
            <li>Research and develop new content</li>
          </ul>

          <h2>FTC Compliance</h2>
          <p>
            We comply with the Federal Trade Commission's guidelines regarding affiliate marketing 
            and endorsements. All affiliate relationships are disclosed in accordance with FTC requirements.
          </p>

          <h2>Questions About Our Affiliate Program</h2>
          <p>
            If you have questions about our affiliate relationships or disclosure practices, 
            please contact us at:
          </p>
          <ul>
            <li>Email: affiliate@swankyboyz.com</li>
            <li>Website: Contact form on our website</li>
          </ul>

          <p className="text-sm text-gray-600 dark:text-gray-400 mt-8 p-4 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <strong>Note:</strong> This disclosure is updated regularly to reflect our current affiliate 
            partnerships and practices. We recommend reviewing this page periodically for any changes.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AffiliateDisclosure;