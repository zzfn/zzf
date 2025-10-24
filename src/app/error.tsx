'use client';

import { useEffect } from 'react';
import LottiePlayer from '../components/LottiePlayer';
import { getCdn } from '../utils/getCdn';
import { Button } from '../components/ui';

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
