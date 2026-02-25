const CACHE_VERSION = "bell-taxi-v2";
const CACHE_NAME = `bell-taxi-cache-${CACHE_VERSION}`;

const ASSETS_TO_CACHE = [
  "/",
  "/index.html",
  "/fare.html",
  "/confirm.html",
  "/manifest.json"
];

/* INSTALL */
self.addEventListener("install", event => {
  console.log("Service Worker Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
  self.skipWaiting();
});

/* ACTIVATE */
self.addEventListener("activate", event => {
  console.log("Service Worker Activated");
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
  self.clients.claim();
});

/* FETCH */
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request)
          .then(fetchResponse => {
            return fetchResponse;
          })
          .catch(() => {
            if (event.request.mode === "navigate") {
              return caches.match("/index.html");
            }
          });
      })
  );
});