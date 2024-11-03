import { useCallback, useRef, useEffect } from 'react';

function useDebouncedCallback<T extends (...args: any[]) => any>(callback: T, delay: number): T {
  const callbackRef = useRef<T>(callback);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current !== undefined) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        callbackRef.current(...args);
      }, delay);
    },
    [delay],
  ) as T;
}

export default useDebouncedCallback;
