import { useSyncExternalStore } from 'react';

function subscribe(query: string, callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const mediaQueryList = window.matchMedia(query);
  const handler = () => callback();
  mediaQueryList.addEventListener('change', handler);

  return () => {
    mediaQueryList.removeEventListener('change', handler);
  };
}

function getSnapshot(query: string) {
  return typeof window !== 'undefined' ? window.matchMedia(query).matches : false;
}

function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (listener) => subscribe(query, listener),
    () => getSnapshot(query),
    () => false,
  );
}

export default useMediaQuery;
