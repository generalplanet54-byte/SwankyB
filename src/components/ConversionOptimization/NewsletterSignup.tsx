import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

interface NewsletterSignupProps {
  title?: string;
  description?: string;
  placeholder?: string;
  ctaText?: string;
  benefits?: string[];
  onSuccess?: (email: string) => void;
}

export const NewsletterSignup: React.FC<NewsletterSignupProps> = ({
  title = "Get Expert Grooming Tips Delivered",
  description = "Weekly product recommendations and exclusive discount codes",
  placeholder = "your@email.com",
  ctaText = "Get Free Tips",
  benefits = [
    "🎁 Exclusive discount codes",
    "📧 Weekly expert recommendations",
    "⏰ Early access to deals",
    "✨ Premium buying guides"
  ],
  onSuccess
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setStatus("error");
      setMessage("Please enter your email");
      return;
    }

    setStatus("loading");

    try {
      // Track submission
      if (window.gtag) {
        window.gtag('event', 'newsletter_signup', {
          event_category: 'email_marketing',
          event_label: 'newsletter'
        });
      }

      // Send to your backend/email service
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          source: 'newsletter_signup',
          timestamp: new Date().toISOString()
        })
      });

      if (!response.ok) throw new Error('Signup failed');

      setStatus("success");
      setMessage("Check your email for confirmation!");
      setEmail("");
      onSuccess?.(email);

      // Reset success message after 5 seconds
      setTimeout(() => setStatus("idle"), 5000);
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      console.error('Newsletter signup error:', error);
    }
  };

  return (
    <section className="rounded-2xl bg-gradient-to-br from-charcoal to-charcoal/80 border border-champagne/20 p-8 md:p-12">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">
        {/* Content */}
        <div className="space-y-6">
          <div>
            <h3 className="font-display text-3xl font-bold text-off-white mb-2">
              {title}
            </h3>
            <p className="text-lg text-off-white/70">
              {description}
            </p>
          </div>

          {/* Benefits */}
          <ul className="space-y-3">
            {benefits.map((benefit, index) => (
              <li key={index} className="flex items-center gap-3 text-off-white/80">
                <span className="text-champagne">✓</span>
                <span>{benefit}</span>
              </li>
            ))}
          </ul>

          {/* Social proof */}
          <div className="text-xs text-off-white/60">
            Join 50,000+ premium lifestyle enthusiasts
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-4 top-4 h-5 w-5 text-champagne/50" />
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={placeholder}
              className="w-full rounded-full bg-white/10 pl-12 pr-4 py-3 text-sm text-off-white placeholder-off-white/40 border border-off-white/20 focus:border-champagne focus:outline-none transition"
            />
          </div>

          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-champagne to-amber-400 hover:to-amber-300 disabled:opacity-50 px-6 py-3 font-bold uppercase tracking-[0.2em] text-charcoal transition"
          >
            {status === "loading" ? "Subscribing..." : ctaText}
          </button>

          {/* Messages */}
          {status === "success" && (
            <div className="flex items-center gap-2 rounded-lg bg-emerald-500/20 px-4 py-3 text-sm text-emerald-300">
              <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {status === "error" && (
            <div className="flex items-center gap-2 rounded-lg bg-red-500/20 px-4 py-3 text-sm text-red-300">
              <AlertCircle className="h-5 w-5 flex-shrink-0" />
              <span>{message}</span>
            </div>
          )}

          {/* Privacy notice */}
          <p className="text-xs text-off-white/50">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  );
};

/**
 * Inline Newsletter Signup (Compact)
 */
interface InlineNewsletterProps {
  placeholder?: string;
  ctaText?: string;
}

export const InlineNewsletter: React.FC<InlineNewsletterProps> = ({
  placeholder = "your@email.com",
  ctaText = "Subscribe"
}) => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'inline_signup' })
      });

      setSubmitted(true);
      setEmail("");
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        required
        className="flex-1 rounded-full bg-white/10 px-4 py-2 text-sm text-off-white placeholder-off-white/40 border border-off-white/20 focus:border-champagne focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-champagne hover:bg-champagne/90 px-4 py-2 text-sm font-bold text-charcoal transition"
      >
        {submitted ? "✓" : ctaText}
      </button>
    </form>
  );
};

export default NewsletterSignup;
