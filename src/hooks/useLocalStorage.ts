import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void] {
  // init state looking for the value in localStorage or using the initial value
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading "${key}" from localStorage:`, error);
      return initialValue;
    }
  });

  // update localStorage when state changes
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Error saving key "${key}" to localStorage:`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage example:
// const [sidebarOpen, setSidebarOpen] = useLocalStorage('sidebar_state', true);
// const toggleSidebar = () => setSidebarOpen(prev => !prev);