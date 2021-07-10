import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styles from './index.module.scss';
export type XLottieProps = {
  url: string;
  size?: number;
};
const LottiePlayer = (props: XLottieProps) => {
  const { size, url } = props;
  const lottieRef = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current, // Required
      path: url, // Required
      renderer: 'svg', // Required
      loop: true, // Optional
      autoplay: true, // Optional
      name: 'Hello World', // Name for future reference. Optional.
    });
    return () => {
      lottie.destroy();
    };
  }, []);
  return <div style={{ fontSize: `${size}px` }} className={styles.lottie} ref={lottieRef} />;
};

export default LottiePlayer;
