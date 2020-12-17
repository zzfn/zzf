import React from 'react';
import styles from './footer.module.scss';
import dayjs from 'dayjs';
function Footer(props) {
  return (
    <footer className={styles.footer}>
      <div>2020-{dayjs().format('YYYY')}</div>
      <div>Powered by zzfn</div>
      <div>苏ICP备18059856号</div>
    </footer>
  );
}

export default Footer;
