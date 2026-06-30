import { useState, useEffect } from 'react';

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = (event: MediaQueryListEvent) => setMatches(event.matches);

    // add listener to listen for screen resize events
    mediaQueryList.addEventListener('change', listener);
    
    // define the initial value correctly
    setMatches(mediaQueryList.matches);

    // clear the event from memory when the component unmounts
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);

  return matches;
}

// Usage example:
// const isMobile = useMediaQuery('(max-width: 600px)');
// const isDesktop = useMediaQuery('(min-width: 1024px)');
// const isDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
// return <div>{isMobile ? <MenuMobile /> : <SidebarDesktop />}</div>;