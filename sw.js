const CACHE_NAME = 'asl-app-v1';
const urlsToCache = ['./', './index.html', './style.css', './script.js', './manifest.json'];
self.addEventListener('install', (event) => {
    event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache)));
});
self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        return response || fetch(event.request).then((fetchResponse) => {
            if (!event.request.url.includes('giphy.com')) {
                return caches.open(CACHE_NAME).then((cache) => {
                    cache.put(event.request, fetchResponse.clone());
                    return fetchResponse;
                });
            }
            return fetchResponse;
        });
    }));
});