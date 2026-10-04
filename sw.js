/* 离线缓存：外壳 + 索引常驻，缩略图/动图滚动缓存并限量，避免吃掉手机存储 */
const SHELL = 'gym-shell-v1';
const MEDIA = 'gym-media-v1';
const MEDIA_MAX = 260;
const SHELL_FILES = ['./', 'index.html', 'manifest.webmanifest', 'data/index.json',
                     'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon.svg'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(SHELL).then((c) => c.addAll(SHELL_FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((ks) => Promise.all(ks.filter((k) => k !== SHELL && k !== MEDIA).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

async function trim(cache) {
  const keys = await cache.keys();
  if (keys.length <= MEDIA_MAX) return;
  for (const k of keys.slice(0, keys.length - MEDIA_MAX)) await cache.delete(k);
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  const p = url.pathname;

  // 页面：先网络后缓存（保证能拿到新版），离线时回落到缓存
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then((res) => {
        const copy = res.clone();
        caches.open(SHELL).then((c) => c.put('index.html', copy));
        return res;
      }).catch(() => caches.match('index.html').then((r) => r || caches.match('./')))
    );
    return;
  }

  // 教学文字：陈旧也能用，优先给缓存再后台更新
  if (p.includes('/data/text.')) {
    e.respondWith(
      caches.open(SHELL).then(async (c) => {
        const hit = await c.match(req);
        const net = fetch(req).then((res) => { if (res.ok) c.put(req, res.clone()); return res; }).catch(() => null);
        return hit || (await net) || Response.error();
      })
    );
    return;
  }

  // 图片 / 动图 / 图标：缓存优先，限量
  if (/\/(images|videos|icons)\//.test(p)) {
    e.respondWith(
      caches.open(MEDIA).then(async (c) => {
        const hit = await c.match(req);
        if (hit) return hit;
        try {
          const res = await fetch(req);
          if (res.ok) { await c.put(req, res.clone()); trim(c); }
          return res;
        } catch (err) {
          return hit || Response.error();
        }
      })
    );
  }
});
