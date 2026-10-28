/* Nyheder service worker – minimal: no push, no notifications, no caching. */
self.addEventListener('install', function () { self.skipWaiting(); });
self.addEventListener('activate', function (e) {
  e.waitUntil(Promise.all([
    self.clients.claim(),
    /* Notifications are discontinued: drop any old push subscription and clear any app badge. */
    self.registration.pushManager ? self.registration.pushManager.getSubscription()
      .then(function (s) { return s && s.unsubscribe(); }).catch(function () {}) : null,
    Promise.resolve().then(function () {
      if (self.navigator && 'clearAppBadge' in self.navigator) return self.navigator.clearAppBadge();
    }).catch(function () {})
  ]));
});
