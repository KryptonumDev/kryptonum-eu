export interface ICache<P> {
  get(key: string): P | undefined;
  set(key: string, value: P, ttl: number): void;
  del(key: string): void;
}

type CacheEntry<P> = {
  value: P;
  expiration: number;
};

export class MemoryCache<P> implements ICache<P> {
  private cache: Map<string, CacheEntry<P>> = new Map();

  constructor() {
    setInterval(() => this.cleanUp(), 60 * 1000);
  }

  get(key: string): P | undefined {
    const entry = this.cache.get(key);
    if (!entry) return undefined;
    if (entry.expiration < Date.now()) return undefined;
    return entry.value;
  }

  set(key: string, value: P, ttl: number): void {
    this.cache.set(key, {
      value,
      expiration: Date.now() + ttl * 1000,
    });
  }

  del(key: string): void {
    this.cache.delete(key);
  }

  private cleanUp() {
    const now = Date.now();
    for (const [key, entry] of this.cache.entries()) {
      if (entry.expiration < now) {
        this.cache.delete(key);
      }
    }
  }
}
