/**
 * Image Optimization Utilities
 * Helper functions for lazy loading, responsive images, and WebP support
 * Usage: Import ImageOptimizer in React components or use as reference for Astro pages
 */

import React from 'react';

interface ImageOptimizationOptions {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync';
  sizes?: string;
  className?: string;
  priority?: boolean;
}

/**
 * Generate Cloudflare Image Resizing URL
 * Format: https://cdn.example.com/file/format=auto,width=400,quality=80/image.jpg
 */
export const generateResponsiveImageUrl = (
  baseUrl: string
): string => {
  if (!baseUrl) return '';
  // All images should be local SVGs. No Unsplash/Pexels/CDN images allowed.
  // For local SVGs, just return the path. No resizing needed.
  return baseUrl;
};

/**
 * React Component: Responsive Image with WebP Support and Lazy Loading
 * Usage:
 * <OptimizedImage
 *   src="/images/articles/tech-gadgets.svg"
 *   alt="Product image"
 *   width={400}
 *   height={300}
 * />
 */
export const OptimizedImage: React.FC<ImageOptimizationOptions> = ({
  src,
  alt,
  width = 400,
  height = 300,
  loading = 'lazy',
  decoding = 'async',
  sizes,
  className = '',
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = React.useState(!priority);

  // Generate responsive image URLs
  const smallUrl = generateResponsiveImageUrl(src);
  const mediumUrl = generateResponsiveImageUrl(src);
  const largeUrl = generateResponsiveImageUrl(src);

  return (
    React.createElement('picture', { className: `image-wrapper ${isLoaded ? 'loaded' : 'loading'}` },
      React.createElement('source', {
        srcSet: `
          ${smallUrl} 300w,
          ${mediumUrl} 600w,
          ${largeUrl} 1200w
        `,
        sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
        type: 'image/webp',
      }),
      React.createElement('source', {
        srcSet: `
          ${smallUrl} 300w,
          ${mediumUrl} 600w,
          ${largeUrl} 1200w
        `,
        sizes: sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw',
        type: 'image/jpeg',
      }),
      React.createElement('img', {
        src: mediumUrl,
        alt: alt,
        width: width,
        height: height,
        loading: priority ? 'eager' : loading,
        decoding: decoding,
        className: `${className} responsive-image`,
        style: {
          aspectRatio: `${width} / ${height}`,
          objectFit: 'cover',
        },
        onLoad: () => setIsLoaded(true),
      }),
      React.createElement('style', { jsx: true }, `
        .image-wrapper {
          display: block;
          width: 100%;
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: ${!isLoaded ? 'pulse 2s infinite' : 'none'};
        }

        .image-wrapper.loaded {
          background: none;
          animation: none;
        }

        .responsive-image {
          width: 100%;
          height: auto;
          display: block;
        }

        @keyframes pulse {
          0%, 100% {
            background-position: 200% 0;
          }
          50% {
            background-position: -200% 0;
          }
        }
      `)
    )
  );
};

/**
 * Get image dimensions for aspect ratio preservation
 */
export const getImageDimensions = (
  url: string
): { width: number; height: number } => {
  // Default dimensions for different image types
  const defaults: Record<string, { width: number; height: number }> = {
    'product-card': { width: 400, height: 300 }, // 4:3 aspect ratio
    'hero': { width: 1200, height: 600 }, // 2:1 aspect ratio
    'featured': { width: 800, height: 500 }, // 8:5 aspect ratio
    'thumbnail': { width: 200, height: 200 }, // 1:1 aspect ratio
    'banner': { width: 1200, height: 300 }, // 4:1 aspect ratio
  };

  // Detect image type from URL or use default
  for (const [type, dims] of Object.entries(defaults)) {
    if (url.includes(type)) {
      return dims;
    }
  }

  return { width: 400, height: 300 }; // Default fallback
};

/**
 * Batch optimize multiple images
 * Usage: for building page-level image optimization strategies
 */
export const optimizeImageBatch = (
  images: ImageOptimizationOptions[]
): ImageOptimizationOptions[] => {
  return images.map((img, index) => ({
    ...img,
    priority: index === 0, // First image gets eager loading
    loading: index === 0 ? 'eager' : 'lazy',
  }));
};

/**
 * Calculate file size savings from WebP conversion
 * Typical savings: 25-35% smaller than JPEG
 */
export const estimateFileSizeSavings = (jpegSizeKb: number): number => {
  const webpReduction = 0.28; // 28% average reduction
  return jpegSizeKb * webpReduction;
};

/**
 * Astro Component Example for use in Astro pages
 * Save as a .astro file and use in other Astro pages
 */
export const ASTRO_OPTIMIZED_IMAGE_TEMPLATE = `
---
// OptimizedImage.astro
interface Props {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  loading?: 'lazy' | 'eager';
  sizes?: string;
  className?: string;
}

const {
  src,
  alt,
  width = 400,
  height = 300,
  loading = 'lazy',
  sizes,
  className = '',
} = Astro.props;

// Generate responsive URLs
const smallUrl = \`\${src.includes('?') ? src + '&w=300' : src + '?w=300'}\`;
const mediumUrl = \`\${src.includes('?') ? src + '&w=600' : src + '?w=600'}\`;
const largeUrl = \`\${src.includes('?') ? src + '&w=1200' : src + '?w=1200'}\`;
---

<picture>
  <!-- WebP format -->
  <source
    srcset={\`\${smallUrl} 300w, \${mediumUrl} 600w, \${largeUrl} 1200w\`}
    sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
    type="image/webp"
  />
  
  <!-- JPEG fallback -->
  <source
    srcset={\`\${smallUrl} 300w, \${mediumUrl} 600w, \${largeUrl} 1200w\`}
    sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'}
    type="image/jpeg"
  />
  
  <!-- Fallback -->
  <img
    src={mediumUrl}
    alt={alt}
    width={width}
    height={height}
    loading={loading}
    class={className}
    style={{
      aspectRatio: \`\${width} / \${height}\`,
      objectFit: 'cover',
      width: '100%',
      height: 'auto',
    }}
  />
</picture>
`;

/**
 * Performance metrics reporting
 * Usage: Track image optimization impact on Core Web Vitals
 */
export const reportImageMetrics = () => {
  if (typeof window === 'undefined') return;

  // Use Web Vitals API
  if ('PerformanceObserver' in window) {
    // Largest Contentful Paint (LCP) - measure image performance
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const lcpEntry = entry as PerformanceEntry & { element?: Element; renderTime?: number };
          if (lcpEntry.element?.tagName === 'IMG') {
            console.log('LCP Image:', {
              src: (lcpEntry.element as HTMLImageElement).src,
              loadTime: entry.startTime,
              renderTime: lcpEntry.renderTime,
            });
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      console.warn('LCP Observer not supported');
    }

    // Layout Shift caused by images
    try {
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const clsEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number; sources?: unknown[] };
          if (!clsEntry.hadRecentInput) {
            console.log('Image CLS:', {
              value: clsEntry.value,
              sources: clsEntry.sources,
            });
          }
        }
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (e) {
      console.warn('CLS Observer not supported');
    }
  }
};

export default {
  generateResponsiveImageUrl,
  OptimizedImage,
  getImageDimensions,
  optimizeImageBatch,
  estimateFileSizeSavings,
  reportImageMetrics,
};
