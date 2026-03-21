const CACHE_STATIC = "njr10-static-v2";
const CACHE_PAGES = "njr10-pages-v2";
const CACHE_IMAGES = "njr10-images-v2";
const STATIC_ASSETS = [
  "./",
  "./index.html",
  "./404.html",
  "./offline.html",
  "./artigo.html",
  "./styles.css",
  "./artigo.css",
  "./script.js",
  "./manifest.webmanifest",
  "./imgs/fundo_index1.jpeg",
  "./imgs/fundo_artigo1.jpeg",
  "./imgs"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_STATIC).then((cache) => cache.addAll(STATIC_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys
          .filter((k) => ![CACHE_STATIC, CACHE_PAGES, CACHE_IMAGES].includes(k))
          .map((k) => caches.delete(k))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const isPageRequest = event.request.mode === "navigate";
  const dest = event.request.destination;

  // HTML: network-first with offline fallback
  if (isPageRequest) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_PAGES).then((cache) => cache.put(event.request, copy));
          return response;
        })
        .catch(async () => {
          const cached = await caches.match(event.request);
          return cached || caches.match("./offline.html");
        })
    );
    return;
  }

  // Images: stale-while-revalidate
  if (dest === "image") {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        const fetchPromise = fetch(event.request)
          .then((response) => {
            if (response && response.status === 200) {
              const copy = response.clone();
              caches.open(CACHE_IMAGES).then((cache) => cache.put(event.request, copy));
            }
            return response;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
    return;
  }

  // CSS/JS/fonts: cache-first then network
  if (dest === "style" || dest === "script" || dest === "font") {
    event.respondWith(
      caches.match(event.request).then((cached) => {
        if (cached) return cached;
        return fetch(event.request).then((response) => {
          const copy = response.clone();
          caches.open(CACHE_STATIC).then((cache) => cache.put(event.request, copy));
          return response;
        });
      })
    );
    return;
  }

  // default fallback
  event.respondWith(
    fetch(event.request).catch(() => caches.match("./index.html"))
  );
});
