import React, { useState } from 'react';
import styles from './theme.module.scss';
function Theme(props) {
  const [isShow, setIsShow] = useState(false);
  return (
    <span className={styles.themeWrap}>
      <span onClick={() => setIsShow(!isShow)}>主题</span>
      {isShow && (
        <div className={styles.mask}>
          <button className={styles.btn} type={'button'}>
            <div className={styles.handler} />
            <div className={styles.text}>浅色模式</div>
          </button>
          {/*<button className={styles.btn} type={'button'}>*/}
          {/*  <div>跟随系统</div>*/}
          {/*</button>*/}
        </div>
      )}
    </span>
  );
}

export default Theme;
