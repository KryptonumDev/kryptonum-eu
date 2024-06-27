import { MemoryCache, type ICache } from './cache';

class IsrService implements ICache<Response> {
  constructor(private cache: ICache<Response>) { }

  get(key: string): Response | undefined {
    console.log(`[isr] get ${key}`);
    const result = this.cache.get(key);
    if (!result) return undefined;
    return result.clone();
  }

  set(key: string, value: Response, ttl: number): void {
    console.log(`[isr] set ${key}`);
    this.cache.set(key, value.clone(), ttl);
  }

  del(key: string): void {
    console.log(`[isr] del ${key}`);
    this.cache.del(key);
  }
}

const cache = new MemoryCache<Response>();
export const isr = new IsrService(cache);
export function invalidate(key: string) {
  isr.del(key);
}
