import { useEffect, useRef } from 'react';

const useOutsideClick = <T extends HTMLElement>(callback: any) => {
  const ref = useRef<T>();
  const handleClick = (event: Event): void => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      event.stopPropagation();
      callback(event);
    }
  };
  useEffect(() => {
    document.addEventListener('click', handleClick, true);
    return () => {
      document.removeEventListener('click', handleClick, true);
    };
  }, [ref]);

  return ref;
};
export default useOutsideClick;
