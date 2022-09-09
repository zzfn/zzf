import { useCallback, useEffect, useRef } from 'react';

const useOutsideClick = <T extends HTMLElement>(callback: any) => {
  const ref = useRef<T>();
  const handleClick = useCallback((event: Event): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      event.stopPropagation();
      callback(event);
    }
  }, [callback]);
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref,handleClick]);

  return ref;
};
export default useOutsideClick;
