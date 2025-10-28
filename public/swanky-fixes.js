/**
 * SwankyBoyz Dynamic Fixes Script
 * Handles affiliate link tracking, image fallbacks, and dynamic content fixes
 */

(function() {
  'use strict';

  // Configuration
  const config = {
    affiliateTag: 'tag=swankyboyz-20',
    amazon: 'amzn.to',
    imageRetryCount: 3,
    imageRetryDelay: 500
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
      // Store original src
      const originalSrc = img.src;
      let retryCount = 0;

      // Listen for image load errors
      img.addEventListener('error', function() {
        retryCount++;
        
        if (retryCount < config.imageRetryCount) {
          // Retry loading the image
          setTimeout(() => {
            this.src = originalSrc + '?' + Date.now();
          }, config.imageRetryDelay * retryCount);
        } else {
          // Use placeholder after all retries fail
          this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%231A1A1A" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="24" fill="%23D4AF37" text-anchor="middle" dominant-baseline="central"%3EImage Unavailable%3C/text%3E%3C/svg%3E';
          this.alt = 'Image unavailable';
          this.style.backgroundColor = '#f0f0f0';
        }
      });

      // Set onload handler
      img.addEventListener('load', function() {
        this.style.opacity = '1';
      });

      // Add loading state
      img.style.opacity = '0.7';
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
    const images = document.querySelectorAll('img[src*="unsplash"], img[src*="pexels"], img[src*="cloudinary"]');
    
    images.forEach(img => {
      let src = img.getAttribute('src');
      
      // Ensure images have proper parameters for optimization
      if (src.includes('unsplash.com')) {
        // Add Unsplash optimization parameters
        if (!src.includes('?')) {
          src += '?auto=format&fit=crop&w=400&q=80';
        }
      } else if (src.includes('pexels.com')) {
        // Add Pexels optimization parameters
        if (!src.includes('?')) {
          src += '?auto=compress&cs=tinysrgb&w=400';
        }
      }
      
      img.setAttribute('src', src);
    });
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
    console.log('SwankyBoyz Dynamic Fixes: Initializing...');
    
    try {
      enhanceAffiliateLinks();
      console.log('✓ Affiliate links enhanced');
    } catch (e) {
      console.error('✗ Error enhancing affiliate links:', e);
    }

    try {
      fixAffiliateErrors();
      console.log('✓ Affiliate errors fixed');
    } catch (e) {
      console.error('✗ Error fixing affiliate links:', e);
    }

    try {
      fixImageURLs();
      console.log('✓ Image URLs optimized');
    } catch (e) {
      console.error('✗ Error optimizing images:', e);
    }

    try {
      enhanceImages();
      console.log('✓ Image loading enhanced');
    } catch (e) {
      console.error('✗ Error enhancing images:', e);
    }

    // Re-run fixes when React renders new content
    if (window.MutationObserver) {
      const observer = new MutationObserver(() => {
        // Debounce to avoid excessive re-runs
        clearTimeout(window.swankyFixesTimeout);
        window.swankyFixesTimeout = setTimeout(() => {
          try {
            enhanceAffiliateLinks();
            enhanceImages();
          } catch (e) {
            console.error('Error in mutation observer:', e);
          }
        }, 500);
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: false
      });
    }

    console.log('SwankyBoyz Dynamic Fixes: Ready');
  }

  // Initialize when script loads
  initialize();
})();
