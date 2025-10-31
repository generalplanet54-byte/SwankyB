/**
 * SwankyBoyz Dynamic Fix Script
 * Automatically fixes prices, images, and Amazon affiliate links across all pages
 * Version: 1.0.0
 * Last Updated: October 27, 2025
 */

(function() {
  'use strict';

  // Configuration
  const CONFIG = {
    // Amazon affiliate tag for SwankyBoyz
    amazonAffiliateTag: 'swankyboyz-20',
    
    // Placeholder image for missing/broken images
    placeholderImage: '/assets/product-placeholder.png',
    
    // Price selectors to check for double $ issues
    priceSelectors: [
      '.price',
      '.product-price', 
      '[data-price]',
      '.affiliate-price',
      '.original-price',
      '.sale-price'
    ],
    
    // Image selectors to check for broken images
    imageSelectors: [
      'img',
      '.product-image img',
      '.featured-image img',
      '.article-image img'
    ],
    
    // Amazon link selectors
    amazonLinkSelectors: [
      'a[href*="amazon.com"]',
      'a[href*="amzn.to"]',
      'a[href*="amazon."]',
      '.affiliate-link[href*="amazon"]'
    ]
  };

  /**
   * Fix double dollar signs in price elements
   */
  function fixPrices() {
    let fixedCount = 0;
    
    CONFIG.priceSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => {
        // Skip if already processed
        if (el.dataset.swankyFixed === 'true') return;
        
        const originalText = el.textContent;
        const fixedText = originalText
          .replace(/\$\$+/g, '$') // Replace multiple $ with single $
          .replace(/\$\s+\$/g, '$') // Replace "$ $" with single $
          .trim();
        
        if (originalText !== fixedText) {
          el.textContent = fixedText;
          el.dataset.swankyFixed = 'true';
          fixedCount++;
        }
      });
    });
    
    if (fixedCount > 0) {
      console.log(`✅ SwankyBoyz: Fixed ${fixedCount} price formatting issues`);
    }
  }

  /**
   * Fix broken or missing images with placeholders
   */
  function fixImages() {
    let fixedCount = 0;
    
    document.querySelectorAll('img').forEach(img => {
      // Skip if already processed
      if (img.dataset.swankyFixed === 'true') return;
      
      // Check if image is broken or has no src
      const isBroken = !img.src || 
                      img.src === window.location.href || 
                      img.src.endsWith('#') ||
                      img.naturalWidth === 0;
      
      if (isBroken) {
        img.src = CONFIG.placeholderImage;
        img.alt = img.alt || 'Product image placeholder';
        img.onerror = null; // Prevent infinite loop
        img.dataset.swankyFixed = 'true';
        fixedCount++;
      }
      
      // Add error handler for future failures
      if (!img.dataset.swankyErrorHandler) {
        img.dataset.swankyErrorHandler = 'true';
        img.onerror = function() {
          if (this.src !== CONFIG.placeholderImage) {
            this.src = CONFIG.placeholderImage;
            this.alt = 'Product image placeholder';
            this.dataset.swankyFixed = 'true';
          }
        };
      }
    });
    
    if (fixedCount > 0) {
      console.log(`✅ SwankyBoyz: Fixed ${fixedCount} broken images`);
    }
  }

  /**
   * Fix Amazon affiliate links to ensure proper tracking
   */
  function fixAmazonLinks() {
    let fixedCount = 0;
    
    CONFIG.amazonLinkSelectors.forEach(selector => {
      document.querySelectorAll(selector).forEach(link => {
        // Skip if already processed
        if (link.dataset.swankyFixed === 'true') return;
        
        let url = link.href;
        let wasModified = false;
        
        // Ensure affiliate tag is present
        if (!url.includes('tag=')) {
          const separator = url.includes('?') ? '&' : '?';
          url += `${separator}tag=${CONFIG.amazonAffiliateTag}`;
          wasModified = true;
        } else {
          // Update existing tag to our affiliate ID
          url = url.replace(/tag=[^&]+/, `tag=${CONFIG.amazonAffiliateTag}`);
          wasModified = true;
        }
        
        // Ensure ref parameter for tracking
        if (!url.includes('ref=')) {
          const separator = url.includes('?') ? '&' : '?';
          url += `${separator}ref=nosim`;
          wasModified = true;
        }
        
        // Set link properties
        link.href = url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer sponsored';
        
        // Add visual indicator for affiliate links
        if (!link.classList.contains('affiliate-link')) {
          link.classList.add('affiliate-link');
        }
        
        if (wasModified) {
          link.dataset.swankyFixed = 'true';
          fixedCount++;
        }
      });
    });
    
    if (fixedCount > 0) {
      console.log(`✅ SwankyBoyz: Fixed ${fixedCount} Amazon affiliate links`);
    }
  }

  /**
   * Add tracking for affiliate link clicks
   */
  function addAffiliateTracking() {
    // Only add the listener once
    if (window.swankyBoyzTrackingAdded) return;
    window.swankyBoyzTrackingAdded = true;
    
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a');
      if (link && (link.href.includes('amazon.com') || link.href.includes('amzn.to'))) {
        // Track affiliate click (you can integrate with Google Analytics here)
        if (typeof gtag !== 'undefined') {
          gtag('event', 'affiliate_click', {
            'event_category': 'affiliate',
            'event_label': link.href,
            'value': 1
          });
        }
        
        console.log('🔗 SwankyBoyz: Affiliate link clicked:', link.href);
      }
    });
  }

  /**
   * Create placeholder image if it doesn't exist
   */
  function createPlaceholderImage() {
    // Create a data URI placeholder image
    const placeholderDataUri = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200' viewBox='0 0 300 200'%3E%3Crect width='300' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' font-family='Arial, sans-serif' font-size='16' fill='%236b7280' text-anchor='middle' dy='.3em'%3ESwankyBoyz Product%3C/text%3E%3C/svg%3E";
    
    // Check if placeholder exists, if not use data URI
    const testImg = new Image();
    testImg.onload = function() {
      CONFIG.placeholderImage = '/assets/product-placeholder.png';
    };
    testImg.onerror = function() {
      CONFIG.placeholderImage = placeholderDataUri;
    };
    testImg.src = '/assets/product-placeholder.png';
  }

  /**
   * Initialize all fixes
   */
  function initSwankyBoyzFixes() {
    try {
      // Track if this is the first run
      if (!window.swankyBoyzInitialized) {
        console.log('🚀 SwankyBoyz: Initializing dynamic fixes...');
        window.swankyBoyzInitialized = true;
      }
      
      createPlaceholderImage();
      fixPrices();
      fixImages();
      fixAmazonLinks();
      addAffiliateTracking();
      
      // Only log success on first run to reduce console noise
      if (window.swankyBoyzInitialized && !window.swankyBoyzFirstRunComplete) {
        console.log('✨ SwankyBoyz: All fixes applied successfully!');
        window.swankyBoyzFirstRunComplete = true;
      }
    } catch (error) {
      console.error('❌ SwankyBoyz: Error applying fixes:', error);
    }
  }

  /**
   * Run fixes on DOM ready and observe for dynamic content
   */
  function startFixEngine() {
    // Initial fix on DOM ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initSwankyBoyzFixes);
    } else {
      initSwankyBoyzFixes();
    }
    
    // Watch for dynamic content changes
    if (typeof MutationObserver !== 'undefined') {
      const observer = new MutationObserver(function(mutations) {
        let shouldRefix = false;
        
        mutations.forEach(function(mutation) {
          if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
            // Check if new content was added that might need fixing
            for (let node of mutation.addedNodes) {
              if (node.nodeType === 1) { // Element node
                if (node.querySelector && (
                  node.querySelector('img') ||
                  node.querySelector('.price') ||
                  node.querySelector('a[href*="amazon"]')
                )) {
                  shouldRefix = true;
                  break;
                }
              }
            }
          }
        });
        
        if (shouldRefix) {
          setTimeout(initSwankyBoyzFixes, 100); // Small delay to let content settle
        }
      });
      
      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    }
  }

  // Start the fix engine
  startFixEngine();

  // Expose to window for manual triggering if needed
  window.SwankyBoyzFixes = {
    fixPrices,
    fixImages,
    fixAmazonLinks,
    init: initSwankyBoyzFixes
  };
})();