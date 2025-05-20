import { useEffect, useRef } from 'react';

type StoredValueWithExpiry<T> = {
  value: T;
  expiry: number | null;
};

export function useLocalStorageMemo(defaultTtlSeconds?: number) {
  const timeoutId = useRef<number | null>(null);

  const saveValue = <T>(key: string, value: T, ttlSeconds?: number) => {
    const finalTtlSeconds = ttlSeconds !== undefined ? ttlSeconds : defaultTtlSeconds;

    if (!finalTtlSeconds) {
      throw new Error("useLocalStorageMemo: Especifique un tiempo de expiración.");
    }

    const expiry: number = Date.now() + finalTtlSeconds * 1000;
    const storedData: StoredValueWithExpiry<T> = { value, expiry };
    localStorage.setItem(key, JSON.stringify(storedData));

    timeoutId.current = setTimeout(() => {
      localStorage.removeItem(key);
    }, expiry - Date.now());
  };

  const getValue = <T>(key: string): T | null => {
    const stored = localStorage.getItem(key);

    if (stored) {
      try {
        const parsed: StoredValueWithExpiry<T> = JSON.parse(stored);

        if (parsed?.expiry && parsed?.expiry < Date.now()) {
          localStorage.removeItem(key);
          return null;
        }

        return parsed.value;
      } catch (error) {
        console.error('Error parsing stored value:', error);
        localStorage.removeItem(key);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    // return () => {
    //       if (timeoutId.current) {
    //         clearTimeout(timeoutId.current);
    //       }
    //     };
  }, []);

  return { getValue, saveValue };
}
