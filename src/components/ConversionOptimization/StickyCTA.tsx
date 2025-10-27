import React, { useState, useEffect } from 'react';
import { ChevronDown, X, TrendingUp } from 'lucide-react';

interface StickyCTAProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaUrl?: string;
  dismissible?: boolean;
  showAfterScroll?: number;
}

const StickyCTA: React.FC<StickyCTAProps> = ({
  title = "👉 Compare Premium Options",
  subtitle = "Expert picks with exclusive deals",
  ctaText = "View Buying Guide",
  ctaUrl = "#product-comparison",
  dismissible = true,
  showAfterScroll = 30
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      
      setScrollProgress(scrollPercent);
      
      // Show CTA after scrolling past threshold
      if (scrollPercent > showAfterScroll && !isDismissed) {
        setIsVisible(true);
      } else if (scrollPercent <= showAfterScroll) {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, showAfterScroll]);

  if (!isVisible || isDismissed) return null;

  const handleCTA = () => {
    const element = document.querySelector(ctaUrl);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      window.location.href = ctaUrl;
    }
    
    // Track conversion
    if (window.gtag) {
      window.gtag('event', 'sticky_cta_click', {
        event_category: 'conversion_optimization',
        event_label: 'sticky_cta'
      });
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 mx-auto max-w-6xl px-4">
      <div className="transform transition-all duration-300 ease-out">
        <div className="rounded-2xl bg-gradient-to-r from-champagne via-yellow-300 to-amber-300 shadow-2xl overflow-hidden">
          {/* Progress bar */}
          <div 
            className="h-1 bg-charcoal/30"
            style={{ width: `${Math.min(scrollProgress, 100)}%` }}
          />
          
          {/* Content */}
          <div className="flex items-center justify-between gap-4 px-6 py-4 sm:gap-6 sm:px-8">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex-shrink-0">
                <TrendingUp className="h-5 w-5 text-charcoal animate-pulse" />
              </div>
              <div className="flex-1">
                <div className="font-display text-sm font-bold text-charcoal sm:text-base">
                  {title}
                </div>
                <div className="text-xs text-charcoal/70 sm:text-sm">
                  {subtitle}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCTA}
                className="inline-flex items-center gap-2 rounded-full bg-charcoal px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-champagne transition hover:bg-charcoal/90 sm:px-6"
              >
                {ctaText}
                <ChevronDown className="h-4 w-4" />
              </button>
              
              {dismissible && (
                <button
                  onClick={() => setIsDismissed(true)}
                  className="ml-2 inline-flex p-1 text-charcoal/50 transition hover:text-charcoal"
                  aria-label="Dismiss"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;
