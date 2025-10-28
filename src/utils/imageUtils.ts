/**
 * Image Utility Functions
 * Handles image loading, error handling, and fallbacks
 */

export const ImageUtils = {
  /**
   * Get the appropriate fallback image based on context
   */
  getFallbackImage: (context: 'article' | 'product' | 'general' = 'general'): string => {
    switch (context) {
      case 'article':
        return '/images/articles/lifestyle-luxury.svg';
      case 'product':
        return '/images/products/grooming/electric-shaver.svg';
      default:
        return '/assets/product-placeholder.png';
    }
  },

  /**
   * Handle image error with appropriate fallback
   */
  handleImageError: (
    event: React.SyntheticEvent<HTMLImageElement>,
    context: 'article' | 'product' | 'general' = 'general'
  ): void => {
    const target = event.target as HTMLImageElement;
    const fallback = ImageUtils.getFallbackImage(context);
    
    // Prevent infinite loop if fallback also fails
    if (target.src !== fallback) {
      target.src = fallback;
      target.alt = 'Image placeholder';
    }
  },

  /**
   * Preload images for better performance
   */
  preloadImages: (imageUrls: string[]): Promise<void[]> => {
    return Promise.all(
      imageUrls.map((url) => {
        return new Promise<void>((resolve, reject) => {
          const img = new Image();
          img.onload = () => resolve();
          img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
          img.src = url;
        });
      })
    );
  },

  /**
   * Check if image URL is external
   */
  isExternalImage: (url: string): boolean => {
    return url.startsWith('http://') || url.startsWith('https://');
  },

  /**
   * Normalize image path
   */
  normalizePath: (path: string): string => {
    // Ensure path starts with / for local images
    if (!ImageUtils.isExternalImage(path) && !path.startsWith('/')) {
      return `/${path}`;
    }
    return path;
  },

  /**
   * Get optimized image path (for future CDN integration)
   */
  getOptimizedPath: (path: string, width?: number, quality?: number): string => {
    // For now, return the original path
    // In the future, this can be extended to add query parameters or use a CDN
    return ImageUtils.normalizePath(path);
  }
};

export default ImageUtils;
