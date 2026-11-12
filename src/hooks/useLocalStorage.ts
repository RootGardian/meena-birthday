import { useState, useEffect } from 'react';

/**
 * Hook personnalisé pour synchroniser un état React avec le LocalStorage
 */
export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erreur lors de la lecture de localStorage pour "${key}":`, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.warn(`Erreur lors de l'écriture dans localStorage pour "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

