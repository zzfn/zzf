import React from 'react';
import styles from './modal.module.scss';

export default function Dialog(props: any) {
  return (
    props.visible && (
      <div className={styles.container}>
        <div className={styles.content}>{props.children}</div>
        <div
          className={styles.btn}
          onClick={() => {
            props.close();
          }}
        >
          关闭
        </div>
      </div>
    )
  );
}
