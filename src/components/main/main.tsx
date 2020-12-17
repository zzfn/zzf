import React from 'react';
import styles from './main.module.scss';
const Main: React.FC = ({ children }) => {
  return <div className={styles.main}>{children}</div>;
};

export default Main;
