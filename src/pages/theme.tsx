import React, { useEffect, useState } from 'react';
import styles from 'styles/theme.module.scss';

function Theme(): JSX.Element {
  const [mode, setMode] = useState('system');
  function handleClick(mode) {
    setMode(mode);
    if (mode === 'system') {
      document.body.className = 'system';
    } else {
      document.body.className = mode;
    }
    localStorage.setItem('mode', mode);
  }
  useEffect(() => {
    const m = localStorage.getItem('mode');

    if (m) {
      setMode(m);
      document.body.className = m;
    } else {
      setMode('system');
      document.body.className = 'system';
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