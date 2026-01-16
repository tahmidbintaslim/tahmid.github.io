/**
 * Service Worker for offline support and caching strategies
 * Install this in public/sw.js and register in client
 */

declare let self: ServiceWorkerGlobalScope;

const CACHE_VERSION = 'v1';
const CACHE_NAMES = {
  pages: `${CACHE_VERSION}-pages`,
  images: `${CACHE_VERSION}-images`,
  assets: `${CACHE_VERSION}-assets`,
};

const ALWAYS_CACHE = [
  '/',
  '/index.html',
  '/offline.html',
];

const CACHE_STRATEGIES = {
  pages: 'network-first',
  images: 'cache-first',
  assets: 'stale-while-revalidate',
};

// Install event
self.addEventListener('install', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAMES.pages);
      await cache.addAll(ALWAYS_CACHE);
      await self.skipWaiting();
    })()
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event: ExtendableEvent) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames
          .filter(name => !Object.values(CACHE_NAMES).includes(name))
          .map(name => caches.delete(name))
      );
      await self.clients.claim();
    })()
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event: FetchEvent) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip external requests
  if (url.origin !== self.location.origin) {
    return;
  }

  // Determine cache strategy
  let cacheName = CACHE_NAMES.assets;
  let strategy = 'stale-while-revalidate';

  if (request.destination === 'document' || url.pathname === '/') {
    cacheName = CACHE_NAMES.pages;
    strategy = 'network-first';
  } else if (request.destination === 'image') {
    cacheName = CACHE_NAMES.images;
    strategy = 'cache-first';
  }

  // Implement caching strategy
  if (strategy === 'network-first') {
    event.respondWith(networkFirst(request, cacheName));
  } else if (strategy === 'cache-first') {
    event.respondWith(cacheFirst(request, cacheName));
  } else {
    event.respondWith(staleWhileRevalidate(request, cacheName));
  }
});

async function networkFirst(request: Request, cacheName: string): Promise<Response> {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline - page not available', { status: 503 });
  }
}

async function cacheFirst(request: Request, cacheName: string): Promise<Response> {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline - resource not available', { status: 503 });
  }
}

async function staleWhileRevalidate(request: Request, cacheName: string): Promise<Response> {
  const cached = await caches.match(request);

  const fetchPromise = fetch(request).then(response => {
    if (response.ok) {
      const cache = caches.open(cacheName);
      cache.then(c => c.put(request, response.clone()));
    }
    return response;
  });

  return cached || fetchPromise;
}
