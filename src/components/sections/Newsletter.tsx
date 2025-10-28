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
            console.log('Newsletter signup:', email);
            // Track conversion
            const gtag = (window as any).gtag;
            if (gtag) {
              gtag('event', 'newsletter_signup', {
                event_category: 'email_marketing',
                event_label: 'homepage_newsletter'
              });
            }
          }}
        />
      </div>
    </section>
  );
};

export default Newsletter;