'use client';

import { getCdn } from '../utils/getCdn';
import dynamic from 'next/dynamic';
import React from 'react';

// 动态导入 LottiePlayer 以减少初始 bundle 大小
const LottiePlayer = dynamic(() => import('./LottiePlayer'), {
  loading: () => (
    <div className='bg-bg-muted flex h-[50px] w-[50px] animate-pulse items-center justify-center rounded-full' />
  ),
  ssr: false, // Lottie 动画不需要 SSR
});

const Loading = () => {
  return <LottiePlayer size={50} url={getCdn('/assets/logo.json')} />;
};
export default Loading;
