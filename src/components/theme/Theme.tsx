import React, { useState } from 'react';
import styles from './theme.module.scss';
function Theme(props) {
  const [isShow, setIsShow] = useState(false);
  return (
    <span className={styles.themeWrap}>
      <span onClick={() => setIsShow(!isShow)}>主题</span>
      {isShow && (
        <label className={styles.switch}>
          <input type='checkbox' />
          <span className={`${styles.slider} ${styles.round}`} />
        </label>
      )}
    </span>
  );
}

export default Theme;
