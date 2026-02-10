'use client';

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { getCdn } from '../utils/getCdn';
import { Button } from '../components/ui';

// 动态导入 LottiePlayer 以减少初始 bundle 大小
const LottiePlayer = dynamic(() => import('../components/LottiePlayer'), {
  loading: () => (
    <div className='bg-bg-muted flex h-[500px] w-[500px] animate-pulse items-center justify-center rounded-lg' />
  ),
  ssr: false, // Lottie 动画不需要 SSR
});

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center space-y-6'>
      <LottiePlayer size={500} url={getCdn('/assets/error.json')} />
      <Button onClick={reset} className='px-6'>
        重试加载
      </Button>
    </div>
  );
}
