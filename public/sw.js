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
self.addEventListener("fetch", event => {
  // Let the browser handle non-GET requests
  if (event.request.method !== "GET") return

  event.respondWith(
    (async () => {
      try {
        return await fetch(event.request)
      } catch (err) {
        // 🚑 Prevent infinite failures
        if (event.request.mode === "navigate") {
          return caches.match("/index.html")
        }

        return new Response("", { status: 503 })
      }
    })()
  )
})


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
