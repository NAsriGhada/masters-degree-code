export class EventBus {
  constructor() {
    this.handlers = new Map(); // eventName -> Set(fn)
  }

  on(eventName, handler) {
    if (!this.handlers.has(eventName)) this.handlers.set(eventName, new Set());
    this.handlers.get(eventName).add(handler);
    return () => this.off(eventName, handler);
  }

  off(eventName, handler) {
    this.handlers.get(eventName)?.delete(handler);
  }

  emit(eventName, payload) {
    for (const handler of this.handlers.get(eventName) ?? []) {
      handler(payload);
    }
  }
}
