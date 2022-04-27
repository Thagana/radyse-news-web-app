console.log("Service Worker Loaded...");
self.addEventListener("push", (event) => {
  const data = event.data.json();
  const options = {
    image: data.image,
    body: data.description,
    icon: data.icon,
    title: data.title,
    requireInteraction: true,
  };
  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", function (event) {
  event.notification.close();
  event.waitUntil(
    clients
      .matchAll({
        type: "window",
      })
      .then(function (clientList) {
        for (var i = 0; i < clientList.length; i++) {
          var client = clientList[i];
          if (client.url == self.registration.scope && "focus" in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow("/");
        }
      })
  );
});
