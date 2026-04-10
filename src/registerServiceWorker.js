// Register service worker only in production.
// In development we explicitly unregister old workers and clear app caches to avoid stale bundles/data.
if ('serviceWorker' in navigator) {
  window.addEventListener('load', async () => {
    if (!import.meta.env.PROD) {
      try {
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map((reg) => reg.unregister()));

        if ('caches' in window) {
          const keys = await caches.keys();
          const appKeys = keys.filter((k) => k.startsWith('gta-radio-cache-'));
          await Promise.all(appKeys.map((k) => caches.delete(k)));
        }
      } catch (err) {
        console.warn('Service worker cleanup failed in development:', err);
      }
      return;
    }

    navigator.serviceWorker.register('/sw.js').then((reg) => {
      console.log('Service worker registered:', reg.scope);
    }).catch((err) => {
      console.warn('Service worker registration failed:', err);
    });
  });
}
