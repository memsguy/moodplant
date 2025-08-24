const CACHE_NAME = "mood-garden-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/plant_stage_1.png",
  "/plant_stage_2.png",
  "/plant_stage_3.png",
  "/plant_stage_4.png",
  "/plant_stage_5.png",
  "/icon-192.png",
  "/icon-512.png"
];

// 安裝 Service Worker 並快取必要檔案
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

// 啟用新版本並清理舊快取
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) return caches.delete(key);
        })
      )
    )
  );
});

// 攔截 fetch，先讀快取，沒有再去抓網路
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
