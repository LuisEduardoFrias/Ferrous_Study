
export function saveValue<T>(key: string, value: T, ttlMs?: number) {
   if (!key || !value)
      throw new Error('No agregaste elnprimer parametro "key" a la funcion "setValue" de "local_storage".');


   let expiry = null;
   if (ttlMs)
      expiry = Date.now() + ttlMs;

   localStorage.setItem(key, JSON.stringify({ data: value, expiry }));
}

export function getValue<T>(key: string): T | null {
   const stored = localStorage.getItem(key);

   if (!stored) {
      return null;
   }

   try {
      const parsed = JSON.parse(stored);

      if (parsed.expiry && parsed.expiry < Date.now()) {
         localStorage.removeItem(key);
         return null;
      }

      return parsed.data;
   } catch (error) {
      console.error('Error parsing stored value:', error);
      localStorage.removeItem(key);
      return null;
   }
}

export function removeValue(key: string) {
         localStorage.removeItem(key);
}