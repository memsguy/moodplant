self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("mood-garden").then(cache => {
      return cache.addAll([
        "/",
        "/index.html",
        "/app.js",
        "/manifest.json",
        "/plant_stage_1.png",
        "/plant_stage_2.png",
        "/plant_stage_3.png",
        "/plant_stage_4.png",
        "/plant_stage_5.png",
        "/icon-192.png",
        "/icon-512.png"
      ]);
    })
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(response => response || fetch(e.request))
  );
});