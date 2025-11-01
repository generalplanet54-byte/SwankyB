// SwankyBoyz Service Worker
// Provides offline functionality and caching for better performance

const CACHE_NAME = 'swankyboyz-v1';
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
  // Skip caching for Google Analytics requests
  // GA4 tracking requests return 204 No Content, which is expected behavior
  // 204 means the data was successfully received by Google's servers
  const url = new URL(event.request.url);
  if (url.hostname === 'www.google-analytics.com' || 
      url.hostname === 'www.googletagmanager.com') {
    event.respondWith(fetch(event.request));
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response;
        }

        return fetch(event.request).then((response) => {
          // Check if we received a valid response for caching
          // Note: We only cache responses with status 200 for standard resources
          // Analytics beacons (204) and other non-200 responses are intentionally not cached
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          // Clone the response
          const responseToCache = response.clone();

          caches.open(CACHE_NAME)
            .then((cache) => {
              cache.put(event.request, responseToCache);
            });

          return response;
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