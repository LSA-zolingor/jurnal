/* Старый адрес склада: снимает прежний офлайн-кэш и отправляет на новый адрес /sklad/. */
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('sklad-')).map(k => caches.delete(k)));
    await self.registration.unregister();
    const list = await self.clients.matchAll({type: 'window'});
    list.forEach(c => c.navigate('/sklad/'));
  })());
});
