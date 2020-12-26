import React from 'react';
import styles from './tags.module.scss';

const Tags: React.FC = ({ children }) => {
  return <span className={styles.tags}>{children}</span>;
};
export { Tags };
