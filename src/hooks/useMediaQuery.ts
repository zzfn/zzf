import { useState, useEffect } from 'react';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const handleMediaQueryChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 设置初始状态
    setMatches(mediaQueryList.matches);

    // 添加事件监听器
    mediaQueryList.addEventListener('change', handleMediaQueryChange);

    // 清除事件监听器
    return () => {
      mediaQueryList.removeEventListener('change', handleMediaQueryChange);
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
