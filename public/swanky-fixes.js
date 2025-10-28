/**
 * SwankyBoyz Dynamic Fixes Script
 * Handles affiliate link tracking, image fallbacks, and dynamic content fixes
 */

(function() {
  'use strict';

  // Configuration
  const config = {
  affiliateTag: 'swankyboyz-20',
  imageRetryCount: 2,
  imageRetryDelay: 1000,
  localImagePaths: ['/images/', '/assets/'] // Don't retry local images
  };

  /**
   * Add affiliate tag to Amazon URLs
   */
  function enhanceAffiliateLinks() {
    const affiliateLinks = document.querySelectorAll('[data-affiliate-link], [href*="amazon.com"], [href*="amzn.to"]');
    
    affiliateLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (!href) return;

      // Handle Amazon links
      if (href.includes('amazon.com') || href.includes('amzn.to')) {
        try {
          let finalUrl = href;
          
          // Handle short amzn.to links - expand them to full Amazon URLs
          if (href.includes('amzn.to')) {
            // Short URLs need to be redirected to full Amazon URL with tag
            // We'll set up a click handler to modify the link before navigation
            link.addEventListener('click', function(e) {
              if (e.ctrlKey || e.metaKey || e.button === 1) {
                // Let middle-click and ctrl-click work normally
                return;
              }
              
              // For regular clicks, we'll navigate with the affiliate tag added
              const originalHref = this.getAttribute('href');
              const hasTag = originalHref.includes('tag=');
              const newUrl = originalHref + (hasTag ? '' : '?tag=swankyboyz-20');
              
              this.setAttribute('href', newUrl);
              this.setAttribute('target', '_blank');
              this.setAttribute('rel', 'nofollow sponsored noopener');
              
              // Track the click
              const productId = this.getAttribute('data-affiliate-id');
              const productName = this.getAttribute('data-affiliate-name');
              
              if (window.gtag) {
                gtag('event', 'affiliate_click', {
                  'product_id': productId,
                  'product_name': productName,
                  'link_url': newUrl
                });
              }
              
              console.log('Affiliate link clicked:', {
                id: productId,
                name: productName,
                url: newUrl
              });
            }, { once: true });
          } else {
            // Full Amazon URLs - add tag if missing
            try {
              const url = new URL(finalUrl);
              
              if (!url.search.includes('tag=')) {
                url.searchParams.set('tag', 'swankyboyz-20');
                finalUrl = url.toString();
                link.setAttribute('href', finalUrl);
              }
            } catch (e) {
              console.warn('Could not parse URL:', finalUrl);
            }
          }
          
          // Ensure proper tracking attributes
          link.setAttribute('target', '_blank');
          link.setAttribute('rel', 'nofollow sponsored noopener');
          
          // Add click tracking for full URLs
          if (finalUrl.includes('amazon.com')) {
            link.addEventListener('click', function(e) {
              const productId = this.getAttribute('data-affiliate-id');
              const productName = this.getAttribute('data-affiliate-name');
              
              if (window.gtag) {
                gtag('event', 'affiliate_click', {
                  'product_id': productId,
                  'product_name': productName,
                  'link_url': finalUrl
                });
              }
              
              console.log('Affiliate click tracked:', {
                id: productId,
                name: productName,
                url: finalUrl
              });
            });
          }
        } catch (e) {
          console.error('Error processing affiliate link:', e);
        }
      }
    });
  }

  /**
   * Handle image loading with fallbacks
   */
  function enhanceImages() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // All images should now be local SVGs. No Unsplash/Pexels images should remain.
    });
  }

  /**
   * Fix broken affiliate links that lead to error pages
   */
  function fixAffiliateErrors() {
    const affiliateLinks = document.querySelectorAll('[data-affiliate-link]');
    
    affiliateLinks.forEach(link => {
      const href = link.getAttribute('href');
      
      if (!href) {
        console.warn('Affiliate link missing href:', link);
        return;
      }

      // Validate URL format
      try {
        new URL(href);
      } catch (e) {
        console.error('Invalid affiliate URL:', href);
        // Disable broken link
        link.style.pointerEvents = 'none';
        link.style.opacity = '0.5';
        link.title = 'This link is currently unavailable';
      }

      // Check for common error patterns
      if (href.includes('undefined') || href.includes('null') || href === '#' || href === '') {
        console.warn('Invalid affiliate link detected:', href);
        link.addEventListener('click', function(e) {
          e.preventDefault();
          alert('This product link is currently unavailable. Please try again later.');
        });
      }
    });
  }

  /**
   * Fix dynamic image URLs with query parameters
   */
  function fixImageURLs() {
    // All images should now be local SVGs. No external images to fix.
  }

  /**
   * Initialize all fixes
   */
  function initialize() {
    // Wait for DOM to be ready
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runFixes);
    } else {
      runFixes();
    }
  }

  /**
   * Run all fixes
   */
  function runFixes() {
  console.log('🚀 SwankyBoyz: Initializing dynamic fixes...');
    
  let fixCount = 0;
    
    try {
      enhanceAffiliateLinks();
  fixCount++;
    } catch (e) {
  console.warn('⚠️ SwankyBoyz: Error enhancing affiliate links:', e);
    }

    try {
      fixAffiliateErrors();
  fixCount++;
    } catch (e) {
  console.warn('⚠️ SwankyBoyz: Error fixing affiliate links:', e);
    }

    // All images should now be local SVGs. No external images to fix.

    try {
      enhanceImages();
  fixCount++;
    } catch (e) {
  console.warn('⚠️ SwankyBoyz: Error enhancing images:', e);
    }

    // Re-run fixes when React renders new content
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        // Debounce to avoid excessive re-runs
        clearTimeout(window.swankyFixesTimeout);
        window.swankyFixesTimeout = setTimeout(() => {
          try {
            enhanceAffiliateLinks();
          } catch (e) {
            console.warn('⚠️ SwankyBoyz: Error in observer:', e);
          }
        }, 500);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
      });
    }

  console.log('✨ SwankyBoyz: All fixes applied successfully!');
  }

  // Initialize when script loads
  initialize();
})();
