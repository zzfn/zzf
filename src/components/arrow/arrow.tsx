import React from 'react';
import styles from './arrow.module.scss';
function Arrow(props) {
  return <div className={styles.arrow}>{props.children}</div>;
}

export default Arrow;
