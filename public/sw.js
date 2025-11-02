// SwankyBoyz Service Worker
// Provides offline functionality and caching for better performance

const CACHE_NAME = 'swankyboyz-v2';
const urlsToCache = [
  '/',
  '/categories',
  '/articles',
  '/assets/swanky-fixes.js',
  '/assets/swanky-optimizer.js',
  '/favicon.svg',
  '/logo.svg',
  '/manifest.json'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch Event
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Don't cache 404 responses or errors
          if (!response || response.status !== 200) {
            return response;
          }

          // Don't cache old JavaScript chunk files (hash-based filenames from previous builds)
          const url = new URL(event.request.url);
          if (url.pathname.match(/\/_astro\/.*-[A-Za-z0-9]{8,}\.(js|css)$/)) {
            // Only cache current build's chunk files, don't cache if response is 404
            if (response.status === 404) {
              return response;
            }
          }

          // Only cache responses with basic type
          if (response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
        }).catch((error) => {
          // Handle network errors gracefully
          console.error('Fetch failed:', error);
          // Return a simple error response instead of throwing
          return new Response('Network error occurred', {
            status: 408,
            statusText: 'Network error'
          });
        });
      })
  );
});

// Update Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});