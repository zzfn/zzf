import { useEffect, useState } from 'react';

const useMedia = (query: string, defaultState = false) => {
  const [state, setState] = useState(defaultState);

  useEffect(() => {
    let mounted = true;
    const mql = window.matchMedia(query);
    const onChange = () => {
      if (!mounted) {
        return;
      }
      setState(!!mql.matches);
    };

    try {
      mql.addEventListener('change', onChange);
    } catch (e) {
      mql.addListener(onChange);
    }
    setState(mql.matches);

    return () => {
      mounted = false;
      try {
        mql.removeEventListener('change', onChange);
      } catch (e) {
        mql.removeListener(onChange);
      }
    };
  }, [query]);
  return state;
};

export default useMedia;
