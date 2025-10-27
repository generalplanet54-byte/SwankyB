// Web Vitals monitoring and reporting
// Tracks LCP, FCP, CLS, INP and sends events to gtag

type MetricRating = 'good' | 'needs_improvement' | 'poor';

function getRating(metric: string, value: number): MetricRating {
  // Based on Web Vitals thresholds
  switch (metric) {
    case 'LCP':
      return value <= 2500 ? 'good' : value <= 4000 ? 'needs_improvement' : 'poor';
    case 'FCP':
      return value <= 1800 ? 'good' : value <= 3000 ? 'needs_improvement' : 'poor';
    case 'CLS':
      return value <= 0.1 ? 'good' : value <= 0.25 ? 'needs_improvement' : 'poor';
    case 'INP':
      return value <= 200 ? 'good' : value <= 500 ? 'needs_improvement' : 'poor';
    default:
      return 'needs_improvement';
  }
}

function sendToGtag(vitalName: string, vitalValue: number, vitalRating: MetricRating) {
  try {
    if (typeof (globalThis as any).gtag === 'function') {
      (globalThis as any).gtag('event', 'web_vitals', {
        event_category: 'core_web_vitals',
        metric: vitalName,
        value: Math.round(vitalValue),
        rating: vitalRating,
        event_label: vitalRating === 'good' ? 'pass' : 'fail',
      });
    }
  } catch (e) {
    // silent
  }
}

/**
 * Monitor Largest Contentful Paint (LCP)
 * Threshold: Good < 2.5s, Needs Improvement < 4s, Poor >= 4s
 */
export function observeLCP() {
  if ('PerformanceObserver' in globalThis) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntryList[0] & { renderTime?: number; loadTime?: number };
        const lcpValue = (lastEntry as any).renderTime || (lastEntry as any).loadTime;
        const rating = getRating('LCP', lcpValue);
        sendToGtag('LCP', lcpValue, rating);
        console.log(`LCP: ${lcpValue.toFixed(0)}ms (${rating})`);
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
      return observer;
    } catch (e) {
      console.warn('LCP observer not supported');
    }
  }
  return null;
}

/**
 * Monitor First Contentful Paint (FCP)
 * Threshold: Good < 1.8s, Needs Improvement < 3s, Poor >= 3s
 */
export function observeFCP() {
  if ('PerformanceObserver' in globalThis) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const fcpEntry = entries.find((e) => e.name === 'first-contentful-paint');
        if (fcpEntry) {
          const fcpValue = fcpEntry.startTime;
          const rating = getRating('FCP', fcpValue);
          sendToGtag('FCP', fcpValue, rating);
          console.log(`FCP: ${fcpValue.toFixed(0)}ms (${rating})`);
        }
      });
      observer.observe({ entryTypes: ['paint'] });
      return observer;
    } catch (e) {
      console.warn('FCP observer not supported');
    }
  }
  return null;
}

/**
 * Monitor Cumulative Layout Shift (CLS)
 * Threshold: Good < 0.1, Needs Improvement < 0.25, Poor >= 0.25
 */
export function observeCLS() {
  if ('PerformanceObserver' in globalThis) {
    try {
      let clsValue = 0;
      const observer = new PerformanceObserver((entryList) => {
        for (const entry of entryList.getEntries()) {
          if ((entry as any).hadRecentInput) continue;
          clsValue += (entry as any).value;
          const rating = getRating('CLS', clsValue);
          sendToGtag('CLS', clsValue, rating);
          console.log(`CLS: ${clsValue.toFixed(3)} (${rating})`);
        }
      });
      observer.observe({ entryTypes: ['layout-shift'] });
      return observer;
    } catch (e) {
      console.warn('CLS observer not supported');
    }
  }
  return null;
}

/**
 * Monitor Interaction to Next Paint (INP)
 * Threshold: Good < 200ms, Needs Improvement < 500ms, Poor >= 500ms
 */
export function observeINP() {
  if ('PerformanceObserver' in globalThis) {
    try {
      const observer = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const maxINP = Math.max(...entries.map((e: any) => e.duration));
        const rating = getRating('INP', maxINP);
        sendToGtag('INP', maxINP, rating);
        console.log(`INP: ${maxINP.toFixed(0)}ms (${rating})`);
      });
      observer.observe({ entryTypes: ['event'] });
      return observer;
    } catch (e) {
      console.warn('INP observer not supported');
    }
  }
  return null;
}

/**
 * Initialize all Web Vitals monitoring
 * Call once on app startup (e.g., in App.tsx useEffect or main.tsx)
 */
export function initializeWebVitalsMonitoring() {
  if (typeof document === 'undefined') return; // SSR guard

  observeFCP();
  observeLCP();
  observeCLS();
  observeINP();

  console.log('Web Vitals monitoring initialized');
}

/**
 * Get current Web Vitals from performance API
 */
export function getCurrentWebVitals(): Partial<Record<string, number>> {
  if (typeof performance === 'undefined') return {};

  const vitals: Record<string, number> = {};

  // FCP
  const fcpEntry = performance.getEntriesByName('first-contentful-paint')[0];
  if (fcpEntry) vitals.fcp = fcpEntry.startTime;

  // LCP
  const lcpEntries = performance.getEntriesByType('largest-contentful-paint');
  if (lcpEntries.length > 0) vitals.lcp = lcpEntries[lcpEntries.length - 1].startTime;

  // Navigation Timing
  const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (navTiming) {
    vitals.domContentLoaded = navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart;
    vitals.loadComplete = navTiming.loadEventEnd - navTiming.loadEventStart;
  }

  return vitals;
}

/**
 * Report a custom event with performance metric
 */
export function reportMetric(eventName: string, value: number, label?: string) {
  try {
    if (typeof (globalThis as any).gtag === 'function') {
      (globalThis as any).gtag('event', 'performance_metric', {
        event_category: 'performance',
        metric_name: eventName,
        value: Math.round(value),
        label: label ?? undefined,
      });
    }
  } catch (e) {
    // silent
  }
}

export default {
  initializeWebVitalsMonitoring,
  getCurrentWebVitals,
  reportMetric,
  observeLCP,
  observeFCP,
  observeCLS,
  observeINP,
};
