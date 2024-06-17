// Funktioniert aber lädt leider keine Bilder aus irgendeinem Grund

(self as ServiceWorkerGlobalScope).addEventListener('install', (event: ExtendableEvent) => {
  console.log('Service worker installed');
  event.waitUntil(
    caches.open('my-cache').then((cache) => {
      return cache.addAll([
        '/index.html',
        '/styles/main.css',
        '/scripts/main.js'
      ]);
    })
  );
});

(self as ServiceWorkerGlobalScope).addEventListener('activate', (event: ExtendableEvent) => {
  console.log('Service worker activated');
});

(self as ServiceWorkerGlobalScope).addEventListener('fetch', (event: FetchEvent) => {
  console.log('Fetch intercepted for:', event.request.url);

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(event.request)
          .then((response) => {
            // Optional: Cache new responses
            return response;
          })
          .catch(() => {
            // Optional: Handle fetch errors
            return new Response('Offline mode');
          });
      })
  );
});
