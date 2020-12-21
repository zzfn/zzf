import React from 'react';
import styles from './main.module.scss';
const Main: React.FC = ({ children }) => {
  return <div className={`${styles.main} box-responsive`}>{children}</div>;
};

export default Main;
