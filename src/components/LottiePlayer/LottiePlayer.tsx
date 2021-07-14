import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import styles from './index.module.scss';
export type LottieProps = {
  url: string;
  size?: number;
};
const LottiePlayer: React.FC<LottieProps> = (props) => {
  const { size, url } = props;
  const lottieRef = useRef();
  useEffect(() => {
    lottie.loadAnimation({
      container: lottieRef.current,
      path: url,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      name: 'Hello World',
    });
    return () => {
      lottie.destroy();
    };
  }, [url]);
  return <div style={{ fontSize: `${size}px` }} className={styles.lottie} ref={lottieRef} />;
};

export default LottiePlayer;
