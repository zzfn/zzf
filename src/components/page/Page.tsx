import React from 'react';
import styles from './page.module.scss';

function Page({ onChange, total, current, loading }) {
  return (
    <div className={styles.page}>
      {Array.from({ length: Math.ceil(total / 10) }).map((i, idx) => (
        <span
          style={{ cursor: loading ? 'not-allowed' : 'pointer' }}
          className={`${styles.pageItem} ${current === idx + 1 && styles.active}`}
          key={idx}
          onClick={() => !loading && onChange(idx + 1)}
        >
          {idx + 1}
        </span>
      ))}
    </div>
  );
}

export default Page;
