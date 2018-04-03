/* https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker */

(() => {
	const staticFilesToCache = [
		'index.html',
		'offline.html',
		'main.css',
		'main.js',
		'vendors.js',
		'service-worker.js'
	];
	
	/* Will use cache, falling back to network. */
	const staticCaches = 'cake-app-cache';

	/* Will use cache then network. */
	const apiCaches = 'cake-api-cache';

	/* Attempting to install service worker and cache static assets */
	self.addEventListener('install', event => {
		event.waitUntil(
			caches.open(staticCaches)
				.then(cache => cache.addAll(staticFilesToCache))
				.catch(error => console.error('Service worker failed to install and cache static assets: ', error))
			);
	});
	
	/* Activating new service worker */
	self.addEventListener('activate', event => {
		const cacheWhitelist = [
			staticCaches, 
			apiCaches
		];

		event.waitUntil(
			caches.keys()
				.then(cacheNames => {
					return Promise.all(cacheNames.map(cacheName => {
						if (cacheWhitelist.indexOf(cacheName) === -1) {
							return caches.delete(cacheName);
						}
					}));
				})
				.catch(error => console.error('## Service Worker ## Failed to activate new service worker: ', error))
			);
	});

	/* If found in the cache then return from cache else from network */
	self.addEventListener('fetch', event => {
		/* Fetch event for event.request.url */
		event.respondWith(
			caches.match(event.request)
				.then(response => {
					if (response) {
						/* Found event.request.url in cache */
						return response;
					}
	
					/* Not in cache... Making network request for event.request.url */
					return fetch(event.request)
						.then(response => {
							if (response.status === 404) {
								return caches.match('offline.html');
							}
							
							return response;
						})
						.catch(error => console.error('## Service Worker ## Failed to fetch: ', event.request.url, error));
				})
				.catch(error => {
					console.error('## Service Worker ## Failed to match caches: ', error);
					
					return caches.match('offline.html');
				})
			);
	});
})();
