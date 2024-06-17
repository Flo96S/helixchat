// ExtendableEvent interface for handling service worker events
interface ExtendableEvent extends Event {
  waitUntil(fn: Promise<any>): void;
}

// ServiceWorkerGlobalScope interface for self in service worker
interface ServiceWorkerGlobalScope extends WorkerGlobalScope {
  caches: CacheStorage;
  addEventListener<K extends keyof ServiceWorkerEventMap>(
    type: K,
    listener: (this: ServiceWorkerGlobalScope, ev: ServiceWorkerEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
}

// ServiceWorkerEventMap for service worker events
interface ServiceWorkerEventMap {
  install: ExtendableEvent;
  activate: ExtendableEvent;
  fetch: FetchEvent;
}

// FetchEvent interface for fetch event handling
interface FetchEvent extends Event {
  request: Request;
  respondWith(response: Response | Promise<Response>): void;
}

// Declare self to be the ServiceWorkerGlobalScope
declare var self: ServiceWorkerGlobalScope;
