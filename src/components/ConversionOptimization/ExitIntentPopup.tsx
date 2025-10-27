import React, { useState, useEffect } from 'react';
import { X, Download, Mail } from 'lucide-react';

interface ExitIntentPopupProps {
  title?: string;
  description?: string;
  ctaText?: string;
  emailPlaceholder?: string;
  pdfUrl?: string;
  onEmail?: (email: string) => void;
}

const ExitIntentPopup: React.FC<ExitIntentPopupProps> = ({
  title = "Wait! Get Our Free Buying Guide",
  description = "Expert recommendations for premium grooming products + exclusive discount codes",
  ctaText = "Download Free PDF",
  emailPlaceholder = "your@email.com",
  pdfUrl = "/guides/ultimate-grooming-guide.pdf",
  onEmail
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger on desktop and if mouse actually leaves
      if (e.clientY <= 0 && !isDismissed && typeof window !== 'undefined') {
        setIsVisible(true);

        if (window.gtag) {
          window.gtag('event', 'exit_intent_trigger', {
            event_category: 'conversion_optimization',
            event_label: 'exit_intent_popup'
          });
        }
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [isDismissed]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) return;

    setIsLoading(true);

    // Track submission
    if (window.gtag) {
      window.gtag('event', 'exit_intent_conversion', {
        event_category: 'conversion_optimization',
        event_label: 'email_collected'
      });
    }

    try {
      // Call onEmail callback or send to API
      if (onEmail) {
        onEmail(email);
      } else {
        // Option: Send to your backend
        await fetch('/api/newsletter', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email,
            source: 'exit_intent_popup',
            timestamp: new Date().toISOString()
          })
        });
      }

      // Show success and trigger download
      const link = document.createElement('a');
      link.href = pdfUrl;
      link.download = 'Ultimate-Grooming-Guide.pdf';
      link.click();

      // Close popup
      setTimeout(() => {
        setIsVisible(false);
        setIsDismissed(true);
      }, 1000);
    } catch (error) {
      console.error('Failed to submit email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    
    if (window.gtag) {
      window.gtag('event', 'exit_intent_dismiss', {
        event_category: 'conversion_optimization',
        event_label: 'exit_intent_popup'
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl bg-charcoal shadow-2xl overflow-hidden border border-champagne/20">
        {/* Close button */}
        <button
          onClick={handleDismiss}
          className="absolute top-4 right-4 z-10 p-1 text-off-white/50 hover:text-off-white transition"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Content */}
        <div className="space-y-6 p-8 pt-10">
          {/* Header */}
          <div className="space-y-2 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-champagne/20">
              <Download className="h-6 w-6 text-champagne" />
            </div>
            <h2 className="font-display text-2xl font-bold text-off-white">
              {title}
            </h2>
            <p className="text-sm text-off-white/70">
              {description}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 h-5 w-5 text-champagne/50" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={emailPlaceholder}
                required
                className="w-full rounded-full bg-white/10 pl-12 pr-4 py-3 text-sm text-off-white placeholder-off-white/40 border border-off-white/20 focus:border-champagne focus:outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-champagne to-amber-400 hover:to-amber-300 disabled:opacity-50 px-6 py-3 font-bold uppercase tracking-[0.2em] text-charcoal transition"
            >
              <Download className="h-4 w-4" />
              {isLoading ? "Processing..." : ctaText}
            </button>
          </form>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-4 text-xs text-off-white/50">
            <div>✅ 50K+ Downloaded</div>
            <div>•</div>
            <div>⭐ 4.9/5 Rating</div>
          </div>

          {/* Skip link */}
          <button
            onClick={handleDismiss}
            className="w-full text-xs font-semibold uppercase tracking-[0.2em] text-off-white/60 hover:text-off-white transition"
          >
            No Thanks, I'll Continue Browsing
          </button>
        </div>

        {/* Footer incentive */}
        <div className="border-t border-off-white/10 bg-charcoal/50 px-8 py-4 text-center text-xs text-champagne font-semibold">
          📋 Includes: Buying guide + exclusive $20-50 discount codes
        </div>
      </div>
    </div>
  );
};

export default ExitIntentPopup;
