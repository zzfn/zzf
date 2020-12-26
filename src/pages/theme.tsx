import React, { useEffect, useState } from 'react';
import styles from 'styles/theme.module.scss';

function Theme(): JSX.Element {
  const [mode, setMode] = useState('system');
  function handleClick(mode) {
    setMode(mode);
    document.body.className = mode;
    localStorage.setItem('mode', mode);
  }
  useEffect(() => {
    if (localStorage.getItem('mode')) {
      setMode(localStorage.getItem('mode'));
      document.body.className = localStorage.getItem('mode');
    }
  }, []);
  return (
    <ul className={styles.theme}>
      <li
        onClick={() => handleClick('light')}
        className={`${styles.themeItem} ${mode === 'light' ? styles.active : styles.inactive}`}
      >
        浅色
      </li>
      <li
        onClick={() => handleClick('dark')}
        className={`${styles.themeItem} ${mode === 'dark' ? styles.active : styles.inactive}`}
      >
        深色
      </li>
      <li
        onClick={() => handleClick('system')}
        className={`${styles.themeItem} ${mode === 'system' ? styles.active : styles.inactive}`}
      >
        跟随系统
      </li>
    </ul>
  );
}
export default Theme;
