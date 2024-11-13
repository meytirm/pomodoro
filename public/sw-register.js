if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js').then((registration) => {
    registration.onupdatefound = () => {
      const newWorker = registration.installing;
      newWorker.onstatechange = () => {
        console.log(newWorker.state, navigator.serviceWorker.controller);
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // Show update message to the user
          if (confirm("A new version is available. Do you want to update?")) {
            newWorker.postMessage({ type: 'SKIP_WAITING' });
          }
        }
      };
    };
  });

  // Reload page when new service worker takes control
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    window.location.reload();
  });
}
