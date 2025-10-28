/**
 * Advanced Analytics & Conversion Tracking
 * Comprehensive tracking for affiliate revenue optimization
 */

export interface AffiliateClickEvent {
  product_name: string;
  product_id: string;
  affiliate_network: 'amazon' | 'other';
  link_position: string;
  page_path: string;
  click_timestamp: number;
}

export interface ConversionEvent {
  event_name: string;
  value?: number;
  currency?: string;
  items?: any[];
  transaction_id?: string;
}

export interface UserBehaviorMetrics {
  scroll_depth: number;
  time_on_page: number;
  interactions_count: number;
  exit_intent_triggered: boolean;
}

/**
 * Track affiliate link clicks with comprehensive data
 */
export const trackAffiliateClick = (event: AffiliateClickEvent): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'affiliate_click', {
    product_name: event.product_name,
    product_id: event.product_id,
    affiliate_network: event.affiliate_network,
    link_position: event.link_position,
    page_path: event.page_path,
    event_category: 'affiliate',
    event_label: `${event.affiliate_network}_${event.product_id}`,
    value: 1, // Each click has potential value
  });

  // Also track as enhanced ecommerce event
  window.gtag('event', 'select_content', {
    content_type: 'affiliate_product',
    content_id: event.product_id,
  });
};

/**
 * Track page scroll depth for engagement metrics
 */
export const trackScrollDepth = (): void => {
  if (typeof window === 'undefined') return;

  let maxScroll = 0;
  const milestones = [25, 50, 75, 90, 100];
  const triggered = new Set<number>();

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    );

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent;

      milestones.forEach((milestone) => {
        if (scrollPercent >= milestone && !triggered.has(milestone)) {
          triggered.add(milestone);
          
          if (window.gtag) {
            window.gtag('event', 'scroll_depth', {
              event_category: 'engagement',
              event_label: `${milestone}%`,
              value: milestone,
              non_interaction: true,
            });
          }
        }
      });
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
};

/**
 * Track time on page accurately
 */
export const trackTimeOnPage = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const startTime = Date.now();
  let isActive = true;
  let totalActiveTime = 0;
  let lastActiveTime = startTime;

  // Detect if user is active (moving mouse, scrolling, etc.)
  const handleActivity = () => {
    if (!isActive) {
      isActive = true;
      lastActiveTime = Date.now();
    }
  };

  // Detect inactivity
  const checkInactivity = setInterval(() => {
    if (isActive && Date.now() - lastActiveTime > 30000) { // 30 seconds inactivity
      isActive = false;
      totalActiveTime += Date.now() - lastActiveTime;
    }
  }, 5000);

  ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    window.addEventListener(event, handleActivity, { passive: true });
  });

  // Report on page unload
  const reportTimeOnPage = () => {
    const endTime = Date.now();
    const totalTime = Math.round((endTime - startTime) / 1000); // seconds
    const activeTime = Math.round((totalActiveTime + (isActive ? endTime - lastActiveTime : 0)) / 1000);

    if (window.gtag && totalTime > 3) { // Only report if > 3 seconds
      window.gtag('event', 'time_on_page', {
        event_category: 'engagement',
        event_label: window.location.pathname,
        value: totalTime,
        active_time: activeTime,
        engagement_rate: Math.round((activeTime / totalTime) * 100),
      });
    }
  };

  window.addEventListener('beforeunload', reportTimeOnPage);

  // Return cleanup function
  return () => {
    clearInterval(checkInactivity);
    ['mousemove', 'keydown', 'scroll', 'touchstart'].forEach(event => {
      window.removeEventListener(event, handleActivity);
    });
    window.removeEventListener('beforeunload', reportTimeOnPage);
  };
};

/**
 * Track conversion funnel steps
 */
export const trackFunnelStep = (
  stepName: string,
  stepNumber: number,
  additionalData?: Record<string, any>
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'funnel_step', {
    funnel_name: 'affiliate_purchase',
    step_name: stepName,
    step_number: stepNumber,
    ...additionalData,
  });
};

/**
 * Track CTA button clicks
 */
export const trackCTAClick = (
  ctaName: string,
  ctaLocation: string,
  ctaDestination: string
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'cta_click', {
    event_category: 'conversion',
    cta_name: ctaName,
    cta_location: ctaLocation,
    cta_destination: ctaDestination,
  });
};

/**
 * Track product comparison interactions
 */
export const trackComparison = (
  productIds: string[],
  comparisonType: string
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'product_comparison', {
    event_category: 'engagement',
    comparison_type: comparisonType,
    product_count: productIds.length,
    product_ids: productIds.join(','),
  });
};

/**
 * Track search queries
 */
export const trackSearch = (
  searchTerm: string,
  resultsCount: number
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'search', {
    search_term: searchTerm,
    results_count: resultsCount,
  });
};

/**
 * Track exit intent
 */
export const trackExitIntent = (
  popupShown: boolean,
  userAction?: 'dismissed' | 'converted'
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exit_intent', {
    event_category: 'engagement',
    popup_shown: popupShown,
    user_action: userAction || 'none',
  });
};

/**
 * Track error events
 */
export const trackError = (
  errorType: string,
  errorMessage: string,
  errorStack?: string
): void => {
  if (typeof window === 'undefined' || !window.gtag) return;

  window.gtag('event', 'exception', {
    description: `${errorType}: ${errorMessage}`,
    fatal: false,
    error_stack: errorStack?.substring(0, 150), // Limit stack trace length
  });
};

/**
 * Initialize advanced analytics tracking
 */
export const initializeAdvancedAnalytics = (): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  // Track scroll depth
  trackScrollDepth();
  
  // Track time on page
  const cleanupTimeTracking = trackTimeOnPage();

  // Track errors
  const originalErrorHandler = window.onerror;
  window.onerror = (message, source, lineno, colno, error) => {
    trackError(
      'javascript_error',
      String(message),
      error?.stack
    );
    if (originalErrorHandler) {
      return originalErrorHandler(message, source, lineno, colno, error);
    }
    return false;
  };

  // Track unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    trackError(
      'unhandled_promise_rejection',
      String(event.reason)
    );
  });

  console.log('✅ Advanced Analytics initialized');

  // Return cleanup function
  return () => {
    cleanupTimeTracking();
    window.onerror = originalErrorHandler;
  };
};

export default {
  trackAffiliateClick,
  trackScrollDepth,
  trackTimeOnPage,
  trackFunnelStep,
  trackCTAClick,
  trackComparison,
  trackSearch,
  trackExitIntent,
  trackError,
  initializeAdvancedAnalytics,
};
