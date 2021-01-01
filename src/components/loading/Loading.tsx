import React from 'react';
import styles from './loading.module.scss';
function Loading({ loading, children }) {
  return <>{loading ? <div className={styles.loading}>Loading...</div> : children}</>;
}

export default Loading;
