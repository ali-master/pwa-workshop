/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
console.log("In SW.js");

workbox.core.skipWaiting();
workbox.core.clientsClaim();

self.addEventListener("install", event => {
	const asyncInstall = new Promise(resolve => {
		console.log("waiting to resolve...");
		setTimeout(resolve, 5000);
	});

	event.waitUntil(asyncInstall);
});
self.addEventListener("activate", () => {
	console.log("workbox activated successfully...");
});

workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

workbox.routing.registerRoute(new RegExp("http://.*:4567.*.json"), new workbox.strategies.NetworkFirst());
// Caching all external files by a Regex
workbox.routing.registerRoute(
	new RegExp("https:.*min.(css|js)"),
	new workbox.strategies.StaleWhileRevalidate({
		cacheName: "cache-cdn",
	}),
);

self.addEventListener("fetch", event => {
	if (event.request.method === "POST" || event.request.method === "DELETE") {
		event.respondWith(
			fetch(event.request).catch(error => {
				return new Response(JSON.stringify({ error: "This action disabled while the app is offline" }), {
					header: {
						contentType: "application/json",
					},
				});
			}),
		);
	}
});
