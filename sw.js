const C='water-v2',SHELL=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
const put=(rq,r)=>{if(r&&(r.ok||r.type==='opaque')){const cp=r.clone();caches.open(C).then(c=>c.put(rq,cp))}return r};
self.addEventListener('fetch',e=>{const rq=e.request;if(rq.method!=='GET')return;
 if(new URL(rq.url).origin===location.origin)e.respondWith(fetch(rq).then(r=>put(rq,r)).catch(()=>caches.match(rq).then(h=>h||caches.match('./index.html'))));
 else e.respondWith(caches.match(rq).then(h=>h||fetch(rq).then(r=>put(rq,r))))});
