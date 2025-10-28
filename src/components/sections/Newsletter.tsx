import React from 'react';
import { NewsletterSignup } from '../ConversionOptimization';

const Newsletter: React.FC = () => {
  return (
    <section className="py-24">
      <div className="container">
        {/* Premium Newsletter Component */}
        <NewsletterSignup
          title="Get Expert Grooming Tips Delivered"
          description="Weekly product recommendations and exclusive discount codes"
          placeholder="your@email.com"
          ctaText="Get Free Tips"
          benefits={[
            "🎁 Exclusive discount codes",
            "📧 Weekly expert recommendations",
            "⏰ Early access to deals",
            "✨ Premium buying guides"
          ]}
          onSuccess={(email) => {
            // Track newsletter signup
            if (window.gtag) {
              window.gtag('event', 'newsletter_signup', {
                method: 'inline_form',
                email_domain: email.split('@')[1]
              });
            }
          }}
        />
      </div>
    </section>
  );
};

export default Newsletter;