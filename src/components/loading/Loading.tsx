import React from 'react';
import styles from './loading.module.scss';

function Loading({ loading, children }) {
  return (
    <div className={styles.loadingWrap}>
      {loading && (
        <div className={styles.mask}>
          <div className={styles.loading}>Loading...</div>
        </div>
      )}
      <div className={styles.content}>{children}</div>
    </div>
  );
}

export default Loading;
