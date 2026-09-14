// DevsTools Service Worker for static asset performance caching.
// HTML/tool navigations stay network-only so monetized page views always load online.
const CACHE_NAME = 'devstools-cache-v3';

const PRECACHE_ASSETS = [
  '/favicon.ico',
  '/favicon.png',
  '/icon.svg',
  '/apple-icon.png',
  '/site.webmanifest',
];

// Install Event - Pre-cache core shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS).catch((err) => {
        console.warn('Pre-cache partial failure', err);
      });
    }),
  );
  self.skipWaiting();
});

// Activate Event - Clean up outdated caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        }),
      );
    }).then(() => self.clients.claim()),
  );
});

// Fetch Event - Smart caching strategy
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests and external analytics/ads scripts
  if (request.method !== 'GET') return;
  if (
    url.hostname.includes('google') ||
    url.hostname.includes('doubleclick') ||
    url.hostname.includes('googlesyndication') ||
    url.hostname.includes('analytics')
  ) {
    return;
  }

  // Static Assets (_next/static, images, fonts, icons) -> Cache-first
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.endsWith('.png') ||
    url.pathname.endsWith('.jpg') ||
    url.pathname.endsWith('.svg') ||
    url.pathname.endsWith('.ico') ||
    url.pathname.endsWith('.woff2') ||
    url.pathname.endsWith('.css') ||
    url.pathname.endsWith('.js')
  ) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(request, responseClone);
              });
            }
            return networkResponse;
          })
          .catch(() => cachedResponse);
      }),
    );
    return;
  }

  // HTML pages and navigations stay network-only. This preserves live ads,
  // analytics consent behavior, and current content on every monetized page view.
  if (request.mode === 'navigate' || request.headers.get('accept')?.includes('text/html')) {
    return;
  }
});
