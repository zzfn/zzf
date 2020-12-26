import React, { useEffect, useState } from 'react';
import styles from './toggle.module.scss';

function Toggle({ onChange }) {
  const [mode, setMode] = useState('system');
  useEffect(() => {
    onChange(mode);
  }, [mode]);
  return (
    <ul className={styles.toggle}>
      <li onClick={() => setMode('light')} className={styles.toggleItem}>
        浅色
      </li>
      <li onClick={() => setMode('dark')} className={styles.toggleItem}>
        深色
      </li>
      <li onClick={() => setMode('system')} className={styles.toggleItem}>
        跟随系统
      </li>
    </ul>
  );
}

export default Toggle;
