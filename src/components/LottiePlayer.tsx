import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';

export type LottieProps = {
  url: string;
  size?: number;
};
const LottiePlayer: React.FC<LottieProps> = (props) => {
  const { size, url } = props;
  const lottieRef = useRef<HTMLDivElement>();
  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current,
      path: url,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: url,
    });
    return () => {
      lottie.destroy(url);
    };
  }, [url]);
  return <div style={{ fontSize: `${size}px` }} className={'w-[1em] h-[1em] m-auto'} ref={lottieRef} />;
};

export default LottiePlayer;
