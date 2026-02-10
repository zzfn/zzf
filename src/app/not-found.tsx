'use client';

import dynamic from 'next/dynamic';
import { getCdn } from '../utils/getCdn';

// 动态导入 LottiePlayer 以减少初始 bundle 大小
const LottiePlayer = dynamic(() => import('../components/LottiePlayer'), {
  loading: () => (
    <div className='bg-bg-muted flex h-[500px] w-[500px] animate-pulse items-center justify-center rounded-lg' />
  ),
  ssr: false, // Lottie 动画不需要 SSR
});

export default function NotFound() {
  return (
    <div className='flex items-center justify-center'>
      <LottiePlayer size={500} url={getCdn('/assets/404.json')} />
    </div>
  );
}
