import { useState, useEffect } from 'react';

function useReducedMotion() {
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(prefers-reduced-motion: reduce)');

    const updateMotionPreference = (event: MediaQueryListEvent) => {
      setIsReducedMotion(event.matches);
    };

    // 初始化
    setIsReducedMotion(mediaQueryList.matches);

    // 监听媒体查询变化
    mediaQueryList.addEventListener('change', updateMotionPreference);

    // 清除监听器
    return () => {
      mediaQueryList.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  return isReducedMotion;
}

export default useReducedMotion;
