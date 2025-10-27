import React, { useState, useEffect } from 'react';
import { BookOpen, X, ChevronRight } from 'lucide-react';

interface FloatingActionButtonProps {
  title?: string;
  description?: string;
  ctaText?: string;
  showAfterScroll?: number;
  onCTA?: () => void;
}

const FloatingActionButton: React.FC<FloatingActionButtonProps> = ({
  title = "Buying Guide",
  description = "Expert recommendations & exclusive deals",
  ctaText = "Open Now",
  showAfterScroll = 25,
  onCTA
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;

      if (scrollPercent > showAfterScroll && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed, showAfterScroll]);

  if (!isVisible || isDismissed) return null;

  const handleClick = () => {
    if (window.gtag) {
      window.gtag('event', 'fab_click', {
        event_category: 'conversion_optimization',
        event_label: 'floating_action_button'
      });
    }
    onCTA?.();
  };

  return (
    <div className="fixed bottom-8 right-8 z-40">
      <div
        className={`transform transition-all duration-300 ease-out ${
          isHovered ? 'scale-105' : 'scale-100'
        }`}
      >
        {/* Expanded Card (shown on hover) */}
        {isHovered && (
          <div className="absolute bottom-20 right-0 mb-4 w-72 rounded-2xl bg-charcoal shadow-2xl p-6 border border-champagne/20">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-display text-lg text-champagne font-bold">
                    {title}
                  </h3>
                  <p className="text-sm text-off-white/70 mt-1">
                    {description}
                  </p>
                </div>
                <button
                  onClick={() => setIsDismissed(true)}
                  className="flex-shrink-0 text-off-white/50 hover:text-off-white transition"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              
              <button
                onClick={handleClick}
                className="w-full flex items-center justify-center gap-2 rounded-full bg-champagne hover:bg-champagne/90 px-4 py-3 text-sm font-bold uppercase tracking-[0.2em] text-charcoal transition"
              >
                {ctaText}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}

        {/* Button */}
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-br from-champagne to-amber-400 hover:to-amber-300 px-5 py-4 text-charcoal font-bold shadow-lg transition-all hover:shadow-xl hover:scale-110"
        >
          <BookOpen className="h-6 w-6" />
          <span className="hidden sm:inline text-xs font-bold uppercase tracking-[0.2em]">
            Guide
          </span>
          
          {/* Pulse animation */}
          <span className="absolute inset-0 rounded-full bg-champagne animate-pulse opacity-30" />
        </button>
      </div>
    </div>
  );
};

export default FloatingActionButton;
