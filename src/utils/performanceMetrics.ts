// Performance metrics utilities
// Measure and report custom performance metrics beyond Core Web Vitals

/**
 * Measure component render time
 * @param componentName Name of the component
 * @param startMark Performance mark name (e.g., 'ComponentName-start')
 * @param endMark Performance mark name (e.g., 'ComponentName-end')
 */
export function measureComponentRender(
  componentName: string,
  startMark: string,
  endMark: string
) {
  try {
    performance.mark(startMark);
    return () => {
      performance.mark(endMark);
      performance.measure(componentName, startMark, endMark);
      const measure = performance.getEntriesByName(componentName)[0];
      console.log(`⏱️  ${componentName} render: ${measure.duration.toFixed(2)}ms`);
    };
  } catch {
    return () => {}; // noop
  }
}

/**
 * Measure API call duration
 * @param apiName Name of the API endpoint
 * @param fn Async function to measure
 */
export async function measureApiCall<T>(apiName: string, fn: () => Promise<T>): Promise<T> {
  const startMark = `api-${apiName}-start`;
  const endMark = `api-${apiName}-end`;

  try {
    performance.mark(startMark);
    const result = await fn();
    performance.mark(endMark);
    performance.measure(apiName, startMark, endMark);

    const measure = performance.getEntriesByName(apiName)[0];
    console.log(`🔗 API ${apiName}: ${measure.duration.toFixed(2)}ms`);
    return result;
  } catch (error) {
    console.error(`❌ API ${apiName} failed:`, error);
    throw error;
  }
}

/**
 * Get memory usage (if available)
 */
export function getMemoryUsage() {
  if ((performance as any).memory) {
    const mem = (performance as any).memory;
    return {
      usedJSHeapSize: Math.round(mem.usedJSHeapSize / 1048576), // MB
      jsHeapSizeLimit: Math.round(mem.jsHeapSizeLimit / 1048576), // MB
      percentUsed: ((mem.usedJSHeapSize / mem.jsHeapSizeLimit) * 100).toFixed(1),
    };
  }
  return null;
}

/**
 * Get all navigation timing metrics
 */
export function getNavigationTimings() {
  const navTiming = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  if (!navTiming) return null;

  return {
    // Time to First Byte
    ttfb: navTiming.responseStart - navTiming.requestStart,
    // DOM Content Loaded
    dcl: navTiming.domContentLoadedEventEnd - navTiming.domContentLoadedEventStart,
    // Load Event
    load: navTiming.loadEventEnd - navTiming.loadEventStart,
    // Document Interactive (DOM ready)
    domInteractive: navTiming.domInteractive - navTiming.fetchStart,
    // Full page load
    pageLoad: navTiming.loadEventEnd - navTiming.fetchStart,
  };
}

/**
 * Get largest images on the page and their sizes
 */
export function analyzeImagePerformance() {
  const images = document.querySelectorAll('img');
  const imageData: Array<{ src: string; width: number; height: number; naturalWidth: number; naturalHeight: number }> = [];

  images.forEach((img) => {
    imageData.push({
      src: img.src.substring(0, 50),
      width: img.width,
      height: img.height,
      naturalWidth: img.naturalWidth,
      naturalHeight: img.naturalHeight,
    });
  });

  return imageData;
}

/**
 * Check for unused CSS and JavaScript
 * Uses Chrome DevTools Coverage API if available
 */
export async function analyzeUnusedCode() {
  if (!('getCoverageByType' in (window as any).__coverage__ || false)) {
    console.warn('Coverage API not available. Use Chrome DevTools Coverage tab.');
    return null;
  }

  try {
    const coverage = await (window as any).__coverage__.getCoverageByType();
    return coverage;
  } catch {
    return null;
  }
}

/**
 * Report a custom metric to analytics
 * 
 * Note: Google Analytics 4 (GA4) beacon requests to /g/collect return HTTP 204 No Content.
 * This is the EXPECTED and CORRECT behavior for successful tracking.
 * A 204 response confirms that Google's servers have successfully received the tracking data.
 * This is NOT an error - it's the standard success response for GA4 data collection.
 */
export function reportCustomMetric(metricName: string, value: number, unit = 'ms') {
  try {
    if (typeof (globalThis as any).gtag === 'function') {
      (globalThis as any).gtag('event', 'performance_metric', {
        event_category: 'performance',
        metric_name: metricName,
        value: Math.round(value),
        unit,
      });
    }
  } catch {
    // silent
  }
}

/**
 * Analyze long tasks (if available)
 */
export function observeLongTasks() {
  if ('PerformanceObserver' in globalThis) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.warn(`⚠️  Long Task detected: ${(entry as any).duration.toFixed(0)}ms`);
        }
      });
      observer.observe({ entryTypes: ['longtask'] });
      return observer;
    } catch {
      // Long Tasks API not available
      return null;
    }
  }
  return null;
}

export default {
  measureComponentRender,
  measureApiCall,
  getMemoryUsage,
  getNavigationTimings,
  analyzeImagePerformance,
  analyzeUnusedCode,
  reportCustomMetric,
  observeLongTasks,
};
