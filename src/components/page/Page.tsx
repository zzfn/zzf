import React from 'react';
import styles from './page.module.scss';

function Page({ onChange, total, current }) {
  return (
    <div className={styles.page}>
      {Array.from({ length: Math.ceil(total / 10) }).map((i, idx) => (
        <span
          className={`${styles.pageItem} ${current === idx + 1 && styles.active}`}
          key={idx}
          onClick={() => onChange(idx + 1)}
        >
          {idx + 1}
        </span>
      ))}
    </div>
  );
}

export default Page;
