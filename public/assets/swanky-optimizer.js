// SwankyBoyz Performance & SEO Optimizations
// Handles lazy loading, image optimization, and performance metrics

class SwankyOptimizer {
  constructor() {
    this.init();
  }

  init() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', () => {
        this.setupOptimizations();
      });
    } else {
      this.setupOptimizations();
    }
  }

  setupOptimizations() {
    this.setupLazyLoading();
    this.setupImageOptimization();
    this.setupPerformanceMetrics();
    this.setupServiceWorker();
  }

  // Lazy Loading for Images
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      // Observe all images with lazy class
      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // Image Optimization & Fallbacks
  setupImageOptimization() {
    document.querySelectorAll('img').forEach(img => {
      img.addEventListener('error', (e) => {
        const fallbackSrc = img.dataset.fallback || '/images/placeholder.svg';
        if (img.src !== fallbackSrc) {
          img.src = fallbackSrc;
        }
      });

      // Add loading attribute for native lazy loading
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
  }

  // Performance Metrics & Core Web Vitals
  setupPerformanceMetrics() {
    // Measure and report Core Web Vitals
    if ('web-vital' in window) {
      import('https://unpkg.com/web-vitals@3/dist/web-vitals.js').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(this.sendToAnalytics);
        getFID(this.sendToAnalytics);
        getFCP(this.sendToAnalytics);
        getLCP(this.sendToAnalytics);
        getTTFB(this.sendToAnalytics);
      });
    }

    // Monitor resource loading
    if ('PerformanceObserver' in window) {
      const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.entryType === 'navigation') {
            console.log(`Page Load Time: ${entry.loadEventEnd - entry.fetchStart}ms`);
          }
        });
      });
      perfObserver.observe({ entryTypes: ['navigation'] });
    }
  }

  // Service Worker Registration
  setupServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('SW registered: ', registration);
          })
          .catch((registrationError) => {
            console.log('SW registration failed: ', registrationError);
          });
      });
    }
  }

  // Send metrics to analytics
  sendToAnalytics(metric) {
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  }

  // Preload critical resources
  preloadCriticalResources() {
    const criticalResources = [
      { href: '/api/products', as: 'fetch' },
      { href: '/api/categories', as: 'fetch' }
    ];

    criticalResources.forEach(resource => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = resource.href;
      link.as = resource.as;
      if (resource.as === 'fetch') {
        link.crossOrigin = 'anonymous';
      }
      document.head.appendChild(link);
    });
  }
}

// Initialize optimizer
const swankyOptimizer = new SwankyOptimizer();

// Export for external use
window.SwankyOptimizer = SwankyOptimizer;