
export function saveValue<T>(key: string, value: T) {
  if(!key || !value)
  throw new Error('No agregaste elnprimer parametro "key" a la funcion "setValue" de "local_storage".');
  localStorage.setItem(key, JSON.stringify(value));
}

export function getValue<T>(key: string): T | null {
  const stored = localStorage.getItem(key);

  if (!stored) {
    return null;
  }

  try {
    const parsed: T = JSON.parse(stored);
    return parsed.value;
  } catch (error) {
    console.error('Error parsing stored value:', error);
    localStorage.removeItem(key);
    return null;
  }
}