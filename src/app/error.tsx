'use client';

import { useEffect } from 'react';
import LottiePlayer from '../components/LottiePlayer';
import { getCdn } from '../utils/getCdn';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex items-center justify-center'>
      <LottiePlayer size={500} url={getCdn('/assets/error.json')} />
    </div>
  );
}
