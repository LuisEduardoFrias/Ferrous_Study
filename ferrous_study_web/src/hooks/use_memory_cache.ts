import { useStore } from '../state_warehouse/index'

export type CacheEntry<T> = {
  data: T;
  expiry: number
}

export function useMemoryCache(defaultTtlSeconds: number = 180000) {
  const cache = useStore((state) => state.cache)
  const on_miss = useStore((state) => state.on_miss)
  const on_clear_cache = useStore((state) => state.on_clear_cache)
  const defaultTtlMs = defaultTtlSeconds * 1000;

  async function get<T>(key: string, fetchFunction: () => Promise<T>, ttlSeconds?: number): Promise<T | undefined> {
    const entry = cache[key];

    if (entry && entry.expiry > Date.now()) {
      //Cache hit para la clave: ${key}
      return entry.data as T;
    }

    //Cache miss para la clave: ${key}, consultando la fuente...
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

    //Datos cacheados para la clave: ${key}, expira en ${new Date(expiry).toLocaleTimeString()}
  }

  function clear(key: string): void {
    on_clear_cache(key);
    //Caché limpiada para la clave: ${key}
  }

  function clearAll(): void {
    on_clear_cache();
    //Toda la caché ha sido limpiada.
  }

  return { get, set, clear, clearAll };
}