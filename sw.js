const CACHE='tabkhat-v13';
const CORE=['./','./index.html','./styles.css?v=13','./recipes.js?v=13','./app.js?v=13','./manifest.webmanifest','./icon.svg','./assets/chef-mo-logo-v2.webp'];
const base=new URL('./',self.location.href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('tabkhat-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(e.request.method!=='GET'||u.origin!==base.origin||!u.pathname.startsWith(base.pathname))return;
if(e.request.mode==='navigate'){e.respondWith(fetch(e.request).then(async r=>{if(r.ok){const c=await caches.open(CACHE);await c.put(new URL('index.html',base),r.clone())}return r}).catch(()=>caches.match(new URL('index.html',base))));return}
e.respondWith(caches.match(e.request).then(hit=>hit||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();e.waitUntil(caches.open(CACHE).then(c=>c.put(e.request,copy)))}return r})));});
self.addEventListener('message',e=>{if(e.data?.type!=='SAVE_RECIPE')return;e.waitUntil((async()=>{try{const urls=[...CORE];if(e.data.image){const image=new URL(e.data.image,base);if(image.origin!==base.origin||!image.pathname.startsWith(base.pathname+'assets/recipes/'))throw Error('invalid path');urls.push(image.href)}const c=await caches.open(CACHE);for(const path of urls){const u=new URL(path,base);if(!await c.match(u)){const r=await fetch(u);if(!r.ok)throw Error('fetch failed');await c.put(u,r)}}e.ports[0]?.postMessage({ok:true})}catch{e.ports[0]?.postMessage({ok:false})}})())});
