const CACHE_NAME = 'my-app-cache-v2';
const MANIFEST_URL = '/asset-manifest.json';

// Install event: fetch the manifest and cache listed assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    fetch(MANIFEST_URL)
      .then((response) => response.json())
      .then((assets) => {
        const urlsToCache = Object.values(assets).concat([
          '/', // Your root page
        ]);
        return caches.open(CACHE_NAME).then((cache) => {
          return cache.addAll(urlsToCache);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event: clear old caches if needed
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache); // Remove old caches
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all clients immediately
});

// Fetch event: serve from cache, fallback to network, cache new versions
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return (
        cachedResponse ||
        fetch(event.request)
          .then((response) => {
            if (response && response.status === 200 && response.type === 'basic') {
              const responseClone = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
            }
            return response;
          })
      );
    })
  );
});

// Listen for `message` event to prompt for new version install
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});