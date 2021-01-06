import React, { useEffect, useRef } from 'react';
import styles from './loading.module.scss';

function Loading({ children, onLoad, noMore }) {
  const loadingRef = useRef(null);
  const Observer = useRef(null);
  useEffect(() => {
    Observer.current = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          onLoad();
        }
      });
    });
    Observer.current.observe(loadingRef.current);
  }, []);
  useEffect(() => {
    if (noMore) {
      Observer.current.disconnect();
    }
  });
  return (
    <div className={styles.loadingWrap}>
      <div className={styles.content}>
        {children}
        {noMore ? (
          <div>
            <div className={styles.noMore}>暂无更多</div>
          </div>
        ) : (
          <div ref={loadingRef} className={styles.mask}>
            <div className={styles.loading}>Loading...</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loading;
