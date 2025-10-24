import { useSyncExternalStore } from 'react';

const MEDIA_QUERY = '(prefers-reduced-motion: reduce)';

function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => undefined;
  }

  const mediaQueryList = window.matchMedia(MEDIA_QUERY);
  const handler = () => callback();
  mediaQueryList.addEventListener('change', handler);

  return () => {
    mediaQueryList.removeEventListener('change', handler);
  };
}

function getSnapshot() {
  return typeof window !== 'undefined' ? window.matchMedia(MEDIA_QUERY).matches : false;
}

function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export default useReducedMotion;
