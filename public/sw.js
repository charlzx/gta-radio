// Minimal service worker: simple cache-first strategy for static assets
const CACHE_NAME = 'gta-radio-cache-v2';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/site.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(
      keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
    ))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  if (!request.url.startsWith(self.location.origin)) return;

  // Cache-first for same-origin requests with safe network fallback.
  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;

      return fetch(request)
        .then((response) => {
          if (response && response.ok) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone)).catch(() => {
              // Ignore background cache errors.
            });
          }
          return response;
        })
        .catch(() => new Response('', { status: 503, statusText: 'Service Unavailable' }));
    })
  );
});
