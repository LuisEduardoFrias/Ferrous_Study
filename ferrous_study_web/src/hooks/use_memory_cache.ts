import { useStore } from '../state_warehouse/index';
import { useEffect } from 'react';

export type CacheEntry<T> = {
  data: T;
  expiry: number;
};

export function useMemoryCache(defaultTtlSeconds: number = 180000, cleanupIntervalSeconds: number = 60) {
  const cache = useStore((state) => state.cache);
  const on_miss = useStore((state) => state.on_miss);
  const on_clear_cache = useStore((state) => state.on_clear_cache);
  const defaultTtlMs = defaultTtlSeconds * 1000;
  const cleanupIntervalMs = cleanupIntervalSeconds * 1000;

  const cleanupCache = () => {
    const now = Date.now();
    Object.keys(cache).forEach((key) => {
      if (cache[key] && cache[key].expiry <= now) {
        on_clear_cache(key);
      }
    });
  };

  useEffect(() => {
    const intervalId = setInterval(cleanupCache, cleanupIntervalMs);

    return () => clearInterval(intervalId);
  }, [cleanupCache, cleanupIntervalMs, on_clear_cache, cache]);

  async function get<T>(key: string, fetchFunction: () => Promise<T>, ttlSeconds?: number): Promise<T | undefined> {
    const entry = cache[key];

    if (entry && entry.expiry > Date.now()) {
      return entry.data as T;
    }

    try {
      const data = await fetchFunction();
      const ttl = ttlSeconds !== undefined ? ttlSeconds * 1000 : defaultTtlMs;
      set(key, data, ttl);
      return data as T;
    } catch (error) {
      console.error(`Error al obtener datos para la clave ${key}:`, error);
      return undefined;
    }
  }

  function set<T>(key: string, data: T, ttlMs?: number): void {
    const expiry = Date.now() + (ttlMs !== undefined ? ttlMs : defaultTtlMs);
    on_miss(key, { data, expiry });
  }

  function clear(key: string): void {
    on_clear_cache(key);
  }

  function clearAll(): void {
    on_clear_cache();
  }

  return { get, set, clear, clearAll };
}
