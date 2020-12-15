import React from 'react';
import styles from './arrow.module.scss';
function Arrow(props) {
  return (
    <div className={styles.wrap}>
      <div className={styles.content}>{props.children}</div>
      <div className={styles.arrow}>{props.number}</div>
    </div>
  );
}

export default Arrow;
