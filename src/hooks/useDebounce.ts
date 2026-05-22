import { useEffect, useState } from 'react';

export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
}

// Usage example:
/*
import { useDebounce } from '../hooks/useDebounce';
...
const [term, setTerm] = useState('');
const termDebounced = useDebounce(term, 500);
...
useEffect(() => {
  if (termDebounced.trim().length >= 2) {
    fetchGitHubAPI(termDebounced, 'Debounce Effect');
  } else if (termDebounced.trim().length === 0) {
    setRepositories([]);
  }
}, [termDebounced]);
...
return (
  <input
    type="text"
    placeholder="Ex: tailwind, typescript, laravel..."
    className="flex-grow w-full bg-neutral-950 border border-neutral-700 rounded-lg px-4 py-2 text-neutral-100 focus:outline-none focus:border-sky-500 transition-colors"
    {...register('debounceField', { 
      onChange: (e) => setTerm(value => e.target.value)
    })}
  />
  <div className="px-1 text-[10px] font-mono text-neutral-500">
    <span>Status: {loading && term === termDebounced ? 'Fetching API...' : 'Idle'}</span>
    <span className="ml-2">
      | Stable Value: <span className="text-sky-400">"{termDebounced}"</span>
    </span>
  </div>
)
*/